import { list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import {
	checkbox,
	relationship,
	text,
	timestamp,
} from "@keystone-6/core/fields"
// import { permissions, rules } from "../access";
// import stripeConfig, { stripeCustomerCreate, stripeCustomerDelete } from "../../lib/stripe";
// import { timesArray } from "../../lib/timeArrayCreator";
var bcrypt = require("bcryptjs")
import { envs } from "../../../envs"
// import { timesArray } from "../../lib/timeArrayCreator"
import { permissions, rules } from "../access"
// import { mailVerifyUser } from "../../lib/mail";
// import { tokenEmailVerify } from "../../lib/tokenEmailVerify";

export const User: Lists.User = list({
	access: {
		filter: {
			query: () => true,
			// query: rules.canManageUsers,
			update: rules.canManageUsers,
			// delete: () => false,
		},
		operation: {
			query: permissions.canViewUsers,
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
	},

	// this is the fields for our User list
	fields: {
		// by adding isRequired, we enforce that every User should have a name
		//   if no name is provided, an error will be displayed
		name: text({ validation: { isRequired: true } }),
		nameLast: text(),
		authId: text({ isIndexed: "unique", validation: { isRequired: true }, ui: {description: `!!! Register users through this link ${envs.FRONTEND_URL}/register.`} }),
		image: text({}),
		phone: text({}),
		email: text({
			validation: { isRequired: true },
			// by adding isIndexed: 'unique', we're saying that no user can have the same
			// email as another user - this may or may not be a good idea for your project
			isIndexed: "unique",
		}),

		password: text({
			ui: {
				description:
					"Can only be changed via `passwordReset` mutation + access to owner's email",
				itemView: {
					fieldMode: 'hidden'
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
		}),
		dateCreated: timestamp({ defaultValue: { kind: "now" } }),
		dateModified: timestamp({
			defaultValue: { kind: "now" },
			hooks: {
				beforeOperation({ resolvedData, operation }) {
					console.log("### dateMod beforeOperation")

					if (operation === "create" || operation === "update") {
						console.log("### WE updating")
						console.log({ resolvedData })

						resolvedData.dateModified = new Date().toISOString()
					}
				},
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
				createView: { fieldMode: "hidden" },
				itemView: { fieldMode: "hidden" },
			},
		}),
		posts: relationship({ ref: "Post.author", many: true }),
		pages: relationship({ ref: "Page.author", many: true }),
		privatePagesAccess: relationship({ ref: "Page.privateAccess", many: true }),
		privatePostsAccess: relationship({ ref: "Post.privateAccess", many: true }),
    servicesProvided: relationship({ ref: 'Service.employees', many: true }),
    bookings: relationship({ ref: 'Booking.customer', many: true }),
    gigs: relationship({ ref: 'Booking.employees', many: true }),
    gig_requests: relationship({ ref: 'Booking.employee_requests', many: true }),
    // eventsHost: relationship({ ref: 'Event.hosts', many: true }),
    // eventsCohost: relationship({ ref: 'Event.cohosts', many: true }),
    availability: relationship({ ref: 'Availability.employee', many: true }),
    // cart: relationship({
    //   ref: 'CartItem.user',
    //   many: true,
    //   ui: {
    //     createView: { fieldMode: 'hidden' },
    //     itemView: { fieldMode: 'hidden' }
    //   }
    // }),

    // products: relationship({ ref: 'Product.author', many: true }),
    addons: relationship({ ref: 'Addon.author', many: true }),
    // rentals: relationship({ ref: 'Rental.customer', many: true }),
    // subscriptionPlans: relationship({ ref: 'SubscriptionPlan.author', many: true }),
    // subscriptions: relationship({ ref: 'SubscriptionItem.user', many: true }),
    // orders: relationship({
    //   ref: 'Order.user',
    //   many: true,
    // }),
    // tickets: relationship({
    //   ref: 'Ticket.holder',
    //   many: true,
    // }),
	},
	hooks: {
		async beforeOperation({ operation, resolvedData }) {
			if (operation === "update") {
				resolvedData.dateModified = new Date().toISOString()
			}
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
					.catch((err) => console.log(`!!! verify email did not send: ${item.email}`))) as object
			}
		},
	},
})
