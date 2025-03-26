"use client"
import { Callout } from "@components/blocks/Callout"
import { SubmitButton } from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import { StatusBadge } from "@components/StatusBadge"
import { useForm } from "@hooks/useForm"
import type {  Ticket  } from "@ks/types"
import type {
	TicketRedeemState} from "@lib/actions/actionTicketRedeem";
import {
	actionTicketRedeem
} from "@lib/actions/actionTicketRedeem"
import { form } from "@styles/menus/form.module.scss"

type Props = {
	ticketId: string
	status: Ticket["status"]
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
				<p>
					<StatusBadge type={"ticket"} status={state.values?.status} />
				</p>
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
					dataid={state.values?.status}
					options={statusOptions}
					defaultoptionvalue={state.values?.status}
          error={state.valueErrors?.status}
				/> */}
			</fieldset>

			{!state.success ? (
				<SubmitButton label={"Redeem Ticket"} />
			) : (
				<p className={"success"}>
					<Callout intent={"success"}>{state.success}</Callout>
				</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)
}
