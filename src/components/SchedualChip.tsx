import { datePrettyLocalTime } from "@lib/dateFormatter"
import { IconItem } from "@lib/useIcons"
import { event_chip } from "@styles/events/calendar.module.css"
import Link from "next/link"

type Props = {
	item: {
		id: string
		start: string
		summary: string
		typeof: string
	}
}

export function SchedualChip({ item }: Props) {
	return (
		<span key={item.id} className={event_chip}>
			<Link href={`/${item.typeof}s/${item.id}`}>
				<IconItem type={item.typeof} />
        <div>
          <h6>{item.summary}</h6>
          <time dateTime={item.start}>@ {datePrettyLocalTime(item.start)}</time>
        </div>
			</Link>
		</span>
	)
}
