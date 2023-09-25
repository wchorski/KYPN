import { useRouter } from "next/router";
import { EventCreateUpdateForm } from "../../../components/events/EventCreateUpdateForm";
import { QUERY_EVENT } from "../../../components/events/EventSingle";
import { QueryLoading } from "../../../components/menus/QueryLoading";
import ErrorMessage from "../../../components/ErrorMessage";
import { gql, useQuery } from "@apollo/client";
import { Location } from "../../../lib/types"

export default function EventEditById() {
  
  const router = useRouter()

  const { loading, error, data } = useQuery(
    QUERY_EVENT, {
    variables: { where: { id: router.query.id } }
  })
  const { loading: loadingLocations, error: errorLocations, data: dataLocations } = useQuery(QUERY_LOCATIONS)
  
  function getLocationOptions(locations:Location[]){
    return dataLocations.locations.map((loc:Location) => ({value: loc.id, label: loc.name}))
  }

  if (loading || loadingLocations) return <QueryLoading />
  if (error || errorLocations) return <ErrorMessage error={error || errorLocations} />

  return (
    <>
      <h1> Edit Event </h1>
      <EventCreateUpdateForm 
        event={data.event || undefined} 
        locationOptions={getLocationOptions(dataLocations)}
      />
    </>
  )
}

export const QUERY_LOCATIONS = gql`
  query Locations {
    locations {
      id
      name
    }
  }
`