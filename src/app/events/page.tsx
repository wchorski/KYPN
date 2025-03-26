import ErrorMessage from "@components/ErrorMessage"
import { SchedualCalendar } from "@components/SchedualCalendar"
import fetchEvents from "@lib/fetchdata/fetchEvents"
import {
  layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export const metadata: Metadata = {
	title: "Events | " + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

type Props = {
	params: {
		slug: string
	}
	searchParams: {
		[key: string]: string | string[] | undefined
		date: string | undefined
	}
}

const today = new Date()

export default async function EventsPage({ params, searchParams }: Props) {
  const { date }  = await searchParams
  const session = await getServerSession(nextAuthOptions);
	const dateParam = date|| today.toDateString()
	const dateString = new Date(dateParam).toDateString()
	const { events, count, error } = await fetchEvents(dateString, QUERY_EVENTS, session)

	if (error) return <ErrorMessage error={error} />

	return (
		<main className={page_layout}>
			<header className={layout_wide}>
				<h1> Events </h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<section className={layout_site} >
          {/* //TODO delete event calendar comp */}
					{/* <EventsCalendar date={date} events={events} /> */}
          <SchedualCalendar date={dateString} events={events} isSearchParam={date ? true : false}/>
				</section>
        {/* <br />
        <br />
				<section>
          <h2>Upcoming Events</h2>
					<ul className={events_list}>
						{events?.map((e) => (
							<li key={e.id}>
								<EventCard {...e} />
							</li>
						))}
					</ul>
          {events && events.length === 0 && <NoData><p>No events found for this month. Navigate the calendar to view other months </p></NoData> }
				</section> */}
			</div>
		</main>
	)
}

const QUERY_EVENTS = `
  typeof
  id
  summary
  image
  start
  status
  end
  location {
    name
    id
  }
  price
  seats
  ticketsCount
`