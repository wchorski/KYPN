import { useQuery } from "@apollo/client";
import { perPage } from "../../config";
import { Table } from "../elements/Table";
import { QueryError } from "../menus/QueryError";
import { QueryLoading } from "../menus/QueryLoading";
import { QUERY_EVENTS_ALL } from "./EventList";
import { useEffect, useState } from "react";
import { Event } from "../../lib/types";
import { datePrettyLocalDay, datePrettyLocalTime } from "../../lib/dateFormatter";
import { TablePagination } from "../elements/TablePagination";
import { EventsSearch } from "./EventsSearch";

export function EventTable() {

  const [cellsState, setCellsState] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)

  const { loading, error, data } = useQuery(QUERY_EVENTS_ALL, {
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
    if(!data?.events) return

    const cells = data.events.map((e:Event) => ({
      start: datePrettyLocalDay(e.start || '') + ' ' + datePrettyLocalTime(e.start || ''),
      end: datePrettyLocalDay(e.end || '') + ' ' + datePrettyLocalTime(e.end || ''),
      summary: e.summary,
      link: e.id,
    }))
    
    setCellsState(cells)
    
    // return () => 
  }, [data?.events])
  
  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />


  return (<>
    <EventsSearch />
    <Table 
      caption="All Events"
      route="/events/e"
      headers={[
        'start',
        'end',
        'summary',
        'link',
      ]}
      cells={cellsState}
    />
    <TablePagination currPage={page} setPage={setPage} dataCount={data.eventsCount} perPage={perPage} setPerPage={setPerPage}/>
  </>)
}
