import { gql, useQuery } from "@apollo/client"
import { User } from "../../lib/types"
import { QueryLoading } from "../menus/QueryLoading"
import ErrorMessage from "../ErrorMessage"
import { AccountDetails } from "../menus/AccountDetails"
import EventList from "../events/EventList"
import { UserEvents } from "./UserEvents"
import { useUser } from "../menus/Session"


export function UserSingle({id}:{id:string}) {  

  const session:User =  useUser()

  const { loading, error, data } = useQuery(
    QUERY_USER_SINGLE, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  
  const {name, email, isAdmin, tickets, dateCreated, dateModified,}:User = data?.user
  

  return (
    <>
      <section className="pad">
        <AccountDetails {...data.user}/>
      </section>

      <hr />
      
      {session && session.role?.canManageTickets && (
        <section className="admin-panel marg">
          <h2>Admin Events Quick Edit</h2>
          <UserEvents user={data.user}/>
        </section>
      )}
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