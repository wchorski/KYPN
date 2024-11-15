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
			query: rules.canManageUsers,
			update: rules.canManageUsers,
			// delete: () => false,
		},
		operation: {
			query: () => true,
			create: permissions.canManageUsers,
			update: permissions.canManageUsers,
			delete: permissions.canManageUsers,
		},
	},

	ui: {
		// hide backend from non admins
		// hideCreate: args => !permissions.canManageUsers(args),
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
		authId: text({ isIndexed: "unique", validation: { isRequired: true } }),
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
					fieldMode: ({ session, context, item }) =>
						permissions.canManageUsers({ session }) ? "read" : "hidden",
				},
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
		isAdmin: checkbox({ defaultValue: false }),
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
		isVerified: checkbox(),
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
					.catch((err) => console.log("!!! verify email failed"))) as object
			}
		},
	},
})
