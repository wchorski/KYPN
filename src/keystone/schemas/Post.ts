import { graphql, group, list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import { allowAll } from "@keystone-6/core/access"
import {
	relationship,
	select,
	text,
	timestamp,
	integer,
	checkbox,
	virtual,
} from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"
import { componentBlocks } from "../blocks"
import { permissions, rules } from "../access"
import { slugFormat } from "../../lib/slugFormat"

export const Post: Lists.Post = list({
	access: {
		filter: {
			query: rules.canViewPosts,
			update: rules.canManagePosts,
			delete: rules.canManagePosts,
		},
		operation: {
			create: permissions.canCreatePosts,
			query: () => true,
			update: permissions.canManagePosts,
			delete: permissions.canManagePosts,
		},
	},

	ui: {
		hideCreate: (args) => !permissions.canCreatePosts(args),
		hideDelete: (args) => !permissions.canCreatePosts(args),
		// isHidden: (args) => !permissions.canManagePosts(args),
		itemView: {
			defaultFieldMode: ({ session, context, item }) => {
				if (permissions.canManagePosts({ session, context, item }))
					return "edit"
				if (session.itemId === item.authorId) return "edit"
				return "read"
			},
		},
		listView: {
			// todo how to hide list items if `session.itemId` === `item.authorId`
			// defaultFieldMode: ({session, context}) => {
			//   // if(permissions.canManagePosts({session, context})) return 'read'
			//   // if(session.itemId === item.authorId) return 'edit'
			//   return 'hidden'
			// },
			initialColumns: [
				"title",
				"status",
				"dateCreated",
				"dateModified",
				"author",
			],
			initialSort: { field: "dateCreated", direction: "DESC" },
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "post"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
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
				{ label: "With Sidebar", value: "WITHSIDEBAR" },
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
		excerpt: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		featured_image: text(),
		featured_video: text({
			ui: { description: "text here will override Featured Image" },
		}),
		// allow_comments: checkbox(),

		// the document field can be used for making rich editable content
		//   you can find out more at https://keystonejs.com/docs/guides/document-fields,
		content: document({
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
			layouts: [[1], [1, 1], [1, 1, 1], [2, 1], [1, 2], [1, 2, 1]],
			links: true,
			dividers: true,
		}),
		author: relationship({
			ref: "User.posts",
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
			ref: "User.privatePostsAccess",
			ui: {
				description:
					"Users with exclusive permission to view if status is PRIVATE",
			},
			many: true,
		}),
		...group({
			label: "Metadata",
			// description: 'Group description',

			fields: {
				categories: relationship({
					ref: "Category.posts",
					many: true,
				}),
				tags: relationship({
					ref: "Tag.posts",
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
