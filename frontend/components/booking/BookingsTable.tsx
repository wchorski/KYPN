import { gql, useQuery } from "@apollo/client";
import { perPage } from "../../config";
import { Table } from "../elements/Table";
import { QueryError } from "../menus/QueryError";
import { QueryLoading } from "../menus/QueryLoading";
import { useEffect, useState } from "react";
import { Booking, Event } from "../../lib/types";
import { datePrettyLocalDay, datePrettyLocalTime } from "../../lib/dateFormatter";
import { TablePagination } from "../elements/TablePagination";

const today = new Date().toISOString()

export function BookingsTable() {

  const [cellsState, setCellsState] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)

  const { loading, error, data } = useQuery(QUERY_BOOKINGS, {
    variables: {
      where: {
        // no filter
      },
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          start: 'desc'
        }
      ]
    },
  })

  useEffect(() => {
    if(!data?.bookings) return
    
    const cells = data.bookings.map((item:Booking) => ({
      start: datePrettyLocalDay(item.start || '') + ' ' + datePrettyLocalTime(item.start || ''),
      end: datePrettyLocalDay(item.end || '') + ' ' + datePrettyLocalTime(item.end || ''),
      summary: item?.summary,
      service: item?.service?.name,
      link: item.id,
    }))
    
    setCellsState(cells)
    
    // return () => 
  }, [data?.bookings])
  
  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />


  return (<>
    {/* <EventsSearch /> */}
    <Table 
      caption="All Bookings"
      route="/bookings"
      headers={[
        'start',
        'end',
        'summary',
        'service',
        'link',
      ]}
      cells={cellsState}
    />
    <TablePagination currPage={page} setPage={setPage} dataCount={data.eventsCount} perPage={perPage} setPerPage={setPerPage}/>
  </>)
}

const QUERY_BOOKINGS = gql`
  query Bookings($where: BookingWhereInput!, $orderBy: [BookingOrderByInput!]!) {
  bookings(where: $where, orderBy: $orderBy) {
    addons {
      id
      name
    }
    customer {
      id
      name
      email
    }
    durationInHours
    employees {
      id
      email
      name
    }
    end
    id
    location {
      id
      name
    }
    price
    service {
      id
      name
    }
    start
    status
    summary
  }
}
`