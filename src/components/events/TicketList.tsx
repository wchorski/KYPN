import { Ticket } from '@ks/types'
import styles from '@styles/events/tickets.module.css'
import { ReactNode } from 'react'
import { TicketListItem } from './TicketListItem'

type Props = {
  children?:ReactNode,
  tickets:Ticket[]
}

export function TicketList ({ tickets = [], children }:Props) {
  
  return (
    <ul className={styles.tickets} >
      {children ? children : tickets?.map((tick, i) => <TicketListItem key={i} ticket={tick}/>) }
    </ul>
  )
}