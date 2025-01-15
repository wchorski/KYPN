import { graphql, list } from "@keystone-6/core"
// @ts-ignore
import type { Lists, Context } from ".keystone/types"
import { allowAll } from "@keystone-6/core/access"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { isLoggedIn, permissions, rules } from "../access"
import { Event } from "@ks/types"
import { datePrettyLocalDay } from "../../lib/dateFormatter"
import type { KeystoneContextFromListTypeInfo } from "@keystone-6/core/types"

export const Ticket: Lists.Ticket = list({
	// todo only employees of event are allowed to update
	// access: allowAll,
	access: {
		filter: {
			// query: () => true,
			query: rules.canManageTickets,
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
				async resolve(item: any, args, context) {
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
		qrcode: text(),
		email: text(),
		orderCount: text({ ui: { itemView: { fieldMode: "read" } } }),
		price: integer({ validation: { isRequired: true }, defaultValue: 0 }),
		chargeId: text(),
		status: select({
			options: [
				{ label: "Pending", value: "PENDING" },
				{ label: "Confirmed", value: "CONFIRMED" },
				{ label: "Paid", value: "PAID" },
				{ label: "Unpaid", value: "UNPAID" },
				{ label: "Attended", value: "ATTENDED" },
				{ label: "Canceled", value: "CANCELED" },
				{ label: "Rejected", value: "REJECTED" },
				{ label: "Past", value: "PAST" },
			],
			defaultValue: "PAID",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		event: relationship({
			ref: "Event.tickets",
			many: false,
      ui: {
        itemView: {fieldMode: 'read'},
        inlineConnect: false,
		    displayMode: 'cards',
		    cardFields: ['id', 'summary', 'start', 'location'],
		  }
		}),
		holder: relationship({
			ref: "User.tickets",
			many: false,
		}),
		order: relationship({ ref: "Order.ticketItems" }),
		coupons: relationship({ ref: "Coupon.tickets", many: true }),
		dateCreated: timestamp({ defaultValue: { kind: "now" } }),
		dateModified: timestamp({ defaultValue: { kind: "now" } }),
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
				if (!event) throw new Error("!!! Event not found for Ticket")

				const now = new Date()
				const eventStart = new Date(event.start)
				if (now > eventStart)
					throw new Error("!!! Ticket: Event has already started")
			}

			if (operation === "update") {
				if (item.status === "ATTENDED") {
					throw new Error(
						`!!! This ticket has already been redeemed: ${item.id}`
					)
				}
			}
		},
	},
})
