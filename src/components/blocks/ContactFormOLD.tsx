"use client"
import { CSSProperties, FormEvent, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { LoadingAnim } from "@components/elements/LoadingAnim"
import { useSession } from "next-auth/react"
import styles from "@styles/menus/form.module.scss"

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

type Fields = {
	name: string
	phone: string
	date: string
	time: string
	email: string
	notes: string
}

type FormState = {
	message: string
	status: "success" | "pending" | "error" | ""
	errors: Record<keyof Fields, string> | undefined
	fieldValues: Fields
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
	const { data: session, status } = useSession()
	const formRef = useRef<HTMLFormElement>(null)
	// const [error, setError] = useState({message: ''})
	// const [loading, setLoading] = useState(false)

	const defaultFormData: FormState = {
		message: "",
		status: "",
		errors: undefined,
		fieldValues: {
			// event: event.id || '',
			name: "",
			phone: "",
			date: "",
			time: "",
			email: session?.user?.email || "",
			notes: "",
		},
	}

	const [formState, formAction] = useFormState(onSubmit, defaultFormData)

	// const [mutate, { error, loading, data }] = useMutation(MUTATE_CONTACT)

	async function onSubmit(
		prevState: FormState,
		data: FormData
	): Promise<FormState> {
		const name = data.get("name") as string
		const phone = data.get("phone") as string
		const date = data.get("date") as string
		const time = data.get("time") as string
		const email = data.get("email") as string
		const notes = data.get("notes") as string

		const inputValues = {
			name,
			phone,
			date,
			time,
			email,
			notes,
		}

		try {
			if (typeof email !== "string") throw new Error("email is not string")

			const res = await fetch(`/api/gql/noauth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: MUTATE_CONTACT,
					variables: {
						name,
						phone,
						start: new Date(date + "T" + time).toISOString(),
						email,
						notes,
						customerId: session?.itemId,
					},
				}),
			})

			const data = await res.json()
			const { contact, error } = data

			if (error) throw new Error(error.message)

			return {
				...formState,
				status: "success",
				message:
					"Message sent! We will reach out to you via the contact provided",
			}
		} catch (error: any) {
			console.log(error)

			return {
				message: error?.message,
				status: "error",
				// TODO validate each field
				errors: {
					name: "",
					phone: "",
					date: "",
					time: "",
					email: "",
					notes: "",
				},
				fieldValues: inputValues,
			}
		}
	}

	return (
		<form
			className={styles.form}
			action={formAction}
			style={{ ...(color ? { background: color } : {}), ...style }}
			ref={formRef}
		>
			<fieldset>
				<legend> {header} </legend>

				<label htmlFor="name">
					<span> name </span>
					<input
						name={"name"}
						id={"name"}
						placeholder=""
						type={"text"}
						defaultValue={formState.fieldValues.name}
						// readOnly={formState.fieldValues.name}
						required={false}
					/>
					<span className="error">{formState.errors?.name}</span>
				</label>

				<label htmlFor="phone">
					<span> phone </span>
					<input
						name={"phone"}
						id={"phone"}
						placeholder="000-000-0000"
						type={"tel"}
						defaultValue={formState.fieldValues.phone}
						// readOnly={formState.fieldValues.phone}
						required={false}
					/>
					<span className="error">{formState.errors?.phone}</span>
				</label>

				<label htmlFor="date">
					<span> event date </span>
					<input
						name={"date"}
						id={"date"}
						placeholder=""
						type={"date"}
						defaultValue={formState.fieldValues.date}
						// readOnly={formState.fieldValues.date}
						required={false}
					/>
					<span className="error">{formState.errors?.date}</span>
				</label>

				<label htmlFor="time">
					<span> event start time </span>
					<input
						name={"time"}
						id={"time"}
						placeholder=""
						type={"time"}
						defaultValue={formState.fieldValues.time}
						// readOnly={formState.fieldValues.time}
						required={false}
					/>
					<span className="error">{formState.errors?.time}</span>
				</label>

				<label htmlFor="email" className="required">
					<span title="required"> Email </span>
					<input
						name={"email"}
						id={"email"}
						placeholder=""
						type={"text"}
						defaultValue={formState.fieldValues.email}
						// readOnly={formState.fieldValues.email}
						required={true}
					/>
					<span className="error">{formState.errors?.email}</span>
				</label>

				<label htmlFor="notes">
					<span> notes </span>
					<textarea
						name={"notes"}
						id={"notes"}
						placeholder="..."
						defaultValue={formState.fieldValues.notes}
						// readOnly={formState.fieldValues.notes}
						required={false}
					/>
					<span className="error">{formState.errors?.notes}</span>
				</label>
			</fieldset>

			<p className={['status', formState.status].join(' ')}>{formState.message}</p>
			{formState.status !== "success" ? <SubmitButton /> : <></>}
		</form>
	)
}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<button disabled={pending} type={"submit"}>
			{pending ? <LoadingAnim /> : "Submit"}
		</button>
	)
}

const MUTATE_CONTACT = `
  mutation Contact($name: String!, $phone: String!, $start: String!, $notes: String!, $email: String!, $customerId: String) {
    contact(name: $name, phone: $phone, start: $start, notes: $notes, email: $email, customerId: $customerId) {
      id
    }
  }
`
