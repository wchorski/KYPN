import { BookingForm } from "@components/bookings/BookingForm4"
import ErrorMessage from "@components/ErrorMessage"
import fetchBookingFormData from "@lib/fetchdata/fetchBookingFormInfo"
import { plainObj } from "@lib/utils"
import {
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"


export const metadata: Metadata = {
	title: "Book a Service | " + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

type Props = {
	searchParams: {
		bookingId: string
		serviceId: string
		locationId?: string
		staffId?: string
		date?: string
		time?: string
	}
	// params:{id:string}
}

export default async function BookingsPage({ searchParams }: Props) {
	const { bookingId, serviceId, locationId, staffId, date, time } = searchParams

	const prevBooking = {
		bookingId,
		serviceId,
		locationId,
		staffId,
		date,
		time,
	}

	// const { services, addons, error } = await fetchServicesAndAddons()
	// const { services, locations, addons, employees, availabilities, gigs, error } = await fetchBookingFormData()
	const session = await getServerSession(nextAuthOptions)
	const { data, error } = await fetchBookingFormData({ session })

	if (error) return <ErrorMessage error={error} />
	if (!data) return notFound()
  //@ts-ignore
  data.prevBooking = prevBooking

	return (
		<main className={page_layout}>
			<header className={layout_wide}>
				<h1> Book a Service </h1>
			</header>
			<div className={[page_content, layout_wide].join(' ')}>
				<BookingForm
					data={plainObj(data)}
					session={plainObj(session)}
					timeZoneOptions={envs.TIMEZONES.map((tz) => ({
						label: tz,
						value: tz,
					}))}
				/>
			</div>
		</main>
	)
}
