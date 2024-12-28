"use client"
import { InputField, SubmitButton, useForm } from "@hooks/useForm"
import {
	actionRegisterAnAccount,
	type RegisterAnAccountState,
} from "@lib/actions/actionRegisterAnAccount"
import { form } from "@styles/menus/form.module.scss"
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

	return (
		<>
			<form action={action} className={form}>
				<legend> Register an Account </legend>
				<InputField
					name={"name"}
					type={"text"}
					error={state.valueErrors?.name}
				/>

				<InputField
					name={"email"}
					type={'email'}
					error={state.valueErrors?.email}
				/>
				<InputField
					name={'password'}
					type={'password'}
					error={state.valueErrors?.password}
				/>
				<InputField
					name={'passwordConfirm'}
          label={'Confirm password'}
					type={'password'}
					error={state.valueErrors?.passwordConfirm}
				/>

				<SubmitButton />
				<p className={"error"}>{state.error}</p>
				<p className={"success"}>{state.success}</p>
			</form>

			{/* <h5>submission: {submitCount}</h5> */}
			<pre>{JSON.stringify(state, null, 2)}</pre>
		</>
	)
}
