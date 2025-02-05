import { nextAuthOptions } from "@/session"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { datePrettyLocal } from "@lib/dateFormatter"
import moneyFormatter from "@lib/moneyFormatter"
import { getServerSession } from "next-auth"
import Link from "next/link"
import styles, { perItemTotal } from "@styles/ecommerce/cart.module.css"
import { Metadata } from "next"
import { envs } from "@/envs"
import { TicketList } from "@components/events/TicketList"
import { StatusBadge } from "@components/StatusBadge"
import {
  layout_breakout,
	layout_content,
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { fetchOrder } from "@lib/fetchdata/fetchOrder"
import ErrorPage from "@components/layouts/ErrorPage"
import { notFound } from "next/navigation"
import { OrderItem } from "@ks/types"
import { NoData } from "@components/elements/NoData"

export const metadata: Metadata = {
	title: "Order Receipt | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
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

	return (
		<main className={page_layout}>
			<header className={layout_content}>
				<h1> Order Receipt </h1>
			</header>
			<div className={[page_content, layout_content].join(' ')}>
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
								<td>{moneyFormatter(total)}</td>
							</tr>
						</tbody>
					</table>
				</section>

				<section>
					<h3> Items: </h3>
					{order.items.length > 0 ? (
						<ul className="orderItems unstyled grid gap-s">
							{order.items.flatMap((it) =>
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
								].filter(Boolean)
							)}
						</ul>
					) : (
						<NoData name={"order items"} />
					)}
				</section>
			</div>
			<footer className={layout_content} >
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
function ProductOrderItem({ item }: { item: OrderItem }) {
	const { name, price, image, id } = item.product
	return (
		<li className={styles.item}>
			<ImageDynamic photoIn={image} />

			<Link href={`/products/${id}`}>
				<h5>{name}</h5>
			</Link>
			<div className={perItemTotal}>
				<p>{moneyFormatter(price * item.quantity)}</p>
				<em>
					{item.quantity} &times; {moneyFormatter(price)} each
				</em>
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
    booking {
      id
      summary
      price
      service {
        image
      }
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
      image
    }
  }  
  user{
    id
    email
  }
`
