import { gql, useQuery } from "@apollo/client";
import ErrorMessage from "../../components/ErrorMessage";
import { EventCreateUpdateForm } from "../../components/events/EventCreateUpdateForm";
import { QueryLoading } from "../../components/menus/QueryLoading";
import { Location } from "../../lib/types"

export default function EventCreate() {

  const { loading: loadingLocations, error: errorLocations, data: dataLocations } = useQuery(QUERY_LOCATIONS)
  function getLocationOptions(locations:Location[]){
    return dataLocations.locations.map((loc:Location) => ({value: loc.id, label: loc.name}))
  }

  if (loadingLocations) return <QueryLoading />
  if (errorLocations) return <ErrorMessage error={errorLocations} />
  
  return (
    <>
      <EventCreateUpdateForm locationOptions={getLocationOptions(dataLocations)} />
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