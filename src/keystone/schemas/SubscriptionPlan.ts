import { graphql, group, list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"
import { permissions, rules } from "../access"
import {
	stripeArchiveProduct,
	stripeProductCreate,
	stripeProductUpdate,
} from "../../lib/stripe"
import "dotenv/config"
import { componentBlocks } from "../blocks"
import { slugFormat } from "../../lib/slugFormat"
import { Billing_Interval } from "@ks/types"
import { envs } from "../../../envs"

export const SubscriptionPlan: Lists.SubscriptionPlan = list({
	// access: allowAll,
	access: {
		filter: {
			query: rules.canViewSubscriptionPlans,
			update: rules.canManageSubscriptionPlans,
			delete: rules.canManageSubscriptionPlans,
		},
		operation: {
			query: () => true,
			create: permissions.canManageSubscriptionPlans,
			update: permissions.canManageSubscriptionPlans,
			delete: permissions.canManageSubscriptionPlans,
		},
	},

  ui: {
		
		listView: {
			initialColumns: ["name", "price", "status", "billing_interval", "trial_period_days", "stockMax"],
			initialSort: { field: "dateCreated", direction: "DESC" },
		},
		//? maybe I'd prefer email? idk
		labelField: `name`,
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "subscriptionPlan"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		image: text(),

		// todo does this need to be?
		author: relationship({
			ref: "User.subscriptionPlans",

			ui: {
				displayMode: "cards",
				cardFields: ["name", "email"],
				inlineEdit: { fields: ["name", "email"] },
				linkToItem: true,
				inlineConnect: true,
			},

			many: false,
		}),

		name: text({ validation: { isRequired: true, length: { min: 3 } } }),
		slug: text({
			validation: { isRequired: true },
			isIndexed: "unique",
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
		excerpt: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		description: document({
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

		status: select({
			options: [
				{ label: "Draft", value: "DRAFT" },
				{ label: "Public", value: "PUBLIC" },
				{ label: "Private", value: "PRIVATE" },
				{ label: "Out of Stock", value: "OUT_OF_STOCK" },
				{ label: "Arcived", value: "ARCIVED" },
			],
			defaultValue: "DRAFT",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
		}),

		price: integer({ validation: { isRequired: true, min: 0 } }),
		billing_interval: select({
			options: [
				{ label: "Daily", value: "day" },
				{ label: "Weekly", value: "week" },
				{ label: "Monthly", value: "month" },
				{ label: "Yearly", value: "year" },
			],
			defaultValue: "month",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
		}),
		trial_period_days: integer({
			validation: { isRequired: true, min: 0 },
			defaultValue: envs.STRIPE_SUB_TRIAL_PERIOD_DAYS,
			ui: { description: "defaults to trial days set in .env" },
		}),

		stockMax: integer({ validation: { isRequired: true, min: 0 } }),

		addons: relationship({ ref: "Addon.subscriptionPlans", many: true }),
		coupons: relationship({
			ref: "Coupon.subscriptionPlans",
			many: true,
			ui: {
				description:
					"Coupons that are allowed to apply to this item during checkout",
			},
		}),
		items: relationship({
			ref: "SubscriptionItem.subscriptionPlan",
			many: true,
		}),
		...group({
			label: "Metadata",
			// description: 'Group description',

			fields: {
				dateCreated: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
				}),
				dateModified: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
				}),
				categories: relationship({
					ref: "Category.subscriptionPlans",
					many: true,
				}),

				tags: relationship({
					ref: "Tag.subscriptionPlans",
					many: true,
				}),
        stripeProductId: text({
					isIndexed: "unique",
					validation: { isRequired: false },
				}),
        // TODO get rid of this crazy logic
				// stripeProductId: text({
				// 	isIndexed: true,
				// 	validation: { isRequired: false },
				// 	hooks: {
				// 		validate: {
				// 			create: async ({ resolvedData, context, addValidationError }) => {
				// 				//? custom `unique` validation that also allows the field to be empty is not using stripe at all
				// 				if (!resolvedData.stripeProductId) return
				// 				const subPlans = await context
				// 					.sudo()
				// 					.db.SubscriptionPlan.findMany({
				// 						where: {
				// 							stripePriceId: {
				// 								equals: resolvedData.stripeProductId,
				// 							},
				// 						},
				// 					})
				// 				if (subPlans.length > 0)
				// 					addValidationError(
				// 						"!!! SubscriptionPlan can not share same stripeProductId with others"
				// 					)
				// 			},
				// 			update: async ({ resolvedData, context, addValidationError }) => {
				// 				if (!resolvedData.stripeProductId) return
				// 				const subPlans = await context
				// 					.sudo()
				// 					.db.SubscriptionPlan.findMany({
				// 						where: {
				// 							stripePriceId: {
				// 								equals: resolvedData.stripeProductId,
				// 							},
				// 						},
				// 					})
				// 				if (subPlans.length > 1)
				// 					addValidationError(
				// 						"!!! SubscriptionPlan can not share same stripeProductId with others"
				// 					)
				// 			},
				// 		},
				// 	},
				// }),
				stripePriceId: text({
					isIndexed: "unique",
					validation: { isRequired: false },
				}),
        // TODO get rid of this crazy logic
				// stripePriceId: text({
				// 	isIndexed: true,
				// 	validation: { isRequired: false },
				//   hooks: {
				// 		validate: {
				// 			create: async ({ resolvedData, context, addValidationError }) => {
				//         //? custom `unique` validation that also allows the field to be empty is not using stripe at all
				//         if(!resolvedData.stripeProductId) return
				// 				const subPlans = await context
				// 					.sudo()
				// 					.db.SubscriptionPlan.findMany({
				// 						where: {
				// 							stripePriceId: {
				// 								equals: resolvedData.stripeProductId,
				// 							},
				// 						},
				// 					})
				//         if(subPlans.length > 0) addValidationError('!!! SubscriptionPlan can not share same stripeProductId with others')
				// 			},
				// 			update: async ({ resolvedData, context, addValidationError }) => {
				//         if(!resolvedData.stripeProductId) return
				// 				const subPlans = await context
				// 					.sudo()
				// 					.db.SubscriptionPlan.findMany({
				// 						where: {
				// 							stripePriceId: {
				// 								equals: resolvedData.stripeProductId,
				// 							},
				// 						},
				// 					})
				//         if(subPlans.length > 1) addValidationError('!!! SubscriptionPlan can not share same stripeProductId with others')
				// 			},
				// 		},
				// 	},
				// }),
			},
		}),
	},

	hooks: {
		validate: {
			create: async ({ resolvedData, context, inputData }) => {
				if (!resolvedData.author) {
					const currentUserId = await context.session.itemId
					resolvedData.author = { connect: { id: currentUserId } }
				}
			},
		},
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
					billing_interval,
				} = resolvedData

				try {
					const createdProduct = await stripeProductCreate({
						// id,
						name: String(name),
						price: Number(price),
						excerpt,
						category: "subscriptionPlan",
						status,
						authorId: author?.connect?.id || "no_author_id",
						type: "subscriptionPlan",
						image,
						url: envs.FRONTEND_URL + `/subscription-plans/${id}`,
						stripeProductId,
						stripePriceId,
						billing_interval: billing_interval as Billing_Interval,
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
					billing_interval: resolvedData.billing_interval as Billing_Interval,
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
			// TODO updated the stripe product with the subscription id?
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
