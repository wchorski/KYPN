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

export const metadata: Metadata = {
	title: `Checkout Completed | ` + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { stripeCheckoutSessionId: string }
	params: { id: string }
}

export default async function CheckoutSuccessPage({
	params,
	searchParams,
}: Props) {
	const { stripeCheckoutSessionId } = await searchParams
	// const session = await getServerSession(nextAuthOptions)

	// TODO account for other `checkoutSessionId` stuff
	if (!stripeCheckoutSessionId)
		return (
			<NoDataFoundPage>
				<p> no checkout session id</p>
			</NoDataFoundPage>
		)

	const { session: stripeCheckoutSession, error } = await getCheckoutSession(
		stripeCheckoutSessionId
	)

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
							status:{" "}
							<StatusBadge
								type={"any"}
								status={stripeCheckoutSession.status}
							/>
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
							<Link href={`/account?dashState=orders#orders`}>My Account</Link>
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

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Checkout Return </h1>
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

const getCheckoutSession = async (sessionId: string) => {
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
