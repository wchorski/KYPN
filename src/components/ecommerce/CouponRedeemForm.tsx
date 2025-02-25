"use client"
import { SubmitButton } from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import Flex from "@components/layouts/Flex"
import { useForm } from "@hooks/useForm"
import { Coupon } from "@ks/types"
import {
	postRedeemCoupon,
	RedeemCouponState,
} from "@lib/actions/postRedeemCoupon"
import moneyFormatter from "@lib/moneyFormatter"
import { IconCheckMark, IconCoupon } from "@lib/useIcons"
import styles, { perItemTotal } from "@styles/ecommerce/cart.module.css"
import { form, inline_w_submit } from "@styles/menus/form.module.scss"
import { useRef } from "react"

type Props = {
	onApply: (coupon: Coupon) => void
}

const initState: RedeemCouponState = {
	values: {
		code: "",
	},
	valueErrors: undefined,
	error: undefined,
	success: undefined,
	url: undefined,
	id: undefined,
	coupon: undefined,
}

export function CouponRedeemForm({ onApply }: Props) {
	const { state, action } = useForm(postRedeemCoupon, initState)
	//? easiest way to set this. could have used useCallback but seemed so convoluted
	const couponRef = useRef<Coupon | null>(null)

	if (state.success && state.coupon && couponRef.current !== state.coupon) {
		console.log(state.coupon)
		couponRef.current = state.coupon
		onApply(state.coupon)
	}

	return (
		<form className={form} action={action}>
			<fieldset className={inline_w_submit}>
				<InputField
					name="code"
					type="text"
					placeholder="D1$C0VNT C0D3..."
					error={state.valueErrors?.code}
				/>

				{!state.success ? (
					<SubmitButton label="Apply Coupon" />
				) : (
					<p className={"success"} title={state.success}>
						<IconCheckMark />
					</p>
				)}
			</fieldset>

			<p className={"error"}>{state.error}</p>
		</form>
	)
}
