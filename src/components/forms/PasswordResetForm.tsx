"use client"
import { SubmitButton } from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import type {
	PasswordResetState} from "@lib/actions/actionPasswordReset";
import {
	actionPasswordReset
} from "@lib/actions/actionPasswordReset"
import { form } from "@styles/menus/form.module.scss"
import { signIn } from "next-auth/react"
import { useRef } from "react"
import { useFormState } from "react-dom"

import { PasswordRequirements } from "./PasswordRequirements"

// type Fields = {
// 	password: string
// 	passwordConfirm: string
// }

// type FormState = {
// 	message: string
// 	status: "success" | "error" | ""
// 	errors: Record<keyof Fields, string> | undefined
// 	fieldValues: Fields
// }

type Props = {
	token: string
	email: string
}

const initState: PasswordResetState = {
	values: {
		token: "",
		email: "",
		password: "",
		passwordConfirm: "",
	},
	valueErrors: undefined,
	error: undefined,
	success: undefined,
	url: undefined,
	id: undefined,
}

export function PasswordResetForm({ token, email }: Props) {
	const formRef = useRef<HTMLFormElement>(null)
	const [state, action] = useFormState(actionPasswordReset, initState)

	async function handleSignin(email?: string, password?: string, url?: string) {
		if (!email || !password || !url) throw Error("missing value for sign in")
		await signIn("credentials", {
			email,
			password,
			callbackUrl: url,
		})
	}

	if (!token || !email)
		return (
			<div className={"error"}>
				<p> Please use the link provided in your email to reset password </p>
			</div>
		)

	return (
		<>
			<form
				action={action}
				className={form}
			>
				<fieldset disabled={state.success ? true : false}>
					<legend> Choose a new Password </legend>

					<InputField
						name={"password"}
						type={"password"}
						placeholder={"new password..."}
						autoComplete={"new-password"}
						required={true}
						defaultValue={state.values?.password}
						error={state.valueErrors?.password}
					/>

					<InputField
						name={"passwordConfirm"}
						label={"Confirm Password"}
						type={"password"}
						placeholder={"confirm new password..."}
						autoComplete={"new-password"}
						required={true}
						defaultValue={state.values?.passwordConfirm}
						error={state.valueErrors?.passwordConfirm}
					/>

					<InputField
						name={"token"}
						type={"hidden"}
						required={true}
						defaultValue={token}
						error={state.valueErrors?.token}
					/>

					<InputField
						name={"email"}
						type={"hidden"}
						required={true}
						defaultValue={email}
						error={state.valueErrors?.email}
					/>

					<div className={"card"}>
						<PasswordRequirements />
					</div>
				</fieldset>

				{!state.success ? (
					<SubmitButton />
				) : (
					<p className={"success"}>
						{state.success} <br />{" "}
						<button
							type={"button"}
							onClick={() =>
								handleSignin(
									state.values?.email,
									state.values?.password,
									state.url
								)
							}
						>
							{" "}
							⤏ Login as {state.values?.email}{" "}
						</button>
					</p>
				)}
				<p className={"error"}>{state.error}</p>
			</form>
		</>
	)
}

// export const MUTATION_PASSWORD_RESET = `
//   mutation SendUserPasswordResetLink($email: String!) {
//     sendUserPasswordResetLink(email: $email)
//   }
// `
