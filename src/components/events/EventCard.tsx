import { IconLink } from "@components/elements/IconLink"
import type {  Event  } from "@ks/types"
import {
	datePrettyLocalDayShort,
	datePrettyLocalTime,
} from "@lib/dateFormatter"
import {
	content,
	date_start,
	details,
	event_article,
	readmore,
} from "@styles/events/events.module.css"
import Link from "next/link"
import { IoMdTime } from "react-icons/io"
import { MdLocationOn } from "react-icons/md"

import { ImageDynamic } from "../elements/ImageDynamic"

export function EventCard({ image, start, summary, location, id }: Event) {
	return (
		<article className={event_article}>
			<div>
				<ImageDynamic photoIn={image} />
			</div>

			<div className={content}>
				<time dateTime={start} className={date_start}>
					{datePrettyLocalDayShort(start || "")}
				</time>

				<div className={details}>
					<Link href={`/events/${id}`}>
						<h4> {summary} </h4>
					</Link>

					<time dateTime={start}>
						<IoMdTime />
						{/* {datePrettyLocalDay(start)}  */}
						{/* @  */}
						{datePrettyLocalTime(start || "")}
					</time>

					{location && (
						<Link href={`/locations/${location.id}`}>
							<address>
								<MdLocationOn />
								{location?.name}
								<br />
								{location?.address}
								{/* {address.street} <br /> */}
								{/* {address.town} <br /> */}
								{/* {address.country} <br /> */}
							</address>
						</Link>
					)}
				</div>

				<IconLink
					href={`/events/${id}`}
					label="view"
					icon={"ticket"}
					className={["button medium", readmore].join(" ")}
				/>
			</div>
		</article>
	)
}
