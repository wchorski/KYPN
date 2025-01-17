"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom"
import { Ticket } from "@ks/types"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { Button } from "@components/elements/Button"
import { useForm } from "@hooks/useForm"
import { SubmitButton } from "@components/forms/SubmitButton"
import {
	actionTicketRedeem,
	TicketRedeemState,
} from "@lib/actions/actionTicketRedeem"
import { RadioField } from "@components/forms/RadioField"
import { form } from "@styles/menus/form.module.scss"
import { InputField } from "@components/InputField"

type Props = {
	ticketId: string
	status: string
}

type Fields = {
	status: Ticket["status"]
}

type FormState = {
	message: string
	errors: Record<keyof Fields, string> | undefined
	fieldValues: Fields
}

const statusOptions = [
	{ value: "ATTENDED", label: "Redeem Ticket" },
	{ value: "PAID", label: "Paid (Un-Redeem)" },
]

export function TicketRedeemForm({ ticketId, status }: Props) {

	const router = useRouter()

	const initState: TicketRedeemState = {
		values: {
			status,
			ticketId,
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
	}

	const { state, action } = useForm(actionTicketRedeem, initState)

  if(!state) return 
	return (
		<form action={action} className={form}>

			<fieldset>
        <InputField 
          name={'ticketId'}
          type={'hidden'}
          required={true}
          defaultValue={state.values?.ticketId}
          error={state.valueErrors?.ticketId}
        />
        {state.values?.status}
				<RadioField
					name={"status"}
          required={true}
					dataId={state.values?.status}
					options={statusOptions}
					defaultOptionValue={state.values?.status}
          error={state.valueErrors?.status}
				/>
			</fieldset>

			{!state.success ? (
				<SubmitButton label={"Update"} />
			) : (
				<p className={"success"}>{state.success}</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)
}
