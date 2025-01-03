import { envs } from "@/envs"
import { Metadata } from "next"
import { layout_wide, page_content, page_layout } from "@styles/layout.module.css"

export const metadata: Metadata = {
	title: "Bookings | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}


export default async function BookingsPage() {


	// const { services, addons, error } = await fetchServicesAndAddons()
	// const { services, locations, addons, employees, availabilities, gigs, error } = await fetchBookingFormData()
	// const session = await getServerSession(nextAuthOptions)
	// const { data, error } = await fetchBookingFormData()

	// if (error) return <ErrorMessage error={error} />
	// if (!data) return notFound()

	// const data = {services, locations, addons, employees, availabilities, gigs, session, prevBooking}

	return (
		<main className={page_layout} >
			<header className={layout_wide}>
				<h1> Bookings </h1>
			</header>
			<div className={page_content} >
        <p>TODO: add list of  bookings</p>
			</div>
		</main>
	)
}
