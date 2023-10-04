import { gql } from "@apollo/client";

export const QUERY_USER_CURRENT = gql`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        email
        id
        isAdmin
        name
        nameLast
        role {
          canManageCart
          canManageOrders
          canManageProducts
          canManageServices
          canManageRoles
          canManageUsers
          canSeeOtherUsers
          canManageTickets
          canManageEvents
          canManagePosts
          canManagePages
          canManageLocations
          canManageTags
          canManageCategories
          canManageSubscriptionPlans
          canManageSubscriptionItems
          canManageCoupons
        }
        tickets {
          event {
            id
            start
            summary
          }
          id
          status
        }
        subscriptions {
          id
          subscriptionPlan {
            id
          }
        }
        cart {
          id
          quantity
          product {
            id
            price
            name
            image
            # photo {
            #   image {
            #     publicUrlTransformed
            #   }
            # }
          }
        }
      }
    }
  }
`