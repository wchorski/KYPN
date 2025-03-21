import { list } from "@keystone-6/core"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
} from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"

import { slugFormat } from "../../lib/slugFormat"
import { permissions, rules } from "../access"
import { componentBlocks } from "../blocks"
import type { Lists } from ".keystone/types"

export const Page: Lists.Page = list({
	access: {
		filter: {
			query: rules.canViewPages,
			update: rules.canManagePages,
			delete: rules.canManagePages,
		},
		operation: {
			create: permissions.canManagePages,
			query: () => true,
			update: permissions.canManagePages,
			delete: permissions.canManagePages,
		},
	},

  ui: {
		hideCreate: (args) => !permissions.canManagePages(args),
		hideDelete: (args) => !permissions.canManagePages(args),
		isHidden: (args) => !permissions.canManagePages(args),
	},
  

	fields: {
		title: text({ validation: { isRequired: true, length: { min: 3 } } }),
		slug: text({
			isIndexed: "unique",
			validation: { isRequired: true },
			hooks: {
				resolveInput: ({ inputData, operation }) => {
          
          if (operation === "create") {          
						if (inputData.slug) {
							return slugFormat(inputData.slug)
						} else if (inputData.title) {
							return slugFormat(inputData.title)
						}
					}
				},
			},
			ui: {
				description:
					"Warning! Changing the slug will break links that were previously shared",
			},
		}),
		dateCreated: timestamp({ defaultValue: { kind: "now" }, validation: { isRequired: true }, }),
		dateModified: timestamp({ defaultValue: { kind: "now" }, validation: { isRequired: true }, }),
		status: select({
			options: [
				{ label: "Draft", value: "DRAFT" },
				{ label: "Public", value: "PUBLIC" },
				{ label: "Private", value: "PRIVATE" },
			],
			defaultValue: "DRAFT",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		template: select({
			options: [
				{ label: "Full Width", value: "FULLWIDTH" },
				{ label: "Full Width with Header", value: "FULLWIDTH_WITHHEADER" },
				{ label: "With Sidebar", value: "WITHSIDEBAR" },
				{ label: "With Table of Contents", value: "WITH_TABLEOFCONTENTS" },
				{ label: "Blank", value: "BLANK" },
			],
			defaultValue: "FULLWIDTH",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		pinned: integer({
			defaultValue: 0,
			ui: {
				description:
					'posts with lower number such as "1" will take highest priority (newer date breaks ties)',
			},
		}),
		excerpt: text(),
		featured_image: text(),
		featured_video: text(),

		content: document({
			componentBlocks,
			ui: {
				views: "./src/keystone/blocks",
			},
			// formatting: true,
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
			layouts: [[1], [1, 1], [1, 1, 1], [2, 1], [1, 2], [1, 2, 1]],
			links: true,
			dividers: true,
		}),

		author: relationship({
			ref: "User.pages",

			ui: {
				displayMode: "cards",
				cardFields: ["name", "email"],
				// inlineEdit: { fields: ["name", "email"] },
				linkToItem: true,
				inlineConnect: true,
			},

			many: false,
		}),

		privateAccess: relationship({
			ref: "User.privatePagesAccess",
			ui: {
				description:
					"Users with exclusive permission to view if status is PRIVATE",
			},
			many: true,
		}),
		categories: relationship({
			ref: "Category.pages",
			many: true,
		}),

		tags: relationship({
			ref: "Tag.pages",
			many: true,
		}),
	},
	hooks: {
		beforeOperation: async ({ operation, resolvedData, context, item }) => {
			if (operation === "create") {
				const currUserId = await context.session?.itemId

				if (currUserId && !resolvedData.author) {
					resolvedData.author = { connect: { id: currUserId } }
				}
			}

			if (operation === "update") {
				resolvedData.dateModified = new Date().toISOString()
			}
		},
	},
})
