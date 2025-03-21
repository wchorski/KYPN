"use client"
import { SubmitButton } from "@components/forms/SubmitButton"
import { useCart } from "@components/hooks/CartStateContext"
import { InputField } from "@components/InputField"
import Flex from "@components/layouts/Flex"
import type { AddToCartState} from "@lib/actions/postAddToCart";
import { postAddToCart } from "@lib/actions/postAddToCart"
import { form } from "@styles/menus/form.module.scss"
import { useRouter } from "next/navigation"
import type { CSSProperties} from "react";
import { useFormState } from "react-dom"

type Props = {
	code?: string
}

const today = new Date()

export function CouponAddToCartForm({ code }: Props) {
	const router = useRouter()
	const { addToCart } = useCart()

	const initState: AddToCartState = {
		values: {
			type: "DISCOUNT",
			quantity: 1,
			productId: undefined,
			eventId: undefined,
			// subscriptionPlanId: undefined,
			couponCode: code || "",
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
	}

	// const { state, action, submitCount } = useForm(postAddToCart, initState)

	const [state, action] = useFormState(async (state: any, formData: any) => {
		let isError = false
		try {
			const resData = await postAddToCart(initState, formData)
			if (resData.cartItem) addToCart(resData.cartItem) // Update React Context
			return resData
		} catch (error) {
			console.log(error)
			isError = true
			return state
		}
	}, initState)

	return (
		<form className={form} action={action}>
			<Flex alignItems={'center'}>
				<InputField
					type="hidden"
					name={"type"}
					error={state?.valueErrors?.type}
					required={true}
					defaultValue={state?.values?.type}
				/>
				<InputField
					type="hidden"
					name={"quantity"}
					error={state?.valueErrors?.quantity}
					required={true}
					defaultValue={state?.values?.quantity}
				/>
				<InputField
					type="text"
					name={"couponCode"}
					label="Coupon Code"
					placeholder="D1$C0VNT..."
					error={state?.valueErrors?.couponCode}
					defaultValue={state?.values?.couponCode}
				/>

				<SubmitButton label={"Apply"} />
			</Flex>
			{/* // TODO animate this to pop in and out. like how blog `share link` works */}
			{!state?.success ? <></> : <p className={"success"}>{state?.success}</p>}

			<p className={"error"} style={errorStyle}>
				{state?.error}
			</p>
		</form>
	)
}

const errorStyle = {
	overflowY: "auto",
	height: "10vh",
} as CSSProperties
