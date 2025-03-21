import { envs } from "../../../envs"
import { dateAdjuster } from "../../lib/dateCheck"
import allDataJson from "./extracted/seedData.json"
import type { Context, Lists, TicketCreateInput } from ".keystone/types"

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
	await seedSchemaItems("Booking", "secretNotes", allDataJson.bookings, context)

	await seedSchemaItems("Event", "summary", allDataJson.events, context)
	// seedTicketOrders creates "Ticket" items after Events are created

	await seedSchemaItems("Product", "name", allDataJson.products, context)
	await seedSchemaItems(
		"SubscriptionPlan",
		"name",
		allDataJson.subscriptionPlans,
		context
	)
	console.log(`🌲🌲🌲 Seeding complete 🌲🌲🌲`)
}

const seedSchemaItems = async (
	schemaType: string,
	compairKey: string,
	seedJson: any[],
	context: Context
) => {
	// console.log("### seedSchemaItems ###")
	// console.log({ schemaType })
	// console.log({ seedJson })
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

	if (
		schemaType === "Event" &&
		process.env.SEED_RANDOM_RELATIVE_DATES === "true"
	) {
		randoEventDates(itemsToCreate)
	}
	if (schemaType === "Booking") {
		itemsToCreate.forEach((item) => {
			//? virtual field
			delete item.summary
			delete item.durationInHours
			delete item.price
		})

		if (process.env.SEED_RANDOM_RELATIVE_DATES === "true") {
			randoEventDates(itemsToCreate)
		}
	}

	//? remove id as new database will create new ids
	itemsToCreate.forEach((item) => {
		delete item.id
	})
	console.log("### ### ###")
	console.log("### ### ###")
	console.log("### ### ###")
	console.log(schemaType)
	console.log({ itemsToCreate })
	console.log("### ### ###")
	console.log("### ### ###")
	console.log("### ### ###")

	const formattedItems = itemsToCreate.map((item) => ({
		...removeTopLevelEmptyArrays(item),

		//? DOCUMENT field Type (rich text)
		...(item.content ? { content: item.content.document } : {}),
		...(item.description ? { description: item.description.document } : {}),
		...(item.details ? { details: item.details.document } : {}),
		...(item.password
			? { password: item.email + envs.SEED_PASSWORD_SECRET }
			: {}),

		//? relation TO ONE
		...(item.role ? { role: { connect: { name: item.role.name } } } : {}),
		...(item.author
			? {
					author: { connect: { email: item.author.email } },
			  }
			: {}),
		...(item.customer
			? {
					customer: { connect: { email: item.customer.email } },
			  }
			: {}),
		...(item.location
			? {
					location: { connect: { address: item.location.address } },
			  }
			: {}),
		...(item.service
			? {
					service: { connect: { name: item.service.name } },
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
		...(item.addons?.length > 0
			? {
					addons: {
						connect: item.addons?.map((field: any) => ({
							name: field.name,
						})),
					},
			  }
			: //! Product.addons: Input error: You must provide "connect" or "create" in to-many relationship inputs for "create" operations.
			//! will this cause problems for other schemas?
			item.addons?.length === 0
			? {}
			: {}),
		// addons:null,
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
		...(item.employee_requests
			? {
					employee_requests: {
						connect: item.employee_requests?.map((field: any) => ({
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
		...(item.categories?.length > 0
			? {
					categories: {
						connect: item.categories?.map((field: any) => ({
							name: field.name,
						})),
					},
			  }
			: {}),
		...(item.tags?.length > 0
			? {
					tags: {
						connect: item.tags?.map((field: any) => ({ name: field.name })),
					},
			  }
			: {}),
	}))

	console.log({ formattedItems })

	//@ts-ignore
	const createdItems = await sudoDB[schemaType].createMany({
		data: formattedItems,
	})

	createdItems.map((item: any) => {
		console.log(` + ${schemaType}: ` + item[compairKey])
	})

	// if (schemaType === "Service") seedBookings(createdItems, context)
	//? I must auto create tickets based off events because Event and Ticket have no `unique` fields
	// if (schemaType === "Event") await seedTicketOrders(createdItems, context)
}

// ---

//? it works but for now I'm setting bookings strait from json
// async function seedBookings(services: Lists.Service.Item[], context: Context) {
// 	const { db: sudoDB } = context.sudo()

// 	const fakeEmployees = [
// 		// {email: "eddy@tawtaw.site"},
// 		{ email: "admin@tawtaw.site" },
// 	]

// 	// TODO hook this into orders like how seedTicketOrders does it
// 	const itemsCreated = await sudoDB.Booking.createMany({
// 		data: services.map((item) => ({
// 			start: "2024-11-13T00:29:07.546Z",
// 			end: "2024-11-13T05:29:07.546Z",
// 			service: { connect: { id: item.id } },
// 			location: { connect: { address: allDataJson.locations[0].address } },
// 			customer: { connect: { email: "admin@tawtaw.site" } },
// 			addons: {
// 				connect: allDataJson.addons.map((adn) => ({ name: adn.name })),
// 			},
// 			employees: {
// 				connect: fakeEmployees.map((emp) => ({ email: emp.email })),
// 			},
// 		})),
// 	})

// 	itemsCreated.map((item) => {
// 		console.log(" + Booking: " + item.name + " | " + item.serviceId)
// 	})
// }

// remove empty relational items like `categories` or `tags` and not conflict with list items that don't have matching ones
export function removeTopLevelEmptyArrays(
	obj: Record<string, any>
): Record<string, any> {
	return Object.fromEntries(
		Object.entries(obj).filter(
			([_, value]) => !Array.isArray(value) || value.length > 0
		)
	)
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
					// stripeCheckoutSessionId: null,
					// stripePaymentIntent: null,
					email: fakeEmail,
					status: orderStatuses[0],
					// ticketItems: { create: tickets },
					items: {
						create: [
							{
								quantity: tixQuantity,
								type: "SALE",
								subTotal: event.price,
								tickets: { create: tickets },
							},
						],
					},
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

			console.log(` + Ticket Ordered for Event: ${event.summary}`)
		})
	)
}

const dateAdjusterFuncsForEvent = (date: string) => [
	dateAdjuster(date, { days: 1 }),
	dateAdjuster(date, { months: -1 }),
	dateAdjuster(date, { days: 4 }),
	dateAdjuster(date, { months: 1 }),
	dateAdjuster(date, { days: -2 }),
]

type DateRange = {
	start: string
	end: string
	dateCreated: string
	dateModified: string
}

const randoEventDates = (items: DateRange[]) => {
	items.forEach((item, i: number) => {
		const adjustFuncs = dateAdjusterFuncsForEvent(item.start)

		const now = new Date()

		item.start = preserveTime(new Date(now), item.start)
		item.end = preserveTime(new Date(now), item.end)
		item.dateCreated = preserveTime(new Date(now), item.dateCreated)
		item.dateModified = preserveTime(new Date(now), item.dateModified)

		// Update start and end in place
		item.start = adjustFuncs[i % adjustFuncs.length]
		item.end = adjustFuncs[(i + 1) % adjustFuncs.length]
	})
}

const preserveTime = (baseDate: Date, targetTime: string): string => {
	const time = new Date(targetTime)
	baseDate.setHours(
		time.getHours(),
		time.getMinutes(),
		time.getSeconds(),
		time.getMilliseconds()
	)
	return baseDate.toISOString()
}
