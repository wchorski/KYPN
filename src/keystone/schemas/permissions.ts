import { checkbox } from "@keystone-6/core/fields"
//! When you add a field here also add it to these files below
//! `session.ts` `userQuery` object on top
//! `/types/next-auth.d.ts` under `role:`
//! `fetchUserById.ts` query
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
  canManageCategories: checkbox({
    defaultValue: false,
    label: 'Categories Manager: Can see and manage any category',
  }),
  canManageTags: checkbox({
    defaultValue: false,
    label: 'Tags Manager: Can see and manage any tag',
  }),
  canManageAnnouncements: checkbox({
    defaultValue: false,
    label: 'Announcements Manager: Can see and manage any Announcement',
  }),
}

export type Permission = keyof typeof permissionFields

export const permissionsList: Permission[] = Object.keys(
	permissionFields
) as Permission[]
