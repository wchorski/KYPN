import { graphql, group, list } from "@keystone-6/core"
// @ts-ignore
import { Lists } from ".keystone/types"

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
import stripeConfig from "../../lib/stripe"
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
		name: text({ validation: { isRequired: true } }),
		stripeProductId: text({ defaultValue: "NO_PROD_ID" }),
		stripePriceId: text({ defaultValue: "NO_PRICE_ID" }),
		slug: text({
			validation: { isRequired: true },
			isIndexed: "unique",
			hooks: {
				beforeOperation({ resolvedData }) {
					if (!resolvedData?.slug) return console.log("Product: no slug")
					resolvedData.slug = slugFormat(String(resolvedData.slug))
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
			],
			defaultValue: "DRAFT",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		...group({
			label: "Inventory",
			// description: 'Group description',

			fields: {
				isForSale: checkbox({ defaultValue: true }),
				isForRent: checkbox({ defaultValue: false }),
				price: integer({ validation: { isRequired: true }, defaultValue: 0 }),
				rental_price: integer({
					validation: { isRequired: true },
					defaultValue: 0,
				}),

				stockCount: integer({
					validation: { isRequired: true },
					defaultValue: 0,
				}),
			},
		}),
		// todo make this 'author' instead for clarity
		author: relationship({
			ref: "User.products",
		}),
		orderItems: relationship({ ref: "OrderItem.product", many: true }),
		addons: relationship({ ref: "Addon.products", many: true }),
		coupons: relationship({ ref: "Coupon.products", many: true, ui:{ description: 'Coupons that are allowed to apply to this item during checkout'} }),
    ...group({
			label: "Metadata",
			// description: 'Group description',
      
			fields: {
				dateCreated: timestamp({ defaultValue: { kind: "now" } }),
				dateModified: timestamp({ defaultValue: { kind: "now" } }),
				categories: relationship({
					ref: "Category.products",
					many: true,
				}),

				tags: relationship({
					ref: "Tag.products",
					many: true,
				}),
			},
		}),
	},
	hooks: {
		// TODO use this to create a default 'slug' automatically based on product name
		// if no user set, connect to current session user
		beforeOperation: async ({ operation, resolvedData, context, item }) => {
			if (operation === "create") {
				try {
					if (resolvedData && !resolvedData.author) {
						const currentUserId = await context.session?.itemId

						resolvedData.author = { connect: { id: currentUserId } }
					}

					if (resolvedData.isForRent && !resolvedData.rental_price)
						throw new Error("isForRent === true, but no rental_price set")
				} catch (err) {
					console.warn(err)
				}

				const res = await stripeConfig.products
					.create({
						// id: resolvedData.id, // todo idk if it gets an id 'beforeoperaiton'
						name: resolvedData.name || "",
						active: true,
						description: resolvedData.excerpt || "no_description",
						images: [
							resolvedData.image ||
								envs.FRONTEND_URL + "/assets/private/placeholder.png",
						],
						metadata: {
							category: resolvedData.categories
								? // @ts-ignore
								  resolvedData.categories[0].name
								: "uncategorized",
							status: resolvedData.status || "",
							// @ts-ignore //todo might cause problems
							author: resolvedData.author?.email,
							type: "single product",
						},
						// images: [
						//   resolvedData.photo.image.publicUrlTransformed
						// ],
						// @ts-ignore
						attributes: ["Size", "Color"],
						shippable: false,
						// package_dimensions: {
						//   height: 10,
						//   length: 20,
						//   width: 30,
						//   weight: 5
						// },
						unit_label: "units",
						default_price_data: {
							currency: "usd",
							// @ts-ignore //todo might cause problems
							unit_amount: resolvedData.price,
						},
						url: process.env.FRONTEND_URL + "/shop/products/" + resolvedData.id,
					})
					.then(async (res) => {
						// @ts-ignore //todo might cause problems
						if (resolvedData && !resolvedData.product) {
							resolvedData.stripeProductId = res.id
							// @ts-ignore //todo might cause problems
							resolvedData.stripePriceId = res.default_price
						}
					})
					.catch((err) => {
						console.warn(err)
					})
			}

			if (operation === "update") {
				// const photo = await context.db.ProductImage.findOne({
				//   where: {
				//     // @ts-ignore //todo might cause problems
				//     id: resolvedData.photoId ? resolvedData.photoId : item.photoId
				//   }
				// })

				const photo = resolvedData.image ? resolvedData.image : item.image

				const currPrice = await stripeConfig.prices.retrieve(
					// @ts-ignore //todo might cause problems
					resolvedData.stripePriceId
						? resolvedData.stripePriceId
						: item.stripePriceId
				)

				// todo this is ugly, but Stripe API does not support deletion or updating of a price object
				if (
					resolvedData.price &&
					currPrice.unit_amount !== resolvedData.price
				) {
					const newPrice = await stripeConfig.prices.create({
						// @ts-ignore //todo might cause problems
						unit_amount: resolvedData.price,
						currency: "usd",
						// @ts-ignore //todo might cause problems
						product: resolvedData.stripeProductId
							? resolvedData.stripeProductId
							: item.stripeProductId,
					})

					resolvedData.stripePriceId = newPrice.id

					const product = await stripeConfig.products.update(
						// @ts-ignore //todo might cause problems
						resolvedData.stripeProductId
							? resolvedData.stripeProductId
							: item.stripeProductId,
						{
							name: resolvedData.name ? resolvedData.name : item.name,
							description: resolvedData.excerpt
								? resolvedData.excerpt
								: item.excerpt,
							default_price: newPrice.id,
							images: [photo || envs.FRONTEND_URL + "/assets/placeholder.png"],
							metadata: {
								// @ts-ignore //todo might cause problems
								// category: resolvedData.categories ? resolvedData.categories[0] : 'uncategorized',
								// status: resolvedData.status,
								// author: resolvedData.author.email,
							},
						}
					)
				} else if (currPrice.unit_amount === item.price) {
					const product = await stripeConfig.products.update(
						// @ts-ignore //todo might cause problems
						resolvedData.stripeProductId
							? resolvedData.stripeProductId
							: item.stripeProductId,
						{
							name: resolvedData.name ? resolvedData.name : item.name,
							description: resolvedData.excerpt
								? resolvedData.excerpt
								: item.excerpt,
							images: [photo || envs.FRONTEND_URL + "/assets/placeholder.png"],
							metadata: {
								// @ts-ignore //todo might cause problems
								// category: resolvedData.categories ? resolvedData.categories[0].name : 'uncategorized',
								// status: resolvedData.status,
								// author: resolvedData.author?.email,
							},
						}
					)
				}
			}
		},
		afterOperation: async ({ operation, resolvedData, item, context }) => {
			if (operation === "create") {
				try {
					// todo not using ProductImg anymore?
					// const photo = await context.db.ProductImage.findOne({
					//   where: {
					//     id: item?.photoId
					//   }
					// })

					const product = await stripeConfig.products.update(
						item?.stripeProductId as string,
						{
							images: [item.image],
						}
					)
				} catch (err) {
					console.warn(err)
				}
			}

			// if (operation === 'update') {
			//   try {

			//   } catch (err) { console.warn(err) }
			// }

			if (operation === "delete") {
				if (!item) return
				const deleted = await stripeConfig.products.del(
					// @ts-ignore //todo might cause problems
					item.stripeProductId
				)
			}
		},
	},
})
