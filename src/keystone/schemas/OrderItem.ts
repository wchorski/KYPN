import { list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
} from "@keystone-6/core/fields"
import { isLoggedIn, permissions, rules } from "../access"
import { hasOnlyOneValue } from "../../lib/utils"

export const OrderItem: Lists.OrderItem = list({
	access: {
		filter: {
			query: rules.canViewOrderItems,
			update: rules.canManageOrders,
			delete: rules.canManageOrders,
		},
		operation: {
			create: isLoggedIn,
			query: isLoggedIn,
			update: permissions.canManageOrder,
			delete: permissions.canManageOrder,
		},
	},
	fields: {
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
		subTotal: integer({ validation: { isRequired: true, min: 0 } }),
		quantity: integer({ validation: { isRequired: true, min: 1 } }),
		product: relationship({ ref: "Product.orderItems", many: false }),
		booking: relationship({ ref: "Booking.orderItem", many: false }),
		rental: relationship({ ref: "Rental.orderItem", many: false }),
		tickets: relationship({ ref: "Ticket.orderItem", many: true }),
		subscriptionItem: relationship({
			ref: "SubscriptionItem.orderItem",
			many: false,
		}),
		coupon: relationship({ ref: "Coupon" }),
		order: relationship({ ref: "Order.items" }),
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
				const hasOnlyOne = hasOnlyOneValue(resolvedData, [
					"product",
					"event",
					"subscriptionItem",
					"booking",
					"rental",
					"coupon",
				])
				console.log("!!! hasOnlyOne:: ", hasOnlyOne)
				if (!hasOnlyOne)
					throw new Error(
						'!!! Order Item can only have one of ["product", "event", "booking", "subscriptionItem", "rental",  "coupon"] set'
					)
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
					"subscriptionItemId",
					"subscriptionItem",
					"rental",
					"rentalId",
					"coupon",
					"couponId",
				])

				console.log({ hasOnlyOne })
				if (!hasOnlyOne)
					throw new Error(
						'!!! Order Item can only have one of ["product", "event", "booking", "subscriptionItem", "rental", "coupon", + itemId(s)] set'
					)
			},
		},
		beforeOperation: {
			// const contextSudo = context.sudo()

			delete: async ({ item, context }) => {
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
