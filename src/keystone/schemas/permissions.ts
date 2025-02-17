import { checkbox } from "@keystone-6/core/fields"
import { group } from "@keystone-6/core"
//! When you add a field here also add it to these files below
//! `session.ts` `userQuery` object on top
//! `/types/next-auth.d.ts` under `role:`
//! `fetchUserById.ts` query
export const permissionFields = {
	canViewUsers: checkbox({
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
	...group({
		label: "Pages & Posts",
		// description: 'Group description',
		fields: {
			canManagePages: checkbox({
				defaultValue: false,
				label: "Pages Manager: Can see and manage any page",
			}),
			canManagePosts: checkbox({
				defaultValue: false,
				label: "Posts Manager: Can see and manage any post",
			}),
			canCreatePosts: checkbox({
				defaultValue: false,
				label: "Posts Create: Can create and edit their own authored posts",
			}),
			canManageAnnouncements: checkbox({
				defaultValue: false,
				label: "Announcements Manager: Can see and manage any Announcement",
			}),
		},
	}),
	...group({
		label: "eCommerce",
		// description: 'Group description',
		fields: {
			canManageProducts: checkbox({
				defaultValue: false,
				label: "Products Manager: Can update and delete any product",
			}),
			canViewProducts: checkbox({
				defaultValue: false,
				label:
					'Products Viewer: Read any product (even if the product is "Draft" or "Private") ',
			}),
			canManageAddons: checkbox({
				defaultValue: false,
				label: "Add-ons Manager: Can update and delete any addon",
			}),
			canManageBookings: checkbox({
				defaultValue: false,
				label: "Bookings Manager: Can update and delete any booking",
			}),
      canManageEvents: checkbox({
        defaultValue: false,
        label: "Events Manager: Can update and delete any event",
      }),
      canManageTickets: checkbox({
        defaultValue: false,
        label: "Tickets Manager: Can update and delete any Ticket",
      }),
      canManageCart: checkbox({
        defaultValue: false,
        label: "Cart Manager: Can see and manage any Cart or Cart Item",
      }),
      canManageOrders: checkbox({
        defaultValue: false,
        label: "Orders Manager: Can see and manage any Order",
      }),
      canManageServices: checkbox({
        defaultValue: false,
        label: "Services Manager: Can see and manage any service",
      }),
      canManageSubscriptionPlans: checkbox({
        defaultValue: false,
        label:
          "Subscription Plans Manager: Can see and manage any Subscription Plan offered",
      }),
      canManageSubscriptionItems: checkbox({
        defaultValue: false,
        label:
          "Subscription Item Manager: Can see and manage any current running subscriptions",
      }),
      canManageCoupons: checkbox({
        defaultValue: false,
        label: "Coupons Manager: Can create / delete coupons",
      }),
      canManageRentals: checkbox({
        defaultValue: false,
        label: "Rentals Manager: View, Create, Update, Delete all rentals"
      })
		},
	}),
	canManageAvailability: checkbox({
		defaultValue: false,
		label: "Availability Manager: Can update and delete any Availability",
	}),
	canCreateAvailability: checkbox({
		defaultValue: false,
		label: "Availability: Can create own Availability",
	}),
	
	canManageLocations: checkbox({
		defaultValue: false,
		label: "Locations Manager: Can see and manage any location",
	}),
	canViewPrivateLocations: checkbox({
		defaultValue: false,
		label: "Locations View: Can view PRIVATE Locations",
	}),
	...group({
		label: "Metadata",
		// description: 'Group description',
		fields: {
			canManageCategories: checkbox({
				defaultValue: false,
				label: "Categories Manager: Can manage any category",
			}),
			canManageTags: checkbox({
				defaultValue: false,
				label: "Tags Manager: Can manage any tag",
			}),
		},
	}),
}

export type Permission = keyof typeof permissionFields

export const permissionsList: Permission[] = Object.keys(
	permissionFields
) as Permission[]
