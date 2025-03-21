"use client"
import { Button } from "@components/elements/Button"
import styles from "@styles/menus/form.module.scss"
import Link from "next/link"
import { useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

type Fields = {
	password: string
	passwordConfirm: string
}

type FormState = {
	message: string
	status: "success" | "error" | ""
	errors: Record<keyof Fields, string> | undefined
	fieldValues: Fields
}

type Props = {
	token: string
	email: string
}

export function PasswordResetForm({ token, email }: Props) {
	// const { session, setSession } = useGlobalContext()
	const defaultFormData: FormState = {
		message: "",
		status: "",
		errors: undefined,
		fieldValues: {
			password: "",
			passwordConfirm: "",
		},
	}
	const formRef = useRef<HTMLFormElement>(null)
	const [formState, formAction] = useFormState(onSubmit, defaultFormData)

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

	async function onSubmit(
		prevState: FormState,
		data: FormData
	): Promise<FormState> {
		const password = data.get("password") as string
		const passwordConfirm = data.get("passwordConfirm") as string

		const inputValues = {
			password,
			passwordConfirm,
		}

		try {
			if (password !== passwordConfirm)
				return {
					...formState,
					status: "error",
					message: "Passwords do not Match",
					errors: {
						password: "",
						passwordConfirm: "",
					},
				}
      console.log('## pass match but...');
      
			const res = await fetch(`/api/gql/noauth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
            mutation PasswordReset($password: String!, $token: String!, $email: String!) {
              passwordReset(password: $password, token: $token, email: $email) {
                dateModified
              }
            }
          `,
					variables: {
						password: password,
						token,
						email,
					},
				}),
			})
      console.log('## pass rset form 1');

			const data = await res.json()
      console.log('## pass rset form 2');
      
			console.log(data)

			const { error } = data

			if (error)
				return {
					...formState,
					status: "error",
					message: error.message,
				}

			return {
				...formState,
				status: "success",
				message:
					"Password has successfully changed. Login with your new password",
			}
		} catch (error: any) {
			console.log("!!! password Reset Form ERROR: ", error.message)
			return {
				status: "error",
				message: error?.message,
				// TODO validate each field
				errors: {
					password: "try using a different password",
					passwordConfirm: "",
				},
				fieldValues: inputValues,
			}
		}
	}

	return (
		<>
			<form action={formAction} className={styles.form}>
				<fieldset>
					<legend> Choose a new Password </legend>

					<label htmlFor="password">
						New Password
						<input
							name={"password"}
							id={"password"}
							placeholder=""
							type={"password"}
							required={true}
							defaultValue={formState.fieldValues.password}
						/>
					</label>
					<label htmlFor="passwordConfirm">
						Confirm Password
						<input
							name={"passwordConfirm"}
							id={"passwordConfirm"}
							placeholder=""
							type={"password"}
							required={true}
							defaultValue={formState.fieldValues.passwordConfirm}
						/>
					</label>

					<p className={formState.status}>{formState.message}</p>

					{formState.status !== "success" ? (
						<SubmitButton />
					) : (
						<Link href={`/login`}> Login </Link>
					)}
				</fieldset>
			</form>
		</>
	)
}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button disabled={pending} type={"submit"}>
			Submit
		</Button>
	)
}

// export const MUTATION_PASSWORD_RESET = `
//   mutation SendUserPasswordResetLink($email: String!) {
//     sendUserPasswordResetLink(email: $email)
//   }
// `
