// import { useGlobalContext } from "../lib/useSessionContext";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import styled from "styled-components";

// export const User = () => {
//   return (
//     <div>User</div>
//   )
// }

export function SessionBadge({ session }: any) {

  return (
    <StyledSessionBadge>
      <ul>
        <li><Link href={`/account`}> My Account </Link> </li>
        <li>{session.name}</li>
        <li>{session.email}</li>
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
        role {
          canManageCart
          canManageOrders
          canManageProducts
          canManageRoles
          canManageUsers
          canSeeOtherUsers
        }
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
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
  ul{
    display: flex;
    flex-direction: column;
  }

  a{
    padding: 0 !important;
    margin: 0;
  }
`