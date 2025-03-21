"use client"

import { SubmitButton } from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import { useForm } from "@hooks/useForm"
import type {  Event, User  } from "@ks/types"
import type {
	TicketCheckoutState} from "@lib/actions/actionTicketToCart";
import {
	actionTicketToCart
} from "@lib/actions/actionTicketToCart"
import moneyFormatter from "@lib/moneyFormatter"
import { form } from "@styles/menus/form.module.scss"
import Link from "next/link"
import { useReducer } from "react"


type Props = {
	event: Event
	user?: User
}

type StateRed = {
	email: string
	total: number
}

type Action = { type: "RESET" } | { type: "SET_PRICE"; payload: number }

export function TicketForm({ event, user }: Props) {
	const initState: TicketCheckoutState = {
		values: {
			userId: user?.id,
			eventId: event.id,
			email: user?.email || "",
			quantity: 1,
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
	}

	const defaultstateRed: StateRed = {
		email: user?.email || "",
		total: event.price,
	}
	const reducer = (state: StateRed, action: Action): StateRed => {
		switch (action.type) {
			case "SET_PRICE":
				return {
					...state,
					total: event.price * action.payload,
				}

			case "RESET":
				return defaultstateRed

			default:
				throw new Error()
		}
	}

	const [stateRed, dispatchRed] = useReducer(reducer, defaultstateRed)
	const { state, action, submitCount } = useForm(actionTicketToCart, initState)

	return (
		<form action={action} className={form}>
			<fieldset disabled={state.success ? true : false}>
				<legend> Get Tickets </legend>

				<InputField
					name={"eventId"}
					type={"hidden"}
					// type={'text'}
					defaultValue={state.values?.eventId}
					error={state.values?.eventId}
				/>
				<InputField
					name={"userId"}
					type={"hidden"}
					// type={'text'}
					defaultValue={state.values?.userId}
					error={state.values?.userId}
				/>

				<InputField
					name={"email"}
					type={"email"}
					placeholder={"cptolimar@HocotateFreightCo.net"}
					defaultValue={state.values?.email}
					error={state.valueErrors?.email}
				/>

				<InputField
					name={"quantity"}
					type={"number"}
					placeholder={"1"}
          min={1}
          max={50}
					defaultValue={state.values?.quantity}
					error={state.valueErrors?.quantity}
					onChange={(e) =>
						dispatchRed({
							type: "SET_PRICE",
							payload: Number(e.currentTarget.value),
						})
					}
				/>
			</fieldset>

			<p> subtotal: {moneyFormatter(stateRed.total)}</p>

			{!state.success ? (
				<SubmitButton />
			) : (
				<p className={"success"}>
					{state.success}
					<Link href={state.url || ""}>Checkout</Link>
					{state.id}
				</p>
			)}

			<p className={"error"}>{state.error}</p>
		</form>
	)
}
