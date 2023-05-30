import React from 'react'
import EventList from '../components/events/EventList'
import { Pagination } from '../components/Pagination'
import { useRouter } from 'next/router'
import { EventsCalendar } from '../components/events/EventsCalendar'

export default function EventsPage() {

  const { query } = useRouter()
  
  return (<>
    <h1>Events</h1>
    <EventsCalendar />
    <h2>Upcoming</h2>
    <EventList page={Number(query.page) || 1} />
    {/* <Pagination route='/events' page={Number(query.page) || 1} /> */}
  </>)
}
