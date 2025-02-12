// @ts-nocheck
"use client"
import { MdShoppingBag } from "react-icons/md"
import { TbCheck, TbExclamationCircle, TbLoader } from "react-icons/tb"
import stylesAnim from "@styles/eyecandy/SpinCycle.module.scss"
import styles from "@styles/ecommerce/cart.module.css"
import { useCart } from "@components/hooks/CartStateContext"
import { useForm } from "@hooks/useForm"
import { AddToCartState, postAddToCart } from "@lib/actions/postAddToCart"
import {
	SubmitButtonInlineIcons,
	SubmitButtonState,
} from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import { delay } from "@lib/utils"
import { ReactNode, useState } from "react"
import { CartItem } from "@ks/types"
import {
	IconCheckMark,
	IconExclamationCircle,
	IconShoppingBagAdd,
	IconSpinnerLines,
} from "@lib/useIcons"
import { one_click_form } from "@styles/menus/form.module.scss"

type Props = {
	productId: string | undefined
	eventId: string | undefined
	subscriptionPlanId: string | undefined
	sessionId: string
	type: "SALE" | "RENTAL" | "SUBSCRIPTION"
  buttonText?:string
}

export default function AddToCartForm({
	eventId,
	productId,
	subscriptionPlanId,
	type,
  buttonText,
}: Props) {
	const initState: AddToCartState = {
		values: {
			eventId,
			productId,
			subscriptionPlanId,
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
            mutation AddToCart($type: String!, $quantity: Int!, $productId: ID, $eventId: ID, $subscriptionPlanId: ID) {
              addToCart(type: $type, quantity: $quantity, productId: $productId, eventId: $eventId, subscriptionPlanId: $subscriptionPlanId) {
                ${query}
              }
            }
          `,

					variables: {
						// ...state.values,
						type: state.values?.type,
						productId: state.values?.productId,
						subscriptionPlanId: state.values?.subscriptionPlanId,
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
			className={one_click_form}
		>
			<InputField
				type={"hidden"}
				defaultValue={state.values?.productId}
				name={"productId"}
				error={state.valueErrors?.productId}
			/>
			<InputField
				type={"hidden"}
				defaultValue={state.values?.subscriptionPlanId}
				name={"subscriptionPlanId"}
				error={state.valueErrors?.subscriptionPlanId}
			/>
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
  }
  booking {
    id
    price
    summary
    service {
      image
    }
  }
  coupon {
    id
    name
    amount_off
    percent_off
  }
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
  }
  booking {
    id
    price
    summary
    service {
      image
    }
  }
  subscriptionPlan {
    id
    name
    price
    image
    billing_interval
  }
  rental {
    id
    summary
    start
    end
    days
    price
  }
  coupon {
    id
    name
    amount_off
    percent_off
  }
`
