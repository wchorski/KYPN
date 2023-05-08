import { gql, useQuery } from "@apollo/client";
import { QueryLoading } from "../menus/QueryLoading";
import { QueryError } from "../menus/QueryError";
import { BookingForm2 } from "./BookingForm2";

export function BookingCreate() {

  const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(QUERY_SERVICES_ALL)
  
  if (loadingQuery)  return <QueryLoading />
  if (errorQuery)      return <QueryError error={errorQuery}/>
  
  
  // console.log(dataEmployee)
  // const {user } = dataEmployee
  const { services } = dataQuery

  return (
    <div>
      <BookingForm2 
        services={services} 
      />
    </div>
  )
}

const QUERY_SERVICES_ALL = gql`
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
      employees {
        id
        name
        buisnessHourOpen
        buisnessHourClosed
        gigs {
          start
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
