import { graphql, group, list } from "@keystone-6/core"
import {
	checkbox,
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"

import { envs } from "../../../envs"
import { slugFormat } from "../../lib/slugFormat"
import {
	stripeArchiveProduct,
	stripeProductCreate,
	stripeProductUpdate,
} from "../../lib/stripe"
import { permissions, rules } from "../access"
import { componentBlocks } from "../blocks"
import type { Lists } from ".keystone/types"

export const Product: Lists.Product = list({
	// access: allowAll,
	access: {
		filter: {
			// query: () => true,
			query: rules.canViewProducts,
			delete: rules.canManageProducts,
			update: rules.canManageProducts,
		},
		operation: {
			// query: permissions.canViewProducts,
			query: () => true,
			create: permissions.canManageProducts,
			update: permissions.canManageProducts,
			delete: permissions.canManageProducts,
		},
	},

	ui: {
		listView: {
			initialColumns: [
				"name",
				"price",
				"stockCount",
				"status",
				"dateModified",
				"author",
				"isForSale",
				"isForRent",
			],
			initialSort: { field: "dateModified", direction: "DESC" },
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "product"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		image: text(),
		name: text({
			validation: { isRequired: true, length: { min: 3 } },
			isIndexed: "unique",
		}),
		slug: text({
			validation: { isRequired: true },
			isIndexed: "unique",
			ui: { description: "shortened, url friendly name" },
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
				{ label: "Private", value: "PRIVATE" },
				{ label: "Public", value: "PUBLIC" },
				{ label: "Out of Stock", value: "OUT_OF_STOCK" },
				{ label: "Archived", value: "ARCHIVED" },
			],
			defaultValue: "DRAFT",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
		}),
		...group({
			label: "Inventory",
			// description: 'Group description',

			fields: {
				isForSale: checkbox({ defaultValue: true }),
				price: integer({ validation: { isRequired: true, min: 0 } }),
				isForRent: checkbox({ defaultValue: false }),
				rental_price: integer({
					ui: { description: "cost per day used" },
					validation: { isRequired: true, min: 0 },
				}),
				stockCount: integer({
					validation: { isRequired: true, min: 0 },
				}),
			},
		}),
		// todo make this 'author' instead for clarity
		author: relationship({
			ref: "User.products",
		}),
		addons: relationship({ ref: "Addon.products", many: true }),
		coupons: relationship({
			ref: "Coupon.products",
			many: true,
			ui: {
				description:
					"Coupons that are allowed to apply to this item during checkout",
			},
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
					ref: "Category.products",
					many: true,
				}),

				tags: relationship({
					ref: "Tag.products",
					many: true,
				}),
				stripeProductId: text({
					isIndexed: true,
					hooks: {
						validate: {
							create: async ({ resolvedData, context, addValidationError }) => {
								//? custom `unique` validation that also allows the field to be empty is not using stripe at all
								if (!resolvedData.stripeProductId) return
								const subPlans = await context.sudo().db.Product.findMany({
									where: {
										stripeProductId: {
											equals: resolvedData.stripeProductId,
										},
									},
								})
								if (subPlans.length > 0)
									addValidationError(
										"!!! Product can not share same stripeProductId with others"
									)
							},
							update: async ({ resolvedData, context, addValidationError }) => {
								if (!resolvedData.stripeProductId) return
								const subPlans = await context.sudo().db.Product.findMany({
									where: {
										stripeProductId: {
											equals: resolvedData.stripeProductId,
										},
									},
								})
								if (subPlans.length > 1)
									addValidationError(
										"!!! Product can not share same stripeProductId with others"
									)
							},
						},
					},
				}),
				stripePriceId: text({
					isIndexed: true,
					hooks: {
						validate: {
							create: async ({ resolvedData, context, addValidationError }) => {
								//? custom `unique` validation that also allows the field to be empty is not using stripe at all
								if (!resolvedData.stripePriceId) return
								const subPlans = await context.sudo().db.Product.findMany({
									where: {
										stripePriceId: {
											equals: resolvedData.stripePriceId,
										},
									},
								})
								if (subPlans.length > 0)
									addValidationError(
										"!!! Product can not share same stripePriceId with others"
									)
							},
							update: async ({ resolvedData, context, addValidationError }) => {
								if (!resolvedData.stripePriceId) return
								const subPlans = await context.sudo().db.Product.findMany({
									where: {
										stripePriceId: {
											equals: resolvedData.stripePriceId,
										},
									},
								})
								if (subPlans.length > 1)
									addValidationError(
										"!!! Product can not share same stripePriceId with others"
									)
							},
						},
					},
				}),
			},
		}),
		orderItems: relationship({
			ref: "OrderItem.product",
			many: true,
			ui: { displayMode: "count" },
		}),
	},
	hooks: {
		// resolveInput: {
		//   create: async ({ listKey, operation, resolvedData }) => {
		//     return { ...resolvedData, id: 'test' }
		//   },
		// },

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
				} = resolvedData

				//? this does not account for rental price. which is ok i guess because that
				// is handled purely by this app
				try {
					const createdProduct = await stripeProductCreate({
						// id,
						name: String(name),
						price: Number(price),
						excerpt,
						category: "product",
						status,
						authorId: author?.connect?.id || "no_author_id",
						type: "product",
						image,
						url: envs.FRONTEND_URL + `/products/${id}`,
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
