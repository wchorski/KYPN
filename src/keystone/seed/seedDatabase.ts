import type {
	Lists,
	Context,
	UserCreateInput,
	TicketCreateInput,
} from ".keystone/types"
import {
	user_seeddata,
	roles_seedjson,
	categories_seedjson,
	pages_seeddata,
	posts_seedjson,
	tags_seedjson,
	announcements_seed,
	services_seed,
	addons_seed,
	locations_seed,
	bookings_seedjson,
	events_seedjson,
} from "./seed_data"
import { Announcement, Service } from "../types"
import { dateAdjuster } from "../../lib/dateCheck"

import allDataJson from "./extracted/extData.json"

const seedSchemaItems = async (
	schemaType: string,
	compairKey: string,
	seedJson: any[],
	context: Context
) => {
	const { db: sudoDB } = context.sudo()

	//@ts-ignore
	const itemsAlreadyInDatabase = await sudoDB[schemaType].findMany({
		where: {
			[compairKey]: {
				// @ts-ignore
				in: seedJson.flatMap((item) => item[compairKey]) as string[],
			},
		},
	})

	const itemsToCreate = seedJson.filter(
		(item) =>
			!itemsAlreadyInDatabase.some(
				(prevItem: any) => prevItem[compairKey] === item[compairKey]
			)
	)

	//? remove id as new database will create new ids
	itemsToCreate.forEach((item) => {
		delete item.id
	})

	//@ts-ignore
	const createdItems = await sudoDB[schemaType].createMany({
		data: itemsToCreate.map((item) => ({
			...item,

			//? DOCUMENT field Type (rich text)
			...(item.content ? { content: item.content.document } : {}),
			...(item.description ? { description: item.description.document } : {}),
			...(item.details ? { description: item.description.document } : {}),

			//? relation TO ONE
			...(item.password
				? { password: item.email + process.env.SEED_PASSWORD_SECRET }
				: {}),
			...(item.role ? { role: { connect: { name: item.role.name } } } : {}),
			...(item.author
				? {
						author: { connect: { email: item.author.email } },
				  }
				: {}),
			...(item.location
				? {
						location: { connect: { address: item.location.address } },
				  }
				: {}),

			//? relation TO MANY
			...(item.locations
				? {
						locations: {
							connect: item.locations?.map((field: any) => ({
								address: field.address,
							})),
						},
				  }
				: {}),
			...(item.coupons
				? {
						coupons: {
							connect: item.coupons?.map((field: any) => ({
								name: field.name,
							})),
						},
				  }
				: {}),
			...(item.addons
				? {
						addons: {
							connect: item.addons?.map((field: any) => ({
								name: field.name,
							})),
						},
				  }
				: {}),
			//? USERS Start
			...(item.privateAccess
				? {
						privateAccess: {
							connect: item.privateAccess?.map((field: any) => ({
								email: field.email,
							})),
						},
				  }
				: {}),
			...(item.employees
				? {
						employees: {
							connect: item.employees?.map((field: any) => ({
								email: field.email,
							})),
						},
				  }
				: {}),
			...(item.hosts
				? {
						hosts: {
							connect: item.hosts?.map((field: any) => ({
								email: field.email,
							})),
						},
				  }
				: {}),
			...(item.cohosts
				? {
						cohosts: {
							connect: item.cohosts?.map((field: any) => ({
								email: field.email,
							})),
						},
				  }
				: {}),
			// USERS End
			...(item.categories
				? {
						categories: {
							connect: item.categories?.map((field: any) => ({
								name: field.name,
							})),
						},
				  }
				: {}),
			...(item.tags
				? {
						tags: {
							connect: item.tags?.map((field: any) => ({ name: field.name })),
						},
				  }
				: {}),
		})),
	})

	createdItems.map((item: any) => {
		console.log(` + ${schemaType}: ` + item[compairKey])
	})

  // TODO this automates bookings, but i'd rather just save each item individually to `json` and build one at time
	if (schemaType === "Service") seedBookings(createdItems, context)
  //? I must auto create tickets based off events because Event and Ticket have no `unique` fields
  if (schemaType === "Event") await seedTicketOrders(createdItems, context)
}

export const seedDatabase = async (context: Context) => {
	console.log(`🌱🌱🌱 Seeding database 🌱🌱🌱`)
	await seedSchemaItems("Role", "name", allDataJson.roles, context)
	await seedSchemaItems("User", "name", allDataJson.users, context)
	await seedSchemaItems("Category", "name", allDataJson.categories, context)
	await seedSchemaItems("Tag", "name", allDataJson.tags, context)
	await seedSchemaItems("Page", "title", allDataJson.pages, context)
	await seedSchemaItems("Post", "title", allDataJson.posts, context)
	await seedSchemaItems(
		"Announcement",
		"link",
		allDataJson.announcements,
		context
	)

	await seedSchemaItems("Location", "address", allDataJson.locations, context)
	await seedSchemaItems("Addon", "name", allDataJson.addons, context)
	await seedSchemaItems("Service", "name", allDataJson.services, context)

	await seedSchemaItems("Event", "summary", allDataJson.events, context)

	console.log(`🌲🌲🌲 Seeding complete 🌲🌲🌲`)
}

async function seedBookings(services: Lists.Service.Item[], context: Context) {
	const { db: sudoDB } = context.sudo()

  const fakeEmployees = [
    // {email: "eddy@tawtaw.site"},
    {email: "admin@tawtaw.site"},
  ]

  // TODO hook this into orders like how seedTicketOrders does it
	const itemsCreated = await sudoDB.Booking.createMany({
		data: services.map((item) => ({
      start: "2024-11-13T00:29:07.546Z",
      end: "2024-11-13T05:29:07.546Z",
			service: { connect: { id: item.id } },
			location: { connect: { address: allDataJson.locations[0].address } },
			customer: { connect: { email: "admin@tawtaw.site" } },
			addons: { connect: allDataJson.addons.map((adn) => ({ name: adn.name })) },
			employees: {
				connect: fakeEmployees.map((emp) => ({ email: emp.email })),
			},
		})),
	})

	itemsCreated.map((item) => {
		console.log(" + Booking: " + item.name + " | " + item.serviceId)
	})
}

async function seedTicketOrders(events: Lists.Event.Item[], context: Context) {
	// throw new Error('🐸 seedTicketOrders find out how to do this')
	const { db: sudoDB } = context.sudo()

	const fakeEmail = "admin@tawtaw.site"
	const orderStatuses = ["PAYMENT_RECIEVED", "REQUESTED"]
	// todo hook this into `tixToOrder`. not really worth it to figure out rn
	const tixQuantity = 2

	await Promise.all(
		events.map(async (event) => {
			const tickets: TicketCreateInput[] = Array.from(
				{ length: tixQuantity },
				(_, index) => ({
					event: { connect: { id: event.id } },
					holder: { connect: { email: "admin@tawtaw.site" } },
					email: "admin@tawtaw.site",
				})
			)

			const order = await sudoDB.Order.createOne({
				// const order = await context.withSession(session).db.Order.createOne({
				data: {
					total: (event.price || 0) * tixQuantity,
					// stripeCheckoutSessionId: null,
					// stripePaymentIntent: null,
					email: fakeEmail,
					status: orderStatuses[0],
					ticketItems: { create: tickets },
					user: { connect: { email: fakeEmail } },
				},
			})

			//? dev cheat to simulate even that becomes a past event because tickets are not allowed to be create on past events
			if (event.summary.startsWith("PAST: ")) {
				await sudoDB.Event.updateOne({
					where: { id: event.id },
					data: {
						start: dateAdjuster(event.start, { months: -1 }),
						end: dateAdjuster(event.end, { months: -1 }),
						status: "PAST",
					},
				})
			}

			console.log(
				` + Ticket Ordered for Event: ${event.summary}, total: ${order.total}`
			)
		})
	)
}
