import { gql, useQuery } from "@apollo/client"
import { User } from "../../lib/types"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import { AccountDetails } from "../menus/AccountDetails"
import EventList from "../events/EventList"
import { UserEvents } from "./UserEvents"


export function UserSingle({id}:{id:string}) {  

  const { loading, error, data } = useQuery(
    QUERY_USER_SINGLE, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  
  const {name, email, isAdmin, tickets, dateCreated, dateModified,}:User = data?.user
  

  return (
    <>
      <section>
        <AccountDetails {...data.user}/>
      </section>

      <hr />
      
      <section className="admin-panel">
        <h2>Admin Events Quick Edit</h2>
        <UserEvents user={data.user}/>
      </section>
    </>
  )
}


export const QUERY_USER_SINGLE = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      nameLast
      email
      isAdmin
      isActive
      tickets {
        id
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