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
				{ label: "Subscription", value: "SUBSCRIPTION" },
				{ label: "Rent Reservation", value: "RENT_RESERVATION" },
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

					// TODO does this take into account addons added to booking?
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
		rental: relationship({ ref: "Rental" }),
		event: relationship({ ref: "Event" }),
		subscriptionPlan: relationship({ ref: "SubscriptionPlan" }),
		user: relationship({ ref: "User.cart" }),
	},
	hooks: {
		validate: {
			create: async ({ resolvedData, context }) => {

        if(!resolvedData?.user?.connect?.id) throw new Error("!!! CartItem must have connected user")

				const hasOnlyOne = hasOnlyOneValue(resolvedData, [
					"product",
					"event",
					"subscriptionPlan",
					"booking",
					"rental",
					"coupon",
				])
				if (!hasOnlyOne)
					throw new Error(
						'!!! Cart Item can only have one of ["product", "event", "booking", "subscriptionPlan", "rental", "coupon"] set'
					)

				const cartItemsByUser = await context.sudo().db.CartItem.findMany({
					where: { user: { id: { equals: resolvedData.user.connect.id } } },
				})

        if(cartItemsByUser.some(item => item.rentalId)) throw new Error('!!! CartItems may only have one Rental item per user session')
			},
			update: ({ resolvedData, item }) => {
				const thisNewCombinedData = { ...item, ...resolvedData }

				// console.log({ thisNewCombinedData })
				//? check that no other cartItem type is being connected or disconnected
				const hasOnlyOne = hasOnlyOneValue(thisNewCombinedData, [
					"product",
					"productId",
					"event",
					"eventId",
					"booking",
					"bookingId",
					"subscriptionPlanId",
					"subscriptionPlan",
          "rental",
          "rentalId",
					"coupon",
					"couponId",
				])
				console.log(
					"🐸🐸🐸 check that cartItem can only have one of item type 🐸🐸🐸"
				)
				console.log({ hasOnlyOne })
				if (!hasOnlyOne)
					throw new Error(
						'!!! Cart Item can only have one of ["product", "event", "booking", "subscription", "rental",  "coupon", + itemId(s)] set'
					)
			},
		},
		beforeOperation: {
			delete: async ({ item, context }) => {
				if (item.bookingId) {
					await context.sudo().db.Booking.updateOne({
						where: { id: item.bookingId },
						data: {
							status: "CANCELED",
						},
					})
				}
				if (item.rentalId) {
					await context.sudo().db.Rental.updateOne({
						where: { id: item.rentalId },
						data: {
							status: "CANCELED",
						},
					})
				}
			},
			// if (operation === "delete") {
			// 	//TODO mutation `checkout` makes booking CANCELED to HOLDING. not exactly logical but it works for now
			// 	}

			// 	//TODO delete tickets (once I update ticket flow #todo)
			// }
		},
	},

	// TODO on 'update' check product.stockCount or event.seats
})
