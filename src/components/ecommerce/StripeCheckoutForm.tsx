"use client"
// cred - https://medium.com/@josh.ferriday/intergrating-stripe-payments-with-next-app-router-9e9ba130f101
// cred - https://stackoverflow.com/questions/78215500/react-and-stripe-integration-client-secret-returned-by-stripe-not-being-recogn
import React, { useCallback, useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"

import {
	postStripeSession,
} from "@lib/actions/postStripeSession"
import { envs } from "@/envs"
import { useCart } from "@components/hooks/CartStateContext"
import { User } from "@ks/types"
import { LoadingAnim } from "@components/elements/LoadingAnim"
if (!envs.STRIPE_PUBLIC_KEY)
	throw new Error("!!! envs.STRIPE_PUBLIC_KEY not set")
const stripePromise = loadStripe(envs.STRIPE_PUBLIC_KEY)

export type Props = {
	user: User
	email?: string
}

//TODO there is some hydration or blank string error happening here, but it's working in dev...

export function StripeCheckoutForm({ user, email }: Props) {
	const { cartItems, cartTotal } = useCart()
	const [clientSecret, setClientSecret] = useState("")

	const fetchClientSecret = useCallback(async () => {
		if (cartItems.length <= 0) return ''

		console.log("StripeCheckoutForm - fetchClientSecret")
		const stripeResponse = await postStripeSession({ cartItems, user, email })
    if (!stripeResponse.clientSecret) {
      console.error("No clientSecret received from backend!")
      return ''
    }
		setClientSecret(stripeResponse.clientSecret)
		return stripeResponse.clientSecret
	}, [cartItems, user, email])

	// https://docs.stripe.com/payments/checkout/customization/appearance?payment-ui=embedded-components
	const options = {
		fetchClientSecret,
	}

	if (!options) return null
	// if (cartItems.length <= 0) return null
	return (
		<div id="stripe-checkout" key={cartTotal}>
			{options ? (
				<EmbeddedCheckoutProvider
					stripe={stripePromise}
					options={options}
					// options={{ clientSecret: clientSecret }}
				>
					<EmbeddedCheckout />
				</EmbeddedCheckoutProvider>
			) : (
				<LoadingAnim />
			)}
		</div>
	)
}
