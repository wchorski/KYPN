import { graphql, group, list } from "@keystone-6/core"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"

import { isLoggedIn, rules } from "../access"
import { componentBlocks } from "../blocks"
// @ts-ignore
import type { Lists } from ".keystone/types"

export const Event: Lists.Event = list({
	// access: allowAll,
	access: {
		filter: {
			// query: rules.canReadProducts,
			// TODO if private events then create canViewEvents
			query: () => true,

			delete: rules.canManageEvents,

			update: rules.canManageEvents,
		},
		operation: {
			query: () => true,
			create: isLoggedIn,
			update: isLoggedIn,
			delete: isLoggedIn,
		},
	},

	ui: {
		// hide backend from non admins
		listView: {
			initialColumns: [
				"start",
				"summary",
				"location",
				"hosts",
				"status",
				"price",
			],
			initialSort: { field: "start", direction: "DESC" },
      
		},
    
    labelField: `summary`,
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "event"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		summary: text({ validation: { isRequired: true, length: { min: 3 } } }),
		start: timestamp({ validation: { isRequired: true } }),
		end: timestamp({validation: { isRequired: true }}),
		price: integer({ defaultValue: 0, validation: { isRequired: true, min: 0 },  }),
		seats: integer({ validation: { isRequired: true } }),
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
		status: select({
			options: [
				{ label: "Active", value: "ACTIVE" },
				{ label: "Postponed", value: "POSTPONED" },
				{ label: "Canceled", value: "CANCELED" },
				{ label: "Past", value: "PAST" },
				// TODO work in private events that are only viewable by authed users
				// { label: "Private", value: "PRIVATE" },
				{ label: "Draft", value: "DRAFT" },
			],
			defaultValue: "DRAFT",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
		}),
		location: relationship({ ref: "Location.events", many: false }),
		hosts: relationship({ ref: "User.eventsHost", many: true }),
		cohosts: relationship({ ref: "User.eventsCohost", many: true }),
		tickets: relationship({ ref: "Ticket.event", many: true, ui: {displayMode: 'count'} }),
		coupons: relationship({ ref: "Coupon.events", many: true, ui:{ description: 'Coupons that are allowed to apply to this item during checkout'} }),
		...group({
			label: "Metadata",
			// description: 'Group description',

			fields: {
				dateCreated: timestamp({ defaultValue: { kind: "now" }, validation: { isRequired: true }, }),
				dateModified: timestamp({ defaultValue: { kind: "now" }, validation: { isRequired: true }, }),
				categories: relationship({
					ref: "Category.events",
					many: true,
				}),

				tags: relationship({
					ref: "Tag.events",
					many: true,
				}),

        // TODO add as stripe product
        // stripeProductId: text(),
				// stripePriceId: text(),
			},
		}),
	},
})
