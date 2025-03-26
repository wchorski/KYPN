import { PriceTag } from "@components/ecommerce/PriceTag"
import { ProductOrderItem } from "@components/ecommerce/ProductOrderItem"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { NoData } from "@components/elements/NoData"
import { TicketList } from "@components/events/TicketList"
import ErrorPage from "@components/layouts/ErrorPage"
import { StatusBadge } from "@components/StatusBadge"
import type {  OrderItem  } from "@ks/types"
import { datePrettyLocal } from "@lib/dateFormatter"
import { fetchOrder } from "@lib/fetchdata/fetchOrder"
import moneyFormatter from "@lib/moneyFormatter"
import { sortOrderItems } from "@lib/sortUtils"
import styles, {
	coupon_cart_item,
	perItemTotal,
} from "@styles/ecommerce/cart.module.css"
import {
	layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export const metadata: Metadata = {
	title: "Order Receipt | " + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

type Props = {
	params: { id: string }
}

export default async function OrderByIdPage({ params }: Props) {
	const { id } = await params

	const session = await getServerSession(nextAuthOptions)

	// const order = await keystoneContext.withSession(session).query.Order.findOne({
	//   where: {
	//     id: id
	//   },
	//   query: query,
	// }) as Order

	const { order, error } = await fetchOrder({ id, query, session })

	if (error) return <ErrorPage error={error} />
	if (!order) return notFound()

	const {
		status,
		user,
		stripeCheckoutSessionId,
		stripePaymentIntent,
		items,
		count,
		dateCreated,
		dateModified,
		total,
	} = order

	const sortedOrderItems = sortOrderItems(items)

	return (
		<main className={page_layout}>
			<header className={layout_content}>
				<h1> Order Receipt </h1>
			</header>
			<div className={[page_content, layout_content].join(" ")}>
				<section>
					<table>
						<tbody>
							<tr>
								<td>Status:</td>
								<td>
									<StatusBadge type={"order"} status={status} />
								</td>
							</tr>
							<tr>
								<td>Customer:</td>
								<td>
									<Link href={`/users/${user?.id}`}> {user?.email}</Link>
								</td>
							</tr>
							<tr>
								<td>Item Count:</td>
								<td>{count}</td>
							</tr>
							<tr>
								<td>Date:</td>
								<td>{datePrettyLocal(dateCreated, "full")}</td>
							</tr>
							<tr>
								<td> Total: </td>
								<td>
									<PriceTag price={total} style={{ fontSize: "1.5rem" }} />
								</td>
							</tr>
						</tbody>
					</table>
				</section>

				<section>
					<h3> Items: </h3>
					{sortedOrderItems.length > 0 ? (
						<ul className="orderItems unstyled grid gap-s">
							{sortedOrderItems.flatMap((it) =>
								[
									it.booking && (
										<BookingOrderItem item={it} key={`booking-${it.id}`} />
									),
									it.tickets && (
										<TicketList
											tickets={it.tickets || []}
											key={`tickets-${it.id}`}
										/>
									),
									it.product && (
										<ProductOrderItem item={it} key={`product-${it.id}`} />
									),
									// TODO make these look nicer later
									it.rental && (
										<li key={`rental-${it.id}`}>
											<Link href={`/rentals/${it.rental.id}`}>
												Rental: {it.rental.summary}
											</Link>
										</li>
									),
									it.subscriptionItem && (
										<li key={`subscriptionItem-${it.id}`}>
											<Link
												href={`/subscription-items/${it.subscriptionItem.id}`}
												key={`subscriptionItem-${it.id}`}
											>
												Subscription: {it.subscriptionItem.summary}
											</Link>
										</li>
									),
									it.coupon && (
										<li key={`coupon-${it.id}`} className={coupon_cart_item}>
											<h5>Coupon: {it.coupon.name}</h5>
											<div className={perItemTotal}>
												{it.coupon.amount_off ? (
													<p>-{moneyFormatter(it.coupon.amount_off)}</p>
												) : (
													<p>-{it.coupon.percent_off}%</p>
												)}
											</div>
										</li>
									),
								].filter(Boolean)
							)}
						</ul>
					) : (
						<NoData name={"order items"} />
					)}
				</section>
			</div>
			<footer className={layout_content}>
				<table style={{ fontSize: "var(--space-ms)" }}>
					<tbody>
						<tr>
							<td>stripeCheckoutSessionId:</td>
							<td>{stripeCheckoutSessionId}</td>
						</tr>
						<tr>
							<td>stripePaymentIntent:</td>
							<td>{stripePaymentIntent}</td>
						</tr>
					</tbody>
				</table>
			</footer>
		</main>
	)
}

// function TicketOrderItem({ item }: { item: OrderItem }) {
// 	const tickets = item.tickets
// 	return (
// 		<>
// 			{tickets.map((tix) => (
// 				<li className={styles.item} key={tix.id}>
// 					<ImageDynamic photoIn={tix?.event.image} />

// 					<h5>{tix.eventSummary}</h5>
// 					<div className="perItemTotal">
// 						<p>{moneyFormatter(tix.event.price * item.quantity)}</p>
// 						<br />
// 						{item.quantity} &times; {moneyFormatter(tix.event.price)} each
// 					</div>
// 				</li>
// 			))}
// 		</>
// 	)
// }

function BookingOrderItem({ item }: { item: OrderItem }) {
	const { summary, price, service, id } = item.booking
	return (
		<li className={styles.item}>
			<ImageDynamic photoIn={service?.image} />

			<Link href={`/bookings/${id}`}>
				<h5>{summary}</h5>
			</Link>
			<div className={perItemTotal}>
				<p>{moneyFormatter(price * item.quantity)}</p>
				<em>Booking</em>
			</div>
		</li>
	)
}

const query = `
  id
  label
  total
  stripeCheckoutSessionId
  stripePaymentIntent
  status
  count
  dateCreated
  dateModified
  items {
    id
    quantity
    type
    booking {
      id
      summary
      price
      service {
        image
      }
    }
    rental {
      id
      summary
    }
    tickets {
      id
      orderIndex
      status
      eventSummary
      event {
        id
        summary
        start
        price
        image
      }
    }
    product {
      id
      name
      price
      rental_price
      image
    }
    subscriptionItem {
      id
      summary
    }
    coupon {
      id
      name
      amount_off
      percent_off
    }
  }  
  user{
    id
    email
  }
`
