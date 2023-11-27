
import { NoData } from "@components/elements/NoData"
import { Table } from "@components/elements/Table"
import { TicketList } from "@components/events/TicketList"
import { Section } from "@components/layouts/Section"
import { datePrettyLocalDay, datePrettyLocalTime } from "@lib/dateFormatter"
import moneyFormatter from "@lib/moneyFormatter"
import { Booking, Order, SubscriptionItem, Ticket, User } from "@ks/types"
import { Card } from "@components/layouts/Card"
import Link from "next/link"
import styles from '@styles/menus/dashboard.module.scss'

type Props = {
  dashState:string,
  user:User,
  tickets:Ticket[]|undefined
}

export default function AccountDash ({ user, tickets = [], dashState, }:Props) {



  const bookingCells = user?.bookings?.map((book:Booking) => ({
    date: datePrettyLocalDay(book.start || '') + ' ' + datePrettyLocalTime(book.start || ''),
    service: book.service?.name || '-- service not selected --',
    status: book.status,
    // end: datePrettyLocalDay(book.end || '') + ' ' + datePrettyLocalTime(book.end || ''),
    details: book.id,
  }))
  
  // const orderCells = [] as any
  // @ts-ignore
  const orderCells = user.orders.map((order:Order) => ({
    date: datePrettyLocalDay(order.dateCreated || ''),
    time: datePrettyLocalTime(order.dateCreated || '') ,
    total: moneyFormatter(order.total),
    count: order.items.reduce((accumulator, it) => {
      return accumulator + it.quantity;
    }, 0),
    details: order.id,
  })) 

  const subscriptionCells = user.subscriptions?.map((sub:SubscriptionItem) => ({
    started: datePrettyLocalDay(sub.dateCreated || ''),
    plan: sub.subscriptionPlan.name,
    status: sub.status,
    details: sub.id,
  }))

  return (
    <div className={styles.dashboard}>

        <Card id="main">

          <h3 className={dashState === 'main' ? styles.linkactive : styles.dashlink}>
            Dashboard
          </h3>

          <ul>
            <li> {user.name}</li>
            <li> {user.email}</li>
          </ul>

        </Card>

        <hr /> 

        <Card id="orders">
  
          <h3 className={dashState === 'orders' ? styles.linkactive : styles.dashlink}>
            Orders / Services
          </h3>

          <Table 
            caption="Services"
            headers={[
              'service',
              'date',
              'status',
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
            route={`/orders`}
          />
        </Card>

        <hr /> 

        <Card id="subscriptions">
          
          <h3 className={dashState === 'subscriptions' ? styles.linkactive : styles.dashlink}>
            Subscriptions
          </h3>

          <Table 
            caption=""
            headers={[
              'started',
              'plan',
              'status',
              'details',
            ]}
            cells={subscriptionCells}
            route={`/subscriptions`}
          />

        </Card>

        <hr /> 

        <Card id="downloads">
          
          <h3 className={dashState === 'downloads' ? styles.linkactive : styles.dashlink}>
            Downloads
          </h3>

        </Card>

        <hr /> 

        <Card id="tickets">
          
          <h3 className={dashState === 'tickets' ? styles.linkactive : styles.dashlink}>
            Tickets
          </h3>

          
          {user.tickets.length === 0 && <NoData /> }

          {tickets.length === 0 && (
            <p> No tickets found. Check out all <Link href={`/events`}> upcoming events</Link> </p>
          )}
          <TicketList tickets={tickets}/>
        </Card>

      </div>
  )
}
