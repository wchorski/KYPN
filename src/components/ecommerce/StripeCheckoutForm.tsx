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
import { useCart } from "@components/hooks/CartStateContext"
import { User } from "@ks/types"
if (!envs.STRIPE_PUBLIC_KEY)
	throw new Error("!!! envs.STRIPE_PUBLIC_KEY not set")
const stripePromise = loadStripe(envs.STRIPE_PUBLIC_KEY)

export type Props = {
	user: User
	email?: string
	// TODO this is here for my peace of mind, but prob can omit
	// itemType: "ticket" | "product" | "booking"
}

export function StripeCheckoutForm({ user, email }: Props) {
	const { cartItems, cartTotal } = useCart()

	const fetchClientSecret = useCallback(async () => {
		// if (cartItems.length <= 0) return console.log("!!! cartItems.length <= 0")
    console.log('StripeCheckoutForm - fetchClientSecret');
		const stripeResponse = await postStripeSession({ cartItems, user, email })
		return stripeResponse.clientSecret
	}, [cartItems, user, email])

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

  // if (cartItems.length <= 0) return null
	return (
		<div id="stripe-checkout" key={cartTotal}>
			<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	)
}
