import Link from "next/link"
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md"
import styles, {
	event_chip,
	header,
	hide_on_mobile,
	reveal_on_mobile,
} from "@styles/events/calendar.module.css"
import type { Booking, Event as TEvent } from "@ks/types"
import { datePrettyLocal, datePrettyLocalTime } from "@lib/dateFormatter"
import { BsFillBookmarkFill, BsFillTicketPerforatedFill } from "react-icons/bs"
import { ReactNode } from "react"
import { SchedualChip } from "./SchedualChip"
import Flex from "./layouts/Flex"
import { NoData } from "./elements/NoData"
import { layout_content, layout_site } from "@styles/layout.module.css"
import { events_list } from "@styles/events/events.module.css"
import { EventCard } from "./events/EventCard"
import { Grid } from "./layouts/Grid"

type Props = {
	date: string
	events?: TEvent[] | undefined
	bookings?: Booking[] | undefined
  isSearchParam?:boolean
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
// const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function SchedualCalendar({ date, events = [], bookings = [], isSearchParam = false }: Props) {
	function nextMonth(date: string) {
		const curDate = new Date(date)
		const firstOfMonth = new Date(curDate.getFullYear(), curDate.getMonth())
		firstOfMonth.setMonth(curDate.getMonth() + 1)

		return firstOfMonth.toDateString()
	}

	function prevMonth(date: string) {
		const curDate = new Date(date)
		const firstOfMonth = new Date(curDate.getFullYear(), curDate.getMonth())
		firstOfMonth.setMonth(curDate.getMonth() - 1)

		return firstOfMonth.toDateString()
	}

	return (
		<div className={["schedual-calendar-wrap"].join(" ")}>
			<header className={header}>
				<Link
					href={`?${new URLSearchParams({
						date: prevMonth(date),
					})}`}
					className="arrow left"
					aria-label="Next Month"
					title="Next Month"
				>
					<MdOutlineKeyboardArrowLeft />
				</Link>

				<span className="month-label">{getMonthYear(date)}</span>

				<Link
					href={`?${new URLSearchParams({
						date: nextMonth(date),
					})}`}
					className="arrow right"
					aria-label="Previous Month"
					title="Previous Month"
				>
					<MdOutlineKeyboardArrowRight />
				</Link>
				<Link
					href={`/events`}
          style={{visibility: isSearchParam ? 'visible' : 'hidden'}}
					className={["button medium"].join(' ')}
					aria-label="Today's Month"
					title="Today's Month"
				>
					Today
				</Link>
			</header>

			<div className={[styles.grid_7, hide_on_mobile].join(" ")}>
				{DAYS ? (
					DAYS.map((day, i) => (
						<span key={i} className={[styles.head_day, "nonDRAG"].join(" ")}>
							{day}
						</span>
					))
				) : (
					<span className={[styles.head_day, "nonDRAG"].join(" ")}>
						YOU SHOULDNT SEE ME EVER
					</span>
				)}
			</div>

			<div
				className={[
					"calendar-body",
					styles.grid_7,
					getDaysInMonth(date) === 28 ? styles.is28Days : styles.isNot28Days,
					hide_on_mobile,
				].join(" ")}
			>
				{sortDays(date).map((day, i) => (
					<span className={[styles.cell_day].join(" ")} key={i}>
						<label
							className={
								isDatesSameDay(
									new Date(),
									getDateObj(
										new Date(date).getFullYear(),
										new Date(date).getMonth(),
										day
									)
								)
									? styles.cell_active
									: ""
							}
						>
							{day}
						</label>

						{events?.map((event) => (
							<SchedualChipDayGroup
								date={date}
								day={day}
								item={event}
								key={event.id}
							/>
						))}
						{bookings?.map((book) => (
							<SchedualChipDayGroup
								date={date}
								day={day}
								item={book}
								key={book.id}
							/>
						))}
					</span>
				))}
			</div>

			{/* //TODO group schedual items per date (while removing empty days)  */}
			<div className={[reveal_on_mobile, layout_content].join(" ")}>
				{/* <h3> List View </h3> */}
				{events.length > 0 && (
					<>
						<ul className={events_list}>
							{events?.map((e) => (
								<li key={e.id}>
									<EventCard {...e} />
								</li>
							))}
						</ul>
					</>
				)}
				{/* {events.length > 0 && (
					<>
						<h4> Events </h4>
						<ul>
							{events?.map((event) => (
								<li key={event.id}>
									<span>{datePrettyLocal(event.start, "day")}</span>
									<SchedualChip item={event} />
								</li>
							))}
						</ul>
					</>
				)} */}

				{bookings.length > 0 && (
					<>
						<h4> Bookings </h4>
						<ul>
							{bookings?.map((book) => (
								<li key={book.id}>
									<Flex gap={"ms"} alignItems={"center"}>
										<span>{datePrettyLocal(book.start, "day")} </span>
										<SchedualChip item={book} key={book.id} />
									</Flex>
								</li>
							))}
						</ul>
					</>
				)}

				{bookings.length === 0 && events.length === 0 && (
					<Grid
						layout={"1"}
						verticalAlign={"center"}
						horizontalAlign={"center"}
						style={{
							border: "dashed 3px var(--c-seperator)",
							// backgroundColor: 'var(--c-seperator)',
							minHeight: "20rem",
						}}
					>
						<NoData name="items">
							<p>No schedual items for this month</p>
						</NoData>
					</Grid>
				)}
			</div>
		</div>
	)
}

type TSchedualChipDayGroup = {
	date: string
	day: number
	item: TEvent | Booking
}

function SchedualChipDayGroup({ date, day, item }: TSchedualChipDayGroup) {
	// let style = [styles.event_chip]
	// if (item.typeof === "booking") style.push(styles.booking)

	// if (!day) return <SchedualChip item={item} icon={icon} />

	if (
		isDatesSameDay(
			getDateObj(new Date(date).getFullYear(), new Date(date).getMonth(), day),
			new Date(item.start)
		)
	)
		return <SchedualChip item={item} />

	//? day has no schedual items
	return null
}

function getMonthYear(date: string) {
	const curDate = new Date(date)
	const d = curDate.toDateString().split(" ")

	return `${d[1]} ${d[3]}`
}

function getDaysInMonth(date: string) {
	const dateObj = new Date(date)

	return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate()
}

function sortDays(date: string) {
	const dateObj = new Date(date)

	const daysInMonth = range(getDaysInMonth(date))
	const index = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay()
	return [...Array(index === 0 ? 6 : index - 0), ...daysInMonth] //? - zero, bug from tut, how do i make this dynamic to the Locale
}

function range(end: number) {
	const { result } = Array.from({ length: end }).reduce(
		({ result, current }) => ({
			result: [...result, current],
			current: current + 1,
		}),
		{ result: [], current: 1 }
	)

	return result
}

function isDatesSameDay(date1: Date, date2: Date) {
	// const date1Obj = new Date(date1)
	// const date2Obj = new Date(date2)

	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	)
}

function getDateObj(year: number, month: number, day: number) {
	return new Date(year, month, day)
}

// function getAllSchedualDays(items: Booking[] | Event[]): Date[] {
// 	return items.flatMap((it) => new Date(it.start))
// }

//? doesn't work as expected
// function hasSchedualOnDay(items: Booking[] | Event[], searchDate: Date) {
// 	const dates = items.flatMap((it) => new Date(it.start))
//   // console.log({dates});

// 	return dates.some((date) => date.getTime() === searchDate.getTime())
// }
