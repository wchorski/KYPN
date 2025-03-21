import { graphql, group, list } from "@keystone-6/core"
import {
	integer,
	relationship,
	select,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"

import { hasOnlyOneValue } from "../../lib/utils"
import { permissions, rules } from "../access"
import type { CartItem as TCartItem, Coupon,Event, Rental } from "../types"
import type { Lists } from ".keystone/types"

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

	ui: {
		listView: {
			initialColumns: ["user", "type", "quantity", "subTotal", "dateModified"],
			initialSort: { field: "dateModified", direction: "DESC" },
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
				{ label: "Discount", value: "DISCOUNT" },
				// { label: "Subscription", value: "SUBSCRIPTION" },
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
							query: `price rental_price`,
						})

						// if(item.type === 'RENTAL') product.rental_price * item.quantity
						if (item.type === "RENTAL") return 0
						return product.price * item.quantity
					}

					if (item.rentalId) {
						const rental = (await context.query.Rental.findOne({
							where: { id: item.rentalId || "no_rental" },
							query: `days`,
						})) as Rental
						const rentalCartItems = (await context.query.CartItem.findMany({
							where: {
								user: { id: { equals: item.userId } },
								type: { equals: "RENTAL" },
							},
							query: `
                quantity
                product {
                  name
                  rental_price
                }
              `,
						})) as TCartItem[]

						const subTotal = rentalCartItems.reduce((accumulator, item) => {
							if (!item.product?.rental_price)
								throw new Error(
									`!!! rental price was not set for Product: ${item.product?.name}`
								)
							return accumulator + item.product.rental_price * item.quantity
						}, 0)

						return subTotal * rental.days
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
		// subscriptionItem: relationship({ ref: "SubscriptionItem" }),
		user: relationship({ ref: "User.cart" }),
		...group({
			label: "Metadata",
			// description: 'Group description',

			fields: {
				dateCreated: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
				}),
				dateModified: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
					db: {
						updatedAt: true,
					},
				}),
			},
		}),
	},
	hooks: {
		validate: {
			create: async ({ resolvedData, context }) => {
				if (!resolvedData?.user?.connect?.id)
					throw new Error("!!! CartItem must have connected user")

				const validationStrings = [
					"product",
					"event",
					// "subscriptionItem",
					"booking",
					"rental",
					"coupon",
				]
				const hasOnlyOne = hasOnlyOneValue(resolvedData, validationStrings)
				if (!hasOnlyOne)
					throw new Error(
						`!!! Cart Item can only have one of [${validationStrings.join(
							", "
						)}] set`
					)

				const cartItemsByUser = await context.sudo().db.CartItem.findMany({
					where: { user: { id: { equals: resolvedData.user.connect.id } } },
				})

				if (
					resolvedData?.rental?.connect?.id &&
					cartItemsByUser.some((item) => item.rentalId)
				)
					throw new Error(
						"!!! CartItems may only have one Rental item per user session"
					)
				if (resolvedData.coupon?.connect?.code) {
					const coupon = (await context.query.Coupon.findOne({
						where: { code: resolvedData.coupon.connect.code },
						query: `
                      id
                      name
                      code
                      amount_off
                      percent_off
                      duration
                      duration_in_months
                      redeem_by
                      max_redemptions
                      redemptions
                    `,
					})) as Coupon

					// Validation
					if (!coupon) throw new Error("!!! Coupon not found")

					if (coupon.redemptions > coupon.max_redemptions)
						throw new Error("!!! Reached max redemptions")

					const now = new Date()
					const expirationDate = new Date(coupon.redeem_by)
					if (now > expirationDate) throw new Error("!!! Coupon has expired")
				}
			},
			update: ({ resolvedData, item }) => {
				const thisNewCombinedData = { ...item, ...resolvedData }

				// console.log({ thisNewCombinedData })
				//? check that no other cartItem type is being connected or disconnected
				const validationStrings = [
					"product",
					"productId",
					"event",
					"eventId",
					"booking",
					"bookingId",
					// "subscriptionItemId",
					// "subscriptionItem",
					"rental",
					"rentalId",
					"coupon",
					"couponId",
				]
				const hasOnlyOne = hasOnlyOneValue(
					thisNewCombinedData,
					validationStrings
				)
				console.log(
					"🐸🐸🐸 check that cartItem can only have one of item type 🐸🐸🐸"
				)
				console.log({ hasOnlyOne })
				if (!hasOnlyOne)
					throw new Error(
						`!!! Cart Item can only have one of [${validationStrings.join(
							", "
						)}] set`
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
