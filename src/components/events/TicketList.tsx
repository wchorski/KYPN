import { Ticket } from '@ks/types'
import styles from '@styles/events/tickets.module.scss'
import { ReactNode } from 'react'
import { TicketListItem } from './TicketListItem'

type Props = {
  children?:ReactNode,
  tickets:Ticket[]
}

export function TicketList ({ tickets, children }:Props) {
  console.log({tickets});
  return (
    <ul className={styles.tickets} >
      {children ? children : tickets?.map(tick => <TicketListItem ticket={tick}/>) }
    </ul>
  )
}