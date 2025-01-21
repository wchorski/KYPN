"use client"
import { SubmitButton } from "@components/forms/SubmitButton"
import { useCart } from "@components/hooks/CartStateContext"
import { useForm } from "@hooks/useForm"
import { CartItem } from "@ks/types"
import {
	CheckoutCartState,
	postCheckoutCart,
} from "@lib/actions/postCheckoutCart"
import { form } from "@styles/menus/form.module.scss"
import { useEffect } from "react"
import { CartTotal } from "./CartTotal"
import { useRouter } from 'next/navigation'
 

type Props = {
	cartItems: CartItem[]
}

const initState: CheckoutCartState = {
	values: {},
	valueErrors: undefined,
	error: undefined,
	success: undefined,
	url: undefined,
	id: undefined,
}

export function CheckoutCartForm({ cartItems }: Props) {
	const { state, action, submitCount } = useForm(postCheckoutCart, initState)
	const { setCartItems } = useCart()
  const router = useRouter()
 

	useEffect(() => {
		// throw new Error('How to remove cart items on successful checkout')
		if (state.success) {
			console.log("checkout success: ", state.success)
			setCartItems([])
      router.push(state.url || '/checkout/completed')
		}

		// return () =>
	}, [state.success])

	return (
		<form action={action} className={form}>
			{/* <InputField /> */}
			<h3>
				<CartTotal />
			</h3>
			<hr />
			{!state.success ? (
				<SubmitButton label="Checkout" />
			) : (
				<p className={"success"}>{state.success}</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)
}
