"use client"
// cred - https://medium.com/@omril_15649/replacing-react-hook-form-in-react-19-dd069f29d505
import {
	submitTestUsername,
	type TestUsernameState,
} from "@lib/actions/testAction"
import { form } from "@styles/menus/form.module.scss"
import React from "react"
import { useFormState, useFormStatus } from "react-dom"

// const handleSubmit = async (
// 	data: TestUsernameState // formData is now a regular data
// ) => {
// 	// here we can interact with the server or do our own check of the data
// 	console.log("inputFields", data)
// 	// submitTestUsername(data)

// 	return data
// }

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

const initState: TestUsernameState = {
	values: {
		user_name: "",
		nick_name: "",
	},
}

export function ReactForm() {
	// const { state, action, pending, submitCount } = useForm<TestUsernameState>(
	// 	handleSubmit,
	// 	initState
	// )
	const [state, action] = useFormState(submitTestUsername, initState)

	return (
		<>
			<form action={action} className={form}>
				<legend> React Form </legend>
				<label htmlFor={"user_name"}>
					<span>User Name</span>
					<input name="user_name" type={"text"} />
					<span className="error">{state.valueErrors?.user_name}</span>
				</label>

				<label htmlFor={"nick_name"}>
					<span>Nick Name</span>
					<input name="nick_name" type={"text"} />
					<span className="error">{state.valueErrors?.nick_name}</span>
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
