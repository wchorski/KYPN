import React from 'react'
import EventList from '../components/events/EventList'
import { Pagination } from '../components/Pagination'
import { useRouter } from 'next/router'
import { EventsCalendar } from '../components/events/EventsCalendar'
import styled from 'styled-components'

export default function EventsPage() {

  const { query } = useRouter()
  
  return (<StyledEventsPage>
    <section className='pad events' >
      <h2>Events Calendar</h2>
      <EventsCalendar />
    </section>

    <section className='pad'>
      <h2>Upcoming Events</h2>
      <EventList page={Number(query.page) || 1} />
    </section>
    {/* <Pagination route='/events' page={Number(query.page) || 1} /> */}
  </StyledEventsPage>)
}


const StyledEventsPage = styled.div`
  section.events{
    display: none;
  }

  @media screen and (min-width: 600px) {
    section.events{
      display: block;
    } 
  }

`