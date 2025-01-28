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
import { useRouter } from "next/navigation"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { LoadingAnim } from "@components/elements/LoadingAnim"

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
	const { getUserCart } = useCart()
	const router = useRouter()
	const { data: session, status } = useSession()

	useEffect(() => {
		// throw new Error('How to remove cart items on successful checkout')
		if (state.success) {
			getUserCart(session?.itemId)
			router.push(state.url || "/checkout/completed")
		}

		// return () =>
	}, [state.success, getUserCart, session?.itemId, router, state.url])

  if(status === 'loading') return <LoadingAnim />
	if(status === 'authenticated') return (
		<form action={action} className={form}>
			{/* <InputField /> */}
			<h3>
				<CartTotal />
			</h3>
      <p className={'debug'} >DEBUG: stripeCreateInstallmentPayment selections if total is above x amount. set in searchParams</p>
			<hr />
			{!state.success ? (
				<SubmitButton label="Checkout" />
			) : (
				<p className={"success"}>{state.success}</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)

  if(status === 'unauthenticated') return <p className={'sub-text'} >unauthenticated</p>
  return null
}
