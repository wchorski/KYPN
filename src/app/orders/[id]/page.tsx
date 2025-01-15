import { nextAuthOptions } from "@/session"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { OrderItem } from "@ks/types"
import { datePrettyLocal } from "@lib/dateFormatter"
import moneyFormatter from "@lib/moneyFormatter"
import { getServerSession } from "next-auth"
import Link from "next/link"
import styles from "@styles/ecommerce/cart.module.scss"
import { Metadata } from "next"
import { envs } from "@/envs"
import { TicketList } from "@components/events/TicketList"
import { StatusBadge } from "@components/StatusBadge"
import {
	layout_content,
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { fetchOrder } from "@lib/fetchdata/fetchOrder"
import ErrorPage from "@components/layouts/ErrorPage"

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
	if (!order) return

	const {
		status,
		user,
		stripeCheckoutSessionId,
		stripePaymentIntent,
		items,
		ticketItems,
		count,
		dateCreated,
		dateModified,
		total,
	} = order

	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1> Order Receipt </h1>
			</header>
			<div className={page_content}>
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
					<ul className="orderItems">
						{order?.items.map((item: OrderItem) => (
							<li key={item.id} className={styles.item}>
								<ImageDynamic photoIn={item.image} />

								<h5>{item.name}</h5>
								<div className="perItemTotal">
									<p>{moneyFormatter(item.price * item.quantity)}</p>
									<br />
									<em>
										{item.quantity} &times; {moneyFormatter(item.price)} each
									</em>
								</div>
							</li>
						))}
					</ul>
				</section>

				<TicketList tickets={order?.ticketItems || []} />
			</div>
			<footer className={''}>
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

const query = `
  stripeCheckoutSessionId
  stripePaymentIntent
  status
  count
  dateCreated
  dateModified
  id
  items {
    id
    name
    price
    quantity
    image
  }
  ticketItems {
    id
    orderCount
    status
    event {
      summary
      start
      price
    }
  }
  user{
    id
    email
  }
  itemsCount
  label
  total
`
