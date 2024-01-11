import { Table } from "@components/elements/Table"
import { TicketList } from "@components/events/TicketList"
import { datePrettyLocalDay, datePrettyLocalTime } from "@lib/dateFormatter"
import moneyFormatter from "@lib/moneyFormatter"
import { Booking, Order, Rental, SubscriptionItem, Ticket, User } from "@ks/types"
import { Card } from "@components/layouts/Card"
import Link from "next/link"
import styles from '@styles/menus/dashboard.module.scss'

type Props = {
  dashState:string,
  user:User,
  orders:Order[],
  rentals:Rental[],
  tickets:Ticket[]|undefined
}

export default function AccountDash ({ user, tickets = [], dashState, orders, rentals}:Props) {



  const bookingCells = user?.bookings?.map((book:Booking) => ({
    date: datePrettyLocalDay(book.start || '') + ' ' + datePrettyLocalTime(book.start || ''),
    service: book.service?.name || '-- service not selected --',
    status: book.status,
    // end: datePrettyLocalDay(book.end || '') + ' ' + datePrettyLocalTime(book.end || ''),
    details: book.id,
  }))

  const orderCells = orders.map((order:Order) => ({
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

  const rentalCells = rentals?.map((item) => ({
    start: datePrettyLocalDay(item.start || ''),
    end: datePrettyLocalDay(item.end || ''),
    hours: item.durationInHours,
    status: item.status,
    location: item.location,
    delivery: item.delivery ? 'Delivery' : 'Pickup',
    details: item.id,
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

      

      <Card id="services">

        <h3 className={dashState === 'services' ? styles.linkactive : styles.dashlink}>
          Services
        </h3>

        <Table 
          caption=""
          headers={[
            'service',
            'date',
            'status',
            'details',
          ]}
          cells={bookingCells}
          route={`/bookings`}
        />

      </Card>

      <Card id="orders">

        <h3 className={dashState === 'orders' ? styles.linkactive : styles.dashlink}>
          Orders
        </h3>

        <Table 
          caption=""
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

      <Card id="rentals">

        <h3 className={dashState === 'rentals' ? styles.linkactive : styles.dashlink}>
          Rentals
        </h3>

        <Table 
          caption=""
          headers={[
            'start',
            'end',
            'hours',
            'status',
            'location',
            'delivery',
            'details',
          ]}
          cells={rentalCells}
          route={`/rentals`}
        />
      </Card>

      

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

      

      <Card id="downloads">
        
        <h3 className={dashState === 'downloads' ? styles.linkactive : styles.dashlink}>
          Downloads
        </h3>

      </Card>

      

      <Card id="tickets">
        
        <h3 className={dashState === 'tickets' ? styles.linkactive : styles.dashlink}>
          Tickets
        </h3>


        {tickets.length === 0 && (
          <p> No upcoming event tickets. Check out all <Link href={`/events`}> upcoming events</Link> </p>
        )}
        <TicketList tickets={tickets}/>
      </Card>

    </div>
  )
}
