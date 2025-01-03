"use client"

import { InputField } from "@components/InputField"
import { StatusBadge } from "@components/StatusBadge"
import { Button } from "@components/elements/Button"
import { SubmitButton } from "@components/forms/SubmitButton"
import { useForm } from "@hooks/useForm"
import {
	actionEmployeeGigDecision,
	EmployeeGigDecisionState,
} from "@lib/actions/actionEmployeeGigDecision"
import { form, mini_form } from "@styles/menus/form.module.scss"
import { useState } from "react"

type UpdateBookingResponse = {
	updateBooking?: {
		id: string
	}
	error?: any
}

type EmployeeGigDecision = "" | "CONFIRMED" | "DECLINED"

type Props = {
	userId: string
	bookingId: string
	decision: EmployeeGigDecision | string | null
}

type Fields = {
	decision: EmployeeGigDecision
}

const decisionOptions = [
	{ value: "CONFIRMED", label: "Confirm" },
	{ value: "DECLINED", label: "Decline" },
]

type FormState = {
	message: string
	errors: Record<keyof Fields, string> | undefined
	fieldValues: Fields
}

export function EmployeeGigDecisionForm({
	userId,
	bookingId,
	decision,
}: Props) {
	const initState: EmployeeGigDecisionState = {
		values: {
			bookingId,
			userId,
			decision,
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
	}

	// const [formState, formAction] = useFormState(onSubmit, defaultFormData);
	const { action, state, submitCount } = useForm(
		actionEmployeeGigDecision,
		initState
	)

	// async function onSubmit(
	// 	prevState: FormState,
	// 	data: FormData
	// ): Promise<FormState> {
	// 	const action = data.get("action") as EmployeeGigDecision
	// 	const inputValues = {
	// 		action,
	// 	} as Fields

	// 	try {
	// 		if (typeof action !== "string")
	// 			throw new Error("!!! action is not string")

	// 		const res = await fetch(`/api/gql/protected`, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				query: `
	//           mutation UpdateBooking($where: BookingWhereUniqueInput!, $data: BookingUpdateInput!) {
	//             updateBooking(where: $where, data: $data) {
	//               id
	//             }
	//           }
	//         `,
	// 				variables: {
	// 					where: { id: bookingId },
	// 					data:
	// 						action === "CONFIRMED"
	// 							? {
	// 									status: "CONFIRMED",
	// 									employee_requests: {
	// 										disconnect: [
	// 											{
	// 												id: userId,
	// 											},
	// 										],
	// 									},
	// 									employees: {
	// 										connect: [
	// 											{
	// 												id: userId,
	// 											},
	// 										],
	// 									},
	// 							  }
	// 							: // todo may add ability to decline gig
	// 							  {
	// 									employee_requests: {
	// 										connect: [
	// 											{
	// 												id: userId,
	// 											},
	// 										],
	// 									},
	// 									employees: {
	// 										disconnect: [
	// 											{
	// 												id: userId,
	// 											},
	// 										],
	// 									},
	// 							  },
	// 				},
	// 			}),
	// 		})

	// 		const { updateBooking, error } =
	// 			(await res.json()) as UpdateBookingResponse
	// 		console.log({ updateBooking })
	// 		if (error) throw new Error(error.message)

	// 		setEmpActionState(action)

	// 		return {
	// 			...formState,
	// 			message: action,
	// 		}

	// 		// setQuantityState(updateCartItem.quantity)
	// 	} catch (error: any) {
	// 		console.warn("!!! EmpGigAction Error: ", error)
	// 		return {
	// 			message: error?.message,
	// 			// TODO validate each field
	// 			errors: {
	// 				action: "",
	// 			},
	// 			fieldValues: inputValues,
	// 		}
	// 	} finally {
	// 	}
	// }

	return (
		<form
			action={action}
			className={mini_form}
		>
			<fieldset>
				<ul className="radio">
					{decisionOptions.map((opt, i) => (
						<label htmlFor="decision" key={i}>
							<input
								type="radio"
								name="decision"
								id={opt.value}
								value={opt.value}
								defaultChecked={opt.value === state.values?.decision}
							/>
							{opt.value === state.values?.decision ? (
								<strong className="current">{opt.label}</strong>
							) : (
								<span> {opt.label} </span>
							)}
						</label>
					))}
				</ul>

				<InputField
					name={"userId"}
					type={"hidden"}
					required={true}
					defaultValue={userId}
					error={state.valueErrors?.userId}
				/>
				<InputField
					name={"bookingId"}
					type={"hidden"}
					required={true}
					defaultValue={bookingId}
					error={state.valueErrors?.bookingId}
				/>
			</fieldset>

			{!state.success ? (
				<SubmitButton label={"decide"} />
			) : (
				<StatusBadge type={"booking"} status={state.values?.decision} />
			)}
			{state.error && <p className={"error"}>{state.error}</p>}
		</form>
	)
}

{
	/* <div className="flex g-1">
      {!EmpActionState ? <>
        <Button size={"small"} onClick={updateBooking}> Accept </Button>
        <Button size={"small"}> Decline </Button>
      </> : <>
        <p>{EmpActionState}</p>
      </> }
    </div> */
}
