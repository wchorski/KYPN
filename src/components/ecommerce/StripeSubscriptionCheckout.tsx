"use client"
// cred - https://docs.stripe.com/billing/subscriptions/build-subscriptions?platform=web&ui=embedded-form
import type { Addon, Coupon, SubscriptionPlan, User } from "@ks/types"
import { postStripeSubscriptionSession } from "@lib/actions/postStripeSubscriptionSession"
import {
	// CheckoutProvider,
	EmbeddedCheckout,
	EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useCallback } from "react"

import { envs } from "@/envs"

type Props = {
	subscriptionPlan: SubscriptionPlan
	coupon?: Coupon
	addons?: Addon[]
	user: User
	email?: string
}

if (!envs.STRIPE_PUBLIC_KEY)
	throw new Error("!!! envs.STRIPE_PUBLIC_KEY not set")
const stripePromise = loadStripe(envs.STRIPE_PUBLIC_KEY)

export function StripeSubscriptionCheckout({
	subscriptionPlan,
	coupon,
	addons = [],
  user,
  email,
}: Props) {
	const fetchClientSecret = useCallback(async () => {
		// if (!subscriptionPlanId) return null
		console.log("StripeCheckoutForm - fetchClientSecret")
		const stripeResponse = await postStripeSubscriptionSession({
			subscriptionPlan,
			coupon,
			addons,
			user,
			email,
		})
		return stripeResponse.clientSecret
	}, [subscriptionPlan, addons, coupon, user, email])

	// https://docs.stripe.com/payments/checkout/customization/appearance?payment-ui=embedded-components
	const options = {
		fetchClientSecret,
	}
	return (
		<div id="stripe-checkout" >
			<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	)
}
