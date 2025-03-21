"use client"

import { Card } from "@components/layouts/Card"
import Flex from "@components/layouts/Flex"
import type { 
	Addon,
	AddonCheckboxOptions,
	Coupon,
	SubscriptionPlan,
 } from "@ks/types"
import moneyFormatter, { calcDiscount, handleCouponDetails } from "@lib/moneyFormatter"
import { IconCoupon } from "@lib/useIcons"
import { bg_c_tertiary } from "@styles/colorthemes.module.css"
import styles, { perItemTotal } from "@styles/ecommerce/cart.module.css"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useReducer } from "react"

import { CouponRedeemForm } from "./CouponRedeemForm"
import { PriceTag } from "./PriceTag"

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

export function SubscriptionPlanLinkBuilder({
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
			case "SET_COUPON":
				return { ...state, coupon: action.payload, couponCode: "" }

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
			if (!value) return ""
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return "&" + params.toString()
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
			: couponApplied.percent_off
			? subscriptionPlan.price * (couponApplied.percent_off / 100)
			: subscriptionPlan.price
		return discountedTotal + addonAccumulatedTotal
	}

	useEffect(() => {
		console.log("change")
		// return () =>
	}, [searchParams])

	// const { } = useForm()

	return (
		<Card
			// className={form}
			gap={"var(--space-m)"}
			colorTheme={"outline_c_tertiary"}
		>
			<h2>Subscription Builder</h2>
			{/* // TODO currently not supporting subscription addons because it's a mf headache const addons = [] as Addon[] const errorAddons = false */}
			{/* {addons && addons.length > 0 && (
				<fieldset className={stand_alone}>
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
			)} */}
			{state.coupon ? (
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
						disabled={!state.coupon ? true : false}
						className={styles.remove}
						type={"button"}
						onClick={() =>
							dispatch({
								type: "SET_COUPON",
								payload: undefined,
							})
						}
						title={"remove coupon"}
					>
						<span> &times; </span>
					</button>
				</div>
			) : (
				<CouponRedeemForm
					onApply={(coupon) =>
						dispatch({
							type: "SET_COUPON",
							payload: coupon,
						})
					}
				/>
			)}
      <h5>{subscriptionPlan.name}</h5>
			<p style={{ fontSize: "1.6rem", margin: "0" }}>
				{!state.coupon ? (
					<>
						<PriceTag price={state.total} /> /
						{subscriptionPlan.billing_interval}
					</>
				) : (
					<>
						<s>
							<PriceTag price={state.total} /> /
							{subscriptionPlan.billing_interval}
						</s>
						<br />
						<PriceTag price={calcDiscount(state.total, state.coupon)} /> /
						{subscriptionPlan.billing_interval}
						<span className={["discount", "pill", bg_c_tertiary].join(" ")}>
							{handleCouponDetails(state.coupon)}
						</span>
					</>
				)}
				{subscriptionPlan.trial_period_days > 0 && (
					<>
						<br />
						<small className={"sub-text"}>
							includes {subscriptionPlan.trial_period_days} day trial period
						</small>
					</>
				)}

				{/* // TODO more verbose discount description (for one time, repeating, forever) */}
			</p>

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
						createQueryString(
							"addons",
							state.addonOptions
								.filter((adn) => adn.isChecked)
								.flatMap((adn) => adn.id)
								.join(",")
						) +
						createQueryString("couponCode", state.coupon?.code || "")
					}
				>
					Checkout
				</Link>
			</footer>
		</Card>
	)
}

