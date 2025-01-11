"use client"

import { useEffect, useReducer, useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { Event, User } from "@ks/types"
import { envs } from "@/envs"
import { loadStripe } from "@stripe/stripe-js"
import moneyFormatter from "@lib/moneyFormatter"
import { Button } from "@components/elements/Button"
import { useForm } from "@hooks/useForm"
import {
	actionTicketCheckout,
	TicketCheckoutState,
} from "@lib/actions/actionTicketCheckout"
import { form } from "@styles/menus/form.module.scss"
import { InputField } from "@components/InputField"
import { SubmitButton } from "@components/forms/SubmitButton"

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

	// const [formState, formAction] = useFormState(onSubmit, defaultFormData)
	const { state, action, submitCount } = useForm(
		actionTicketCheckout,
		initState
	)

	// async function onSubmit(prevState: FormState, data: FormData): Promise<FormState>{
	//   // console.log('START FORM');
	//   // console.log({data});

	//   const email = data.get('email') as string
	//   // const event = data.get('event') as string
	//   const quantity = Number(data.get('quantity') as string)

	//   const inputValues = {
	//     email,
	//     event: event.id,
	//     quantity
	//   }

	//   try {

	//     if(!envs.STRIPE_PUBLIC_KEY) return {
	//       ...formState,
	//       message: '!!! NO STRIPE PUBLIC KEY'
	//     }

	//     const stripe = await loadStripe(envs.STRIPE_PUBLIC_KEY as string);
	//     if (!stripe) throw new Error('Stripe failed to initialize.');

	//     if(typeof email !== 'string') throw new Error('email is not string')
	//     // if(typeof event !== 'string') throw new Error('event is not string')
	//     if(typeof quantity !== 'number') throw new Error('quantity is not number')

	//     const res = await fetch(`/api/checkout/tickets`, {
	//       method: 'POST',
	//       headers: {
	//         'Content-Type': 'application/json',
	//       },
	//       body: JSON.stringify({
	//         email,
	//         event: event.id,
	//         quantity,
	//       }),
	//     })

	//     const data = await res.json()

	//     const { sessionId, message , isSeatsAvailable, error } = data

	//       if(!isSeatsAvailable) return {
	//         ...formState,
	//         message: message
	//       }

	//       const stripeError = await stripe.redirectToCheckout({sessionId});

	//       if (stripeError) {
	//         console.log('!!! StripeCheckoutButton stripe Error: ');
	//         console.error(stripeError);

	//         return {
	//           ...formState,
	//           message: stripeError
	//         }
	//       }

	//     return {
	//       ...formState,
	//       message: 'success',
	//     }

	//   } catch (error:any) {
	//     console.log(error);

	//     return {
	//       message: error?.message,
	//       // TODO validate each field
	//       errors: {
	//         // event: '',
	//         email: '',
	//         quantity: ''
	//       },
	//       fieldValues: inputValues
	//     }
	//   }
	// }

	return (
		<form action={action} className={form}>
			<fieldset disabled={state.success ? true : false}>
				<legend> Get Tickets </legend>

				<InputField 
          name={'eventId'}
          type={'hidden'}
          // type={'text'}
          defaultValue={state.values?.eventId}
          error={state.values?.eventId}
        />
        <InputField 
          name={'userId'}
          type={'hidden'}
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

			<SubmitButton />

			<p className={"error"}>{state.error}</p>
			<p className={"success"}>
				{state.success}
				{state.url}
				{state.id}
			</p>
		</form>
	)
}
