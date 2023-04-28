import { gql, useQuery } from "@apollo/client";
import { BookingForm } from "./BookingForm";
import { QueryLoading } from "../menus/QueryLoading";
import { QueryError } from "../menus/QueryError";

export function BookingCreate() {

  const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(QUERY_SERVICES_ALL)

  if (loadingQuery) return <QueryLoading />
  if (errorQuery) return <QueryError />

  const { services } = dataQuery

  return (
    <div>
      <BookingForm services={services} />
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
      employees {
        name
        id
      }
    }
  }
`