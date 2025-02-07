import { graphql, group, list } from "@keystone-6/core"
// @ts-ignore
import { Lists, ProductCreateInput } from ".keystone/types"

import { allowAll } from "@keystone-6/core/access"
import {
	checkbox,
	image,
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { permissions, rules } from "../access"
import stripeConfig, {
	stripeArchiveProduct,
	stripeProductCreate,
	stripeProductRetrieve,
	stripeProductUpdate,
} from "../../lib/stripe"
import { document } from "@keystone-6/fields-document"
import { componentBlocks } from "../blocks"
import { slugFormat } from "../../lib/slugFormat"
import { envs } from "../../../envs"

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
				"categories",
			],
			initialSort: { field: "dateModified", direction: "DESC" },
		},
	},

	fields: {
		// photo: relationship({
		//   ref: 'ProductImage.product',
		// ui: {
		//   displayMode: 'cards',
		//   cardFields: ['image', 'altText', 'filename'],
		//   inlineCreate: { fields: ['image', 'altText', 'filename'] },
		//   inlineEdit: { fields: ['image', 'altText', 'filename'] }
		// }
		// }),
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
		name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
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
				stripeProductId: text(),
				stripePriceId: text(),
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
					image,
				} = resolvedData

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
						billing_interval: undefined,
					})

					if (createdProduct) {
						resolvedData.stripeProductId = createdProduct.id
						resolvedData.stripePriceId = String(createdProduct.default_price)
					}
				} catch (error) {
					console.log("!!! 💳 STRIPE:: ", error)
				}
			},
			update: async ({ resolvedData, context, item }) => {
				//? item.stripeProductId will be undefined on first creation
				await stripeProductUpdate({
					stripeProductId: item.stripeProductId,
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
			create: async ({ resolvedData, item, context }) => {
				//? if error happens item is now an error object
				if (!item.id) return

				// const { id, name, excerpt, status, authorId, price, stripeProductId } =
				// 	item

				// await stripeProductCreate({
				// 	// id,
				// 	name,
				// 	price,
				// 	excerpt,
				// 	category: "product",
				// 	status,
				// 	authorId: authorId || "no_author_id",
				// 	type: "product",
				// 	image: item.image,
				// 	url: envs.FRONTEND_URL + `/products/${id}`,
				// 	stripeProductId,
				// 	billing_interval: undefined,
				// }).then(async (res) => {
				// 	if (!res) return
				// 	console.log({ res })
				// 	item.stripeProductId = res.id
				// 	item.stripePriceId = String(res.default_price)
				// 	resolvedData.stripeProductId = res.id
				// 	resolvedData.stripePriceId = String(res.default_price)
				// 	//? `item.FIELD = NEWDATA` in afterOperation doesn't save it to the db (but I still set it for return on this op)
				// 	//TODO this is causing endless loop
				// 	await context.db.Product.updateOne({
				// 		where: { id: item.id },
				// 		data: {
				// 			stripeProductId: res.id,
				// 			stripePriceId: String(res.default_price),
				// 		},
				// 	})
				// })

				// const product = await stripeProductRetrieve(item.stripeProductId).catch(
				// 	(error: any) => {
				// 		// console.log("!!! 💳 STRIPE:: ", error)
				// 		console.log("!!! 💳 STRIPE:: ", {
				// 			code: error.code,
				// 			message: error.raw.message,
				// 		})
				// 	}
				// )
				// console.log({ product })

				// if (product) {
				// 	await stripeProductUpdate({
				// 		stripeProductId: item.stripeProductId,
				// 		image: resolvedData.image as string | undefined,
				// 		price: resolvedData.price as number | undefined,
				// 		name: resolvedData.name as string | undefined,
				// 		status: resolvedData.status as string | undefined,
				// 		// category: resolvedData.category,
				// 		category: "product",
				// 		excerpt: resolvedData.excerpt as string | undefined,
				// 		authorId: resolvedData.author?.connect?.id,
				// 		billing_interval: undefined,
				// 	}).then(async (res) => {
				// 		if (!res) return

				// 		if (res.default_price) {
				// 			resolvedData.stripePriceId = String(res.default_price)
				// 		}
				// 	})
				// } else {
				// 	const {
				// 		id,
				// 		name,
				// 		excerpt,
				// 		status,
				// 		authorId,
				// 		price,
				// 		stripeProductId,
				// 	} = item
				// 	await stripeProductCreate({
				// 		id,
				// 		name,
				// 		price,
				// 		excerpt,
				// 		category: "product",
				// 		status,
				// 		authorId: authorId || "no_author_id",
				// 		type: "product",
				// 		image: item.image,
				// 		url: envs.FRONTEND_URL + `/products/${id}`,
				// 		stripeProductId,
				// 		billing_interval: undefined,
				// 	}).then(async (res) => {
				// 		if (!res) return
				// 		item.stripeProductId = res.id
				// 		item.stripePriceId = String(res.default_price)
				// 		resolvedData.stripeProductId = res.id
				// 		resolvedData.stripePriceId = String(res.default_price)
				// 		//? `item.FIELD = NEWDATA` in afterOperation doesn't save it to the db (but I still set it for return on this op)
				// 		//TODO this is causing endless loop
				// 		await context.db.Product.updateOne({
				// 			where: { id: item.id },
				// 			data: {
				// 				stripeProductId: res.id,
				// 				stripePriceId: String(res.default_price),
				// 			},
				// 		})
				// 	})
				// }
			},
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
