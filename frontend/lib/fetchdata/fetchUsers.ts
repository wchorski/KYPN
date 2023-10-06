import { gql } from "@apollo/client"
import { envvars } from "@lib/envvars"
import { getClient } from "@lib/gqlClient"

export async function fetchUsers(page = 1, perPage = 25 ){

  try {
    const client = getClient()
    const { data } = await client.query({query, 
      variables: {
        skip: page * perPage - perPage,
        take: perPage,
        orderBy: [
          {
            name: 'asc'
          }
        ]
      },
    })

    const { users } = data

    return { users }
    
  } catch (error) {
    console.log('fetch user by ID: ', error);
    return {error}
  }
}

const query = gql`
  query Users($take: Int, $skip: Int!, $orderBy: [UserOrderByInput!]!) {
    usersCount
    users(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
      nameLast
      email
      role {
        name
      }
    }
  }
`