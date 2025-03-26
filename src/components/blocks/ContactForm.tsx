"use client"
import { SubmitButton } from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import { TextareaField } from "@components/TextareaField"
import { useForm } from "@hooks/useForm"
import type {
	ContactState} from "@lib/actions/actionContactFormSubmit";
import {
	actionContactFormSubmit
} from "@lib/actions/actionContactFormSubmit"
import { form } from "@styles/menus/form.module.scss"
import { useSession } from "next-auth/react"
import type { CSSProperties} from "react";

type Props = {
	header?: string
	color?: string
	buttonLabel?: string
	isName?: boolean
	isPhone?: boolean
	isDate?: boolean
	isNotes?: boolean
	style?: CSSProperties
}

export function ContactForm({
	header,
	color,
	buttonLabel = "submit",
	isName = true,
	isPhone = true,
	isDate = true,
	isNotes = true,
	style,
}: Props) {
	// const formRef = useRef<HTMLFormElement>(null)
	const { data: session, status } = useSession()
	const initState: ContactState = {
		values: {
			name: "",
			tel: "",
			date: "",
			time: "",
			notes: "",
			//TODO setting defaults here doesn't set correct `defaulValue` in form
			email: session?.user?.email || "",
			customerId: session?.itemId || "",
		},
		valueErrors: undefined,
		error: undefined,
		success: undefined,
		url: undefined,
		id: undefined,
	}

	const { state, action, submitCount } = useForm(
		actionContactFormSubmit,
		initState
	)
	// if(!session) return <p> wait for session </p>

	return (
		<form
			className={form}
			action={action}
			style={{ ...(color ? { background: color } : {}), ...style }}
			// ref={formRef}
			// key={session?.itemId}
		>
			<fieldset disabled={state.success ? true : false}>
				<legend> {header} </legend>

				<InputField
					name={"customerId"}
					type={"hidden"}
					defaultValue={session?.itemId || "non_registered_user"}
					// defaultValue={state.values?.customerId}
					error={state.valueErrors?.customerId}
				/>

				<InputField
					name={"email"}
					type={"email"}
					defaultValue={session?.user?.email || ""}
					// defaultValue={state.values?.email}
					error={state.valueErrors?.email}
				/>

				<InputField
					name={"name"}
					type={isName ? "text" : "hidden"}
					autoComplete={"name given-name family-name nickname"}
					defaultValue={state.values?.name}
					error={state.valueErrors?.name}
				/>

				<InputField
					name={"tel"}
					label={"phone number"}
					type={isPhone ? "tel" : "hidden"}
					autoComplete="tel tel-local tel-national"
					defaultValue={state.values?.tel}
					error={state.valueErrors?.tel}
				/>

				<InputField
					name={"date"}
					type={isDate ? "date" : "hidden"}
					defaultValue={state.values?.date}
					error={state.valueErrors?.date}
				/>

				<InputField
					name={"time"}
					type={isDate ? "time" : "hidden"}
					defaultValue={state.values?.time}
					error={state.valueErrors?.time}
				/>

				<TextareaField
					name={"notes"}
					hidden={!isNotes}
					id={"notes"}
					placeholder="..."
					defaultValue={state.values?.notes}
					error={state.valueErrors?.notes}
				/>
			</fieldset>

			{!state.success ? (
				<SubmitButton />
			) : (
				<p className={"success"}>
					<pre>{state.success}</pre>
				</p>
			)}
			<p className={"error"}>{state.error}</p>
		</form>
	)
}
