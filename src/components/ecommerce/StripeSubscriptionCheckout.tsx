"use client"
// cred - https://docs.stripe.com/billing/subscriptions/build-subscriptions?platform=web&ui=embedded-form
import { loadStripe } from "@stripe/stripe-js"
import {
	EmbeddedCheckoutProvider,
	// CheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import { envs } from "@/envs"
import { useCallback } from "react"
import { postStripeSubscriptionSession } from "@lib/actions/postStripeSubscriptionSession"
import type { SubscriptionPlan, User } from "@ks/types"

type Props = {
	subscriptionPlan: SubscriptionPlan
	couponIds?: string[]
	addonIds?: string[]
	user: User
	email?: string
}

if (!envs.STRIPE_PUBLIC_KEY)
	throw new Error("!!! envs.STRIPE_PUBLIC_KEY not set")
const stripePromise = loadStripe(envs.STRIPE_PUBLIC_KEY)

export function StripeSubscriptionCheckout({
	subscriptionPlan,
	couponIds = [],
	addonIds = [],
  user,
  email,
}: Props) {
	const fetchClientSecret = useCallback(async () => {
		// if (!subscriptionPlanId) return null
		console.log("StripeCheckoutForm - fetchClientSecret")
		const stripeResponse = await postStripeSubscriptionSession({
			subscriptionPlan,
			couponIds,
			addonIds,
			user,
			email,
		})
		return stripeResponse.clientSecret
	}, [subscriptionPlan, addonIds, couponIds, user, email])

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
