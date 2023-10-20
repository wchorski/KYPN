'use client'
import { gql } from "graphql-request"
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import ErrorMessage from "@components/ErrorMessage"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { NoData } from "@components/elements/NoData"
import { Table } from "@components/elements/Table"
import { TicketList } from "@components/events/TicketList"
import { Section } from "@components/layouts/Section"
import { datePrettyLocalDay, datePrettyLocalTime } from "@lib/dateFormatter"
import moneyFormatter from "@lib/moneyFormatter"
import { Booking, Order, Ticket } from "@lib/types"
import styles from '@styles/menus/dashboard.module.scss'
import Link from "next/link"
import { BsQrCode } from "react-icons/bs"

type Props = {
  userId:string,
  dashState:string
}

export default function AccountDash ({ userId, dashState }:Props) {

  const { data, loading, error, } = useQuery(
    USER_DASH_QUERY, {
      variables: { where: { id: userId } }
    })

  if(loading) return <LoadingAnim />
  if(error) return <ErrorMessage error={error} />
  if(!data?.user) return <p> User not found </p>

  const { user } = data

  console.log(user);
  

  const bookingCells = user?.bookings?.map((book:Booking) => ({
    date: datePrettyLocalDay(book.start || '') + ' ' + datePrettyLocalTime(book.start || ''),
    service: book.service.name,
    // end: datePrettyLocalDay(book.end || '') + ' ' + datePrettyLocalTime(book.end || ''),
    details: book.id,
  }))
  
  const orderCells = data.user.orders.map((order:Order) => ({
    date: datePrettyLocalDay(order.createdAt || ''),
    time: datePrettyLocalTime(order.createdAt || '') ,
    total: moneyFormatter(order.total),
    count: order.items.reduce((accumulator, it) => {
      return accumulator + it.quantity;
    }, 0),
    details: order.id,
  }))

  return (
    <div className={styles.dashboard}>

        <Section layout={'1'} id="main">

          <h3 className={dashState === 'main' ? styles.linkactive : styles.dashlink}>
            Dashboard
          </h3>

          <ul>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
          </ul>
        </Section>

        <hr /> 

        <Section layout={'1'} id="orders">
  
          <h3 className={dashState === 'orders' ? styles.linkactive : styles.dashlink}>
            Orders / Services
          </h3>

          <Table 
            caption="Services"
            headers={[
              'service',
              'date',
              'details',
            ]}
            cells={bookingCells}
            route={`/bookings`}
          />

          <Table 
            caption="Orders"
            headers={[
              'date',
              'time',
              'total',
              'count',
              'details',
            ]}
            cells={orderCells}
            route={`/shop/orders`}
          />
        </Section>

        <hr /> 

        <Section layout={'1'} id="subscriptions">
          
          <h3 className={dashState === 'subscriptions' ? styles.linkactive : styles.dashlink}>
            Subscriptions
          </h3>

          <ul>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
          </ul>
        </Section>

        <hr /> 

        <Section layout={'1'} id="downloads">
          
          <h3 className={dashState === 'downloads' ? styles.linkactive : styles.dashlink}>
            Downloads
          </h3>

          <ul>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
            <li>one</li>
          </ul>
        </Section>

        <hr /> 

        <Section layout={'1'} id="tickets">
          
          <h3 className={dashState === 'tickets' ? styles.linkactive : styles.dashlink}>
            Tickets
          </h3>

          
          {!user?.tickets && <NoData /> }

          
          <TicketList tickets={user?.tickets}/>
        </Section>

      </div>
  )
}

const USER_DASH_QUERY = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      bookings {
        id
        price
        start
        service {
          name
        }
        status
      }
      subscriptions{
        id
        subscriptionPlan {
          id
          name
        }
        status
      }
      orders{
        id
        total
        items{
          quantity
        }
        createdAt
      }
      tickets {
        id
        event {
          start
          summary
          location {
            id
            name
          }
        }
      }
    }
  }
`