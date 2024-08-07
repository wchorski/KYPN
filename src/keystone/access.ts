import { permissionsList } from "./schemas/permissions";
import { ListAccessArgs } from "./types";
// At it's simplest, the access control returns a yes or no value depending on the users session

export function isLoggedIn({ session }: ListAccessArgs) {
  return !!session;
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
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  // can manage products, or just their own authored products
  canManageProducts({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageProducts({ session })) return true;

    // 2. If not, do they own this item?
    if (session) return { author: { id: { equals: session.itemId } } };
    return false;
  },
  canViewProducts({ session }: ListAccessArgs) {
    // if (!isLoggedIn({ session })) return false;

    if (permissions.canManageProducts({ session })) return true; // They can read everything!

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
    };
  },

  canManageAddons({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageAddons({ session })) return true;

    // 2. If not, do they own this item?
    // nobody owns an addon

    // return false
    return false;
  },

  canViewAddons({ session }: ListAccessArgs) {
    // if (!isLoggedIn({ session })) return false;

    if (permissions.canManageAddons({ session })) return true; // They can read everything!

    return {
      OR: [
        { author: { id: { equals: session?.itemId || "no_session.itemId" } } },
        { status: { equals: "PUBLIC" } },
        { status: { equals: "OUT_OF_STOCK" } },
      ],
    };
  },

  canManageServices({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    if (permissions.canManageServices({ session })) return true;

    return false;
  },
  canViewServices({ session }: ListAccessArgs) {
    // if (!isLoggedIn({ session })) return false;

    if (permissions.canManageServices({ session })) return true; // They can read everything!
    
    return {
      OR: [
        { employees: { some: { id: { in: [session?.itemId || "no_session.itemId"] } } } },
        { status: { equals: "PUBLIC" } },
      ],
    };
  },

  canViewBookings({ session }: ListAccessArgs){
      // 1. Do they have the permission
      if (!isLoggedIn({ session })) return false;
      if (permissions.canManageBookings({ session })) return true;
  
      // 2. If not, do they own this item?
      if(session) return {
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
      };
  
      return false
  },

  canManageBookings({ session }: ListAccessArgs) {
    // anonymous users can create bookings
    // if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageBookings({ session })) return true;
    
    // 2. If not, are they the customer or employee?
    if(session) return {
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
    };

    return false
  },
  canManageAvailability({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageAvailability({ session })) return true;

    // 2. If not, do they own this item?
    return {
      employee: { id: { equals: session?.itemId || "no_session.itemId" } },
    };
  },
  canViewAvailability({ session }: ListAccessArgs) {
    // if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageAvailability({ session })) return true;

    // 2. If not, do they own this item?
    return {
      employee: { id: { equals: session?.itemId || "no_session.itemId" } },
    };
  },
  canManagePages({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManagePages({ session })) return true;

    // 2. If not, do they own this item?
    return {
      author: { id: { equals: session?.itemId || "no_session.itemId" } },
    };
  },
  canViewPages({ session }: ListAccessArgs) {
    // 1. Do they have the permission
    if (permissions.canManagePages({ session })) return true;

    // 2. If not, do they own this item?
    if (session)
      return {
        author: { id: { equals: session?.itemId || "no_session.itemId" } },
      };
    return { status: { equals: "PUBLIC" } };
    //? `OR` is not working the way i thought it would
    // return {
    //   OR: [
    // {
    //   status: { equals: "PUBLIC" }
    // },
    //     { author: { id: { equals: session?.itemId } } },
    //   ],
    // };
  },
  canManagePosts({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManagePosts({ session })) return true;

    // 2. If not, do they own this item?
    return {
      author: { id: { equals: session?.itemId || "no_session.itemId" } },
    };
  },
  canViewPosts({ session }: ListAccessArgs) {
    // if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManagePosts({ session })) return true;

    // 2. If not, do they own this item?
    if (session)
      return {
        author: { id: { equals: session?.itemId || "no_session.itemId" } },
      };
    return { status: { equals: "PUBLIC" } };
  },
  canManageLocations({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageLocations({ session })) return true;

    // 2. If not, do they own this item?
    return false;
  },

  canManageEvents({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // if(session?.data.isAdmin) return true
    // 1. compair against permissions checkbox
    if (permissions.canManageEvents({ session })) return true;

    // 2. If not, are they a host of this event?
    //todo have multiple hosts
    // todo query item.hosts.id and match session.user.id
    // return false
    return {
      hosts: {
        some: {
          id: {
            in: [session?.itemId],
          },
        },
      },
    };
  },

  canManageAnnouncements({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    if (permissions.canManageAnnouncements({ session })) return true;

    // return false
    return false;
  },

  canManageTickets({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. has role permission?
    if (permissions.canManageTickets({ session })) return true;

    if (!session) return false;

    // 2. are they a host of this event, or tocket holder?
    // ? WATCH YOUR OR: NESTING. lots of {} mistakes happpen
    return {
      OR: [
        {
          event: {
            hosts: {
              some: {
                id: {
                  in: [session.itemId],
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
    };
    // return { holder: { id: { equals: session?.itemId }} }
  },

  canOrder({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageCart({ session })) return true;

    // 2. If not, do they own this item?
    return { user: { id: { equals: session?.itemId || "no_session.itemId" } } };
  },
  canManageOrders({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;
    if (permissions.canManageOrders({ session })) return true;
    return false;
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageCart({ session })) return true;

    // 2. If not, do they own this item?
    return {
      order: {
        user: { id: { equals: session?.itemId || "no_session.itemId" } },
      },
    };
  },

  canManageUsers({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    if (permissions.canManageUsers({ session })) return true;

    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } };
  },

  canManageCategories({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageCategories({ session })) return true;

    // 2. If not, do they own this item?
    // nobody owns

    // return false
    return false;
  },
  canManageTags({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageTags({ session })) return true;

    // 2. If not, do they own this item?
    // nobody owns

    // return false
    return false;
  },
  canManageSubscriptionPlans({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageSubscriptionPlans({ session })) return true;

    // 2. If not, do they own this item?
    return false;
  },
  canManageCoupons({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageCoupons({ session })) return true;

    // 2. If not, then no
    return false;
  },
  canManageSubscriptionItems({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission
    if (permissions.canManageSubscriptionPlans({ session })) return true;

    // do they own?
    return { user: { id: { equals: session?.itemId || "no_session.itemId" } } };
  },
};
