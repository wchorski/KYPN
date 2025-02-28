import { graphql, list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import {
	checkbox,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
// import { permissions, rules } from "../access";
// import stripeConfig, { stripeCustomerCreate, stripeCustomerDelete } from "../../lib/stripe";
// import { timesArray } from "../../lib/timeArrayCreator";
var bcrypt = require("bcryptjs")
import { envs } from "../../../envs"
// import { timesArray } from "../../lib/timeArrayCreator"
import { permissions, rules } from "../access"
import { timesArray } from "../../lib/timeArrayCreator"
import { calcTotalPrice } from "../../lib/calcTotalPrice"
import { CartItem } from "../types"
import { stripeCustomerCreate, stripeCustomerUpdate } from "../../lib/stripe"
// import { mailVerifyUser } from "../../lib/mail";
// import { tokenEmailVerify } from "../../lib/tokenEmailVerify";

export const User: Lists.User = list({
	access: {
		filter: {
			// query: () => true,
			query: rules.canManageUsers,
			update: rules.canManageUsers,
			// delete: () => false,
		},
		operation: {
			query: () => true,
			// query: permissions.canViewUsers,
			create: permissions.canManageUsers,
			update: permissions.canManageUsers,
			delete: permissions.canManageUsers,
		},
	},

	ui: {
		//? filter handles ui filtering
		// hideCreate: args => !permissions.canManageUsers(args),
		// hideCreate: (args) => !permissions.canManageUsers(args),
		// hideDelete: (args) => !permissions.canManageUsers(args),
		// isHidden: (args) => !permissions.canManageUsers(args),
		listView: {
			initialColumns: ["name", "nameLast", "email", "role"],
			initialSort: { field: "dateCreated", direction: "DESC" },
		},
		//? maybe I'd prefer email? idk
		labelField: `name`,
	},

	// this is the fields for our User list
	fields: {
		// by adding isRequired, we enforce that every User should have a name
		//   if no name is provided, an error will be displayed
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "user"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		name: text({ validation: { isRequired: true, length: { min: 3 } } }),
		nameLast: text(),
		authId: text({
			isIndexed: "unique",
			validation: { isRequired: true },
			ui: {
				description: `!!! Register users through this link ${envs.FRONTEND_URL}/register.`,
			},
		}),
		image: text({}),
		phone: text({}),
		//TODO trim any white space around this address before saving to db
		email: text({
			validation: { isRequired: true },

			// by adding isIndexed: 'unique', we're saying that no user can have the same
			// email as another user - this may or may not be a good idea for your project
			isIndexed: "unique",
			//? was thinking of lower caps all saved data, but would cause problems down the road
			// hooks:{
			//   beforeOperation(){

			//   }
			// }
		}),

		password: text({
			//TODO may not work for OAuth, but not worrying about right now
			validation: { isRequired: true },
			ui: {
				description:
					"Can only be changed via `passwordReset` mutation + access to owner's email",
				itemView: {
					fieldMode: "hidden",
				},
				// itemView: {
				// 	fieldMode: ({ session, context, item }) =>
				// 		permissions.canManageUsers({ session }) ? "read" : "hidden",
				// },
			},
			access: {
				read: ({ session, context, listKey, fieldKey, operation, item }) =>
					permissions.canManageUsers({ session }),
			},
			hooks: {
				beforeOperation: async ({ operation, resolvedData }) => {
					if (operation === "create" || operation === "update") {
						if (!resolvedData?.password) return console.log("no password set")
						const hash = await bcrypt.hash(
							resolvedData?.password,
							envs.WORK_FACTOR
						)
						resolvedData.password = hash
					}
				},
			},
		}),
		url: text(),
		isActive: checkbox({ defaultValue: true }),
		stripeCustomerId: text({
			isIndexed: true,
			validation: { isRequired: false },
			hooks: {
				validate: {
					create: async ({ resolvedData, context, addValidationError }) => {
						//? custom `unique` validation that also allows the field to be empty is not using stripe at all
						if (!resolvedData.stripeCustomerId) return
						const users = await context.sudo().db.User.findMany({
							where: {
								stripeCustomerId: {
									equals: resolvedData.stripeCustomerId,
								},
							},
						})
						if (users.length > 0)
							addValidationError(
								"!!! User can not share same stripeCustomerId with others"
							)
					},
					update: async ({ resolvedData, context, addValidationError }) => {
						if (!resolvedData.stripeCustomerId) return
						const users = await context.sudo().db.User.findMany({
							where: {
								stripeCustomerId: {
									equals: String(resolvedData.stripeCustomerId),
								},
							},
						})
						if (users.length > 1)
							addValidationError(
								"!!! User can not share same stripeCustomerId with others"
							)
					},
				},
			},
		}),
		dateCreated: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
		dateModified: timestamp({
			defaultValue: { kind: "now" },
			db: {
				updatedAt: true,
			},
			hooks: {
				beforeOperation({ resolvedData, operation }) {
					if (operation === "create" || operation === "update") {
						resolvedData.dateModified = new Date().toISOString()
					}
				},
			},
		}),
		buisnessHourOpen: select({
			options: timesArray(),
			defaultValue: "09:00:00",
			ui: {
				displayMode: "select",
				createView: { fieldMode: "edit" },
			},
		}),
		buisnessHourClosed: select({
			options: timesArray(),
			defaultValue: "18:00:00",
			ui: {
				displayMode: "select",
			},
		}),
		role: relationship({
			ref: "Role.assignedTo",
			// todo add access control
			access: {
				create: permissions.canManageUsers,
				update: permissions.canManageUsers,
			},
			ui: {
				description:
					"🔒 Setting someone to a high permission like Admin could be a grave mistake. Be careful",
				createView: { fieldMode: "hidden" },
				itemView: { fieldMode: "edit" },
			},
		}),
		posts: relationship({ ref: "Post.author", many: true }),
		pages: relationship({ ref: "Page.author", many: true }),
		privatePagesAccess: relationship({ ref: "Page.privateAccess", many: true }),
		privatePostsAccess: relationship({ ref: "Post.privateAccess", many: true }),
		servicesProvided: relationship({ ref: "Service.employees", many: true }),
		servicesAuthored: relationship({ ref: "Service.author", many: true }),
		bookings: relationship({ ref: "Booking.customer", many: true }),
		gigs: relationship({ ref: "Booking.employees", many: true }),
		gig_requests: relationship({
			ref: "Booking.employee_requests",
			many: true,
		}),
		eventsHost: relationship({ ref: "Event.hosts", many: true }),
		eventsCohost: relationship({ ref: "Event.cohosts", many: true }),
		availability: relationship({ ref: "Availability.employee", many: true }),
		cart: relationship({
			ref: "CartItem.user",
			many: true,
			ui: {
				createView: { fieldMode: "hidden" },
				itemView: { fieldMode: "hidden" },
			},
		}),
		cartTotalPrice: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {
					// if(!item.serviceId) return item.name
					const userCartItems = (await context.query.CartItem.findMany({
						where: { user: { id: { equals: item.id } } },
						query: `
              id
              quantity
              type
              subTotal
            `,
					})) as CartItem[]

					return calcTotalPrice(userCartItems)
				},
			}),
		}),

		products: relationship({ ref: "Product.author", many: true }),
		addons: relationship({ ref: "Addon.author", many: true }),
		rentals: relationship({ ref: "Rental.customer", many: true }),
		subscriptionPlans: relationship({
			ref: "SubscriptionPlan.author",
			many: true,
		}),
		subscriptions: relationship({ ref: "SubscriptionItem.user", many: true }),
		orders: relationship({
			ref: "Order.user",
			many: true,
		}),
		tickets: relationship({
			ref: "Ticket.holder",
			many: true,
		}),
	},
	hooks: {
		beforeOperation: {
			create: async ({ resolvedData, item }) => {
				await stripeCustomerCreate({
					email: String(resolvedData.email),
					name: String(resolvedData.name),
					nameLast: String(resolvedData.nameLast),
					isActive: resolvedData.isActive ? resolvedData.isActive : false,
				}).then(res => {
          if(!res) return
          resolvedData.stripeCustomerId = res.id
        })
			},
      update: async ({resolvedData, item}) => {
        await stripeCustomerUpdate({
          stripeCustomerId: resolvedData.stripeCustomerId?.toString() || item.stripeCustomerId,
          email: String(resolvedData.email),
					name: String(resolvedData.name),
					nameLast: String(resolvedData.nameLast),
					isActive: resolvedData.isActive ? Boolean(resolvedData.isActive) : item.isActive,
        }).then(res => {
          if(!res) return
          resolvedData.stripeCustomerId = res.id
        })
      },
		},
		async afterOperation({ operation, context, item }) {
			if (operation === "create") {
				const data = (await context
					.sudo()
					.graphql.run({
						query: `
            mutation VerifyEmailRequest($email: String!) {
              verifyEmailRequest(email: $email) {
                id
              }
            }
          `,
						variables: {
							email: item.email,
						},
					})
					.catch((err) =>
						console.log(`!!! verify email did not send: ${item.email}`)
					)) as object
			}
		},
	},
})
