import { gql, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { datePrettyLocalDay, datePrettyLocalTime } from "../../lib/dateFormatter"
import { Booking } from "../../lib/types"
import { QueryLoading } from "../menus/QueryLoading"
import { QueryError } from "../menus/QueryError"
import { Table } from "../elements/Table"
import { TablePagination } from "../elements/TablePagination"

export function GigTable() {

  const [cellsState, setCellsState] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)

  const { loading, error, data } = useQuery(QUERY_USER_GIGS, {
    variables: {

      where: {
        employees: {
          some: {
            id: {
              equals: "f6058962-0095-4453-b8de-ec6e51004373"
            }
          }
        },
      },

      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          start: 'desc'
        }
      ],
    },
  })

  useEffect(() => {
    if(!data?.bookings) return
    
    const cells = data.bookings.map((item:Booking) => ({
      date: datePrettyLocalDay(item.start || ''),
      start: datePrettyLocalTime(item.start || ''),
      summary: item?.summary,
      service: item?.service?.name,
      client: item?.customer?.name,
      employee: item?.employees[0]?.name || 'no employee assigned',
      link: item.id,
    }))
    
    setCellsState(cells)
    
    // return () => 
  }, [data?.bookings])

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  return (<>
    <Table 
      caption="Gigs"
      route="/bookings"
      headers={[
        'date',
        'start',
        'summary',
        'service',
        'client',
        'employee',
        'link',
      ]}
      cells={cellsState}
    />
    <TablePagination currPage={page} setPage={setPage} dataCount={data.eventsCount} perPage={perPage} setPerPage={setPerPage}/>
  </>)
}

const QUERY_USER_GIGS = gql`
  query Bookings($where: BookingWhereInput!, $orderBy: [BookingOrderByInput!]!) {
    bookings(where: $where, orderBy: $orderBy) {
      id
      summary
      service {
        name
      }
      start
      status
      customer{
        name
      }
      employees{
        name
      }
    }
  }
`