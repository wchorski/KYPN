// import { useGlobalContext } from "../lib/useSessionContext";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import styled from "styled-components";
import SignOutButton from "./SignOutButton";
import { LinkActive } from "./LinkActive";

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
    <StyledSessionBadge className={`toggle-menu button `} id="session-badge" aria-label='account menu link'>
      
      <Link href={`/account`} className="button account-toggle">
        <MdAccountCircle />
        <span>{label}</span>
      </Link>

      <ul className="sub-menu">
        <li className="name">{session?.name}</li>
        <li className="email">{session?.email}</li>
        <li><Link href={`/account`}> My Account </Link> </li>
        {session.isAdmin && (
            <li>
              <LinkActive href='/admin' className="button"> Admin Panel </LinkActive>
            </li>
          )}
        <li><SignOutButton /></li>
      </ul>
    </StyledSessionBadge>
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
            description
            image
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`

const StyledSessionBadge = styled.div`
  /* padding: 1em; */
  text-align: right;
  position: relative;
  margin-left: auto;
  background-color: var(--c-primary);
  border-radius: 100px;
  display: flex;
  align-items: center;
  color: var(--c-txt);
  border: none;

  svg{
    margin-right: .5rem;
    font-size: .8rem;
  }


  /* svg{
    font-size: 2rem;
  } */

  ul.sub-menu{
    opacity: 0;
    position: absolute;
    pointer-events: none;
    top: 100%;
    background-color: var(--c-body);
    display: flex;
    flex-direction: column;
    padding: .5em;
    box-shadow: var(--boxs-1);
    transform: translateY(10px);
    transition: all linear .1s;
    right: 0;
    z-index: 999;
    min-width: 20rem;
  }

  li{
    margin-bottom: 1em;
    padding: 0;
    text-align: right;
  }

  li.name{
    margin-bottom: 0;
    font-weight: bold;
  }
  li.email{
    font-size: small;
  }

  a{
    /* padding: 0 !important; */
    margin: 0;
  }

  &:hover, &:focus{
    ul{
      opacity: 1;
      pointer-events: all;
      transform: translateY(0px);
    }
  }
`