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
import { Announcement} from "../types"
import { dateAdjuster } from "../../lib/dateCheck"

const seedUsers = async (context: Context) => {
	const { db } = context.sudo()
	const seedUsers = user_seeddata
	const usersAlreadyInDatabase = await db.User.findMany({
		where: {
			email: {
				in: seedUsers.map((user) => user.email) as string[],
			},
		},
	})
	const usersToCreate = seedUsers.filter(
		(seedUser) =>
			!usersAlreadyInDatabase.some(
				(u: UserCreateInput) => u.email === seedUser.email
			)
	)

	usersToCreate.map((obj) => {
		console.log(" + USER: " + obj.name)
	})

	await db.User.createMany({
		data: usersToCreate,
	})
}

const seedBookings = async (context: Context) => {
	const { db: sudoDB } = context.sudo()
	const itemsAlreadyInDatabase = await sudoDB["Booking"].findMany({
		where: {
			start: {
				in: bookings_seedjson.flatMap((item) => item.start) as string[],
			},
		},
	})

	const itemsToCreate = bookings_seedjson.filter(
		(item) =>
			!itemsAlreadyInDatabase.some(
				(prevItem) => prevItem.start.toISOString() === item.start
			)
	)

	itemsToCreate.map((item) => {
		console.log(" + Booking: " + item.name + " | " + item.service?.name)
	})

	await sudoDB["Booking"].createMany({
		data: itemsToCreate.map((item) => ({
			...item,
			service: { connect: { name: item.service?.name } },
			location: { connect: { name: item.location?.name } },
			customer: { connect: { email: item.customer?.email } },
			addons: { connect: item.addons?.map((adn) => ({ slug: adn.slug })) },
			employees: {
				connect: item.employees?.map((emp) => ({ email: emp.email })),
			},
		})),
	})

	// await db.Post.createMany({
	// 	data: postsToCreate.map((obj) => ({
	// 		...obj,
	// 		//? makes it easier to copy and paste res json from Apollo Sandbox
	// 		content: obj?.content?.document,
	// 		categories: { connect: obj?.categories },
	// 		tags: { connect: obj?.tags },
	// 		author: { connect: obj?.author },
	// 	})),
	// })
}

// const seedAvail = async (context: Context) => {
// 	const { db } = context.sudo()
// 	const seedObjs: any[] = avail_seedjson
// 	const objsAlreadyInDatabase = await db.Availability.findMany({
// 		where: {
// 			// @ts-ignore
// 			start: { in: seedObjs.map((obj) => obj.start) },
// 		},
// 	})
// 	const objsToCreate = seedObjs.filter(
// 		(seedObj) =>
// 			!objsAlreadyInDatabase.some((obj: any) => obj.start === seedObj.start)
// 	)

// 	objsToCreate.map((obj) => {
// 		console.log(" + Avail: " + obj.start)
// 	})

// 	await db.Availability.createMany({
// 		data: objsToCreate,
// 	})
// }

const seedRoles = async (context: Context) => {
	const { db } = context.sudo()

	const seedRoles = roles_seedjson

	const objsAlreadyInDatabase = await db.Role.findMany({
		where: {
			name: {
				in: seedRoles.map((i) => i.name) as
					| string
					| readonly string[]
					| null
					| undefined,
			},
		},
	})
	const itemsToCreate = seedRoles.filter(
		(seedRole) =>
			!objsAlreadyInDatabase.some((u: any) => u.name === seedRole.name)
	)

	itemsToCreate.map((obj) => {
		console.log(" + Role: " + obj.name)
	})

	await db.Role.createMany({
		data: itemsToCreate,
	})
}

// seed posts and connect with users
const seedPosts = async (context: Context) => {
	const { db } = context.sudo()
	const postsAlreadyInDatabase = await db.Post.findMany({
		where: {
			slug: { in: posts_seedjson.map((post) => post.slug) as string[] },
		},
	})

	const postsToCreate = posts_seedjson.filter(
		//? makes it easier to copy and paste res json from Apollo Sandbox
		// @ts-ignore
		(seedPost) => !postsAlreadyInDatabase.some((p) => p.slug === seedPost.slug)
	)

	postsToCreate.map((obj) => {
		console.log(" + Post: " + obj.slug)
	})

	await db.Post.createMany({
		data: postsToCreate.map((obj) => ({
			...obj,
			//? makes it easier to copy and paste res json from Apollo Sandbox
			content: obj?.content?.document,
			categories: { connect: obj?.categories },
			tags: { connect: obj?.tags },
			author: { connect: obj?.author },
		})),
	})
}

const seedTags = async (context: Context) => {
	const { db } = context.sudo()
	const seedObjects = tags_seedjson
	const objectsAlreadyInDatabase = await db.Tag.findMany({
		where: {
			name: {
				in: seedObjects.map((obj) => obj.name) as
					| string
					| readonly string[]
					| null
					| undefined,
			},
		},
	})
	const objsToCreate = seedObjects.filter(
		//@ts-ignore
		(seedObj) =>
			!objectsAlreadyInDatabase.some((dbObj) => dbObj.name === seedObj.name)
	)

	objsToCreate.map((obj) => {
		console.log(" + Tag: " + obj.name)
	})

	await db.Tag.createMany({
		data: objsToCreate.map((obj) => ({ ...obj })),
	})
}

const seedCategories = async (context: Context) => {
	const { db } = context.sudo()
	const seedObjects = categories_seedjson
	const objectsAlreadyInDatabase = await db.Category.findMany({
		where: {
			name: {
				in: seedObjects.map((obj) => obj.name) as
					| string
					| readonly string[]
					| null
					| undefined,
			},
		},
	})
	const objsToCreate = seedObjects.filter(
		//? makes it easier to copy and paste req json from Apollo Sandbox
		//@ts-ignore
		(seedObj) =>
			!objectsAlreadyInDatabase.some((dbObj) => dbObj.name === seedObj.name)
	)

	objsToCreate.map((obj) => {
		console.log(" + Category: " + obj.name)
	})

	await db.Category.createMany({
		data: objsToCreate.map((obj) => ({ ...obj })),
	})
}

// const seedProducts = async (context: Context) => {
//   const { db } = context.sudo();
//   const seedObjects: any[] = products_seed;
//   const objectsAlreadyInDatabase = await db.Product.findMany({
//     where: {
//       slug: { in: seedObjects.map(obj => obj.slug) },
//     },
//   })

//   const objsToCreate = seedObjects.filter(
//     //@ts-ignore
//     seedObj => !objectsAlreadyInDatabase.some((p:Product) => p.slug === seedObj.slug)
//   );

//   objsToCreate.map(obj => {
//     console.log(" + Product: " + obj.slug)
//   })

//   await db.Product.createMany({
//     data: objsToCreate.map(obj => ({ ...obj })),
//   });
// };

// const seedSubscriptions = async (context: Context) => {
//   const { db } = context.sudo();
//   const seedObjects: any[] = subscriptionPlans_seedjson;
//   const objectsAlreadyInDatabase = await db.SubscriptionPlan.findMany({
//     where: {
//       slug: { in: seedObjects.map(obj => obj.slug) },
//     },
//   });
//   const objsToCreate = seedObjects.filter(
//     seedObj => !objectsAlreadyInDatabase.some((p: any) => p.slug === seedObj.slug)
//   );

//   objsToCreate.map(obj => {
//     console.log(" + SubPlan: " + obj.slug)
//   })

//   await db.SubscriptionPlan.createMany({
//     data: objsToCreate.map(obj => ({ ...obj })),
//   });
// };

//TODO use this as template for other seedITEMS. maybe DRY it up
const seedEvents = async (context: Context) => {
	const { db: sudoDB } = context.sudo()
	const seedJson = events_seedjson
	const schemaType = "Event"
	const compairKey = "summary"
	const itemsAlreadyInDatabase = await sudoDB[schemaType].findMany({
		where: {
			[compairKey]: {
				in: seedJson.flatMap((item) => item[compairKey]) as string[],
			},
		},
	})

	const itemsToCreate = seedJson.filter(
		(item) =>
			!itemsAlreadyInDatabase.some(
				(prevItem) => prevItem[compairKey] === item[compairKey]
			)
	)

	itemsToCreate.map((item) => {
		console.log(` + ${schemaType}: ` + item[compairKey])
	})

	const createdItems = await sudoDB[schemaType].createMany({
		data: itemsToCreate.map((item) => ({
			...item,
			location: { connect: { name: item.location?.name } },
			description: item?.description?.document,
			hosts: { connect: item.hosts?.map((user) => ({ email: user.email })) },
			cohosts: {
        connect: item.cohosts?.map((user) => ({ email: user.email })),
			},
      categories: { connect: item.categories?.map((cat) => ({ name: cat.name })) },
      tags: { connect: item.tags?.map((tag) => ({ name: tag.name })) },
		})),
	})

	await seedTicketOrders(createdItems, context)
}
const seedLocations = async (context: Context) => {
	const { db: sudoDB } = context.sudo()
	const seedJson = locations_seed
	const schemaType = "Location"
	const compairKey = "name"
	const itemsAlreadyInDatabase = await sudoDB[schemaType].findMany({
		where: {
			[compairKey]: {
				in: seedJson.flatMap((item) => item[compairKey]) as string[],
			},
		},
	})

	const itemsToCreate = seedJson.filter(
		(item) =>
			!itemsAlreadyInDatabase.some(
				(prevItem) => prevItem[compairKey] === item[compairKey]
			)
	)

	itemsToCreate.map((item) => {
		console.log(` + ${schemaType}: ` + item[compairKey])
	})

	await sudoDB[schemaType].createMany({
		data: itemsToCreate.map((item) => ({
			...item,
      categories: { connect: item.categories?.map((cat:{name:string}) => ({ name: cat.name })) },
      tags: { connect: item.tags?.map((tag:{name:string}) => ({ name: tag.name })) },
		})),
	})
}

const seedServices = async (context: Context) => {
	const { db } = context.sudo()

	const objectsAlreadyInDatabase = await db.Service.findMany({
		where: {
			name: { in: services_seed.map((obj) => obj.name) as string[] },
		},
	})
	const objsToCreate = services_seed.filter(
		(seedObj) =>
			!objectsAlreadyInDatabase.some((obj) => obj.name === seedObj.name)
	)

	objsToCreate.map((obj) => {
		console.log(" + Service: " + obj.name)
	})

	await db.Service.createMany({
		data: objsToCreate.map((obj) => ({
			...obj,
			//? makes it easier to copy and paste res json from Apollo Sandbox
			description: obj?.description?.document,
			// categories: { connect: p?.categories },
			// tags: { connect: p?.tags },
			addons: { connect: obj?.addons },
		})),
	})
}

const seedAddons = async (context: Context) => {
	const { db } = context.sudo()

	const objectsAlreadyInDatabase = await db.Addon.findMany({
		where: {
			slug: { in: addons_seed.map((obj) => obj.slug) as string[] },
		},
	})

	const objsToCreate = addons_seed.filter(
		(seedObj) =>
			!objectsAlreadyInDatabase.some((obj) => obj.slug === seedObj.slug)
	)

	objsToCreate.map((obj) => {
		console.log(" + Addon: " + obj.slug)
	})

	await db.Addon.createMany({
		data: objsToCreate,
	})
}

const seedPages = async (context: Context) => {
	const { db } = context.sudo()
	const seedObjects = pages_seeddata
	const objectsAlreadyInDatabase = await db.Page.findMany({
		where: {
			slug: {
				in: seedObjects.map((obj) => obj.slug) as
					| string
					| readonly string[]
					| null
					| undefined,
			},
		},
	})
	const objsToCreate = seedObjects.filter(
		(seedObj) =>
			!objectsAlreadyInDatabase.some((obj: any) => obj.slug === seedObj.slug)
	)

	objsToCreate.map((obj) => {
		console.log(" + Page: " + obj.slug)
	})

	await db.Page.createMany({
		data: objsToCreate.map((obj) => ({
			...obj,
			//? makes it easier to copy and paste res json from Apollo Sandbox
			//@ts-ignore
			content: obj?.content?.document,
		})),
	})
}

const seedAnnouncements = async (context: Context) => {
	const { db } = context.sudo()
	const seedObjects = announcements_seed
	const objectsAlreadyInDatabase = (await db.Announcement.findMany({
		where: {
			link: { in: seedObjects.map((obj) => obj.link) as string[] },
		},
	})) as Announcement[]
	const objsToCreate = seedObjects.filter(
		(seedObj) =>
			!objectsAlreadyInDatabase.some((obj) => obj.link === seedObj.link)
	)

	objsToCreate.map((obj) => {
		console.log(" + Announcement: " + obj.link)
	})

	await db.Announcement.createMany({
		data: objsToCreate.map((obj) => ({
			...obj,
			//? makes it easier to copy and paste req json from Apollo Sandbox
			//@ts-ignore
			content: obj?.content?.document,
		})),
	})
}

async function seedTicketOrders(events: Lists.Event.Item[], context: Context) {
  // throw new Error('🐸 seedTicketOrders find out how to do this')
	const { db: sudoDB } = context.sudo()

	const fakeEmail = "admin@tawtaw.site"
	const orderStatuses = ["PAYMENT_RECIEVED", "REQUESTED"]
  const tixQuantity = 2

  await Promise.all(events.map(async (event) => {

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
    if(event.summary.startsWith('PAST: ')){
      await sudoDB.Event.updateOne({
        where: { id: event.id},
        data: {
          start: dateAdjuster(event.start, {months: -1}),
          end: dateAdjuster(event.end, {months: -1}),
          status: "PAST"
        }
      })
    }

    console.log(`+ Ticket Ordered for Event: ${event.summary}, total: ${order.total}`)
  }))
  
}

// const seedProductImages = async (context: Context) => {
//   const { db } = context.sudo();
//   const seedObjects: any[] = productImage_seedjson;
//   const objectsAlreadyInDatabase = await db.ProductImage.findMany({
//     where: {
//       // @ts-ignore
//       filename: { in: seedObjects.map(obj => obj.filename) },
//     },
//   });

//   const objsToCreate = seedObjects.filter(
//     // @ts-ignore
//     seedObj => !objectsAlreadyInDatabase.some(p => p.filename === seedObj.filename)
//   );

//   await db.ProductImage.createMany({
//     data: objsToCreate.map(obj => {
//       // console.log(path.join(process.cwd() + `/public/assets/images/${obj.filename}`))

//       return ({
//         ...obj,
//         // image: {
//         //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
//         //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
//         //   //   upload: prepareToUpload(path.join(process.cwd() + `/public/assets/images/${obj.filename}`))
//         // }
//         // TODO why no seed upload files work?
//         // upload: prepareToUpload(path.join(process.cwd() + `/public/seedfiles/${obj.filename}`))
//       })
//     }),
//   });
// };

export const seedDatabase = async (context: Context) => {
	console.log(`🌱🌱🌱 Seeding database 🌱🌱🌱`)
	await seedRoles(context)
	await seedUsers(context)

	await seedCategories(context)
	await seedTags(context)
	await seedPages(context)
	await seedPosts(context)
	await seedAnnouncements(context)

	await seedLocations(context)
	await seedAddons(context)
	await seedServices(context)

	await seedBookings(context)
	await seedEvents(context)
	console.log(`🌲🌲🌲 Seeding complete 🌲🌲🌲`)
}
