import { graphql, list } from "@keystone-6/core"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"

import type { OrderItem } from "../../keystone/types"
import moneyFormatter from "../../lib/moneyFormatter"
import { isLoggedIn, permissions, rules } from "../access"
// @ts-ignore
import type { Lists } from ".keystone/types"

// TODO thinking about changing to `Transaction` to all encompass products, subscriptions, etc.
export const Order: Lists.Order = list({
	access: {
		filter: {
			query: rules.canViewOrders,
			update: rules.canManageOrders,
			delete: rules.canManageOrders,
		},
		operation: {
			// TODO battle test these access
			// TODO maybe make Orders completely locked down and only mutations (sudo) can create them
			create: permissions.canManageOrders,
			query: isLoggedIn,
			update: permissions.canManageOrders,
			// TODO will want to switch back to false (order status canceled)
			delete: permissions.canManageOrders,
			// delete: () => false,
		},
	},

	ui: {
		listView: {
			initialSort: {
				field: "dateCreated",
				direction: "DESC",
			},
			initialColumns: ["label", "dateCreated", "status", "user", "email"],
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "order"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		label: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve(item: any) {
					return `${moneyFormatter(item.total)}`
				},
			}),
		}),
		email: text(),
		notes: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		// total: virtual({
		// 	field: graphql.field({
		// 		type: graphql.Int,
		// 		resolve(item) {
		// 			return item.subTotal + item.fees
		// 		},
		// 	}),
		// 	ui: {
		// 		itemView: { fieldMode: "hidden" },
		// 	},
		// }),
		//TODO make this virtual, grab from OrderItems subTotal
		// subTotal: integer({ validation: { isRequired: true, min: 0 } }),
		total: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {
					const orderItems = (await context.query.OrderItem.findMany({
						where: { order: { id: { equals: item.id } } },
						query: `
              type
              quantity
              subTotal
              total
              amount_off
              percent_off
              product {
                id
              }
              booking {
                id
              }
              rental {
                id
                days
              }
              tickets {
                id
              }
              subscriptionItem {
                id
              }
              coupon {
                id
              }
            `,
					})) as OrderItem[]

					const salesTotal = orderItems
						.filter((item) => item.type === "SALE")
						.reduce((sum, item) => sum + item.total, 0)

					const rentalsSubTotal = orderItems
						.filter((item) => item.type === "RENTAL")
						.reduce((sum, item) => sum + item.total, 0)

					const rentalDays =
						orderItems.find((item) => item.type === "RENT_RESERVATION")
							?.rentalDays || 0

					const rentalTotal = rentalsSubTotal * rentalDays
					// const discountAmountOffTotal = orderItems
					// 	.filter((item) => item.type === "DISCOUNT")
					// 	.reduce((sum, item) => sum + item.amount_off, 0)

					// const discountPercentOffTotal = orderItems
					// 	.filter((item) => item.type === "DISCOUNT")
					// 	.reduce((sum, item) => sum + item.percent_off, 0)

					const discount = orderItems
						.filter((item) => item.type === "DISCOUNT")
						.reduce(
							(acc, item) => {
								// one coupon is only allowed to have one positive value in `amount_off` or `percent_off`
								if (item?.amount_off) {
									acc.amount_off += item.amount_off
								} else if (item?.percent_off) {
									acc.percent_off += item.percent_off
								}

								return acc
							},
							{ amount_off: 0, percent_off: 0 }
						)

					const totalAfterAmountOff =
						salesTotal + rentalTotal + item.fees - discount.amount_off
					const percentToDecimal = discount.percent_off / 100

					return totalAfterAmountOff - totalAfterAmountOff * percentToDecimal
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		fees: integer({
			validation: { isRequired: true, min: 0 },
			defaultValue: 0,
		}),
		count: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {
					const order = await context.sudo().query.Order.findOne({
						where: { id: item.id },
						query: `
              items {
                quantity
              }
            `,
					})

					const orderItems = await context.query.OrderItem.findMany({
						where: { order: { id: { equals: item.id } } },
						query: `quantity`,
					})

					const itemsCount = orderItems.reduce((accumulator, it) => {
						return accumulator + it.quantity
					}, 0)

					return itemsCount
				},
			}),
		}),
		stripeCheckoutSessionId: text(),
		stripePaymentIntent: text({
			ui: {
				description: `https://dashboard.stripe.com/payments/STIPEPAYMENTINTENT`,
			},
		}),
		shipping_address: text(),
		status: select({
			options: [
				{ label: "started", value: "STARTED" },
				{ label: "requested", value: "REQUESTED" },
				{ label: "payment pending", value: "PAYMENT_PENDING" },
				{ label: "payment recieved", value: "PAYMENT_RECIEVED" },
				{ label: "free", value: "FREE" },
				{ label: "processing", value: "PROCESSING" },
				{ label: "shipped", value: "SHIPPED" },
				{ label: "delivered", value: "DELIVERED" },
				{ label: "cancelled", value: "CANCELLED" },
				{ label: "fulfilled", value: "FULFILLED" },
				{ label: "expired", value: "EXPIRED" },
				{ label: "refunded", value: "REFUNDED" },
				{ label: "returned", value: "RETURNED" },
				{ label: "failed", value: "FAILED" },
			],
			defaultValue: "REQUESTED",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		items: relationship({ ref: "OrderItem.order", many: true }),
		//? moved to OrderItem
		// rental: relationship({ ref: "Rental.order", many: false }),
		// ticketItems: relationship({ ref: "Ticket.order", many: true }),
		//? moved to OrderItem
		// bookings: relationship({ ref: "Booking.order", many: true }),
		user: relationship({ ref: "User.orders" }),
		// todo move this all under 'status'
		// payment_status: select({
		//   options: [
		//     { label: 'paid', value: 'PAID' },
		//     { label: 'no_payment_required', value: 'NO_PAYMENT_REQUIRED' },
		//     { label: 'unpaid', value: 'UNPAID' },
		//   ],
		//   defaultValue: 'PAID',
		//   ui: {
		//     displayMode: 'segmented-control',
		//     createView: { fieldMode: 'edit' }
		//   }
		// }),

		dateCreated: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
		dateModified: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
	},

	hooks: {
		afterOperation: {
			create: async ({ item, context }) => {
				console.log("✉️ 🐸 send mail when order is updated... ")
				console.log("❌ why does below hook code cause an error?")
				// const order = (await context.sudo().query.Order.findOne({
				// 	where: { id: item.id },
				// 	query: `
				//     id
				//     dateCreated
				//     status
				//     total
				//     email
				//     user {
				//       name
				//       email
				//     }
				//     items {
				//       quantity
				//       booking {
				//         id
				//         summary
				//       }
				//       tickets {
				//         id
				//         eventSummary
				//       }
				//       product {
				//         id
				//         name
				//       }
				//     }
				//   `,
				// })) as TOrder

				// console.log({ order })

				// await mailOrder({
				// 	to: [envs.ADMIN_EMAIL_ADDRESS, item.email || order.user?.email || ""],
				// 	operation: "create",
				// 	order,
				// })
			},
			update: async ({ item }) => {
				console.log(
					"🐸 send mail when order is updated... but maybe i should even have orders be updateable?"
				)
			},
		},
		// afterOperation: async ({ operation, resolvedData, item, context }) => {
		// 	if (operation === "create" || operation === "update") {
		// 		const order = (await context.sudo().query.Order.findOne({
		// 			where: { id: item.id },
		// 			query: `
		//         id
		//         dateCreated
		//         status
		//         total
		//         email
		//         user {
		//           name
		//           email
		//         }
		//         items {
		//           quantity
		//           booking {
		//             id
		//             summary
		//           }
		//           tickets {
		//             id
		//             eventSummary
		//           }
		//           product {
		//             id
		//             name
		//           }
		//         }
		//       `,
		// 		})) as TOrder

		// 		await mailOrder({
		// 			to: [envs.ADMIN_EMAIL_ADDRESS, item.email || order.user?.email || ""],
		// 			operation,
		// 			order,
		// 		})
		// 	}
		// },
	},
})
