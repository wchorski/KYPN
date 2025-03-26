"use client"
import { Callout } from "@components/blocks/Callout"
import { SubmitButton } from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import { Card } from "@components/layouts/Card"
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
	// const { session, setSession } = useGlobalContext()
	const formRef = useRef<HTMLFormElement>(null)
	const [state, action] = useFormState(actionPasswordReset, initState)

	// async function handleSubmit(e: any) {
	//   e.preventDefault()

	//   if (inputs.email === '') return console.warn('inputs are empty, ', inputs)
	//   // console.log(inputs)

	//   const res = await passwordReset({
	//     variables: { email: inputs.email },
	//     refetchQueries: [{ query: QUERY_USER_CURRENT }]
	//   }).catch(console.error)
	//   console.log('res', res)

	//   if (!res?.data.sendUserPasswordResetLink)
	//     console.log('pass reset FAILED, ')

	//   if (res?.data.sendUserPasswordResetLink)
	//     console.log('pass reset success, ')

	//   // Router.push({
	//   //   pathname: `/shop/product/${res.data.createProduct.id}`,
	//   // })
	// }

	// async function onSubmit(
	// 	prevState: FormState,
	// 	data: FormData
	// ): Promise<FormState> {
	// 	const password = data.get("password") as string
	// 	const passwordConfirm = data.get("passwordConfirm") as string

	// 	const inputValues = {
	// 		password,
	// 		passwordConfirm,
	// 	}

	// 	try {
	// 		if (password !== passwordConfirm)
	// 			return {
	// 				...formState,
	// 				status: "error",
	// 				message: "Passwords do not Match",
	// 				errors: {
	// 					password: "",
	// 					passwordConfirm: "",
	// 				},
	// 			}
	//     console.log('## pass match but...');

	// 		const res = await fetch(`/api/gql/noauth`, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				query: `
	//           mutation PasswordReset($password: String!, $token: String!, $email: String!) {
	//             passwordReset(password: $password, token: $token, email: $email) {
	//               dateModified
	//             }
	//           }
	//         `,
	// 				variables: {
	// 					password: password,
	// 					token,
	// 					email,
	// 				},
	// 			}),
	// 		})
	//     console.log('## pass rset form 1');

	// 		const data = await res.json()
	//     console.log('## pass rset form 2');

	// 		console.log(data)

	// 		const { error } = data

	// 		if (error)
	// 			return {
	// 				...formState,
	// 				status: "error",
	// 				message: error.message,
	// 			}

	// 		return {
	// 			...formState,
	// 			status: "success",
	// 			message:
	// 				"Password has successfully changed. Login with your new password",
	// 		}
	// 	} catch (error: any) {
	// 		console.log("!!! password Reset Form ERROR: ", error.message)
	// 		return {
	// 			status: "error",
	// 			message: error?.message,
	// 			// TODO validate each field
	// 			errors: {
	// 				password: "try using a different password",
	// 				passwordConfirm: "",
	// 			},
	// 			fieldValues: inputValues,
	// 		}
	// 	}
	// }

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
			<Callout intent={"error"}>
				<p> Please use the link provided in your email to reset password </p>
			</Callout>
		)

	return (
		<>
			<form action={action} className={form}>
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

					<Card colorTheme={"bg_c_reverse_theme"}>
						<PasswordRequirements />
					</Card>
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
