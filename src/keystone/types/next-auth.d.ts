// cred - https://stackoverflow.com/questions/69602694/how-to-update-the-type-of-session-in-session-callback-in-next-auth-when-using-ty

import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      name: string,
      nameLast:string,
      email:string,
      id:string,
    }
    itemId:string,
    authId:string,
    role: {
      id:string,
      name:string,
      canManageProducts:boolean,
      canManageAddons:boolean,
      canManageBookings:boolean,
      canManageAvailability:boolean,
      canManageEvents:boolean,
      canManageAnnouncements:boolean,
      canManageTickets:boolean,
      canSeeOtherUsers:boolean,
      canManagePosts:boolean,
      canManageUsers:boolean,
      canManageRoles:boolean,
      canManageCart:boolean,
      canManageOrders:boolean,
      canManageCategories:boolean,
      canManageTags:boolean,
      canManageLocations:boolean,
      canManagePages:boolean,
      canManageServices:boolean,
      canManageSubscriptionPlans:boolean,
      canManageSubscriptionItems:boolean,
      canManageCoupons:boolean,
    }
  }
}