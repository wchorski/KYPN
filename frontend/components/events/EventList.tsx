import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { QueryLoading } from '../menus/QueryLoading'
import { QueryError } from '../menus/QueryError'
import { perPage } from '../../config';
import { EventCard } from './EventCard';
import styled from 'styled-components';
// import { Event } from '../../lib/types';

type Props = {
  page: number
}

export default function EventList({page}:Props) {

  const { loading, error, data } = useQuery(QUERY_EVENTS_ALL, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          start: 'desc'
        }
      ]
    },
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  const filterevents = data.events.map((event:Event) => ({start: event.start, summary: event.summary}))
  console.table(filterevents)
  
  return (
    <StyledEventList>
      {data.events.map((event:any) => {
        // console.log(prod);

        return (
          <li key={event.id}>
            <EventCard {...event} />
          </li>
        );
      })}
    </StyledEventList>
  )
}

const StyledEventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const QUERY_EVENTS_ALL = gql`
  query Events($orderBy: [EventOrderByInput!]!) {
    events(orderBy: $orderBy) {
      start
      status
      end
      photo
      dateCreated
      dateModified
      id
      location {
        name
        id
      }
      price
      seats
      summary
      ticketsCount
    }
  }
`