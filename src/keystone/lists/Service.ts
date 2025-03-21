import { graphql, group, list } from "@keystone-6/core"
import {
	decimal,
	integer,
	multiselect,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"

import { envs } from "../../../envs"
import { componentBlocks } from "../../keystone/blocks"
import {
	stripeArchiveProduct,
	stripeProductCreate,
	stripeProductUpdate,
} from "../../lib/stripe"
import { timesArray } from "../../lib/timeArrayCreator"
import { permissions, rules } from "../access"
import type { Lists } from ".keystone/types"

export const Service: Lists.Service = list({
	access: {
		filter: {
			query: rules.canViewServices,
			update: rules.canManageServices,
			delete: rules.canManageServices,
		},
		operation: {
			create: permissions.canManageServices,
			query: () => true,
			update: permissions.canManageServices,
			delete: permissions.canManageServices,
		},
	},

	ui: {
		isHidden: (args) => !permissions.canManageServices(args),
		listView: {
			initialColumns: [
				"name",
				"price",
				"durationInHours",
				"status",
				"dateCreated",
			],
			initialSort: { field: "dateCreated", direction: "DESC" },
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "service"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		name: text({ isIndexed: "unique", validation: { isRequired: true, length: { min: 3 } } }),
		image: text(),
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
		price: integer({
			defaultValue: 0,
			validation: { isRequired: true, min: 0 },
		}),
		durationInHours: decimal({
			defaultValue: "6",
			precision: 5,
			scale: 2,
			validation: {
				isRequired: true,
				max: "24",
				min: ".25",
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
		buisnessDays: multiselect({
			type: "integer",
			options: [
				{ label: "Sunday", value: 0 },
				{ label: "Monday", value: 1 },
				{ label: "Tuesday", value: 2 },
				{ label: "Wednesday", value: 3 },
				{ label: "Thursday", value: 4 },
				{ label: "Friday", value: 5 },
				{ label: "Saturday", value: 6 },
			],
			defaultValue: [0, 1, 2, 3, 4, 5, 6],
		}),
		// todo create a status like AVAILABILE, PRIVATE, MEMBERSONLY, etc
		status: select({
			options: [
				{ label: "Draft", value: "DRAFT" },
				{ label: "Private", value: "PRIVATE" },
				{ label: "Public", value: "PUBLIC" },
			],
			defaultValue: "DRAFT",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
		}),
		addons: relationship({ ref: "Addon.services", many: true }),
		employees: relationship({ ref: "User.servicesProvided", many: true }),
		locations: relationship({ ref: "Location.services", many: true }),
		bookings: relationship({ ref: "Booking.service", many: true }),
		coupons: relationship({
			ref: "Coupon.services",
			many: true,
			ui: {
				description:
					"Coupons that are allowed to apply to this item during checkout",
			},
		}),
		author: relationship({
			ref: "User.servicesAuthored",
			ui: {
				displayMode: "cards",
				cardFields: ["name", "email"],
				// inlineEdit: { fields: ["name", "email"] },
				linkToItem: true,
				inlineConnect: true,
			},
			many: false,
		}),
		stripeProductId: text(),
		stripePriceId: text(),
		...group({
			label: "Metadata",
			// description: 'Group description',

			fields: {
				categories: relationship({
					ref: "Category.services",
					many: true,
				}),

				tags: relationship({
					ref: "Tag.services",
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
			delete: async ({ originalItem }) => {
				await stripeArchiveProduct(originalItem.stripeProductId)
			},
		},
	},
})
