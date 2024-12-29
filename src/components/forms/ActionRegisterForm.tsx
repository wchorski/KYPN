"use client"
import { envs } from "@/envs"
import { Form } from "@components/Form"
import { InputField } from "@components/InputField"
import { Card } from "@components/layouts/Card"
import { SubmitButton, useForm } from "@hooks/useForm"
import {
	actionRegisterAnAccount,
	type RegisterAnAccountState,
} from "@lib/actions/actionRegisterAnAccount"
import { form } from "@styles/menus/form.module.scss"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

const initState: RegisterAnAccountState = {
	values: {
		name: "initalName",
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

export function ActionRegsiterForm() {
	const [resetKey, setResetKey] = useState(0)
	const resetForm = () => setResetKey(prev => prev + 1)
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
		<Form
			action={action}
			className={form}
			debugKey={resetKey}
			key={resetKey}
			resetForm={resetForm}
		>
			<legend> Register an Account </legend>
			<fieldset disabled={state.success ? true : false}>
				<InputField
					name={"name"}
					type={"text"}
					required={true}
					defaultValue={state.values?.name}
					error={state.valueErrors?.name}
				/>

				<InputField
					name={"email"}
					type={"email"}
					required={true}
					defaultValue={state.values?.email}
					error={state.valueErrors?.email}
				/>
				<InputField
					name={"password"}
					type={"password"}
					required={true}
					defaultValue={state.values?.password}
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
					required={true}
					defaultValue={state.values?.passwordConfirm}
					error={state.valueErrors?.passwordConfirm}
				/>
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
		</Form>
	)
}
