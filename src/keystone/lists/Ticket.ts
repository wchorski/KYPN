import { graphql, list } from "@keystone-6/core"
import {
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import type {  Event  } from "@ks/types"

import { isLoggedIn, permissions, rules } from "../access"
// @ts-ignore
import type {Lists } from ".keystone/types"

export const Ticket: Lists.Ticket = list({
	// todo only employees of event are allowed to update
	// access: allowAll,
	access: {
		filter: {
			// query: () => true,
			query: rules.canViewTickets,
			delete: rules.canManageTickets,
			update: rules.canManageTickets,
		},
		operation: {
			// query: () => true,
			//TODO battle test this access
			query: isLoggedIn,
			create: permissions.canManageTickets,
			update: permissions.canManageTickets,
			delete: permissions.canManageTickets,
		},
	},

	// todo hide these again
	ui: {
		// hide backend from non admins
		// isHidden: true,
		listView: {
			initialColumns: [
				"eventStart",
				"eventSummary",
				"holder",
				"email",
				"status",
			],
			// initialSort: { field: 'eventStart', direction: 'ASC'}
		},
		//? can't get holderId to work
		// labelField: `email`,
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "ticket"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		eventSummary: virtual({
			field: graphql.field({
				type: graphql.String,
				async resolve(item: any, args, context) {
					const event = (await context.query.Event.findOne({
						where: { id: item.eventId || "" },
						query: `
              summary
            `,
					})) as Event
					return event.summary
				},
			}),
		}),
		eventStart: virtual({
			field: graphql.field({
				type: graphql.DateTime,
				async resolve(item, args, context) {
					const event = (await context.query.Event.findOne({
						where: { id: item.eventId || "" },
						query: `
              start
            `,
					})) as Event
					return new Date(event.start)
				},
			}),
		}),
		email: text(),
		orderIndex: virtual({
			field: graphql.field({
				type: graphql.String,
				async resolve(item, args, context) {
					// if (!item.orderItemId) return "1 of 1"

					//? doesn't account for tickets that are spread over multi orders
					// const orderItemTickets = await context.sudo().db.Ticket.findMany({
					// 	where: { orderItem: { id: { equals: item.orderItemId } } },
					// })

					//? guarentiees to show all user's tickets purchased for event reguardless of diff orders
					const userTicketsByEvent = await context.sudo().db.Ticket.findMany({
						where: {
							holder: { id: { equals: item.holderId } },
							event: { id: { equals: item.eventId } },
						},
					})

					const thisTixIndex = userTicketsByEvent.findIndex(
						(tix) => tix.id === item.id
					)

					if (!userTicketsByEvent) return "1 of 1"

					return `${thisTixIndex + 1} of ${userTicketsByEvent.length}`
				},
			}),
		}),
		// price: integer({ validation: { isRequired: true }, defaultValue: 0 }),
		price: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {
					const event = (await context.query.Event.findOne({
						where: { id: item.eventId },
						query: `
              price
            `,
					})) as Event

					// TODO apply coupons.
					//! this won't work when wrestling with % vs number coupons
					return event.price
				},
			}),
		}),
		status: select({
			options: [
				{ label: "Pending", value: "PENDING" },
				{ label: "Paid", value: "PAID" },
				// better way of saying `FREE`
				{ label: "RSVP", value: "RSVP" },
				{ label: "Unpaid", value: "UNPAID" },
				{ label: "Attended", value: "ATTENDED" },
				{ label: "Canceled", value: "CANCELED" },
				{ label: "Rejected", value: "REJECTED" },
				{ label: "Past", value: "PAST" },
			],
			defaultValue: "PENDING",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
		}),
		event: relationship({
			ref: "Event.tickets",
			many: false,
			ui: {
				// itemView: { fieldMode: permissions.canManageTickets ? "edit": "read" },
				inlineConnect: true,
				displayMode: "cards",
				cardFields: ["summary", "start", "location"],
			},
		}),
		holder: relationship({
			ref: "User.tickets",
			many: false,
		}),
		// order: relationship({ ref: "Order.ticketItems" }),
		dateCreated: timestamp({
      defaultValue: { kind: "now" },
			ui: { itemView: { fieldMode: "read" } },
		}),
		dateModified: timestamp({
      defaultValue: { kind: "now" },
			ui: { itemView: { fieldMode: "read" } },
		}),
    orderItem: relationship({ ref: "OrderItem.tickets", many: false, ui: {itemView: { fieldMode: 'read'}} }),
	},

	hooks: {
		beforeOperation: async ({ operation, resolvedData, context, item }) => {
			if (operation === "create") {
				// if event has started, don't allow purchase of ticket

				if (!resolvedData.event?.connect?.id)
					throw new Error("!!! No Event selected for ticket")

				const event = await context.db.Event.findOne({
					where: { id: resolvedData.event.connect.id },
				})

				validateTicketEvent(event)
			}

			// TODO prob don't need to worry. canManageTickets only allows hosts or admin to update tickets
			if (operation === "update") {
				//? causes probs. So i only allow hosts and admin to update tickets
				// if (item.status === "ATTENDED") {
				// 	throw new Error(
				// 		`!!! This ticket has already been redeemed: ${item.id}`
				// 	)
				// }

				if (!resolvedData.event?.connect?.id && !item.eventId)
					throw new Error("!!! No Event selected for ticket")

				const event = await context.db.Event.findOne({
					where: { id: resolvedData.event?.connect?.id || item.eventId },
				})

				validateTicketEvent(event)
			}
		},
	},
})

function validateTicketEvent(event: Lists.Event.Item | null) {
	if (!event) throw new Error("!!! Event not found for Ticket")

	if (
		process.env.SEED_EXTRACT_NONE === "seed" &&
		process.env.NODE_ENV === "development"
	)
		return

	const now = new Date()
	const eventStart = new Date(event.start)
	if (now > eventStart)
		throw new Error("!!! Ticket: cannot create if Event already started")

	if (!["ACTIVE", "POSTPONED"].includes(event.status))
		throw new Error("Event is not active. Tickets not available for purchase")
}
