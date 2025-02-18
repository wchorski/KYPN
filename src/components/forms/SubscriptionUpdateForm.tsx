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
			<RadioField
				name={"status"}
				required={true}
				dataId={state.values?.status}
				options={statusOptions}
				defaultOptionValue={state.values?.status}
				error={state.valueErrors?.status}
			/>
			{!state.success ? (
				<SubmitButton label={"Update"} />
			) : (
				<p className={"success"}>
					<Callout intent={"success"}>{state.success}</Callout>
				</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)
}
