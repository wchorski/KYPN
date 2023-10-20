import { gql } from "graphql-request"
import { getClient } from "@lib/gqlClient"

export async function fetchUserById(id:string){

  try {
    const client = getClient()
    const { data } = await client.query({query, 
      variables: { where: { id: id } }
    })

    return {data}
    
  } catch (error) {
    console.log('fetch user by ID: ', error);
    return {error}
  }
}

export const query = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      nameLast
      email
      isAdmin
      isActive
      image
      posts {
        id
        status
        slug
        title
        featured_image
        excerpt
        dateCreated
      }
      tickets {
        id
        status
        holder{
          id
        }
        event {
          summary
          id
          start
          end
          location {
            name
            id
            address
          }
        }
      }
      role {
        id
        name
        canManageProducts
        canSeeOtherUsers
        canManageUsers
        canManageRoles
        canManageCart
        canManageOrders
      }
      dateCreated
      dateModified
    }
  }
`