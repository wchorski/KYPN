"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { emailRegex, passwordRegExp } from "@lib/regexPatterns"

export type RegisterAnAccountValues = {
	name: string
	email: string
	password: string
	passwordConfirm: string
}

export type RegisterAnAccountState = {
	url?: string
	values?: RegisterAnAccountValues
	valueErrors?: Record<keyof RegisterAnAccountValues, string> | undefined
	error?: string
	success?: string
}

export async function actionRegisterAnAccount(
	prevState: RegisterAnAccountState,
	formData: FormData
): Promise<RegisterAnAccountState> {
	try {
		const values = Object.fromEntries(formData) as RegisterAnAccountValues
		// // @ts-ignore
		// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
		const { name, email, password, passwordConfirm } = values

		const validationErrors = validateForm({
			password,
			passwordConfirm,
			email,
		})
    if(validationErrors) return validationErrors

		const data = (await keystoneContext.graphql.run({
			query: `
        mutation RegisterAnAccount($name: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
          registerAnAccount(name: $name, email: $email, password: $password, passwordConfirm: $passwordConfirm) {
            id
          }
        }
      `,
			variables: values,
		})) as { registerAnAccount: { id: string } }

		return {
			values: {
				email,
				password,
				name: "",
				passwordConfirm: "",
			},
			// url: envs.FRONTEND_URL + `/users/${data.registerAnAccount.id}`,
			url: envs.FRONTEND_URL + `/account`,
			success: `Success! Account registered`,
		}
	} catch (error) {
		console.log("!!! actionRegisterAnAccount: ", error)
		return {
			error: "Registeration Failed: " + error,
			success: undefined,
		}
	}
}

type Validation = {
	password?: string
	passwordConfirm?: string
	email: string
}

function validateForm({ password, passwordConfirm, email }: Validation) {
	if (!password || password !== passwordConfirm)
		return {
			valueErrors: {
				name: "",
				password: "",
				passwordConfirm: "Passwords do not match. Retype password",
				email: "",
			},
			error: "Error in password field",
		}
	if (!passwordRegExp.test(password))
		return {
			valueErrors: {
				name: "",
				password: "Password strength does not meet requirements",
				passwordConfirm: "",
				email: "",
			},
			error: "Error in password field",
		}
	if (!emailRegex.test(email))
		return {
			valueErrors: {
				name: "",
				password: "",
				passwordConfirm: "",
				email: "Check spelling or use different email",
			},
			error: "Error in email field",
		}
}
