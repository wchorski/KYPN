"use client"
import {
	SubmitButtonInlineIcons,
} from "@components/forms/SubmitButton"
import { useCart } from "@components/hooks/CartStateContext"
import { InputField } from "@components/InputField"
import { useForm } from "@hooks/useForm"
import type {  AddonCheckboxOptions, CartItem  } from "@ks/types"
import type { AddToCartState} from "@lib/actions/postAddToCart";
import moneyFormatter from "@lib/moneyFormatter"
import {
	IconCheckMark,
	IconExclamationCircle,
	IconShoppingBagAdd,
	IconSpinnerLines,
} from "@lib/useIcons"
import { delay } from "@lib/utils"
import { addons_wrap,form, one_click_form } from "@styles/menus/form.module.scss"
import type { ReactNode} from "react";
import { useState } from "react"

type Props = {
	productId: string | undefined
	eventId: string | undefined
  //? cannot have subscriptions in cart. must have seperate checkout
	// subscriptionPlanId: string | undefined
	addonOptions?: AddonCheckboxOptions[]
	sessionId: string
	type: "SALE" | "RENTAL" | "SUBSCRIPTION"
	buttonText?: string
}

export default function AddToCartForm({
	eventId,
	productId,
	// subscriptionPlanId,
	type,
	buttonText,
  addonOptions = []
}: Props) {
	const initState: AddToCartState = {
		values: {
			eventId,
			productId,
			// subscriptionPlanId,
      couponCode: undefined,
			quantity: 1,
			type,
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
		data: undefined,
	}
  
	const { state, action } = useForm(onSubmit, initState)
	const [inlineIconState, setInlineIconState] = useState<ReactNode>(
		<IconShoppingBagAdd />
	)
	const [isPending, setIsPending] = useState(false)
	const { addToCart } = useCart()

	// async function onSubmit(
	// 	prevState: AddToCartState,
	// 	data: FormData
	// ): Promise<AddToCartState> {

	async function onSubmit(e: React.FormEvent): Promise<AddToCartState> {
		e.preventDefault()
		// if (!session) return router.push(`/auth`)

		try {
			setIsPending(true)
			setInlineIconState(<IconSpinnerLines />)
			const res = await fetch(`/api/gql/protected`, {
				method: "POST",
				body: JSON.stringify({
					query: `
            mutation AddToCart($type: String!, $quantity: Int!, $productId: ID, $eventId: ID) {
              addToCart(type: $type, quantity: $quantity, productId: $productId, eventId: $eventId) {
                ${query}
              }
            }
          `,

					variables: {
						// ...state.values,
						type: state.values?.type,
						productId: state.values?.productId,
						// subscriptionPlanId: state.values?.subscriptionPlanId,
						eventId: state.values?.eventId,
						quantity: Number(state.values?.quantity),
					},
				}),
			})
			const data = (await res.json()) as {
				addToCart: CartItem
			}

			if (!data.addToCart) {
				setIsPending(false)
				setInlineIconState(<IconExclamationCircle />)
				return {
					...state,
					error: "No Data",
				}
			}

			await delay(800)
			setInlineIconState(<IconCheckMark />)
			await delay(600)
			setInlineIconState(<IconShoppingBagAdd />)
			setIsPending(false)
			addToCart(data.addToCart)

			return {
				...state,
				// data,
				success: "added to cart",
			}
		} catch (error: any) {
			setIsPending(false)
			setInlineIconState("error")
			setInlineIconState(<IconExclamationCircle />)
			console.log("!!! addtocart error: ", error)
			return {
				...state,
				error: error,
			}
		}
	}

	return (
		<form
			// action={action}
			onSubmit={onSubmit}
			className={addonOptions.length > 0 ? form : one_click_form}
		>
			<InputField
				type={"hidden"}
				defaultValue={state.values?.productId}
				name={"productId"}
				error={state.valueErrors?.productId}
			/>
			{/* <InputField
				type={"hidden"}
				defaultValue={state.values?.subscriptionPlanId}
				name={"subscriptionPlanId"}
				error={state.valueErrors?.subscriptionPlanId}
			/> */}
			<InputField
				type={"hidden"}
				defaultValue={state.values?.quantity}
				name={"quantity"}
				error={state.valueErrors?.quantity}
			/>
			<InputField
				type={"hidden"}
				defaultValue={state.values?.type}
				name={"type"}
				error={state.valueErrors?.type}
			/>

			{addonOptions.length > 0 && (
				<fieldset>
					<legend>Add-Ons</legend>

					<div className={addons_wrap}>
						{addonOptions.map((addon) => (
							<label key={addon.id} htmlFor={addon.id} className={"checkbox"}>
								<input
									name={"addonIds"}
									value={addon.id}
									type={"checkbox"}
									readOnly={false}
									defaultChecked={addon.isChecked}
									// onChange={(e) => {
									// 	dispatchRed({
									// 		type: "ADDON_CHECKBOX",
									// 		payload: {
									// 			value: e.currentTarget.value,
									// 			isChecked: e.currentTarget.checked,
									// 		},
									// 	})
									// }}
								/>
								<span>
									<strong> {moneyFormatter(addon.price || 0)} </strong>
									{addon.name}
								</span>
							</label>
						))}
					</div>
				</fieldset>
			)}

			<SubmitButtonInlineIcons
				icon={inlineIconState}
				className={"button medium"}
				title="add to cart"
				label={buttonText}
				isPending={isPending}
			/>
		</form>
	)
}

const query = `
  id
  type
  quantity
  subTotal
  event {
    id
    summary
    price
    image
  }
  product {
    id
    price
    rental_price
    name
    image
    stripePriceId
    stripeProductId
  }
  booking {
    id
    price
    summary
    service {
      image
    }
  }
  rental {
    id
    summary
    start
    end
    days
    address
    delivery
    timeZone
  }
`
