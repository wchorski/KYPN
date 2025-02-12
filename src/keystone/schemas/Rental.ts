// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-two-servers/keystone-server/src/seed/index.ts
// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-pages-directory/src/pages/index.tsx

import { graphql, list } from "@keystone-6/core"
// @ts-ignore
import type { Lists } from ".keystone/types"
import { allowAll } from "@keystone-6/core/access"
import {
	checkbox,
	decimal,
	integer,
	json,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { mailBooking } from "../../lib/mail"
import { User, Addon, Service, Location } from "../types"
import {
  calcDaysBetweenTimestamps,
	calcDurationInHours,
	calcEndTime,
	dateCheckAvail,
	dateOverlapCount,
	dayOfWeek,
} from "../../lib/dateCheck"
import {
	createCalendarEvent,
	deleteCalendarEvent,
	updateCalendarEvent,
} from "../../lib/googleapi/calCreate"
import { datePrettyLocal } from "../../lib/dateFormatter"
import { isLoggedIn, permissions, rules } from "../access"
import { envs } from "../../../envs"
import { Decimal } from "@keystone-6/core/types"

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1 // add 1 because getMonth() returns zero-based index
const day = now.getDate()
const today = `${year}-${month < 10 ? "0" + month : month}-${
	day < 10 ? "0" + day : day
}`

export const Rental: Lists.Rental = list({
	access: allowAll,
	// access: {
	//   filter: {
	//     query: () => true,
	//     update: rules.canManageBookings,
	//     delete: rules.canManageBookings,
	//   },
	//   operation: {
	//     create: () => true,
	//     query: () => true,
	//     update: isLoggedIn,
	//     delete: isLoggedIn,
	//   }
	// },

	ui: {
		// hide backend from non admins
		listView: {
			initialColumns: ["start", "days", "customer", "status", "address"],
			initialSort: { field: "start", direction: "DESC" },
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "rental"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		start: timestamp({ validation: { isRequired: true } }),
		end: timestamp({ validation: { isRequired: true } }),
    timeZone: select({
			validation: { isRequired: true },
			options: envs.TIMEZONES.map((tz) => ({ label: tz, value: tz })),
			defaultValue: envs.TIMEZONES[0],
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
				description: "event venue's time zone",
			},
		}),
		// summary: text({validation: { isRequired: true }, defaultValue: '[NEW BOOKING]'}),
		summary: virtual({
			field: graphql.field({
				type: graphql.String,
				async resolve(item, args, context) {
					const customer = (await context.query.User.findOne({
						where: { id: item.customerId || "" },
						query: `
              name
            `,
					})) as User
					return customer.name + " | " + item.start + " | " + calcDaysBetweenTimestamps(item.start, item.end)
				},
			}),
		}),
		durationInHours: virtual({
			field: graphql.field({
				type: graphql.Decimal,
				async resolve(item) {
					return new Decimal(calcDurationInHours(item.start, item.end))
				},
			}),
		}),
		days: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item) {
					return calcDaysBetweenTimestamps(item.start, item.end)
				},
			}),
		}),
		address: text({ validation: { isRequired: true } }),
		delivery: checkbox(),
		// TODO, make this a virtual and .reduce `orderItems` that are Rentals
		price: integer({
			defaultValue: 0,
			validation: { 
        // isRequired: true, 
        min: 0 
      },
		}),
    // price: virtual({
		// 	field: graphql.field({
		// 		type: graphql.Int,
		// 		async resolve(item, context) {
    //       const orderItems = await context.db.OrderItems.query({
    //         where: 
    //       })
		// 			return 0
		// 		},
		// 	}),
		// }),
		email: text(),
		phone: text(),
		name: text(),
		notes: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		// cartItems: relationship({ ref: 'CartItem.rentals', many: true }),
		order: relationship({ ref: "Order.rental", many: false }),
		addons: relationship({ ref: "Addon.rentals", many: true }),
		// employees: relationship({ ref: 'User.gigs', many: true }),
		customer: relationship({ ref: "User.rentals", many: false }),
		status: select({
			options: [
				{ label: "Active", value: "ACTIVE" },
				{ label: "Postponed", value: "POSTPONED" },
				{ label: "Canceled", value: "CANCELED" },
				{ label: "Lead", value: "LEAD" },
				{ label: "payment pending", value: "PAYMENT_PENDING" },
				{ label: "Down Payment", value: "DOWNPAYMENT" },
				{ label: "payment recieved", value: "PAYMENT_RECIEVED" },
				{ label: "refunded", value: "REFUNDED" },
				{ label: "returned", value: "RETURNED" },
				{ label: "fulfilled", value: "FULFILLED" },
				{ label: "shipped", value: "SHIPPED" },
				{ label: "delivered", value: "DELIVERED" },
				{ label: "Hold", value: "HOLD" },
				{ label: "requested", value: "REQUESTED" },
			],
			defaultValue: "LEAD",
			validation: { isRequired: true },
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		dateCreated: timestamp({ defaultValue: { kind: "now" } }),
		dateModified: timestamp({ defaultValue: { kind: "now" } }),
		google: json({
			defaultValue: {
				id: "",
				status: "",
				kind: "",
				htmlLink: "",
			},
		}),
	},
  hooks: {
    validate: {
      create: async({resolvedData}) => {
        if(!resolvedData.customer?.connect?.id) throw new Error('!!! Rental must have connected Customer')
      }
    }
  }
})
