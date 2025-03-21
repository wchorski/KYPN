import { permissionsList } from "./permissions"
import type { ListAccessArgs } from "./types"

// At it's simplest, the access control returns a yes or no value depending on the users session

export function isLoggedIn({ session }: ListAccessArgs) {
	return !!session
}

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
		if (!session) return false

		// 2. If not, do they own this item?
		return {
			author: { id: { equals: session?.itemId || "no_session.itemId" } },
		}
	},
	canViewPages({ session }: ListAccessArgs) {
		// 1. Do they have the permission
		if (permissions.canManagePages({ session })) return true
		if (!session) return false

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
					privateAccess: {
						some: { id: { in: [session?.itemId || "no_session.itemId"] } },
					},
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
		//? posts are public. don't need login for guests to view
		// if (!isLoggedIn({ session })) return false;

		if (permissions.canManagePosts({ session })) return true

		return {
			OR: [
				{
					author: { id: { equals: session?.itemId || "no_session.itemId" } },
				},
				{
					privateAccess: {
						some: { id: { in: [session?.itemId || "no_session.itemId"] } },
					},
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
		if (!session) return false

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
	canManageAnnouncements({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		if (permissions.canManageAnnouncements({ session })) return true

		// return false
		return false
	},
	canManageProducts({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageProducts({ session })) return true

		// 2. If not, do they own this item?
		if (session)
			return {
				author: { id: { equals: session.itemId || "no_session.itemId" } },
			}
		return false
	},
	canViewProducts({ session }: ListAccessArgs) {
		// if (!isLoggedIn({ session })) return false;

		if (permissions.canManageProducts({ session })) return true // They can read everything!
		if (!session) return false
		// if(session) return {
		//   OR: [
		//     { author: { id: { equals: session.itemId } } },
		//     { status: { equals: "AVAILABLE" } },
		//     { status: { equals: "PUBLIC" } },
		//     { status: { equals: "OUT_OF_STOCK" } },
		//   ],
		// };
		// ? if anonymous user
		return {
			OR: [
				{ author: { id: { equals: session?.itemId || "no_session.itemId" } } },
				{ status: { equals: "PUBLIC" } },
				{ status: { equals: "OUT_OF_STOCK" } },
			],
		}
	},

	canManageAddons({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageAddons({ session })) return true

		// 2. If not, do they own this item?
		// nobody owns an addon

		// return false
		return false
	},

	canViewAddons({ session }: ListAccessArgs) {
		// if (!isLoggedIn({ session })) return false;

		if (permissions.canManageAddons({ session })) return true // They can read everything!
		// if(!session) return false
		return {
			OR: [
				{ author: { id: { equals: session?.itemId || "no_session.itemId" } } },
				// { status: { equals: "PUBLIC" } },
				// { status: { equals: "OUT_OF_STOCK" } },
				{ status: { in: ["PUBLIC", "OUT_OF_STOCK"] } },
			],
		}
	},

	canManageServices({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		if (permissions.canManageServices({ session })) return true

		return false
	},
	canViewServices({ session }: ListAccessArgs) {
		// if (!isLoggedIn({ session })) return false;

		if (permissions.canManageServices({ session })) return true // They can read everything!
		if (!session) return false
		return {
			OR: [
				{
					employees: {
						some: { id: { in: [session?.itemId || "no_session.itemId"] } },
					},
				},
				{ status: { equals: "PUBLIC" } },
			],
		}
	},

	canViewBookings({ session }: ListAccessArgs) {
		// 1. Do they have the permission
		if (!isLoggedIn({ session })) return false
		if (permissions.canManageBookings({ session })) return true

		// 2. If not, do they own this item?
		if (session)
			return {
				OR: [
					{
						employees: {
							some: {
								id: {
									in: [session?.itemId || "no_session.itemId"],
								},
							},
						},
					},
					{
						employee_requests: {
							some: {
								id: {
									in: [session?.itemId || "no_session.itemId"],
								},
							},
						},
					},
					{
						customer: {
							id: {
								equals: session?.itemId || "no_session.itemId",
							},
						},
					},
				],
			}

		return false
	},

  canViewRentals({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false
		if (permissions.canManageRentals) return true
		if (session)
			return {
				customer: { id: { equals: session.itemId || "no_session_id" } },
			}
		return false
	},
	canManageRentals({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false
		if (permissions.canManageRentals) return true
    //? don't allow customers to update to 'PAID'
		// if (session)
		// 	return {
		// 		customer: { id: { equals: session.itemId || "no_session_id" } },
		// 	}
		return false
	},

	canManageBookings({ session }: ListAccessArgs) {
		// anonymous users can create bookings
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageBookings({ session })) return true

		// 2. If not, are they the customer or employee?
		if (session)
			return {
				OR: [
					{
						employees: {
							some: {
								id: {
									in: [session?.itemId || "no_session.itemId"],
								},
							},
						},
					},
					{
						employee_requests: {
							some: {
								id: {
									in: [session?.itemId || "no_session.itemId"],
								},
							},
						},
					},
					// customer can only view
					// {
					//   customer: {
					//     id: {
					//       equals: session?.itemId || "no_session.itemId",
					//     },
					//   },
					// },
				],
			}

		return false
	},
	canManageAvailability({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageAvailability({ session })) return true
		if (!session) return false
		// 2. If not, do they own this item?
		return {
			employee: { id: { equals: session?.itemId || "no_session.itemId" } },
		}
	},
	canViewAvailability({ session }: ListAccessArgs) {
		// if (!isLoggedIn({ session })) return false;

		// 1. Do they have the permission
		if (permissions.canManageAvailability({ session })) return true
		if (!session) return false
		// 2. If not, do they own this item?
		return {
			employee: { id: { equals: session?.itemId || "no_session.itemId" } },
		}
	},
	canManageLocations({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageLocations({ session })) return true

		// 2. If not, do they own this item?
		return false
	},
	canViewPrivateLocations({ session }: ListAccessArgs) {
		if (permissions.canManageLocations({ session })) return true
		if (permissions.canViewPrivateLocations({ session })) return true

		return { status: { equals: "PUBLIC" } }
		// return {
		// 	OR: [
		// 		// {
		// 		// 	privateAccess: {
		// 		// 		some: { id: { in: [session?.itemId || "no_session.itemId"] } },
		// 		// 	},
		// 		// },
		// 		{ status: { equals: "PUBLIC" } },
		// 	],
		// }
	},

	canManageEvents({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// if(session?.data.isAdmin) return true
		// 1. compair against permissions checkbox
		if (permissions.canManageEvents({ session })) return true
		if (!session) return false
		// 2. If not, are they a host of this event?
		//todo have multiple hosts
		// todo query item.hosts.id and match session.user.id
		// return false
		return {
			hosts: {
				some: {
					id: {
						in: [session.itemId || "no_session.itemId"],
					},
				},
			},
		}
	},
	canViewTickets({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. has role permission?
		if (permissions.canManageTickets({ session })) return true

		if (!session) return false
		if (session.data.role === null) return false

		// 2. are they a host of this event, or tocket holder?
		// ? WATCH YOUR OR: NESTING. lots of {} mistakes happpen

		// TODO if holder is querying
		// filter out if `status` isn't PAID and RSVP
		//? isn't that important as tickets cannot be taken unless paid
		return {
			OR: [
				{
					event: {
						hosts: {
							some: {
								id: {
									in: [session.itemId || "no_session.itemId"],
								},
							},
						},
					},
				},
				{
					holder: {
						id: {
							equals: session.itemId || "no_session.itemId",
						},
					},
				},
			],
		}
		// return { holder: { id: { equals: session?.itemId }} }
	},
	canManageTickets({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. has role permission?
		if (permissions.canManageTickets({ session })) return true

		if (!session) return false
		if (session.data.role === null) return false

		// 2. are they a host of this event, or tocket holder?
		// ? WATCH YOUR OR: NESTING. lots of {} mistakes happpen
		return {
			OR: [
				{
					event: {
						hosts: {
							some: {
								id: {
									in: [session.itemId || "no_session.itemId"],
								},
							},
						},
					},
				},
				//? would allow holder to cheat
				// {
				// 	holder: {
				// 		id: {
				// 			equals: session.itemId || "no_session.itemId",
				// 		},
				// 	},
				// },
			],
		}
		// return { holder: { id: { equals: session?.itemId }} }
	},

	canViewCart({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageCart({ session })) return true
		if (!session) return false
		// 2. If not, do they own this item?
		return { user: { id: { equals: session?.itemId || "no_session.itemId" } } }
	},
	canManageOrders({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false
		if (permissions.canManageOrders({ session })) return true
		return false
	},
	canViewOrders({ session }: ListAccessArgs) {
		if (!session) return false
		if (!isLoggedIn({ session })) return false
		if (permissions.canManageOrders({ session })) return true
		return { user: { id: { equals: session?.itemId || "no_id" } } }
	},
	canViewOrderItems({ session }: ListAccessArgs) {
		if (!session) return false
		if (!isLoggedIn({ session })) return false
		if (permissions.canManageOrders({ session })) return true
		return { order: { user: { id: { equals: session?.itemId || "no_id" } } } }
	},
	canManageOrderItems({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageCart({ session })) return true
		if (!session) return false
		// 2. If not, do they own this item?
		return {
			order: {
				user: { id: { equals: session?.itemId || "no_session.itemId" } },
			},
		}
	},
	canViewSubscriptionPlans({ session }: ListAccessArgs) {
		// if (!isLoggedIn({ session })) return false;

		if (permissions.canManageSubscriptionPlans({ session })) return true // They can read everything!

		// ? if anonymous user
		return {
			OR: [
				{ author: { id: { equals: session?.itemId || "no_session.itemId" } } },
				{ status: { equals: "PUBLIC" } },
				{ status: { equals: "OUT_OF_STOCK" } },
			],
		}
	},
	canManageSubscriptionPlans({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageSubscriptionPlans({ session })) return true

		// 2. If not, do they own this item?
		return false
	},
  // todo this is the same as manager access....
  canViewSubscriptionItems({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false
		if (permissions.canManageSubscriptionItems) return true
		if (session)
			return {
				user: { id: { equals: session.itemId || "no_session_id" } },
			}
		return false
	},
	canManageSubscriptionItems({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageSubscriptionItems({ session })) return true
		// do they own?
		return { user: { id: { equals: session?.itemId || "no_session.itemId" } } }
	},
	canManageCoupons({ session }: ListAccessArgs) {
		if (!isLoggedIn({ session })) return false

		// 1. Do they have the permission
		if (permissions.canManageCoupons({ session })) return true

		// 2. If not, then no
		return false
	},
}
