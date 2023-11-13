
import { NoData } from "@components/elements/NoData"
import { Table } from "@components/elements/Table"
import { TicketList } from "@components/events/TicketList"
import { Section } from "@components/layouts/Section"
import { datePrettyLocalDay, datePrettyLocalTime } from "@lib/dateFormatter"
import moneyFormatter from "@lib/moneyFormatter"
import { Booking, Order, SubscriptionItem, Ticket, User } from "@ks/types"
import styles from '@styles/menus/dashboard.module.scss'

type Props = {
  dashState:string,
  user:User,
}

export default function AccountDash ({ user, dashState, }:Props) {



  const bookingCells = user?.bookings?.map((book:Booking) => ({
    date: datePrettyLocalDay(book.start || '') + ' ' + datePrettyLocalTime(book.start || ''),
    service: book.service.name,
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
    date: sub.dateCreated,
    plan: sub.subscriptionPlan.name,
    status: sub.status,
    details: sub.id,
  }))

  return (
    <div className={styles.dashboard}>

        <Section layout={'1'} id="main">

          <h3 className={dashState === 'main' ? styles.linkactive : styles.dashlink}>
            Dashboard
          </h3>

          <ul>
            <li> {user.name}</li>
            <li> {user.email}</li>
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
        </Section>

        <hr /> 

        <Section layout={'1'} id="subscriptions">
          
          <h3 className={dashState === 'subscriptions' ? styles.linkactive : styles.dashlink}>
            Subscriptions
          </h3>

          <Table 
            caption="Subscriptions"
            headers={[
              'date',
              'plan',
              'status',
              'details',
            ]}
            cells={subscriptionCells}
            route={`/subscriptions`}
          />

        </Section>

        <hr /> 

        <Section layout={'1'} id="downloads">
          
          <h3 className={dashState === 'downloads' ? styles.linkactive : styles.dashlink}>
            Downloads
          </h3>

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
