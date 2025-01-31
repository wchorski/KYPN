import { graphql, group, list } from "@keystone-6/core"
// @ts-ignore
import type { Lists } from ".keystone/types"
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
import { timesArray } from "../../lib/timeArrayCreator"
import { permissions, rules } from "../access"
import { componentBlocks } from "../../keystone/blocks"
import { envs } from "../../../envs"
import { stripeArchiveProduct, stripeProductDelete, stripeServiceCreate } from "../../lib/stripe"

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
		name: text({ isIndexed: "unique", validation: { isRequired: true } }),
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
				dateCreated: timestamp({ defaultValue: { kind: "now" } }),
				dateModified: timestamp({ defaultValue: { kind: "now" } }),
			},
		}),
	},
	hooks: {
		// beforeOperation: async ({ operation, item, resolvedData }) => {
		// },
		async afterOperation({ operation, item, resolvedData, originalItem }) {
			if (operation === "create") {
				const { id, price, name, excerpt, status, authorId, image } = item
				await stripeServiceCreate({
					id,
					name,
					excerpt,
					category: "unknown",
					status,
					authorId: authorId || "no_author_id",
					type: "service",
					image,
					price,
					//TODO if incremental payment split price over x months
					// billing_interval: "month",
					url: envs.FRONTEND_URL + `/services/${id}`,
				})
					.then((stripeRes) => {
						if (!stripeRes) return
						resolvedData.stripeProductId = stripeRes.id
						resolvedData.stripePriceId = String(stripeRes.default_price)
					})
					.catch((error) => {
						throw new Error("!!! Service.ts: Stripe Create Product, ", error)
					})
			}
			if (operation === "update") {
				console.log("🐸🐸🐸 update stripe service product")
			}
			if (operation === "delete") {
				
				//? stripe. deleting product is not recommended
				// as product history will also be erased
				// await stripeProductDelete(originalItem.stripeProductId)
				await stripeArchiveProduct(originalItem.stripeProductId)
			}
		},
	},
})
