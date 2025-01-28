import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
const stripe = require("stripe")(envs.STRIPE_SECRET)
import { Stripe } from "stripe"

import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { StatusBadge } from "@components/StatusBadge"
import Link from "next/link"
import ErrorPage from "@components/layouts/ErrorPage"
import { Metadata } from "next"
import moneyFormatter from "@lib/moneyFormatter"
import { Callout } from "@components/blocks/Callout"
import { fetchOrder } from "@lib/fetchdata/fetchOrder"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
	title: `Checkout Completed | ` + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { stripeCheckoutSessionId: string; orderId: string }
	params: { id: string }
}

export default async function CheckoutSuccessPage({
	params,
	searchParams,
}: Props) {
	const { stripeCheckoutSessionId, orderId } = await searchParams
	// const session = await getServerSession(nextAuthOptions)

	if (stripeCheckoutSessionId)
		return (
			<StripeCheckoutCheck stripeCheckoutSessionId={stripeCheckoutSessionId} />
		)
	if (orderId) return <NativeCheckoutSession id={orderId} />

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Checkout Not Found</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<p>
					No checkout session provided. View your{" "}
					<Link href={`/account`}>account</Link> or return to{" "}
					<Link href={`/checkout`}>checkout</Link>
				</p>
			</div>
		</main>
	)
}

const query = `
  total
  status
  bookings {
    id
    summary
    status
  }
`

async function NativeCheckoutSession({ id }: { id: string }) {
	const session = await getServerSession(nextAuthOptions)
	const { order, error } = await fetchOrder({ id, query, session })
	if (error) return <ErrorPage error={error} />
	if (!order) return notFound()

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Checkout Completed</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<Callout intent={"success"}>
					<p>
						A reciept will be sent via email. You may also review reciepts in
						your account. If you do not have an account, it is recommened you{" "}
						<strong>print this page</strong>{" "}
					</p>
				</Callout>
				<ul>
					<li>amount_total: {moneyFormatter(order.total)}</li>
					<li>
						Order status: <StatusBadge type={"any"} status={order.status} />
					</li>
					{order.bookings &&
						order.bookings.map((book) => (
							<li key={book.id}>
								{book.summary}:{" "}
								<StatusBadge type={"any"} status={book.status} />
							</li>
						))}
					<li>
						<Link href={`/account#orders`}>My Account</Link>
					</li>
				</ul>
			</div>
		</main>
	)
}

async function StripeCheckoutCheck({
	stripeCheckoutSessionId,
}: {
	stripeCheckoutSessionId: string
}) {
	const { session: stripeCheckoutSession, error } =
		await getStripeCheckoutSession(stripeCheckoutSessionId)

	if (error)
		return (
			<ErrorPage error={error}>
				<p>stripe error: {error}</p>
			</ErrorPage>
		)

	if (stripeCheckoutSession.status === "complete" && stripeCheckoutSessionId) {
		// TODO verify if order has been completed with ks?
		// if(stripeCheckoutSession.metadata.typeof === 'ticket')
		return (
			<main className={[page_layout].join(" ")}>
				<header className={layout_site}>
					<h1>Checkout Completed</h1>
				</header>
				<div className={[page_content, layout_site].join(" ")}>
					<Callout intent={"success"}>
						<p>Print this page</p>
					</Callout>
					<ul>
						<li>
							amount_total: {moneyFormatter(stripeCheckoutSession.amount_total)}
						</li>
						<li>
							Order status:{" "}
							<StatusBadge type={"any"} status={stripeCheckoutSession.status} />
						</li>
						<li>
							payment_status:{" "}
							<StatusBadge
								type={"any"}
								status={stripeCheckoutSession.payment_status}
							/>
						</li>
						<li>checkout_id: {stripeCheckoutSession.id}</li>
						<li>payment_intent: {stripeCheckoutSession.payment_intent}</li>
						<li>
							<Link href={`/account#orders`}>My Account</Link>
						</li>
					</ul>

					<h3>Stripe Checkout Session Response Debug</h3>
					<p>
						stripeCheckoutSession.metadata.typeof{" "}
						<strong>{stripeCheckoutSession.metadata.typeof}</strong>
					</p>
					<pre>{JSON.stringify(stripeCheckoutSession, null, 2)}</pre>
				</div>
			</main>
		)
	}

	if (stripeCheckoutSession.status === "open" && stripeCheckoutSessionId)
		return (
			<main className={[page_layout].join(" ")}>
				<header className={layout_site}>
					<h1>Checkout Open </h1>
				</header>
				<div className={[page_content, layout_site].join(" ")}>
					<p>
						Stripe has not completed this checkout. Contact{" "}
						{envs.ADMIN_EMAIL_ADDRESS} and add this as the subject{" "}
						<code>stripe_checkout_id: {stripeCheckoutSession.id}</code>
						<Link href={`/account`}>account</Link> or return to{" "}
						<Link href={`/checkout`}>checkout</Link>
					</p>
				</div>
			</main>
		)
}

const getStripeCheckoutSession = async (sessionId: string) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId)

		return { session }
	} catch (error: any) {
		if (error.type === "StripeInvalidRequestError") {
			console.error("Invalid session ID:", error.message)
			return {
				error:
					"The session ID is invalid. Visit your account or contact us to resolve this issue.",
			}
		} else {
			console.error("Unexpected error:", error)
			return {
				error:
					"An unexpected error occurred. Visit your account or contact us to resolve  this issue.",
			}
		}
	}
}
