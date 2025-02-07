"use client"
// cred - https://medium.com/@josh.ferriday/intergrating-stripe-payments-with-next-app-router-9e9ba130f101
import React, { useCallback, useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
	EmbeddedCheckoutProvider,
	// CheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"

import {
	postStripeSession,
	StripeCheckoutSessionAction,
} from "@lib/actions/postStripeSession"
import { envs } from "@/envs"
if (!envs.STRIPE_PUBLIC_KEY)
	throw new Error("!!! envs.STRIPE_PUBLIC_KEY not set")
const stripePromise = loadStripe(envs.STRIPE_PUBLIC_KEY)

export function StripeCheckoutForm(props: StripeCheckoutSessionAction) {
	const fetchClientSecret = useCallback(async () => {
		const stripeResponse = await postStripeSession(props)
		return stripeResponse.clientSecret
	}, [props])

	// https://docs.stripe.com/payments/checkout/customization/appearance?payment-ui=embedded-components
	const options = {
		fetchClientSecret,
		// elementsOptions: {
		//   appearance: {
		//     theme: "stripe",

		//     variables: {
		//       colorPrimary: "var(--c-primary)",
		//       colorBackground: "var(--c-body)",
		//       colorText: "var(--c-txt)",
		//       colorDanger: "var(--c-error)",
		//       fontFamily: "Ideal Sans, system-ui, sans-serif",
		//       spacingUnit: "var(--space-xs)",
		//       borderRadius: "var(--space-s)",
		//       // See all possible variables below
		//     },
		//   },
		// }
	}

	return (
		<div id="stripe-checkout">
			<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	)
}
