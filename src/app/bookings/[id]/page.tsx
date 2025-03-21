import { BlockRender } from "@components/blocks/BlockRender"
import { Callout } from "@components/blocks/Callout"
import { DayMonthTime } from "@components/blocks/DayMonthTime"
import { NoData } from "@components/elements/NoData"
import ErrorMessage from "@components/ErrorMessage"
import { Card } from "@components/layouts/Card"
import Flex from "@components/layouts/Flex"
import { DialogPopup } from "@components/menus/DialogPopup"
import { UserBadge } from "@components/menus/UserBadge"
import { StatusBadge } from "@components/StatusBadge"
import { datePrettyLocal } from "@lib/dateFormatter"
import fetchBooking from "@lib/fetchdata/fetchBooking"
import moneyFormatter from "@lib/moneyFormatter"
import { IconUserAccountAvatar } from "@lib/useIcons"
import { booking_single } from "@styles/booking.module.css"
import {
	layout_breakout,
	layout_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { CgExternal } from "react-icons/cg"
import { FiEdit } from "react-icons/fi"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

// export const metadata: Metadata = {
//   title: 'Booking | ' + envs.SITE_TITLE,
//   description: envs.SITE_DESCRIPTION,
// }

// throw new Error('Bookings: cartItem -> checkout -> orderItem ')

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
			description: envs.SITE_DESCRIPTION,
		}

	return {
		title: booking.summary,
		description: envs.SITE_DESCRIPTION,
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

	const { booking, cartItemCount, error } = await fetchBooking({
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
						<Card
							direction={"row"}
							gap={"var(--space-m)"}
							paddingBlock={"s"}
							marginBlock={"0"}
						>
							<figure style={{ margin: "0" }}>
								{customer.image ? (
									<Image
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
									{customer?.name + " | " + customer.email}
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
				{cartItemCount > 0 && (
					<Callout intent={"info"}>
						<p>
							Item is in shopping cart. Continue with{" "}
							<Link className={'button'}  href={`/checkout`}>checkout</Link>
						</p>
					</Callout>
				)}
				<div className={booking_single}>
					<table>
						<tbody>
							<tr>
								<td>
									<label>Client: </label>
								</td>
								<td>
									<span>
										{" "}
										{name}{" "}
										{customer.email !== email ? " (Unregistered User)" : ""}{" "}
									</span>

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
					Updating a booking is almost ready. For now, create a new booking and
					we will cancel the previous booking
				</p>
				<Link href={`/bookings`}> Create new booking </Link>
				{/* <BookingFormUpdate /> */}
				<Link href={envs.BACKEND_URL + `/bookings/${id}`}>booking</Link>
			</DialogPopup>
		</main>
	)
}

const QUERY_BOOKING_RECIEPT = `
    summary
		details {
      document
    }
		status
		email
		phone
		name
		location {
      id
      name
      address
    }
		address
		service {
      id
      name
    }
		price
		notes
		addons {
      id
      name
    }
		employees {
      id
      name
      email
    }
		customer {
      id
      name
      email
    }
		dateModified
		start
		end
		revision
  `
