import { gql } from "@apollo/client"

export default function EventSingle({id}:{id:string}) {
  return (
    <div>EventSingle {id}</div>
  )
}


const QUERY_EVENT = gql`
  query Event($where: EventWhereUniqueInput!) {
    event(where: $where) {
      categories {
        id
        name
      }
      categoriesCount
      dateCreated
      dateModified
      employees {
        email
        id
        name
      }
      end
      id
      location {
        address
        name
        id
      }
      price
      seats
      start
      status
      summary
      tags {
        id
        name
      }
      tagsCount
      ticketsCount
    }
  }
`