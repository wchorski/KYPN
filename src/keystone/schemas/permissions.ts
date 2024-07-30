import { checkbox } from "@keystone-6/core/fields"

export const permissionFields = {
	canSeeOtherUsers: checkbox({
		defaultValue: false,
		label: "Users Viewer: Can query any User",
	}),
	canManageUsers: checkbox({
		defaultValue: false,
		label: "Users Manager: Can edit any User",
	}),
	canManageRoles: checkbox({
		defaultValue: false,
		label: "Roles Manager: Can create / read / update / delete any Role",
	}),
	canManagePages: checkbox({
		defaultValue: false,
		label: "Pages Manager: Can see and manage any page",
	}),
	canManagePosts: checkbox({
		defaultValue: false,
		label: "Posts Manager: Can see and manage any post",
	}),
}

export type Permission = keyof typeof permissionFields

export const permissionsList: Permission[] = Object.keys(
	permissionFields
) as Permission[]
