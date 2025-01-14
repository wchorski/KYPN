"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { Event, Product, Ticket, User } from "@ks/types"
// cred - https://medium.com/@josh.ferriday/intergrating-stripe-payments-with-next-app-router-9e9ba130f101
import { Stripe } from "stripe"

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")

const stripe = new Stripe(envs.STRIPE_SECRET)

export type StripeCheckoutSessionAction = {
	quantity: number
	user?: User
	email?: string
} & (
	| {
			itemType: "product"
			product: Product
	  }
	| {
			itemType: "ticket"
			event: Event
	  }
)

export const postStripeSession = async (props: StripeCheckoutSessionAction) => {
	const { itemType, quantity, email, user } = props

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] | undefined =
		(() => {
			switch (itemType) {
				case "product":
					return [
						{
							price: props.product.stripePriceId, // Use priceId for products
							quantity: quantity,
						},
					]

				case "ticket":
					return createTicketLineItems(quantity, props.event, user)

				default:
					return undefined
			}
		})()

	//TODO maybe will be different between item types?
	const returnUrl = `${envs.FRONTEND_URL}/checkout/completed?stripeCheckoutSessionId={CHECKOUT_SESSION_ID}`

	const session = await stripe.checkout.sessions.create({
		ui_mode: "embedded",
		line_items,
		mode: "payment",
		return_url: returnUrl,
    ...(email ? {customer_email: email} : {}),
		customer: user?.stripeCustomerId,
		metadata: {
			typeof: itemType,
			...(itemType === "ticket"
				? { eventId: props.event.id, holderId: user?.id }
				: {}),
			orderId: null,
		},
	})

	if (!session.client_secret) throw new Error("Error initiating Stripe session")

	// TODO can i set this here instead of stripe dashboard?
	// if(envs.NODE_ENV === 'production') {
	//   // TODO will this cause problems? idk
	//   // look into `src/app/api/webhooks/stripe` `switch (event?.type)`
	//   const endpoint = await stripe.webhookEndpoints.create({
	//     url: envs.FRONTEND_URL + '/api/webhooks/stripe',
	//     enabled_events: [
	//       "payment_intent.payment_failed",
	//       "payment_intent.succeeded",
	//       "payment_intent.canceled",
	//       "checkout.session.completed",
	//       "product.updated",
	//       "invoice.paid",
	//       "invoice.payment_failed",
	//     ],
	//   })
	//   console.log({endpoint});
	// }

	return {
		clientSecret: session.client_secret,
	}
}

//* Line Item helpers
//* Line Item helpers
//* Line Item helpers
function createTicketLineItems(quantity: number, event: Event, user?: User) {
	return Array.from(
		{ length: quantity },
		(item: Ticket, i: number): Stripe.Checkout.SessionCreateParams.LineItem => {
			return {
				price_data: {
					// TODO make this part of CartItem schema item.currency, not hard coded
					currency: "usd",
					product_data: {
						name: `Ticket to ${event.summary} (${i + 1} of ${quantity})`,
						images: [event.image],
						metadata: {
							eventId: event.id,
							ticketIndex: `${i + 1} of ${quantity}`,
							typeof: "ticket",
							holderId: user?.id || "anonymous",
						},
					},

					unit_amount: event.price,
				},
				quantity: 1,
			}
		}
	)
}
