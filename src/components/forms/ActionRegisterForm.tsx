"use client"

import { PasswordRequirements } from "@components/forms/PasswordRequirements"
import { InputField } from "@components/InputField"
import { useForm } from "@hooks/useForm"
import {
	actionRegisterAnAccount,
	type RegisterAnAccountState,
} from "@lib/actions/actionRegisterAnAccount"
import { form } from "@styles/menus/form.module.scss"
import { signIn } from "next-auth/react"

import { SubmitButton } from "./SubmitButton"

const initState: RegisterAnAccountState = {
	values: {
		name: "",
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
	// const [resetKey, setResetKey] = useState(0)
	// const resetForm = () => setResetKey(prev => prev + 1)
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
		<form
			action={action}
			className={form}
			// debugKey={resetKey}
			// key={resetKey}
			// resetForm={resetForm}
		>
			<fieldset disabled={state.success ? true : false}>
				<legend> Register an Account </legend>
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
          autoComplete={"new-password"}
					defaultValue={state.values?.password}
					error={state.valueErrors?.password}
				/>

				<div className={'card'}>
					<PasswordRequirements />
				</div>

				<InputField
					name={"passwordConfirm"}
					label={"Confirm password"}
					type={"password"}
					required={true}
          autoComplete={"new-password"}
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
		</form>
	)
}
