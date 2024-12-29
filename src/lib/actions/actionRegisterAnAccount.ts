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
	id?: string
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

		const valueErrors = validateForm({
			password,
			passwordConfirm,
			email,
		})
		if (valueErrors)
			return { valueErrors, values, error: "Check for errors in form fields" }

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
			id: data.registerAnAccount.id,
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
	// @ts-ignore
	let valueErrors: RegisterAnAccountState["valueErrors"] = {}
	if (!valueErrors) return null

	if (!password || password !== passwordConfirm)
		valueErrors.passwordConfirm = "Passwords do not match. Retype password"

	if (password && !passwordRegExp.test(password))
		valueErrors.password = "Password strength does not meet requirements"

	if (!emailRegex.test(email)) {
		console.log("### NEXTJS email val triggered")
		valueErrors.email = "Check spelling or use different email"
	}

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}
