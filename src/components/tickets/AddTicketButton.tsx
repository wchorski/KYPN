import { StatusBadge } from "@components/StatusBadge"
import type { Event } from "@ks/types"
import Link from "next/link"

type Props = {
	date: string | undefined
	status: Event["status"]
}

const now = new Date()

export function AddTicketButton({ date, status }: Props) {
	const startDate = new Date(String(date))

	// if(now > startDate) return (
	//   <button
	//     className={'button large'}
	//     disabled={true}
	//     style={{
	//       marginLeft: 'auto',
	//     }}
	//   >
	//     Past Event
	//   </button>
	// )

	if (now > startDate || !["ACTIVE"].includes(status))
		return <StatusBadge status={status} type={"event"} />

	return (
		<Link
			href={`?${new URLSearchParams({ popup: "modal" })}`}
			className={"button large"}
			style={{
				marginLeft: "auto",
			}}
			// onClick={() => setIsPopup(true)}
		>
			<span>Get Tickets</span>
		</Link>
	)
}
