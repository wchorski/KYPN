import React from 'react'
import EventList from '../components/events/EventList'
import { Pagination } from '../components/Pagination'
import { useRouter } from 'next/router'
import { EventsCalendar } from '../components/events/EventsCalendar'
import styled from 'styled-components'
import Head from 'next/head'
import { envvars } from '../lib/envvars'

export default function EventsPage() {

  const { query } = useRouter()
  
  return (<>
    <Head>
      <title> Events | {envvars.SITE_TITLE} </title>
      <meta name="description"        content={envvars.SITE_DESCRIPTION} />
      {/* <meta name='keywords'           content={tags.map(tag => tag.name).join(', ')} /> */}
      {/* <meta name="author"             content={author.name} /> */}
      <meta property="og:title"       content={envvars.SITE_DESCRIPTION} />
      <meta property="og:description" content={envvars.SITE_DESCRIPTION} />
      <meta property="og:image"       content={envvars.SITE_URI + '/assets/private/logo.png'} />
      <meta property="og:url"         content={envvars.SITE_URI} />
      <meta property="og:type"        content="website" />
    </Head>
    
  <StyledEventsPage>
    <section className='pad events maxwidth' >
      {/* <h2>Events Calendar</h2> */}
      <EventsCalendar />
    </section>

    <br />
    <section className='pad maxwidth'>
      <h2>Upcoming Events</h2>
      <EventList page={Number(query.page) || 1} />
    </section>
    {/* <Pagination route='/events' page={Number(query.page) || 1} /> */}
  </StyledEventsPage>
  </>)
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