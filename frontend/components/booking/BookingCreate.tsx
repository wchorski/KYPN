import { gql, useQuery } from "@apollo/client";
import { QueryLoading } from "../menus/QueryLoading";
import { QueryError } from "../menus/QueryError";
import { BookingForm2 } from "./BookingForm2";

export function BookingCreate() {

  const { loading: servicesLoading, error: servicesError, data: servicesData } = useQuery(QUERY_SERVICES_ALL)
  const { loading: addonsLoading, error: addonsError, data: addonsData } = useQuery(ADDONS_QUERY)
  
  if (servicesLoading || addonsLoading)  return <QueryLoading />
  if (servicesError || addonsError)      return <QueryError error={servicesError || addonsError}/>
  
  
  // console.log(dataEmployee)
  // const {user } = dataEmployee
  const { services } = servicesData
  const { addons } = addonsData

  return (
    <div>
      <BookingForm2 
        services={services} 
        addons={addons}
      />
    </div>
  )
}

export const ADDONS_QUERY = gql`
  query Addons {
    addons {
      id
      name
      description
      price
    }
  }
`

export const QUERY_SERVICES_ALL = gql`
  query Query {
    services {
      id
      name
      description
      price
      buisnessHourOpen
      buisnessHourClosed
      buisnessDays
      durationInHours
      locations {
        id
        name
        address
        rooms
        bookings {
          start
          end
        }
      }
      addons {
        id
        name
        price
      }
      employees {
        id
        name
        buisnessHourOpen
        buisnessHourClosed
        gigs {
          start
          end
        }
        availability {
          start
          end
          type
        }
      }
    }
  }
`
