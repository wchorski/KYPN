import { list } from "@keystone-6/core"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
} from "@keystone-6/core/fields"

import { envs } from "../../../envs"
import { slugFormat } from "../../lib/slugFormat"
import {
	stripeArchiveProduct,
	stripeProductCreate,
	stripeProductUpdate,
} from "../../lib/stripe"
import { permissions, rules } from "../access"
// @ts-ignore
import type { Lists } from ".keystone/types"

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
		// isHidden: (args) => !permissions.canManageAddons(args),
		listView: {
			initialColumns: ["name", "price", "status", "services"],
			initialSort: { field: "dateCreated", direction: "DESC" },
		},
	},

	fields: {
		name: text({
			isIndexed: "unique",
			validation: { isRequired: true, length: { min: 3 } },
		}),
		slug: text({
			isIndexed: "unique",
			validation: { isRequired: true, length: { min: 3, max: 25 } },
			hooks: {
				resolveInput: ({ inputData, operation }) => {
					if (operation === "create") {
						if (inputData.slug) {
							return slugFormat(inputData.slug)
						} else if (inputData.name) {
							return slugFormat(inputData.name)
						}
					}
				},
			},
		}),
		image: text(),
		excerpt: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		price: integer({
			// defaultValue: 0,
			validation: { isRequired: true, min: 0 },
		}),
    // TODO subscription price. billing_interval is taken from subscriptionPlan
		stripeProductId: text(),
		stripePriceId: text(),
		// TODO instead of "out of stock" add `stockCount` as to not run into privacy issues
		status: select({
			options: [
				{ label: "Draft", value: "DRAFT" },
				{ label: "Public", value: "PUBLIC" },
				{ label: "Private", value: "PRIVATE" },
				{ label: "Out of Stock", value: "OUT_OF_STOCK" },
				{ label: "Archived", value: "ARCHIVED" },
			],
			validation: { isRequired: true },
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		author: relationship({
			ref: "User.addons",
		}),
		services: relationship({ ref: "Service.addons", many: true }),
		products: relationship({ ref: "Product.addons", many: true }),
		rentals: relationship({ ref: "Rental.addons", many: true }),
		subscriptionPlans: relationship({
			ref: "SubscriptionPlan.addons",
			many: true,
		}),
		bookings: relationship({ ref: "Booking.addons", many: true }),
		subscriptionItems: relationship({
			ref: "SubscriptionItem.addons",
			many: true,
		}),

		categories: relationship({
			ref: "Category.addons",
			many: true,
		}),

		tags: relationship({
			ref: "Tag.addons",
			many: true,
		}),
		dateCreated: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
		dateModified: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
	},
	hooks: {
		beforeOperation: {
			create: async ({ item, resolvedData, context }) => {
				const {
					id,
					name,
					excerpt,
					status,
					author,
					price,
					stripeProductId,
					stripePriceId,
					image,
				} = resolvedData

				//? this does not account for rental price. which is ok i guess because that
				// is handled purely by this app
				try {
					const createdProduct = await stripeProductCreate({
						// id,
						name: "ADD-ON: " + String(name),
						price: Number(price),
						excerpt,
						category: "addon",
						status,
						authorId: author?.connect?.id || "",
						type: "addon",
						image,
						url: envs.FRONTEND_URL + `/addons/${id}`,
						stripeProductId,
						stripePriceId,
						billing_interval: undefined,
					})

					if (createdProduct) {
						resolvedData.stripeProductId = createdProduct.id
						resolvedData.stripePriceId = String(createdProduct.default_price)
					}
				} catch (error: any) {
					console.log("!!! 💳 STRIPE:: ", {
						code: error.code,
						message: error.raw.message,
					})
				}
			},
			update: async ({ resolvedData, context, item }) => {
				//? item.stripeProductId will be undefined on first creation
				await stripeProductUpdate({
					stripeProductId: item.stripeProductId,
					stripePriceId: item.stripePriceId,
					image: resolvedData.image as string | undefined,
					price: resolvedData.price as number | undefined,
					name: resolvedData.name as string | undefined,
					status: resolvedData.status as string | undefined,
					// category: resolvedData.category,
					category: "product",
					excerpt: resolvedData.excerpt as string | undefined,
					authorId: resolvedData.author?.connect?.id,
					billing_interval: undefined,
				}).then(async (res) => {
					if (!res) return

					if (res.default_price) {
						resolvedData.stripePriceId = String(res.default_price)
					}
				})

				resolvedData.dateModified = new Date().toISOString()
			},
		},
		afterOperation: {
			// create: async ({ resolvedData, item, context }) => {},
			// update: async ({ resolvedData, item, context }) => {},
			delete: async ({ originalItem }) => {
				//? stripe. deleting product is not recommended
				// as product history will also be erased
				// await stripeProductDelete(originalItem.stripeProductId)
				await stripeArchiveProduct(originalItem.stripeProductId)
			},
		},
	},
})
