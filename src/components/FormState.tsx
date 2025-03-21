"use client"
import { submitTestUsername } from "@lib/actions/testAction"
import { form } from "@styles/menus/form.module.scss"
import { useRouter } from 'next/navigation'
import { useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { Card } from "./layouts/Card"

type Props = {
	prop?: string
}

export type TestFormFields = {
	userName: string | "" | null
}

type TestFormState = {
	success: string | undefined
	error: string | undefined
	fieldValues: TestFormFields
	fieldErrors: Record<keyof TestFormFields, string> | undefined
}

const initState: TestFormState = {
	success: undefined,
	error: undefined,
  fieldErrors: undefined,
	fieldValues: {
		userName: "",
	},
}

export function FormState({ prop }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  // @ts-ignore
	const [state, action] = useFormState<TestFormState, FormData>(submitTestUsername, initState)
	// const [state, action] = useFormState(onSubmit, initState)

  function onReset(){
    formRef.current?.reset()
    router.refresh()
  }

	return (
		<>
			<Card colorTheme={"bg_c_tertiary"}>
				<form action={action} className={form} onReset={onReset} ref={formRef}>
					<label htmlFor="userName">
						<span>name</span>
						<input
							type={"text"}
							name={"userName"}
							// required={true}
							// defaultValue={state.fieldValues.userName}
						/>
            <span className="error"> {state?.fieldErrors?.userName} </span>
					</label>

					{!state?.success ? (
						<SubmitButton />
					) : (
						<>
							<p className={"success"}>{state.success}</p>
							{/* <button type={"reset"}> reset form </button> */}
						</>
					)}

					<p className={state?.error ? "error" : "hidden"}>{state?.error}</p>
				</form>
			</Card>

			<Card>
				<h2> Output</h2>
				<pre>{JSON.stringify(state, null, 2)}</pre>
			</Card>
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
			{" "}
			Submit{" "}
		</button>
	)
}

// async function onSubmit(
// 	prevState: FormState,
// 	formData: FormData
// ){
// 	console.log({ formData })

// 	const res = await fetch("/api/test", {
// 		method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
// 		body: (JSON.stringify(formData)),
// 	})

//   if (!res.ok) {
//     const errorData = await res.json()
//     return {
//       ...prevState,
//       message: "Submission failed",
//       errors: errorData.errors || undefined,
//     }
//   }

// 	const data = await res.json()

// 	return {
//     ...prevState,
//     message: "Submission successful",
//     fieldValues: {
//       name: "",
//       email: "",
//     },
//     errors: undefined,
//   }
// }
