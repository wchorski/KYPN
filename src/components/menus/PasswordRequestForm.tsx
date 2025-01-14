"use client"
import styles, { form } from "@styles/menus/form.module.scss"
import { useFormState, useFormStatus } from "react-dom"
import { useRef } from "react"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { Button } from "@components/elements/Button"
import {
	actionPasswordRequest,
	PasswordRequestState,
} from "@lib/actions/actionPassworRequest"
import { InputField } from "@components/InputField"
import Link from "next/link"
import { SubmitButton } from "@components/forms/SubmitButton"

const initState: PasswordRequestState = {
	values: {
		email: "",
	},
	valueErrors: undefined,
	error: undefined,
	success: undefined,
	url: undefined,
	id: undefined,
}

export function PasswordRequestForm() {
	const [state, action] = useFormState(actionPasswordRequest, initState)

	// async function onSubmit(
	// 	prevState: FormState,
	// 	data: FormData
	// ): Promise<FormState> {
	// 	const email = data.get("email") as string

	// 	const inputValues = {
	// 		email,
	// 	}

	// 	try {
	// 		const res = await fetch(`/api/gql/noauth`, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				query: `
	//           mutation Mutation($email: String!) {
	//             passwordRequestLink(email: $email) {
	//               dateModified
	//             }
	//           }
	//         `,
	// 				variables: {
	// 					email: email,
	// 				},
	// 			}),
	// 		})
	//     const data = await res.json()

	//     if(data.error) return {
	//       ...formState,
	//       status: 'error',
	//       message: data.error.message
	//     }

	// 		return {
	// 			...formState,
	// 			status: "success",
	// 			message:
	// 				"Request sent. \n\n If an account with the submitted email is found, an email will be sent out with instructions to reset account password",
	// 		}
	// 	} catch (error: any) {
	// 		console.warn("!!! password Request Form ERROR: ", error.message)
	// 		return {
	// 			status: "error",
	// 			message: error?.message,
	// 			// TODO validate each field
	// 			errors: {
	// 				email: "double check spelling of this field",
	// 			},
	// 			fieldValues: inputValues,
	// 		}
	// 	}
	// }

	return (
		<>
			<form action={action} className={form}>
				<fieldset disabled={state.success ? true : false}>
					<legend> Request a password reset </legend>

					<InputField
						name={"email"}
						type={"email"}
						required={true}
						defaultValue={state.values?.email}
						error={state.valueErrors?.email}
					/>
				</fieldset>

				{!state.success ? (
					<SubmitButton />
				) : (
					<p className={"success"}>
						{state.success} <br/>
            <Link href={'/login'}> Back to Login </Link>
					</p>
				)}
				<p className={"error"}>{state.error}</p>
			</form>
		</>
	)
}
