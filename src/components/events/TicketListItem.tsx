import { ImageDynamic } from "@components/elements/ImageDynamic"
import { StatusBadge } from "@components/StatusBadge"
import type { Ticket } from "@ks/types"
import { datePrettyLocalDay, datePrettyLocalTime } from "@lib/dateFormatter"
import {
	IconCalendar,
	IconClockTime,
	IconEventTicket,
	IconLocationPin,
} from "@lib/useIcons"
import { actions_wrap } from "@styles/events/tickets.module.css"
import { grid_icon_and_text_list } from "@styles/grid.module.css"
import Link from "next/link"
import { BsQrCode } from "react-icons/bs"

type Props = {
	ticket: Ticket
}

export function TicketListItem({ ticket }: Props) {
	const {
		id,
		orderIndex,
		status,
		event: { location, summary, start, image, id: eventId },
	} = ticket
	return (
		<li key={id}>
			<ImageDynamic photoIn={image} width={100} height={100} />
			<div>
				<Link href={`/events/${eventId}`}>
					<h5 style={{ marginTop: "0", marginBottom: "var(--space-ms)" }}>
						{summary}
					</h5>
				</Link>
				<ul className={["meta", "unstyled", grid_icon_and_text_list].join(" ")}>
					<li>
						<IconEventTicket />
						<small>{orderIndex}</small>
					</li>
					<li>
						<IconCalendar />
						<small>{datePrettyLocalDay(start || "")}</small>
					</li>
					<li>
						<IconClockTime /> {datePrettyLocalTime(start || "")}
					</li>
					<li>
						<IconLocationPin />
						<Link href={`/locations/${location?.id}`}>
							<small>{location?.name}</small>
						</Link>
					</li>
					<br />
				</ul>
			</div>

			<div className={actions_wrap}>
				<StatusBadge type={"ticket"} status={status} />

				<Link
					href={`/tickets/${id}`}
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
