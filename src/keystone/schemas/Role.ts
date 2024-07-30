import { list } from "@keystone-6/core"
// @ts-ignore
import type { Lists } from ".keystone/types"
import { allowAll } from "@keystone-6/core/access"
import { checkbox, relationship, text } from "@keystone-6/core/fields"
import { permissions } from "../access"
import { permissionFields } from "./permissions"
// import { permissionFields } from "./authFields";

// @ts-ignore
export const Role: Lists.Role = list({
	access: {
		operation: {
			query: () => true,
			// query: permissions.canManageRoles,
			create: permissions.canManageRoles,
			delete: permissions.canManageRoles,
			update: permissions.canManageRoles,
		},
	},
	ui: {
		hideCreate: (args) => !permissions.canManageRoles(args),
		hideDelete: (args) => !permissions.canManageRoles(args),
		isHidden: (args) => !permissions.canManageRoles(args),
		listView: {
			initialColumns: ["label", "assignedTo", "role"],
			initialSort: { field: "label", direction: "DESC" },
		},
	},
	fields: {
		name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
		label: text({ validation: { isRequired: true }, isIndexed: "unique" }),
		...permissionFields,
		assignedTo: relationship({
			ref: "User.role",
			many: true,
			ui: {
				itemView: { fieldMode: "edit" },
			},
		}),
	},
})
