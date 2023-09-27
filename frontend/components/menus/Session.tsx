'use client'
// import { useGlobalContext } from "../lib/useSessionContext";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import styles from '@styles/menus/session.module.scss'
import SignOutButton from "./SignOutButton";
import { NavLink } from "./NavLink";

// export const User = () => {
//   return (
//     <div>User</div>
//   )
// }

type Props = {
  session:any,
  label:string,
}

export function SessionBadge({ session, label, }: Props) {

  return (
    <div className={[styles.session_badge, 'toggle-menu', 'button'].join(' ')} id="session-badge" aria-label='account menu link'>
      
      <Link href={`/account`} className="button account-toggle">
        <MdAccountCircle />
        <span>{label}</span>
      </Link>

      <ul className="sub-menu">
        <li className="name">{session?.name}</li>
        <li className="email">{session?.email}</li>
        <li> <Link className="button" href={`/account`}> My Account </Link> </li>
        {session.isAdmin && (
            <li>
              <NavLink href='/admin' className="button"> Admin Panel </NavLink>
            </li>
          )}
        <li><SignOutButton /></li>
      </ul>
    </div>
  )
}


export function useUser() {
  // TODO GET THIS WORKING
  const { data } = useQuery(QUERY_USER_CURRENT)
  // console.log('++++++ useUser, ', data);
  return data?.authenticatedItem

  // const ctx = useGlobalContext()
  // return ctx?.session
}

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