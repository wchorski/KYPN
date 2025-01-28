import { list } from "@keystone-6/core"
// @ts-ignore
import type { Lists } from ".keystone/types"
import { allowAll } from "@keystone-6/core/access"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
} from "@keystone-6/core/fields"
import { permissions, rules } from "../access"
import { slugFormat } from "../../lib/slugFormat"
import { stripeProductCreate } from "../../lib/stripe"
import { envs } from "../../../envs"

export const Addon: Lists.Addon = list({
	access: {
		filter: {
			query: rules.canViewAddons,
			update: rules.canManageAddons,
			delete: rules.canManageAddons,
		},
		operation: {
			create: permissions.canManageAddons,
			query: () => true,
			// query: permissions.canViewAddons,
			update: permissions.canManageAddons,
			delete: permissions.canManageAddons,
		},
	},

	// todo hide these again
	ui: {
		isHidden: (args) => !permissions.canManageAddons(args),
		listView: {
			initialColumns: ["name", "price", "status", "services"],
			initialSort: { field: "dateCreated", direction: "DESC" },
		},
	},

	fields: {
		name: text({ isIndexed: "unique", validation: { isRequired: true } }),
		slug: text({
			isIndexed: "unique",
			validation: { isRequired: true },
			hooks: {
				beforeOperation({ resolvedData }) {
					if (!resolvedData) return
					resolvedData.slug
						? (resolvedData.slug = slugFormat(String(resolvedData.slug)))
						: (resolvedData.slug = slugFormat(String(resolvedData.name)))
				},
			},
		}),
		image: text(),
		excerpt: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		price: integer({ defaultValue: 0, validation: { isRequired: true, min: 0 } }),
		stripeProductId: text(),
		// TODO instead of "out of stock" add `stockCount` as to not run into privacy issues
		status: select({
			options: [
				{ label: "Draft", value: "DRAFT" },
				{ label: "Public", value: "PUBLIC" },
				{ label: "Out of Stock", value: "OUT_OF_STOCK" },
				{ label: "Private", value: "PRIVATE" },
			],
			defaultValue: "PUBLIC",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		author: relationship({
			ref: "User.addons",
		}),
		services: relationship({ ref: "Service.addons", many: true }),
		products: relationship({ ref: 'Product.addons', many: true }),
		rentals: relationship({ ref: 'Rental.addons', many: true }),
		subscriptionPlans: relationship({ ref: 'SubscriptionPlan.addons', many: true }),
		bookings: relationship({ ref: "Booking.addons", many: true }),
		subscriptionItems: relationship({ ref: 'SubscriptionItem.addons', many: true }),

		categories: relationship({
			ref: "Category.addons",
			many: true,
		}),

		tags: relationship({
			ref: "Tag.addons",
			many: true,
		}),
		dateCreated: timestamp({ defaultValue: { kind: "now" } }),
		dateModified: timestamp({ defaultValue: { kind: "now" } }),
	},
	hooks: {
		beforeOperation: async ({ operation, resolvedData, context, item }) => {
			if (operation === "create") {
				const res = await stripeProductCreate({
					id: resolvedData.id || "",
					name: resolvedData.name || "",
					description: resolvedData.excerpt || "",
					// category: resolvedData.categories ? resolvedData.categories[0].name : 'uncategorized',
					category: "uncategorized",
					status: resolvedData.status || "",
					type: "subscription",
					image: resolvedData.image || "",
					price: Number(resolvedData.price),
					url: envs.FRONTEND_URL + "/shop/subscriptionplans/" + resolvedData.id,
					// authorEmail: resolvedData.author || 'no_author',
					authorEmail: "no_author",
				})
					.then(async (res) => {
						if (res && resolvedData) {
							resolvedData.stripeProductId = res.id
						}
					})
					.catch((err) => {
						console.log("Addon create err: " + err)
						throw new Error("Addon create err: " + "haha uh oh::" + err.message)
					})
			}
		},
	},
})
