"use client"
import { envs } from "@/envs"
import { Card } from "@components/layouts/Card"
import { InputField, SubmitButton, useForm } from "@hooks/useForm"
import {
	actionRegisterAnAccount,
	type RegisterAnAccountState,
} from "@lib/actions/actionRegisterAnAccount"
import { form } from "@styles/menus/form.module.scss"
import { signIn } from "next-auth/react"
import { useFormState, useFormStatus } from "react-dom"

const initState: RegisterAnAccountState = {
	values: {
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	},
}

export function ActionRegsiterForm() {
	// const { state, action, pending, submitCount } = useForm<TestUsernameState>(
	// 	handleSubmit,
	// 	initState
	// )
	// const [state, action] = useFormState(actionRegisterAnAccount, initState)
	const { state, action, submitCount } = useForm(
		actionRegisterAnAccount,
		initState
	)

	async function handleSignin(email?: string, password?: string, url?: string) {
		if (!email || !password || !url) throw Error("missing value for sign in")
		await signIn("credentials", {
			email,
			password,
			callbackUrl: url,
		})
	}

	return (
		<form action={action} className={form}>
			<legend> Register an Account </legend>

			<InputField name={"name"} type={"text"} error={state.valueErrors?.name} />

			<InputField
				name={"email"}
				type={"email"}
				error={state.valueErrors?.email}
			/>
			<InputField
				name={"password"}
				type={"password"}
				error={state.valueErrors?.password}
			/>

			<Card colorTheme={"bg_c_reverse_theme"}>
				<h5> requirements </h5>
				<ul className="unstyled">
					<li> 8 - 32 characters </li>
					<li> one Capital letter </li>
					<li>
						{" "}
						one special character <code>!@#+=$&-_^%*</code>
					</li>
					<li>
						{" "}
						one number <code> 0-9 </code>
					</li>
					<li> three lower case letters </li>
				</ul>
			</Card>

			<InputField
				name={"passwordConfirm"}
				label={"Confirm password"}
				type={"password"}
				error={state.valueErrors?.passwordConfirm}
			/>
			{!state.success ? (
				<SubmitButton />
			) : (
				<p className={"success"}>
					{state.success} <br />{" "}
					<button
            type={'button'}
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
	)
}
