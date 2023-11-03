import ErrorMessage from "@components/ErrorMessage"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import { QRCode } from "@components/tickets/QRCode"
import { Ticket } from "@ks/types"
import { datePrettyLocalDay } from "@lib/dateFormatter"
import fetchTicket from "@lib/fetchdata/fetchTicket"
import styles from '@styles/events/tickets.module.scss'

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function TicketByIdPage ({ params, searchParams }:Props) {

  const { id } = params

  const { ticket, error } = await fetchTicket(id)

  if(error) return <ErrorMessage error={error}/>

  return(
    <PageTHeaderMain 
      header={Header()}
      main={Main(ticket)}
    />
  )
}

function Header() {
  
  return <header style={{display: 'none'}}>
    <h1> Ticket </h1>
  </header>
}

function Main(ticket:Ticket|undefined){

  if(!ticket) return <p> ticket not found </p>

  const { id, status, event, holder, email, orderCount } = ticket

  return<>
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
        <QRCode link={`/tickets/${id}`} />
      </div>

      <span className="status">{status}</span>
    </article>

  </Section>
  </>
}