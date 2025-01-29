import { datePrettyLocalDay } from "@lib/dateFormatter"
import { Ticket } from "@ks/types"
import Link from "next/link"
import { BsQrCode } from "react-icons/bs"
import { StatusBadge } from "@components/StatusBadge"
import { actions_wrap } from "@styles/events/tickets.module.css"
import { ImageDynamic } from "@components/elements/ImageDynamic"

type Props = {
	ticket: Ticket
}

export function TicketListItem({ ticket }: Props) {
	return (
		<li key={ticket.id}>
			<ImageDynamic photoIn={ticket.event.image} width={100} height={100}/>
			<div className="meta">
				<Link href={`/events/${ticket.event?.id}`}>
					<strong>{ticket.event?.summary}</strong>
				</Link>
				<br />
				<small>{ticket.orderIndex}</small>
				<br />
				<small>{datePrettyLocalDay(ticket.event?.start || "")}</small>
				<br />
				<Link href={`/locations/${ticket.event?.location?.id}`}>
					<small>{ticket.event?.location?.name}</small>
				</Link>
				<br />
			</div>

			<div className={actions_wrap}>
				<StatusBadge type={"ticket"} status={ticket.status} />

				<Link
					href={`/tickets/${ticket.id}`}
					target={"_blank"}
					data-tooltip="ticket link QR code"
					className="button large qrbutton"
				>
					<BsQrCode />
				</Link>
			</div>
		</li>
	)
}
