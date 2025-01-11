"use client"
// cred - https://medium.com/@josh.ferriday/intergrating-stripe-payments-with-next-app-router-9e9ba130f101
import React, { useCallback, useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"

import { postStripeSession } from "@lib/actions/actionStripeSession"
import { envs } from "@/envs"

const stripePromise = loadStripe(envs.STRIPE_PUBLIC_KEY as string)

export function StripeCheckoutForm({ priceId }: { priceId: string }) {
	const fetchClientSecret = useCallback(async () => {
		const stripeResponse = await postStripeSession({ priceId })
		return stripeResponse.clientSecret
	}, [priceId])

	const options = { fetchClientSecret }

	return (
		<div id="stripe-checkout">
			<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	)
}
