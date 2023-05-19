import React from 'react'
import EventList from '../components/events/EventList'
import { Pagination } from '../components/Pagination'
import { useRouter } from 'next/router'

export default function EventsPage() {

  const { query } = useRouter()
  
  return (<>
    <h1>Events</h1>
    <EventList page={Number(query.page) || 1} />
    <Pagination route='/shop' page={Number(query.page) || 1} />
  </>)
}
