import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { QueryLoading } from '../menus/QueryLoading'
import { QueryError } from '../menus/QueryError'
import { perPage } from '../../config';
import { EventCard } from './EventCard';
import styled from 'styled-components';
import { Event } from '../../lib/types';

type Props = {
  page: number
}

const today = new Date().toISOString()

export default function EventList({page}:Props) {


  const { loading, error, data } = useQuery(QUERY_EVENTS_ALL, {
    variables: {
      where: {
        start: {
          gte: today,
        }
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

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  // const filterevents = data.events.map((event:Event) => ({start: event.start, summary: event.summary}))
  // console.table(filterevents)
  
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
  query Events($where: EventWhereInput!, $orderBy: [EventOrderByInput!]!) {
    eventsCount
    events(where: $where, orderBy: $orderBy) {
      id
      start
      status
      end
      image
      dateCreated
      dateModified
      location {
        id
        name
        address
        rooms
      }
      price
      seats
      summary
      ticketsCount
    }
  }
`