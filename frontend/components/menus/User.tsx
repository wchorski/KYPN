import { gql, useQuery } from "@apollo/client";
import React from "react"

// export const User = () => {
//   return (
//     <div>User</div>
//   )
// }


export function useUser(){
  const { data } = useQuery(QUERY_USER_CURRENT)

  return data?.authenticatedItem
}

export const QUERY_USER_CURRENT = gql`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        email
        id
        isAdmin
        name
        # query cart
      }
    }
  }
`