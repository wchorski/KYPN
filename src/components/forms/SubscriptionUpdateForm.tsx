"use client"
import { form } from "@styles/menus/form.module.scss"
import { SubmitButton } from "./SubmitButton"
import { Callout } from "@components/blocks/Callout"
import type { SubscriptionItem } from "@ks/types"
import {
	postSubscriptionUpdate,
	SubscriptionUpdateState,
} from "@lib/actions/postSubscriptionUpdate"
import { useForm } from "@hooks/useForm"
import { RadioField } from "./RadioField"
import { InputField } from "@components/InputField"
import Link from "next/link"

type Props = {
	subscriptionItemId: string
	status: SubscriptionItem["status"] | string
}

const statusOptions = [
	{ value: "ACTIVE", label: "Active" },
	{ value: "PAUSED", label: "Pause" },
	{ value: "CANCELED", label: "Cancel" },
]

export function SubscriptionUpdateForm({ subscriptionItemId, status }: Props) {
	const initState: SubscriptionUpdateState = {
		values: {
			currStatus: status,
			status,
			subscriptionItemId,
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
	}

	const { state, action } = useForm(postSubscriptionUpdate, initState)

	return (
		<form className={form} action={action}>
			<fieldset
				disabled={
					state.success
						? true
						: state.values?.status === "CANCELED"
						? true
						: false
				}
			>
				<InputField
					type={"hidden"}
					name={"subscriptionItemId"}
					defaultValue={state.values?.subscriptionItemId}
					required={true}
					error={state.valueErrors?.subscriptionItemId}
				/>
				<RadioField
					name={"status"}
					required={true}
					dataid={state.values?.status}
					options={statusOptions}
					defaultoptionvalue={state.values?.status}
					error={state.valueErrors?.status}
				/>
			</fieldset>

			{!state.success ? (
				<SubmitButton
					label={"Update"}
					isDisabled={state.values?.status === "CANCELED"}
				/>
			) : (
				<Callout intent={"success"}>{state.success}</Callout>
			)}
			{state.values?.status === "CANCELED" && (
				<p className="error">
					Subscription cannot be re-activated after cancelation. Create a new{" "}
					<Link href={`/subscription-plans`}>subscription</Link>
				</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)
}
