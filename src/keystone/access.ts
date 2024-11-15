import { includes } from "fp-ts/lib/string"
import { permissionsList } from "./schemas/permissions"
import { ListAccessArgs } from "./types"

// At it's simplest, the access control returns a yes or no value depending on the users session

export function isLoggedIn({ session }: ListAccessArgs) {
	return !!session
}

// export const roles = {
//   isLoggedIn({ session }: ListAccessArgs) {
//       return !!session;
//   },

//   isAdmin({session}:ListAccessArgs){

//     return true
//   }
// }

const generatedPermissions = Object.fromEntries(
	permissionsList.map((permission: any) => [
		permission,
		function ({ session }: ListAccessArgs) {
			// @ts-ignore
			return !!session?.data.role?.[permission]
		},
	])
)

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
	...generatedPermissions,
}

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
	canManagePages({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManagePages({ session })) return true

		// 2. If not, do they own this item?
		return {
			author: { id: { equals: session?.itemId || "no_session.itemId" } },
		}
	},
	canViewPages({ session }: ListAccessArgs) {
		// 1. Do they have the permission
		if (permissions.canManagePages({ session })) return true

		//todo get rid of comment if good
		// 2. If not, do they own this item?
		// if (session)
		// 	return {
		// 		author: { id: { equals: session?.itemId || "no_session.itemId" } },
		// 	}
		// return { status: { equals: "PUBLIC" } }
		return {
			OR: [
				{
					author: { id: { equals: session?.itemId || "no_session.itemId" } },
				},
				{
					privateAccess: { some: { id: { in: [session?.itemId || "no_session.itemId"] } } },
				},
				{ status: { equals: "PUBLIC" } },
			],
		}
	},
	canManagePosts({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManagePosts({ session })) return true

		// 2. If not, do they own this item?
		return {
			author: { id: { equals: session?.itemId || "no_session.itemId" } },
		}
	},
	canViewPosts({ session }: ListAccessArgs) {
		// if (!isLoggedIn({ session })) return false;

		// 1. Do they have the permission
		if (permissions.canManagePosts({ session })) return true

		//todo get rid of comment if good
		// 2. If not, do they own this item?
		// if (session)
		//? i don't need `if` statement i guess?
		return {
			OR: [
				{
					author: { id: { equals: session?.itemId || "no_session.itemId"} },
				},
        {
					privateAccess: { some: { id: { in: [session?.itemId || "no_session.itemId"] } } },
				},
				{ status: { equals: "PUBLIC" } },
			],
		}

		//todo get rid of comment if good
		// return { status: { equals: "PUBLIC" } }
	},

	canManageUsers({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		if (permissions.canManageUsers({ session })) return true

		// Otherwise they may only update themselves!
		return { id: { equals: session?.itemId || "no_session.itemId" } }
	},
	canManageCategories({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageCategories({ session })) return true

		// 2. If not, do they own this item?
		// nobody owns

		// return false
		return false
	},
	canManageTags({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageTags({ session })) return true

		// 2. If not, do they own this item?
		// nobody owns

		// return false
		return false
	},
}
