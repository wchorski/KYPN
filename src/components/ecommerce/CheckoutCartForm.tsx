"use client"
import { SubmitButton } from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import { useForm } from "@hooks/useForm"
import { CartItem } from "@ks/types"
import {
	CheckoutCartState,
	postCheckoutCart,
} from "@lib/actions/postCheckoutCart"
import { form } from "@styles/menus/form.module.scss"

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

	return (
		<form action={action} className={form}>
			
			{/* <InputField /> */}

			{!state.success ? (
				<SubmitButton label="Checkout" />
			) : (
				<p className={"success"}>{state.success}</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)
}
