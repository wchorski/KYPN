// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from "@keystone-6/core"
import type { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"

import {
	calcEndTime,
	dateCheckAvail,
	dateOverlapCount,
	dayOfWeek,
} from "../../lib/dateCheck"
import { dateToISOTimezone } from "../../lib/dateFormatter"
import type { Location, User } from "../types"
import type { Context } from ".keystone/types"

const now = new Date().toISOString()

export const bookAService = (base: BaseSchemaMeta) =>
	graphql.field({
		// type: base.object("Booking"),
		//? this needs to return as CartItem to be added to frontend shopping cart
		type: base.object("CartItem"),

		args: {
			// bookingId: graphql.arg({ type: graphql.String }),
			serviceId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			locationId: graphql.arg({ type: graphql.String }),
			addonIds: graphql.arg({ type: graphql.list(graphql.String) }),
			employeeId: graphql.arg({ type: graphql.String }),
			customerId: graphql.arg({ type: graphql.String }),
			// start: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			date: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			time: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			timeZone: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			address: graphql.arg({ type: graphql.String }),
			name: graphql.arg({ type: graphql.String }),
			email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			phone: graphql.arg({ type: graphql.String }),
			notes: graphql.arg({ type: graphql.String }),
			amount_total: graphql.arg({ type: graphql.Int }),
		},

		async resolve(source, variables, context: Context) {
			const {
				serviceId,
				locationId,
				addonIds,
				employeeId,
				customerId,
				email,
				name,
				phone,
				notes,
				// start,
				date,
				time,
				timeZone,
				address,
			} = variables

			// const session = await getServerSession(nextAuthOptions)
			// if(!session) throw new Error('no session for bookAService')

			const { sudo: sudoContext } = context
			let description = ""
			// const start = new Date(date + "T" + time).toISOString()

			const start = dateToISOTimezone(date, time, timeZone)
			console.log("mut: after dateToISOTimezone", { start })

			// SERVICE
			// const service = await context.withSession(session).query.Service.findOne({
			const service = await context.query.Service.findOne({
				where: { id: serviceId },
				query: `
          id
          name
          durationInHours
          price
          buisnessDays
        `,
			})

			if (!service) throw Error("!!! bookAService: No service found")

			description += "SERVICE: " + service?.name + " \n"

			const end = calcEndTime(start, service.durationInHours)

			// const day = new Date(start).getDay()
			const day = new Date(start).getDay()
			if (!service.buisnessDays?.includes(day))
				throw new Error(`CONFLICT: Service not allowed on ${dayOfWeek(day)}s`)

			// Location
			if (locationId) {
				const selectedLocation = (await sudoContext().query.Location.findOne({
					where: { id: locationId },
					query: `
			      name
			      rooms
			      bookings {
			        start
			        end
			      }
			    `,
				})) as Location
				if (selectedLocation) {
					// check to see if this booking's start/end lands on any of the gig's start/end
					const gig = {
						start: start,
						end: end,
					}
					const overlapCount = dateOverlapCount(gig, selectedLocation.bookings)

					// check to see if # of bookings is more than # of rooms avail
					// TODO remove `|| 1` because I made it required in schema
					if (overlapCount > (selectedLocation.rooms || 1)) {
						throw new Error(
							`Location ${selectedLocation.name} is fully booked up for this date and time: ${selectedLocation.rooms}  \n\n`
						)
					}

					description += "LOCATION: " + selectedLocation.name + " \n"
				}
			}

			// Employee Availability
			if (employeeId) {
				// todo querying all 'gigs' for an employee could be expensive down the line. how to filter gigs that 'end' after NOW?
				// maybe query gigs seperately?

				// todo just run a graphql query?
				const employeesThatHaveCurrentGigs = (await sudoContext().graphql.run({
					query: `
            query Query($where: UserWhereInput!, $gigsWhere: BookingWhereInput!, $availWhere: AvailabilityWhereInput!) {
              users(where: $where) {
                id
                name
                email
                availability(where: $availWhere) {
                  id
                  start
                  end
                  type
                  status
                  durationInHours
                }
                gigs(where: $gigsWhere) {
                  id
                  start
                  end
                  durationInHours
                }
              }
            }
          `,
					variables: {
						where: {
							id: {
								in: [employeeId],
							},
						},
						gigsWhere: {
							end: {
								gt: now,
							},
							status: {
								in: ["ACCEPTED", "HOLDING"],
							},
						},
						availWhere: {
							end: {
								gt: now,
							},
						},
					},
				})) as { users: User[] }

				const bookedEmployees = employeesThatHaveCurrentGigs.users

				let employeeNames = ""
				bookedEmployees.map((emp) => {
					if (dateCheckAvail(start, end, emp.availability))
						// console.log(`+++ Open Day no vaction set for ${emp.name}`)
						console.log("")
					else throw new Error(`!!! CONFLICT: vacation day for ${emp.name}`)

					if (dateCheckAvail(start, end, emp.gigs))
						// console.log(`+++ No Gigs yet set for ${emp.name}`)
						console.log("")
					else throw new Error(`!!! CONFLICT: double booking ${emp.name} `)

					employeeNames += emp.email + ", "
				})

				description += "EMPLOYEES: " + employeeNames + " \n"
			}

			// ADDONS
			const pickedAddons = await sudoContext().query.Addon.findMany({
				where: {
					OR: addonIds?.map((id) => ({ id: { equals: id } })),
				},
				query: `
			  price
			`,
			})

			// //TODO prices are virtual fields to service/event/product prices
			// PRICING
			// const addonsCombinedPrice = pickedAddons.reduce(
			// 	// @ts-ignore
			// 	(accumulator: number, currentValue: Addon) =>
			// 		accumulator + currentValue.price,
			// 	0
			// )
			// const priceTotal = service.price + addonsCombinedPrice

			console.log("mut: right before new booking", { start })
			// BOOKING
			const newBooking = await sudoContext().db.Booking.createOne({
				data: {
					// summary: `${customerName || customerEmail} | ${service?.name}`,
					service: { connect: { id: serviceId } },
					location: locationId ? { connect: { id: locationId } } : null,
					// employees: (employeeId) ? { connect: [{ id: employeeId }] } : null,
					employee_requests: employeeId
						? { connect: [{ id: employeeId }] }
						: null,
					addons:
						addonIds && addonIds.length > 0
							? { connect: addonIds?.map((id) => ({ id: id })) }
							: null,
					start: start,
					end: end,
					//? virtual field now
					// durationInHours: service.durationInHours,
					customer: customerId ? { connect: { id: customerId } } : null,
					name,
					email,
					phone,
					notes,
					status: serviceId && employeeId ? "REQUESTED" : "LEAD",
					address,
					timeZone,
					// google: calRes,
				},
			})

			const cartItem = await sudoContext().db.CartItem.createOne({
				// query: `
				//   id
				//   quantity
				//   type
				//   subTotal
				//   email
				//   booking {
				//     id
				//   }
				// `,
				data: {
					type: "SALE",
					...(email ? { email } : {}),
					...(customerId ? { user: { connect: { id: customerId } } } : {}),
					quantity: 1,
					// TODO create instead of connect booking here?
					booking: { connect: { id: newBooking.id } },
				},
			})

			// email sent via Schema file

			return {
				...cartItem,
				booking: newBooking,
			}
			// TODO i don't think it returns all this data? remove other stuff
			// return {
			// 	id: newBooking.id,
			// 	status: newBooking.status,
			// }
		},
	})
