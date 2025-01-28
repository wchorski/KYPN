import { graphql, list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import { integer, relationship, select, virtual } from "@keystone-6/core/fields"
import { permissions, rules } from "../access"
import { type Event } from "../types"
import { hasOnlyOneValue } from "../../lib/utils"

export const CartItem: Lists.CartItem = list({
	// TODO allow non users to order items. only should be a sudo thing i think?

	access: {
		filter: {
			query: rules.canViewCart,
		},
		operation: {
			query: () => true,
			create: permissions.canManageCart,
			update: permissions.canManageCart,
			delete: permissions.canManageCart,
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "cartitem"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		quantity: integer({
			defaultValue: 1,
			validation: { isRequired: true, min: 1 },
		}),
		type: select({
			options: [
				{ label: "Sale", value: "SALE" },
				{ label: "Rental", value: "RENTAL" },
			],
			validation: { isRequired: true },
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		subTotal: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {
					if (item.eventId) {
						const event = (await context.query.Event.findOne({
							where: { id: item.eventId || "no_event" },
							query: `price`,
						})) as Event

						return event.price * item.quantity
					}

					if (item.productId) {
						const product = await context.query.Product.findOne({
							where: { id: item.productId || "no_product" },
							query: `price`,
						})

						return product.price * item.quantity
					}

					if (item.bookingId) {
						const booking = await context.query.Booking.findOne({
							where: { id: item.bookingId || "no_product" },
							query: `price`,
						})

						return booking.price * item.quantity
					}
					//? if cart has a mix of tickets or products it could get messy
				},
			}),
		}),
		coupon: relationship({ ref: "Coupon" }),
		product: relationship({ ref: "Product" }),
		booking: relationship({ ref: "Booking" }),
		event: relationship({ ref: "Event" }),
		user: relationship({ ref: "User.cart" }),
	},
	hooks: {
		beforeOperation: async ({ operation, resolvedData, item, context }) => {
			if (operation === "create" || operation === "update") {
				const thisNewCombinedData = { ...item, ...resolvedData }

				const hasOnlyOne = hasOnlyOneValue(thisNewCombinedData, [
					"product",
					"event",
					"booking",
					"coupon",
				])
				if (!hasOnlyOne)
					throw new Error(
						'!!! Cart Item can only have one of ["product", "event", "booking", "coupon"] set'
					)
			}

			if (operation === "delete") {
        //TODO mutation `checkout` makes booking CANCELED to HOLDING. not exactly logical but it works for now
				if (item.bookingId) {
					await context.sudo().db.Booking.updateOne({
						where: { id: item.bookingId },
						data: {
							status: "CANCELED",
						},
					})
				}

				//TODO delete tickets (once I update ticket flow #todo)
			}
		},
	},

	// TODO on 'update' check product.stockCount or event.seats
})
