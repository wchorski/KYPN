import { list } from "@keystone-6/core"
// @ts-ignore
import type { Lists } from ".keystone/types"
import { allowAll } from "@keystone-6/core/access"
import {
	relationship,
	select,
	text,
	timestamp,
	integer,
} from "@keystone-6/core/fields"
import { permissions, rules } from "../access"
import { slugFormat } from "../../lib/slugFormat"

export const Category: Lists.Category = list({
	access: {
		filter: {
			query: () => true,
			update: rules.canManageCategories,
			delete: rules.canManageCategories,
		},
		operation: {
			create: permissions.canManageCategories,
			query: () => true,
			update: permissions.canManageCategories,
			delete: permissions.canManageCategories,
		},
	},
	ui: {
		hideCreate: (args) => !permissions.canManageCategories(args),
		hideDelete: (args) => !permissions.canManageCategories(args),
		// isHidden: (args) => !permissions.canManageCategories(args),

		itemView: {
			defaultFieldMode: ({ session, context, item }) => {
				if (permissions.canManageCategories({ session, context, item })) return "edit"
				return "read"
			},
		},
	},
	fields: {
		name: text({
			isIndexed: "unique",
			validation: { isRequired: true },
			hooks: {
				beforeOperation({ resolvedData }) {
					if (!resolvedData?.name) return console.log("Category: no name")
					resolvedData.name = slugFormat(String(resolvedData.name))
				},
			},
		}),
		// todo make status 'DRAFT' 'PUBLIC' etc
		excerpt: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		posts: relationship({ ref: "Post.categories", many: true }),
		pages: relationship({ ref: "Page.categories", many: true }),
    addons: relationship({ ref: 'Addon.categories', many: true }),
    services: relationship({ ref: 'Service.categories', many: true }),
    locations: relationship({ ref: 'Location.categories', many: true }),
    products: relationship({ ref: 'Product.categories', many: true }),
    subscriptionPlans: relationship({ ref: 'SubscriptionPlan.categories', many: true }),
    events: relationship({ ref: 'Event.categories', many: true }),
	},
})
