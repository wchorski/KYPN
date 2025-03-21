import { DayMonthTime } from "@components/blocks/DayMonthTime"
import { ProductOrderItem } from "@components/ecommerce/ProductOrderItem"
import { NoData } from "@components/elements/NoData"
import ErrorMessage from "@components/ErrorMessage"
import { Card } from "@components/layouts/Card"
import Flex from "@components/layouts/Flex"
import { DialogPopup } from "@components/menus/DialogPopup"
import { StatusBadge } from "@components/StatusBadge"
import { datePrettyLocal } from "@lib/dateFormatter"
import fetchRental from "@lib/fetchdata/fetchRental"
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
import { FiEdit } from "react-icons/fi"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

// export const metadata: Metadata = {
//   title: 'Rental | ' + envs.SITE_TITLE,
//   description: envs.SITE_DESCRIPTION,
// }

// throw new Error('Rentals: cartItem -> checkout -> orderItem ')

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const session = await getServerSession(nextAuthOptions)
	const { id } = await params
	const { rental, error } = await fetchRental({
		id,
		session,
		query: `summary`,
	})

	if (!rental)
		return {
			title: "Rental | " + envs.SITE_TITLE,
			description: envs.SITE_DESCRIPTION,
		}

	return {
		title: rental.summary,
		description: envs.SITE_DESCRIPTION,
	}
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function RentalSinglePage({
	params,
	searchParams,
}: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { id } = await params

	const { rental, error } = await fetchRental({
		id,
		session,
		query,
	})

	if (error) return <ErrorMessage error={error} />
	if (!rental) return notFound()

	const {
		start,
		end,
		timeZone,
		summary,
		days,
		address,
		delivery,
		price,
		notes,
		orderItem,
		customer,
		status,
		dateModified,
	} = rental

	const rentalProducts = orderItem.order.items.filter(
		(item) => item.type === "RENTAL"
	)

	return (
		<main className={page_layout}>
			<header className={layout_breakout}>
				<h1>{summary}</h1>
				<Flex alignItems={"center"}>
					<StatusBadge type={"rental"} status={status} />{" "}
					<Link
						className="edit"
						href={`?${new URLSearchParams({ popup: "modal" })}`}
					>
						<FiEdit /> Edit
					</Link>
					{/* //TODO add a way to update form */}
					{/* <Link 
            className="edit button" 
            href={`/rentals?${
              new URLSearchParams({
                rentalId: id,
                serviceId: service.id,
                date: dateInputFormat(start),
                time: timeInputFormat(start),
              })
            }`} 
            // onClick={() => setRentalState(data?.rental)}
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
				<small>last updated: {datePrettyLocal(dateModified, "full")}</small>
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
									<span>{customer.email}</span>
									<br />
									<span>{customer.name}</span>
								</td>
							</tr>
							<tr>
								<td>
									<label>Address: </label>{" "}
								</td>
								<td>{address}</td>
							</tr>
							<tr>
								<td>
									<label>Shipping Method: </label>{" "}
								</td>
								<td>{delivery ? 'Deliver' : 'Pickup'}</td>
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
									<label>Days: </label>{" "}
								</td>
								<td>{days}</td>
							</tr>
							<tr>
								<td>
									<label>Order: </label>{" "}
								</td>
								<td>
									<span>
										<Link href={`/orders/${orderItem.order.id}`}>
											View Full Order
										</Link>
									</span>
								</td>
							</tr>
						</tbody>
					</table>

					{/* {addons.length > 0 && (
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
					)} */}

					{/* {employees.length > 0 && (
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
					)} */}

					<h2> Notes </h2>
					<p>{notes ? notes : <NoData name="notes" />}</p>
				</div>
			</div>
			<section className={layout_breakout}>
				<h3> Items: </h3>
				{rentalProducts.length > 0 ? (
					<ul className="orderItems unstyled grid gap-s">
						{rentalProducts.flatMap((it) =>
							[
								it.product && (
									<ProductOrderItem item={it} key={`product-${it.id}`} />
								),
							].filter(Boolean)
						)}
					</ul>
				) : (
					<NoData name={"order items"} />
				)}
			</section>

			<DialogPopup
				title={`Feature Not Yet Ready`}
				// onClose={() => null}
				// onOk={() => null}
				buttonLabel="Ok"
			>
				<p>
					Updating a rental is almost ready. For now, contact {envs.ADMIN_EMAIL_ADDRESS} for any revisions to this rental.
				</p>
				{/* <RentalFormUpdate /> */}
				<Link href={envs.BACKEND_URL + `/rentals/${id}`}>dashboard</Link>
			</DialogPopup>
		</main>
	)
}

const query = `
  start
  end
  timeZone
  summary
  days
  address
  delivery
  price
  notes
  orderItem {
    order {
      id
      items {
        id
        quantity
        type
        product {
          id
          image
          name
          excerpt
          isForRent
          rental_price
        }
      }
    }
  }
  customer {
    id
    name
    email
    image
  }
  status
  dateModified
`
