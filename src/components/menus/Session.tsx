// import { useGlobalContext } from "../lib/useSessionContext";
import { gql } from "@apollo/client";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import styles from '@styles/menus/session.module.scss'
import SignOutButton from "./SignOutButton";
import { NavLink } from "./NavLink";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { LoadingAnim } from "@components/elements/LoadingAnim";
import ErrorMessage from "@components/ErrorMessage";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
// import { getClient } from "@lib/gqlClient";


type Props = {
  label:string,
}

export async function SessionBadge({ label, }: Props) {

  const session = await getServerSession(nextAuthOptions)

  if(!session) return <NavLink href="/api/auth/signin"> Login </NavLink>

  return (
    <div className={[styles.session_badge, 'toggle-menu', ].join(' ')} id="session-badge" aria-label='account menu link'>
      
      <NavLink href={`/account`} className="account-toggle">
        <MdAccountCircle />
        <span>{label}</span>
      </NavLink>

      <ul className="sub-menu">
        <li className="name">{session?.user?.name}</li>
        <li className="email">{session?.user?.email}</li>
        <li> <NavLink className="button" href={`/account`}> My Account </NavLink> </li>
        {session?.data.role && (
          <li>
            <NavLink href='/admin' className="button"> Admin Panel </NavLink>
          </li>
        )}
        <li><SignOutButton /></li>
      </ul>
    </div>
  )
}


// export function useSession() {
//   // TODO server side fetching GET THIS WORKING
//   // const client = getClient()
//   // const { data, error, loading } = await client.query({query})

//   const { data, loading, error } = useQuery(QUERY_USER_CURRENT)
//   // console.log({data});
  
//   // const client = getClient()
//   // const { data, error } = await client.query({query})

//   // console.log('++++++ useSession data: ', data);
//   const session = data?.authenticatedItem
//   return {session, loading, error }

//   // const ctx = useGlobalContext()
//   // return ctx?.session
// }

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