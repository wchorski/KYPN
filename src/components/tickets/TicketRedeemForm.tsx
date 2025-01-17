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
import { Callout } from "@components/blocks/Callout"
import { StatusBadge } from "@components/StatusBadge"

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
	{ value: "UNPAID", label: "UNPAID (Un-Redeem)" },
]

export function TicketRedeemForm({ ticketId, status }: Props) {
	const initState: TicketRedeemState = {
		values: {
			currStatus: status,
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

	if (!state) return
	// TODO maybe simplify this as a one button REDEEM. Or maybe just redeem on scan?
	if (!["PAID", "RSVP"].includes(status))
		return (
			<Callout intent={"warning"}>
				<p>ticket already claimed or invalid</p>
			</Callout>
		)

	return (
		<form action={action} className={form}>
			<p>
				<StatusBadge type={"ticket"} status={state.values?.status} />
			</p>
			<fieldset>
				<InputField
					name={"ticketId"}
					type={"hidden"}
					required={true}
					defaultValue={state.values?.ticketId}
					error={state.valueErrors?.ticketId}
				/>
				<InputField
					name={"currStatus"}
					type={"hidden"}
					required={true}
					defaultValue={state.values?.currStatus}
					error={state.valueErrors?.currStatus}
				/>
				<InputField
					name={"status"}
					type={"hidden"}
					required={true}
					defaultValue={"ATTENDED"}
					error={state.valueErrors?.currStatus}
				/>
				{/* <RadioField
					name={"status"}
          required={true}
					dataId={state.values?.status}
					options={statusOptions}
					defaultOptionValue={state.values?.status}
          error={state.valueErrors?.status}
				/> */}
			</fieldset>

			{!state.success ? (
				<SubmitButton label={"Redeem Ticket"} />
			) : (
				<p className={"success"}>{state.success}</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)
}
