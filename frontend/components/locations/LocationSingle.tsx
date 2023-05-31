import { gql, useQuery } from "@apollo/client"
import styled from "styled-components"
import ErrorMessage from "../ErrorMessage"
import { QueryLoading } from "../menus/QueryLoading"
import { Location } from "../../lib/types"


export function LocationSingle({id}:{id:string}) {

  const { loading, error, data } = useQuery(
    QUERY_LOCATION, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  // console.log(data);
  // console.log(id);
  if(!data.location) return <p> 404: Event not found </p>
  const {id: locationId, name, address, rooms, events, categories, tags}:Location = data?.location

  return (
    <StyledLocation>
      <ul>
        <li>{locationId}</li>
        <li>{name}</li>
        <li>{address}</li>
        <li>{rooms}</li>
      </ul>
    </StyledLocation>
  )
}

const StyledLocation = styled.article`
  
`

const QUERY_LOCATION = gql`
  query Location($where: LocationWhereUniqueInput!) {
    location(where: $where) {
      id
      name
      address
      rooms
      events {
        id
        summary
        start
      }
      categories {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`