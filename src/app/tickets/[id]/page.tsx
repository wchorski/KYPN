import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import DialogPopup from "@components/menus/Dialog"
import { QRCode } from "@components/tickets/QRCode"
import { TicketRedeemForm } from "@components/tickets/TicketRedeemForm"
import { Ticket } from "@ks/types"
import { datePrettyLocalDay } from "@lib/dateFormatter"
import fetchTicket from "@lib/fetchdata/fetchTicket"
import styles from '@styles/events/tickets.module.scss'
import { getServerSession } from "next-auth"
import Link from "next/link"
import statusStyles from '@styles/blocs/status.module.scss'

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function TicketByIdPage ({ params, searchParams }:Props) {

  const { id } = params

  const session = await getServerSession(nextAuthOptions)

  const { ticket, error } = await fetchTicket(id)

  if(error) return <ErrorMessage error={error}/>

  return(
    <PageTHeaderMain 
      header={Header()}
      main={Main(ticket, session?.itemId, session?.data.role.canManageTickets)}
    />
  )
}

function Header() {
  
  return <header style={{display: 'none'}}>
    <h1> Ticket </h1>
  </header>
}

function Main(ticket:Ticket|undefined, sessionId?:string, canManageTickets?:boolean){

  if(!ticket) return <p> ticket not found </p>

  const { id, status, event, holder, email, orderCount } = ticket

  const hostIds = event.hosts.flatMap(host => host.id)

  return<>

  <DialogPopup>
    <TicketRedeemForm ticketId={id} status={status} />
  </DialogPopup>

  <Section layout="1">
    <article className={styles.ticket} >
      <div className="meta-short">
        <strong>{datePrettyLocalDay(event.start || '')}</strong>
      </div>

      <div className="rip"></div>

      <ul className="details">
        <li>
          <h2>{event.summary}</h2>
        </li>
        <li>{datePrettyLocalDay(event.start || '')}</li>
        <li>{event.location?.name}</li>
        <li>{orderCount}</li>
        <li>{holder?.name} {holder?.nameLast}</li>
        <li>{holder?.email || email}</li>
        <li>{holder?.email || email}</li>
      </ul>

      <div className="qrcode-cont">
        <QRCode link={`/tickets/${id}?popup=modal`} />
      </div>

      <span className={['status', statusStyles[status]].join(' ')}>{status}</span>
    </article>

    {sessionId && (hostIds.includes(sessionId) || canManageTickets) && (
      <Link 
        className={'button large'}
        style={{margin: '0 1rem'}}
        href={`?${new URLSearchParams({ popup: 'modal'})}`}
      > 
        redeem  
      </Link>

    )}
  </Section>
  </>
}