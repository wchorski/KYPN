import { datePrettyLocalDay } from "@lib/dateFormatter"
import { Ticket } from "@lib/types"
import Link from "next/link"
import { BsQrCode } from "react-icons/bs"

type Props = {
  ticket:Ticket
}

export function TicketListItem ({ ticket }:Props) {
  return (
    <li key={ticket.id}>
      <div className="meta">
        <Link href={`/events/e/${ticket.event?.id}`}>
          <strong>{ticket.event?.summary}</strong>
        </Link>
        <br />
        <small>{datePrettyLocalDay(ticket.event?.start || '')}</small>
        <br />
        <Link href={`/locations/${ticket.event?.location?.id}`}>
          <small>{ticket.event?.location?.name}</small>
        </Link>
        <br />
      </div>

      <Link href={`/tickets/${ticket.id}`} data-tooltip="ticket link QR code" className="button qrbutton"> 
        <BsQrCode />
      </Link>

    </li>
  )
}