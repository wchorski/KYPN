"use client"
import { SubmitButton } from "@components/forms/SubmitButton"
import styles from "@styles/menus/form.module.scss"
import { useRef } from "react"
import { useFormState } from "react-dom"

type Fields = {
	email: string
}

type FormState = {
	message: string
	status: "success" | "error" | ""
	errors: Record<keyof Fields, string> | undefined
	fieldValues: Fields
}

export function PasswordRequestForm() {
	// const { session, setSession } = useGlobalContext()
	const defaultFormData: FormState = {
		message: "",
		status: "",
		errors: undefined,
		fieldValues: {
			email: "",
		},
	}
	const formRef = useRef<HTMLFormElement>(null)
	const [formState, formAction] = useFormState(onSubmit, defaultFormData)

	async function onSubmit(
		prevState: FormState,
		data: FormData
	): Promise<FormState> {
		const email = data.get("email") as string

		const inputValues = {
			email,
		}

		try {
			const res = await fetch(`/api/gql/noauth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
            mutation Mutation($email: String!) {
              passwordRequestLink(email: $email) {
                dateModified
              }
            }
          `,
					variables: {
						email: email,
					},
				}),
			})
      const data = await res.json()
      
      if(data.error) return {
        ...formState,
        status: 'error',
        message: data.error.message
      }
      
			return {
				...formState,
				status: "success",
				message:
					"Request sent. \n\n If an account with the submitted email is found, an email will be sent out with instructions to reset account password",
			}
		} catch (error: any) {
			console.warn("!!! password Request Form ERROR: ", error.message)
			return {
				status: "error",
				message: error?.message,
				// TODO validate each field
				errors: {
					email: "double check spelling of this field",
				},
				fieldValues: inputValues,
			}
		}
	}

	return (
		<>
			<form action={formAction} className={styles.form} ref={formRef}>
				<fieldset>
					<legend> Request a password reset </legend>

					<label htmlFor="email">
						Email
						<input
							name={"email"}
							id={"email"}
							placeholder="sam@hotmail.com"
							type={"text"}
							required={true}
							defaultValue={formState.fieldValues.email}
							autoComplete={"email"}
						/>
					</label>

					{(formState.status === "success" || formState.status === 'error') ? (
						<p className={formState.status}>{formState.message}</p>
					) : (
						<SubmitButton />
					)}

				</fieldset>
			</form>
		</>
	)
}
