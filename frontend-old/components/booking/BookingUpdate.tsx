import { useQuery } from "@apollo/client"
import { ADDONS_QUERY, QUERY_SERVICES_ALL } from "./BookingCreate"
import { QueryLoading } from "../menus/QueryLoading"
import { QueryError } from "../menus/QueryError"
import { QUERY_BOOKING_SINGLE } from "./BookingSingle"
import { BookingFormUpdate } from "./BookingFormUpdate"

type Props = {
  id:string,
}

export  function BookingUpdate({id}:Props) {

  const { loading, error, data } = useQuery(
    QUERY_BOOKING_SINGLE, {
    variables: { where: { id: id } }
  })
  const { loading: servicesLoading, error: servicesError, data: servicesData } = useQuery(QUERY_SERVICES_ALL)
  const { loading: addonsLoading, error: addonsError, data: addonsData } = useQuery(ADDONS_QUERY)
  
  if (loading || servicesLoading || addonsLoading)  return <QueryLoading />
  if (error || servicesError || addonsError)      return <QueryError error={error || servicesError || addonsError}/>
  
  const { services } = servicesData
  const { addons } = addonsData
  const { booking } = data

  return (
    <>
      <h2>Update a Booking</h2>
      <BookingFormUpdate 
        booking={booking}
        services={services} 
        addons={addons}
      />
    </>
  )
}
