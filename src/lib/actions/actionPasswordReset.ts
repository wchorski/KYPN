"use server"
import { keystoneContext } from "@ks/context"
import { emailRegex, passwordRegExp } from "@lib/regexPatterns"

import { envs } from "@/envs"

export async function actionPasswordReset(
	prevState: PasswordResetState,
	formData: FormData
): Promise<PasswordResetState> {
  const values = Object.fromEntries(formData) as PasswordResetValues
  // // @ts-ignore
  // delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
  const { token, email, password, passwordConfirm } = values

  const valueErrors = validateValues(values)
  if (valueErrors)
    return { valueErrors, values, error: "Check for errors in form fields" }

  const variables = values as PasswordResetVariables
  delete variables.passwordConfirm
  
	try {

		const data = (await keystoneContext.graphql.run({
			query: `
        mutation PasswordReset($password: String!, $token: String!, $email: String!) {
          passwordReset(password: $password, token: $token, email: $email) {
            dateModified
          }
        }
      `,
			variables,
		})) as { passwordReset: { id: string } }

		return {
			values: {
				email,
				password,
				token: "",
				passwordConfirm: "",
			},
			id: data.passwordReset.id,
			// url: envs.FRONTEND_URL + `/users/${data.PasswordReset.id}`,
			url: envs.FRONTEND_URL + `/account`,
			success: `Success! Password has been updated`,
		}
	} catch (error) {
		console.log("!!! actionPasswordReset: ", error)
		return {
			error: "Password Reset Failed: " + error,
			success: undefined,
		}
	}
}

function validateValues({
	password,
	passwordConfirm,
	email,
}: PasswordResetValues) {
	// @ts-ignore
	let valueErrors: PasswordResetState["valueErrors"] = {}
	if (!valueErrors) return undefined

	if (!password || password !== passwordConfirm)
		valueErrors.passwordConfirm = "Passwords do not match. Retype password"

	if (password && !passwordRegExp.test(password))
		valueErrors.password = "Password strength does not meet requirements"

	if (!emailRegex.test(email))
		valueErrors.email = "Check spelling or use different email"

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type PasswordResetValues = {
	token: string
	email: string
	password: string
	passwordConfirm: string
}

export type PasswordResetVariables = Omit<
	PasswordResetValues,
	"passwordConfirm"
> & {
	passwordConfirm?: string
}

export type PasswordResetState = {
	url?: string
	id?: string
	values?: PasswordResetValues
	valueErrors?: Record<keyof PasswordResetValues, string> | undefined
	error?: string
	success?: string
}
