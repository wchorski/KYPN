import { Ticket } from '@ks/types'
import styles from '@styles/events/tickets.module.scss'
import { ReactNode } from 'react'
import { TicketListItem } from './TicketListItem'
import { NoData } from '@components/elements/NoData'

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