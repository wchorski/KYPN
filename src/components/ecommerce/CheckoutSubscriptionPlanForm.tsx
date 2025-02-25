"use client"

import {
	Addon,
	AddonCheckboxOptions,
	Coupon,
	SubscriptionPlan,
} from "@ks/types"
import { useCallback, useEffect, useReducer } from "react"
import formStyles, { form } from "@styles/menus/form.module.scss"
import moneyFormatter from "@lib/moneyFormatter"
import { PriceTag } from "./PriceTag"
import StripeSubscriptionButton from "./StripeSubscriptionButton"
import { useForm } from "@hooks/useForm"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import styles, { perItemTotal } from "@styles/ecommerce/cart.module.css"
import { IconCoupon } from "@lib/useIcons"
import Flex from "@components/layouts/Flex"

type Props = {
	subscriptionPlan: SubscriptionPlan
	customerId: string
	addons?: Addon[]
	coupons?: Coupon[]
}

type State = {
	subscriptionPlanPrice: number
	addonOptions: AddonCheckboxOptions[]
	customerId: string
	couponCode: string
	coupon: Coupon | undefined
	total: number
}

type FormAsideAction =
	| { type: "RESET" }
	| { type: "SET_ADDON_OPTIONS"; payload: AddonCheckboxOptions[] }
	| { type: "SET_TOTAL"; payload: number }
	| { type: "SET_COUPONCODE"; payload: string }
	| { type: "SET_COUPON"; payload: Coupon | undefined }
	| { type: "ADDON_CHECKBOX"; payload: { value: string; isChecked: boolean } }
	| {
			type: "SET_CUSTOMER"
			payload: {
				name?: string
				email: string
				phone?: string
			}
	  }

export function CheckoutSubscriptionPlanForm({
	subscriptionPlan,
	addons = [],
	customerId,
	coupons = [],
}: Props) {
	const searchParams = useSearchParams()
	// const addonIds = searchParams.get("addonIds")

	const defaultState: State = {
		subscriptionPlanPrice: subscriptionPlan.price,
		customerId: customerId,
		addonOptions:
			addons?.map((ad) => ({
				name: ad.name,
				label: ad.name,
				id: ad.id,
				isChecked: false,
				price: ad.price,
			})) || [],
		couponCode: "",
		coupon: undefined,
		total: subscriptionPlan.price,
	}
	const reducer = (state: State, action: FormAsideAction): State => {
		switch (action.type) {
			case "SET_COUPONCODE":
				return { ...state, couponCode: action.payload }

			case "SET_COUPON":
				return { ...state, coupon: action.payload, couponCode: "" }
			// case "SET_COUPON":
			// 	const addonsTotal = state.addonOptions
			// 		.filter((opt) => opt.isChecked)
			// 		.reduce((accumulator, addon) => {
			// 			return accumulator + addon.price
			// 		}, 0)
			// 	return { ...state, total: calcTotalPrice(state, addonsTotal) }

			case "SET_ADDON_OPTIONS":
				return { ...state, addonOptions: action.payload }

			case "ADDON_CHECKBOX":
				const addonBoxId = action.payload.value
				const updatedCheckboxes = state.addonOptions.map((checkbox) => {
					if (checkbox.id === addonBoxId) {
						return { ...checkbox, isChecked: action.payload.isChecked }
					}
					return checkbox
				})

				const addonsPriceTotal = updatedCheckboxes
					.filter((opt) => opt.isChecked)
					.reduce((accumulator, addon) => {
						return accumulator + addon.price
					}, 0)

				return {
					...state,
					addonOptions: updatedCheckboxes,
					total: calcTotalPrice(state, addonsPriceTotal),
				}

			case "RESET":
				return defaultState

			default:
				throw new Error()
		}
	}
	const [state, dispatch] = useReducer(reducer, defaultState)

	// cred - https://nextjs.org/docs/app/api-reference/functions/use-search-params
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	function calcTotalPrice(state: State, addonAccumulatedTotal: number) {
		const couponApplied = coupons?.find(
			(coup) => coup.name === state.couponCode
		)
		if (!couponApplied) return subscriptionPlan.price + addonAccumulatedTotal
		let discountedTotal = couponApplied.amount_off
			? subscriptionPlan.price - couponApplied.amount_off
			: subscriptionPlan.price * (couponApplied.percent_off / 100)
		return discountedTotal + addonAccumulatedTotal
	}

	async function handleCouponRedeem(code: string) {
		const res = await fetch(`/api/gql/protected`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
          mutation RedeemCoupon($code: String!) {
            redeemCoupon(code: $code) {
              id
              name
              code
              amount_off
              percent_off
              duration_in_months
              duration
              redeem_by
              max_redemptions
              redemptions
            }
          }
        `,
				variables: {
					code: code,
				},
			}),
		})

		const { redeemCoupon, error } = (await res.json()) as {
			redeemCoupon: Coupon
			error: any
		}

		if (error) throw new Error(error.message)
		if (!redeemCoupon) throw new Error("!!! coupon not found")
		console.log({ redeemCoupon })

		dispatch({ type: "SET_COUPON", payload: redeemCoupon })
	}

	useEffect(() => {
		console.log("change")
		// return () =>
	}, [searchParams])

	// const { } = useForm()

	return (
		<form
			className={form}
			// todo do i need a form action?
			// action={formAction}
		>
			<legend>Config Subscription</legend>

			{addons && addons.length > 0 && (
				<fieldset>
					<legend> Add-Ons</legend>
					{state.addonOptions.length === 0 && (
						<p className="subtext"> no addons available </p>
					)}
					<div className={formStyles.addons_wrap}>
						{state.addonOptions.map((addon) => (
							<label
								key={addon.name}
								htmlFor={addon.name}
								className={"checkbox"}
							>
								<input
									name={addon.name}
									value={addon.id}
									type={"checkbox"}
									readOnly={false}
									defaultChecked={addon.isChecked}
									onChange={(e) => {
										dispatch({
											type: "ADDON_CHECKBOX",
											payload: {
												value: e.target.value,
												isChecked: e.target.checked,
											},
										})
									}}
								/>
								<span>
									<strong> {moneyFormatter(addon.price)} </strong>
									{addon.name}
								</span>
							</label>
						))}
					</div>
				</fieldset>
			)}
			<fieldset>
				{state.coupon && (
					<div
						className={styles.item}
						style={{ border: "dashed 1px var(--c-txt)" }}
					>
						<figure style={{ margin: "var(--space-ms)" }}>
							<IconCoupon />
						</figure>

						<Flex
							flexDirection={"column"}
							gap={"ms"}
							justifyContent={"space-between"}
						>
							<h5>{state.coupon.name}</h5>
							<span>coupon</span>
						</Flex>

						<div className={perItemTotal}>
							{state.coupon.percent_off ? (
								<p>
									-{state.coupon.percent_off} <small>%</small>
								</p>
							) : state.coupon.amount_off ? (
								<p>-{moneyFormatter(state.coupon.amount_off)}</p>
							) : (
								<></>
							)}
						</div>

						{/* <CartRemoveItem id={item.id} /> */}
						<button
							disabled={state.coupon ? true : false}
							className={styles.remove}
							type={"button"}
							onClick={(e) =>
								dispatch({ type: "SET_COUPON", payload: undefined })
							}
							title={"remove coupon"}
						>
							<span> &times; </span>
						</button>
					</div>
				)}
				<label className={formStyles.coupon}>
					<input
						name="coupon"
						type="text"
						placeholder="D1$C0VNT C0D3..."
						onChange={(e) =>
							dispatch({ type: "SET_COUPONCODE", payload: e.target.value })
						}
					/>
					<button
						type="button"
						className="button"
						onClick={() => handleCouponRedeem(state.couponCode)}
					>
						Apply Coupon
					</button>
				</label>
			</fieldset>

			<p>
				Total: <PriceTag price={state.total} /> /
				{subscriptionPlan.billing_interval}
			</p>

      <p className={'debug'}> useReducer to calc added coupon (mention if one time, duraton, or forever)</p>

			<footer
			// className={styles.footer}
			>
				{/* <StripeSubscriptionButton
					id={subscriptionPlan.id}
					addonIds={state.addonOptions
						.filter((add) => add.isChecked)
						.flatMap((add) => add.id)}
					couponName={state.couponName}
				/> */}
				<Link
					className={"button medium"}
					href={
						`/checkout/subscription?id=${subscriptionPlan.id}` +
						"&" +
						createQueryString(
							"addons",
							state.addonOptions
								.filter((adn) => adn.isChecked)
								.flatMap((adn) => adn.id)
								.join(",")
						)
					}
				>
					Checkout
				</Link>
			</footer>
		</form>
	)
}
