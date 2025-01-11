"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
// cred - https://medium.com/@josh.ferriday/intergrating-stripe-payments-with-next-app-router-9e9ba130f101
import { Stripe } from "stripe"

if(!envs.STRIPE_SECRET) throw new Error('!!! ❌ envs.STRIPE_SECRET not set')

const stripe = new Stripe(envs.STRIPE_SECRET)

interface Props {
	priceId: string
}

export const postStripeSession = async ({ priceId }: Props) => {

  // TODO input `priceId` should be bigger `products` array 

  const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] | undefined = [
    {
      price: priceId,
      quantity: 1,
    },
  ]

	const returnUrl =
		`${envs.FRONTEND_URL}/checkout/completed?stripeCheckoutSessionId={CHECKOUT_SESSION_ID}`

	const session = await stripe.checkout.sessions.create({
		ui_mode: "embedded",
		line_items,
		mode: "payment",
		return_url: returnUrl,
	})

  // TODO if no errors then create Order with KS
  // TODO convert line_items for stripe to KS OrderItems type
  // const order = await keystoneContext.db.Order.createOne({})
  

	if (!session.client_secret) throw new Error("Error initiating Stripe session")

	return {
		clientSecret: session.client_secret,
	}
}
