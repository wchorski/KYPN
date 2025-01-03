import ErrorMessage from "@components/ErrorMessage"
import { DayMonthTime } from "@components/blocks/DayMonthTime"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { UserBadge } from "@components/menus/UserBadge"
import { Booking } from "@ks/types"
import {
	dateInputFormat,
	datePrettyLocal,
	timeInputFormat,
} from "@lib/dateFormatter"
import fetchBooking from "@lib/fetchdata/fetchBooking"
import moneyFormatter from "@lib/moneyFormatter"
import Link from "next/link"
import { FiEdit } from "react-icons/fi"
import { CgExternal } from "react-icons/cg"
import DialogPopup from "@components/menus/Dialog"
import { StatusBadge } from "@components/StatusBadge"
import styles from "@styles/booking.module.css"
import { Metadata, ResolvingMetadata } from "next"
import { envs } from "@/envs"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { BlockRender } from "@components/blocks/BlockRender"
import {
	layout_breakout,
	layout_content,
	layout_wide,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import Flex from "@components/layouts/Flex"

// export const metadata: Metadata = {
//   title: 'Booking | ' + envs.SITE_TITLE,
//   description: envs.SITE_DESC,
// }

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const session = await getServerSession(nextAuthOptions)
	const { booking, error } = await fetchBooking(String(params?.id))

	if (!booking)
		return {
			title: "Booking | " + envs.SITE_TITLE,
			description: envs.SITE_DESC,
		}

	return {
		title: booking.summary,
	}
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function BookingSinglePage({
	params,
	searchParams,
}: Props) {
	const { id } = await params

	const { booking, error } = await fetchBooking(id)

	if (error) return <ErrorMessage error={error} />
	if (!booking) return notFound()

	const {
		summary,
		details,
		status,
		email,
		phone,
		name,
		location,
		service,
		price,
		notes,
		addons,
		employees,
		customer,
		dateModified,
		start,
		end,
	} = booking

	return (
		<main className={page_layout}>
			<header className={layout_breakout}>
				<h1>
					{summary}
				</h1>
				<Flex alignItems={'center'}>
					<StatusBadge type={"booking"} status={status} />{" "}
					<Link
						className="edit"
						href={`?${new URLSearchParams({ popup: "modal" })}`}
					>
						<FiEdit /> Edit
					</Link>

          {/* //TODO add a way to update form */}
					{/* <Link 
            className="edit button" 
            href={`/bookings?${
              new URLSearchParams({
                bookingId: id,
                serviceId: service.id,
                date: dateInputFormat(start),
                time: timeInputFormat(start),
              })
            }`} 
            // onClick={() => setBookingState(data?.booking)}
          > 
            <FiEdit /> Edit 
          </Link> */}
				</Flex>
				<small>last updated: {datePrettyLocal(dateModified, "full")}</small>
			</header>

			<div className={layout_content}>
				<div className={styles.booking_single}>
					<table>
						<tbody>
							<tr>
								<td>
									{" "}
									<label>Client: </label>{" "}
								</td>
								<td>
									{customer ? (
										<Link href={`/users/${customer.id}`}>{customer?.name}</Link>
									) : (
										<span> {name} (Unregistered User) </span>
									)}
									<br />
									<span>
										{customer?.email} {customer?.email ? "," : ""} {email}
									</span>
									<br />
									<span>
										{customer?.phone} {customer?.phone ? "," : ""} {phone}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<label>Location: </label>{" "}
								</td>
								<td>{location?.name || "n/a"}</td>
							</tr>
							<tr>
								<td>
									<label>Start: </label>{" "}
								</td>
								<td>
									<DayMonthTime dateString={start} />
								</td>
							</tr>
							<tr>
								<td>
									<label>End: </label>{" "}
								</td>
								<td>
									<DayMonthTime dateString={end} />
								</td>
							</tr>
							<tr>
								<td>
									<label>Price: </label>{" "}
								</td>
								<td>
									{" "}
									<span className="price">{moneyFormatter(price)}</span>
								</td>
							</tr>
						</tbody>
					</table>

					{addons.length > 0 && (
						<>
							<h2>Add-Ons</h2>
							<ul className="addons">
								{addons.map((ad) => (
									<li key={ad.id} title={ad.excerpt}>
										{ad.name}
										<Link href={`/addons/${ad.id}`} target={"_blank"}>
											{" "}
											<CgExternal />{" "}
										</Link>
									</li>
								))}
							</ul>
							<p className="align-right">
								<Link href={`/addons`}> View more addons</Link>
							</p>
						</>
					)}

					{employees.length > 0 && (
						<>
							<h2> Employees Assigned </h2>
							<ul className="employees">
								{employees.map((emp) => (
									<li key={emp.id}>
										<UserBadge user={emp} />
									</li>
								))}
							</ul>
						</>
					)}

					{details && (
						<div className={styles.description_wrap}>
							<BlockRender document={details.document} />
						</div>
					)}

					<h2> Notes </h2>
					<p>{notes}</p>
				</div>
			</div>

			<DialogPopup
				title={`Feature Not Yet Ready`}
				// onClose={() => null}
				// onOk={() => null}
				buttonLabel="Ok"
			>
				<p>
					{" "}
					Updating a booking is almost ready. For now, create a new booking and
					we will cancel the previous booking
				</p>
				<Link href={`/bookings`}> Create new booking </Link>
				{/* <BookingFormUpdate /> */}
			</DialogPopup>
		</main>
	)
}