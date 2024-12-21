"use client"
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
	const [state, action] = useFormState(actionRegisterAnAccount, initState)

	return (
		<>
			<form action={action} className={form}>
				<legend> React Form </legend>
				<label htmlFor={"name"}>
					<span>name</span>
					<input name="name" type={"text"} />
          <span className="error">{state.valueErrors?.name}</span>
				</label>
				<label htmlFor={"email"}>
					<span>email</span>
					<input name="email" type={"email"} />
          <span className="error">{state.valueErrors?.email}</span>
				</label>
				<label htmlFor={"password"}>
					<span>password</span>
					<input name="password" type={"password"} />
          <span className="error">{state.valueErrors?.password}</span>
				</label>
				<label htmlFor={"passwordConfirm"}>
					<span>Confirm Password</span>
					<input name="passwordConfirm" type={"password"} />
          <span className="error">{state.valueErrors?.passwordConfirm}</span>
				</label>

				<SubmitButton />
        <p className={"error"}>{state.error}</p>
				<p className={"success"}>{state.success}</p>
			</form>

			{/* <h5>submission: {submitCount}</h5> */}
			<pre>{JSON.stringify(state, null, 2)}</pre>
		</>
	)
}

function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<button
			type={"submit"}
			disabled={pending}
			className={pending ? "anim_border_spin pending" : ""}
		>
			Submit
		</button>
	)
}
