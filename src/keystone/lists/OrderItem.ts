import { graphql, group, list } from "@keystone-6/core"
import {
	integer,
	relationship,
	select,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"

import { hasOnlyOneValue } from "../../lib/utils"
import { isLoggedIn, permissions, rules } from "../access"
import type { Lists } from ".keystone/types"

export const OrderItem: Lists.OrderItem = list({
	access: {
		filter: {
			query: rules.canViewOrderItems,
			update: rules.canManageOrders,
			delete: rules.canManageOrders,
		},
		operation: {
			create: permissions.canManageOrder,
			query: isLoggedIn,
			update: permissions.canManageOrder,
			delete: permissions.canManageOrder,
		},
	},
	fields: {
		type: select({
			options: [
				{ label: "Sale", value: "SALE" },
				{ label: "Discount", value: "DISCOUNT" },
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
		total: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, context) {
					return item.subTotal * item.quantity
				},
			}),
		}),
		...group({
			label: "Item Info",
			description:
				"copied info from Product, Booking, Rental, Tickets, SubscriptionItem, Coupon upon date created",
			fields: {
				subTotal: integer({ validation: { isRequired: true, min: 0 } }),
				amount_off: integer({ validation: { min: 0 } }),
				percent_off: integer({
					validation: {
						min: 1,
						max: 100,
					},
				}),
			},
		}),
		quantity: integer({ validation: { isRequired: true, min: 1 } }),
		rentalDays: integer({ validation: { isRequired: true, min: 0 }, defaultValue: 0 }),
		product: relationship({ ref: "Product.orderItems", many: false }),
		booking: relationship({ ref: "Booking.orderItem", many: false }),
		rental: relationship({ ref: "Rental.orderItem", many: false }),
		tickets: relationship({ ref: "Ticket.orderItem", many: true }),
		subscriptionItem: relationship({
			ref: "SubscriptionItem.orderItem",
			many: false,
		}),
		coupon: relationship({ ref: "Coupon" }),
		order: relationship({ ref: "Order.items", many: false }),
		dateCreated: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
		dateModified: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
		//TODO some total or subTotal or price that is hard written upon checkout
	},

	hooks: {
		validate: {
			create: ({ resolvedData }) => {

        //? chicken and egg senario
        // if(!resolvedData.order?.connect) throw new Error('!!! OrderItem must be associated with an Order')
          
				const validationStrings = [
					"product",
					"tickets",
					"subscriptionItem",
					"booking",
					"rental",
					"coupon",
				]
				const hasOnlyOne = hasOnlyOneValue(resolvedData, validationStrings)
				console.log("!!! hasOnlyOne:: ", hasOnlyOne)
				if (!hasOnlyOne)
					throw new Error(
						`!!! Order Item can only have one of [${validationStrings.join(
							", "
						)}] set`
					)

				if (
					resolvedData.coupon &&
					(!resolvedData.amount_off && !resolvedData.percent_off)
				)
					throw new Error("!!! OrderItem Coupon: discount (amount_off && percent_off) are both null")

				if (resolvedData.amount_off && resolvedData.percent_off)
					throw new Error(
						"Cannot have 'Amount Off and Percent Off chosen together. Chose only one option and leave the other blank"
					)
				if (
					resolvedData.coupon ||
					resolvedData.booking ||
					resolvedData.rental
				) {
					if (resolvedData.quantity && resolvedData.quantity > 1)
						throw new Error(
							"!!! Quantity cannot be above 1 for Coupon, Booking, or Rental"
						)
				}
			},
			update: ({ resolvedData, item }) => {
				const thisNewCombinedData = { ...item, ...resolvedData }

				// console.log({ thisNewCombinedData })
				//? check that no other cartItem type is being connected or disconnected
				const validationStrings = [
					"product",
					"productId",
					"tickets",
					"ticketIds",
					"booking",
					"bookingId",
					"subscriptionItemId",
					"subscriptionItem",
					"rental",
					"rentalId",
					"coupon",
					"couponId",
				]
				const hasOnlyOne = hasOnlyOneValue(
					thisNewCombinedData,
					validationStrings
				)

				console.log({ hasOnlyOne })
				if (!hasOnlyOne)
					throw new Error(
						`!!! Order Item can only have one of [${validationStrings.join(
							", "
						)}] set`
					)
			},
		},
		beforeOperation: {
			// const contextSudo = context.sudo()

			delete: async ({ item, context }) => {
        // TODO why is this error? booking is added to OrderItem schema!!!!
				if (item.bookingId) {
					await context.sudo().db.Booking.updateOne({
						where: { id: item.bookingId },
						data: {
							status: "CANCELED",
						},
					})
				}

				if (item.subscriptionItemId) {
					await context.sudo().db.SubscriptionItem.updateOne({
						where: { id: item.subscriptionItemId },
						data: {
							status: "CANCELED",
						},
					})
				}
			},
		},
	},
})
