import { graphql, list } from "@keystone-6/core"
// @ts-ignore
import type { Lists } from ".keystone/types"
import { allowAll } from "@keystone-6/core/access"
import {
	image,
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { isLoggedIn, permissions, rules } from "../access"
import moneyFormatter from "../../lib/moneyFormatter"
import { envs } from "../../../envs"
import { mailOrder } from "../../lib/mail"
import { User, Order as OrderType } from "../../keystone/types"

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
		total: integer({ validation: { isRequired: true } }),
		count: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {
					const {
						order: { ticketItemsCount, bookingsCount },
					} = (await context.graphql.run({
						query: `
              query Order($where: OrderWhereUniqueInput!) {
                order(where: $where) {
                  ticketItemsCount
                  bookingsCount
                }
              }
            `,
						variables: {
							where: { id: item.id },
						},
					})) as { order: { ticketItemsCount: number, bookingsCount:number } }

          //? this does same as above gql.run. but it is less performant?
					// const tixsCount = await context.query.Ticket.count({
					// 	where: { order: { id: { equals: item.id } } },
					// })

					const orderItems = await context.query.OrderItem.findMany({
						where: { order: { id: { equals: item.id } } },
						query: `quantity`,
					})

					const itemsCount = orderItems.reduce((accumulator, it) => {
						return accumulator + it.quantity
					}, 0)

					return itemsCount + ticketItemsCount + bookingsCount
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
		rental: relationship({ ref: "Rental.order", many: false }),
		ticketItems: relationship({ ref: "Ticket.order", many: true }),
		bookings: relationship({ ref: "Booking.order", many: true }),
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
		afterOperation: async ({ operation, resolvedData, item, context }) => {
			if (operation === "create" || operation === "update") {
				const order = (await context.sudo().query.Order.findOne({
					where: { id: item.id },
					query: `
            id
            dateCreated
            status
            total
            email
            user {
              name
              email
            }
            items {
              image
              name
              quantity
              price
            }
            ticketItems {
              id
              orderIndex
              event {
                summary
                image
                price
              }
            }
          `,
				})) as OrderType

				const mail = await mailOrder({
					to: [envs.ADMIN_EMAIL_ADDRESS, item.email || order.user?.email || ""],
					operation,
					order,
				})
			}
		},
	},
})
