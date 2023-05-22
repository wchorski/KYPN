import { gql, useQuery } from "@apollo/client"
import { User } from "../../lib/types"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import { AccountDetails } from "../menus/AccountDetails"


export function UserSingle({id}:{id:string}) {  

  const { loading, error, data } = useQuery(
    QUERY_USER_SINGLE, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  console.log(data);
  
  const {name, email, isAdmin, tickets, dateCreated, dateModified,}:User = data?.user
  

  return (
    <div>
      <AccountDetails />
    </div>
  )
}


const QUERY_USER_SINGLE = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      email
      isAdmin
      isActive
      tickets {
        id
        event {
          summary
          id
          location {
            name
            id
            address
          }
        }
        status
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