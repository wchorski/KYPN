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
import styles, { booking_single } from "@styles/booking.module.css"
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
import { session_image } from "@styles/menus/session.module.css"
import { IconUserAccountAvatar } from "@lib/useIcons"
import { Card } from "@components/layouts/Card"
import { NoData } from "@components/elements/NoData"

// export const metadata: Metadata = {
//   title: 'Booking | ' + envs.SITE_TITLE,
//   description: envs.SITE_DESC,
// }

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const session = await getServerSession(nextAuthOptions)
	const { id } = await params
	const { booking, error } = await fetchBooking({
		id,
		session,
		query: `summary`,
	})

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
	const session = await getServerSession(nextAuthOptions)
	const { id } = await params

	const { booking, error } = await fetchBooking({
		id,
		session,
		query: QUERY_BOOKING_RECIEPT,
	})

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
		address,
		service,
		price,
		notes,
		addons,
		employees,
		customer,
		dateModified,
		start,
		end,
		revision,
	} = booking

	return (
		<main className={page_layout}>
			<header className={layout_breakout}>
				<h1>{summary}</h1>
				<Flex alignItems={"center"}>
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
					{customer && (
						<Card direction={'row'} gap={'var(--space-m)'} paddingBlock={'s'} marginBlock={'0'}>
							<figure style={{margin: '0'}}>
								{customer.image ? (
									<img
										src={customer.image}
										alt={"user avatar"}
										width={20}
										height={20}
									/>
								) : (
									<IconUserAccountAvatar />
								)}
							</figure>
							<span>
								<Link href={`/users/${customer.id}`}>
									{customer?.name + ' | ' + customer.email}
								</Link>
							</span>
						</Card>
					)}
				</Flex>
				<small>
					last updated: {datePrettyLocal(dateModified, "full")} v{revision}
				</small>
			</header>

			<div className={layout_content}>
				<div className={booking_single}>
					<table>
						<tbody>
							<tr>
								<td>
									<label>Client: </label>
								</td>
								<td>

                  <span> {name} {customer.email !== email ? ' (Unregistered User)' : ''} </span>
	
									<br />
									<span>{email}</span>
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
								<td>
									{location?.name} {address && `| ${address}`}
								</td>
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
									<li
										key={ad.id}
										title={ad.excerpt}
										style={{ display: "flex" }}
									>
										<Link
											href={`/addons/${ad.id}`}
											target={"_blank"}
											title={`view add-on ${ad.name}`}
										>
											{ad.name}
											<CgExternal />
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
							<ul
								className="employees"
								style={{ padding: "0", listStyle: "none" }}
							>
								{employees.map((emp) => (
									<li key={emp.id}>
										<UserBadge user={emp} />
									</li>
								))}
							</ul>
						</>
					)}

					{details && (
						<div className={""}>
							<BlockRender document={details.document} />
						</div>
					)}

					<h2> Notes </h2>
					<p>{notes ? notes : <NoData name="notes" />}</p>
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

const QUERY_BOOKING_RECIEPT = `
  id
  email
  phone
  name
  dateCreated
  dateModified
  addonsCount
  end
  google
  start
  status
  summary
  notes
  price
  address
  revision
  details {
    document
  }
  addons {
    id
    excerpt
    name
    price
  }
  customer {
    id
    email
    phone
    name
    nameLast
    image
  }
  employees {
    id
    name
    email
    image
  }
  location {
    id
    name
    address
  }
  service {
    id
    name
  }
`
