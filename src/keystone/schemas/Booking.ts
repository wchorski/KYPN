// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-two-servers/keystone-server/src/seed/index.ts
// docs - https://github.com/keystonejs/keystone/blob/333152e620183f310be892f1c82fbf847b47ecae/examples/framework-nextjs-pages-directory/src/pages/index.tsx

import { graphql, list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import {
	decimal,
	integer,
	json,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"
import { componentBlocks } from "../blocks"
import { mailBooking } from "../../lib/mail"
import { User, Addon, Service, Coupon } from "../types"
import { calcDurationInHours, calcEndTime } from "../../lib/dateCheck"
import {
	createCalendarEvent,
	deleteCalendarEvent,
	updateCalendarEvent,
} from "../../lib/googleapi/calCreate"
import { isLoggedIn, permissions, rules } from "../access"
import { envs } from "../../../envs"
import { Decimal } from "@keystone-6/core/types"
import { allowAll } from "@keystone-6/core/access"

// const EMAIL_ADDRESS = 'y@m'

// const rightnow = new Date().toISOString()

export const Booking: Lists.Booking = list({
	access: {
		filter: {
			query: rules.canViewBookings,
			update: rules.canManageBookings,
			// delete: () => false,
		},
		operation: {
			create: permissions.canManageBookings,
			query: isLoggedIn,
			// query: permissions.canManageBookings,
			//? seems sketchy, but the filter handles security
			update: isLoggedIn,
			// update: permissions.canManageBookings,
			// delete: () => false,
			// TODO find a way where only Admin can delete (not customer or employee)
			delete: permissions.canManageBookings,
		},
	},

	ui: {
		// hide backend from non admins
		listView: {
			initialColumns: [
				"start",
				"end",
				"name",
				"email",
				"status",
				"service",
				"customer",
				"employees",
				"employee_requests",
			],
			initialSort: { field: "start", direction: "DESC" },
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "booking"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		//? may want to stick date and time as seperate values
		//? then turn start & end into virtual fields
		// date:
		// time:
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
		address: text({ ui: { description: "event venue's location" } }),
		summary: virtual({
			field: graphql.field({
				type: graphql.String,
				async resolve(item, args, context) {
					// if(!item.serviceId) return item.name
					const service = (await context.query.Service.findOne({
						where: { id: item.serviceId || "null" },
						query: `
              name
            `,
					})) as Service

					return `${item?.name || "Anonymous"} | ${
						service?.name || "No Service Selected"
					}`
				},
			}),
		}),
		durationInHours: virtual({
			field: graphql.field({
				type: graphql.Decimal,
				async resolve(item, args, context) {
					return new Decimal(calcDurationInHours(item.start, item.end))
				},
			}),
		}),

		// price: integer({ defaultValue: 0, validation: { isRequired: true } }),
		price: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {
					// if(!item.serviceId) return item.name
					const service = (await context.query.Service.findOne({
						where: { id: item.serviceId || "no_service" },
						query: `
              price
            `,
					})) as Service

          console.log(service);

					const addons = await context.query.Addon.findMany({
						where: {
							bookings: {
								every: {
									id: {
										equals: item.id,
									},
								},
							},
						},
						query: `
              price
            `,
					})

					const addonsPrice = addons.reduce((acc, item) => acc + item.price, 0)
					const subTotal = (service?.price || 0) + addonsPrice

					return subTotal
				},
			}),
		}),
		service: relationship({ ref: "Service.bookings", many: false }),
		location: relationship({ ref: "Location.bookings", many: false }),
		addons: relationship({ ref: "Addon.bookings", many: true }),
		employees: relationship({
			ref: "User.gigs",
			many: true,
		}),
		employee_requests: relationship({ ref: "User.gig_requests", many: true }),
		customer: relationship({ ref: "User.bookings", many: false }),
		email: text(),
		phone: text(),
		name: text(),
		status: select({
			options: [
				{ label: "Confirmed", value: "CONFIRMED" },
				{ label: "Postponed", value: "POSTPONED" },
				{ label: "Canceled", value: "CANCELED" },
				{ label: "Lead", value: "LEAD" },
				{ label: "Paid", value: "PAID" },
				{ label: "RSVP", value: "RSVP" },
				{ label: "Down Payment", value: "DOWNPAYMENT" },
				{ label: "Holding", value: "HOLDING" },
				{ label: "Requested", value: "REQUESTED" },
				{ label: "Declined", value: "DECLINED" },
			],
			defaultValue: "LEAD",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
		}),
		details: document({
			componentBlocks,
			ui: {
				views: "./src/keystone/blocks",
			},
			formatting: {
				inlineMarks: {
					bold: true,
					italic: true,
					underline: true,
					strikethrough: true,
					code: true,
					superscript: true,
					subscript: true,
					keyboard: true,
				},
				listTypes: {
					ordered: true,
					unordered: true,
				},
				alignment: {
					center: true,
					end: true,
				},
				headingLevels: [2, 3, 4, 5, 6],
				blockTypes: {
					blockquote: true,
					code: true,
				},
				softBreaks: true,
			},
			layouts: [
				[1, 1],
				[1, 1, 1],
				[2, 1],
				[1, 2],
				[1, 2, 1],
			],
			links: true,
			dividers: true,
		}),
		notes: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		secretNotes: text({
			ui: {
				description:
					"notes only visible between management and employees. NOT the customer",
				displayMode: "textarea",

				itemView: {
					fieldMode: ({ session, context, item }) =>
						permissions.canManageBookings({ session }) ? "edit" : "hidden",
				},
			},
			access: {
				read: ({ session, context, listKey, fieldKey, operation, item }) =>
					permissions.canManageBookings({ session }),
			},
		}),
		revision: integer({
			defaultValue: 0,
			validation: { isRequired: true },
			ui: {
				createView: {
					fieldMode: "hidden",
				},
			},
		}),
		orderItem: relationship({ ref: "OrderItem.booking", many: false }),
		dateCreated: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
		dateModified: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
		google: json(),
		//   {
		// 	defaultValue: {
		// 		id: "",
		// 		status: "",
		// 		kind: "",
		// 		htmlLink: "",
		// 	},
		// }
	},
	hooks: {
		beforeOperation: async ({ operation, resolvedData, context, item }) => {
			if (operation === "create") {
				// if (!resolvedData.service?.connect?.id || !resolvedData.service?.connect?.name)
				// 	throw new Error("!!! No Service selected for booking")

        // TODO move this to hooks:validate
				if (resolvedData.service?.connect?.id) {
					const service = await context.db.Service.findOne({
						where: { id: resolvedData.service.connect.id },
					})

					//@ts-ignore
					validateServiceStatusAndTime(resolvedData.start, service)
				}

				if (resolvedData.service?.connect?.name) {
					const service = await context.db.Service.findOne({
						where: { name: resolvedData.service.connect.name },
					})

					//@ts-ignore
					validateServiceStatusAndTime(resolvedData.start, service)
				}
			}

			if (operation === "update") {
				resolvedData.dateModified = new Date()
				resolvedData.revision = item.revision + 1
			}

			if (operation === "delete") {
				const employees = (await context.sudo().query.User.findMany({
					where: {
						gigs: {
							some: {
								id: {
									equals: item.id,
								},
							},
						},
					},
					query: `
            id
            name
            email
          `,
				})) as User[]

				const employeeEmails = employees.flatMap((emp) => emp.email)
				const employeeNames = employees.flatMap((emp) => emp.name)

				const mail = await mailBooking({
					to: [envs.ADMIN_EMAIL_ADDRESS, item?.email, ...employeeEmails].filter(
						(email) => email
					) as string[],
					operation,
					employeeNames,
					// @ts-ignore
					booking: item,
				})

				// @ts-ignore
				if (!item?.google?.id) return console.log("!!! no google cal id")
				// @ts-ignore
				const calResponse = await deleteCalendarEvent(item.google.id)
			}
		},
		afterOperation: async ({ operation, resolvedData, item, context }) => {
			if (operation === "create") {
				const { calSummary, calDescription, calStart, calEnd } =
					await handleCalendarDetails(item, context)

				// Calendar
				const calRes = await createCalendarEvent({
					summary: calSummary,
					description: calDescription,
					start: {
						dateTime: calStart,
						timeZone: item.timeZone,
					},
					end: {
						dateTime: calEnd,
						timeZone: item.timeZone,
					},
				})
				if (!calRes) return
				// console.log('### booking afteropt create calRes, ', calRes);
				const updateBooking = await context.sudo().query.Booking.updateOne({
					//@ts-ignore
					where: { id: item.id || "no_booking_id" },
					data: {
						//@ts-ignore
						google: calRes,
					},
				})
				// resolvedData.secretNotes = '### SUPER SECRET NOTE DEFAULT'
				// if(!calRes) return
				// resolvedData.google = calRes
			}

			if (operation === "create" || operation === "update") {
				const employees = (await context.sudo().query.User.findMany({
					where: {
						gigs: {
							some: {
								id: {
									equals: item.id,
								},
							},
						},
					},
					query: `
            id
            name
            email
          `,
				})) as User[]

				// console.log('### booking schema afterOpt: ')
				// console.log(JSON.stringify(item, null, 2));
				// if(item.status !== 'CANCELED' && employees.length <= 0){
				//   resolvedData.status = 'HOLD'
				//   // const statusUpdate =await context.sudo().query.Booking.updateOne({
				//   //   where: {id: item.id},
				//   //   data:{
				//   //     status: 'HOLD'
				//   //   }
				//   // })
				//   console.log(JSON.stringify(resolvedData, null, 2));
				// }

				const service = (await context.sudo().query.Service.findOne({
					where: { id: item?.serviceId || "null" },
					query: `
            id
            name
          `,
				})) as Service | undefined

				const employeeEmails = employees.flatMap((emp) => emp.email)
				const employeeNames = employees
					.flatMap((emp) => emp.name)
					.filter((name) => name)

				const mail = await mailBooking({
					to: [envs.ADMIN_EMAIL_ADDRESS, item?.email || "", ...employeeEmails],
					operation,
					employeeNames,
					// @ts-ignore
					booking: {
						...item,
						service,
					},
				})
			}

			if (operation === "update") {
				// @ts-ignore
				if (!item?.google?.id) return
				const calResponse = await handleCalendarUpdate(item, context)

				if (!calResponse) return
				resolvedData.google = calResponse
				// console.log("## booking afteropt resolvedData: ", resolvedData);
			}
		},
	},
})

async function handleCalendarUpdate(item: any, context: any) {
	const { calDescription, calSummary, calStart, calEnd } =
		await handleCalendarDetails(item, context)

	const calRes = await updateCalendarEvent(item.google.id, {
		summary: calSummary,
		description: calDescription,
		start: {
			dateTime: calStart,
			timeZone: item.timeZone,
		},
		end: {
			dateTime: calEnd,
			timeZone: item.timeZone,
		},
	})

	return calRes
}

async function handleCalendarDetails(item: any, context: any) {
	const selectedBooking = await context.query.Booking.findOne({
		where: { id: item.id },
		query: `
      summary
      start
      end
      notes
      status
      name
      email
      phone
      service {
        name
        durationInHours
      }
      employees{
        name
        email
      }
      addons {
        name
      }
    `,
	})

	let calDescription = ""

	calDescription +=
		"CLIENT: " +
		selectedBooking?.name +
		" | " +
		selectedBooking?.email +
		" | " +
		selectedBooking?.phone +
		"\n"
	calDescription += "STATUS: " + selectedBooking.status + " \n"
	calDescription +=
		"SERVICE: " + selectedBooking.service?.name ||
		"No Service Selected" + " \n\n"
	calDescription +=
		"ADDONS: \n" +
		selectedBooking?.addons
			?.map((addon: Addon) => "  - " + addon.name)
			.join(", \n") +
		" \n"
	calDescription +=
		"STAFF: \n" +
		selectedBooking?.employees
			?.map((emp: User) => "  - " + emp.email)
			.join(", \n") +
		" \n\n"
	calDescription += "NOTES: " + selectedBooking.notes + "\n"
	calDescription += "URL: " + envs.FRONTEND_URL + `/bookings/${item.id}`

	const calSummary = selectedBooking.summary
	// const calSummary =
	// 	selectedBooking.name ||
	// 	"anonymous" + " | " + selectedBooking.service?.name ||
	// 	"No Service Selected"

	const calcEnd = calcEndTime(
		selectedBooking.start,
		selectedBooking.service?.durationInHours
	)
	return {
		calSummary,
		calDescription,
		calStart: selectedBooking.start,
		calEnd: selectedBooking.end || calcEnd,
	}
}

function validateServiceStatusAndTime(
	start: string,
	service: Lists.Service.Item | null
) {
	if (!service) throw new Error("!!! Service not found for Booking")

	if (
		process.env.SEED_EXTRACT_NONE === "seed" &&
		process.env.NODE_ENV === "development"
	)
		return

	const now = new Date()
	const bookingStart = new Date(start)
	if (bookingStart < now)
		throw new Error("!!! Booking: cannot create if a booking in the past")

	if (!["PUBLIC", "PRIVATE"].includes(service.status))
		throw new Error(`!!! Service is not active. Booking is not allowed`)
}
