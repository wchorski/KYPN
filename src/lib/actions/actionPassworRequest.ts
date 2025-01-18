"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { emailRegex, passwordRegExp } from "@lib/regexPatterns"

export async function actionPasswordRequest(
	prevState: PasswordRequestState,
	formData: FormData
): Promise<PasswordRequestState> {
	const values = Object.fromEntries(formData) as PasswordRequestValues
	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	const { email } = values

	const valueErrors = validateValues(values)
	if (valueErrors)
		return { valueErrors, values, error: "Check for errors in form fields" }
	try {
		const data = (await keystoneContext.graphql.run({
			query: `
        mutation Mutation($email: String!) {
          passwordRequestLink(email: $email) {
            dateModified
          }
        }
      `,
			variables: values,
		})) as { passwordRequestLink: { dateModified: string; id: string } }


		return {
			values: {
				email,
			},
			id: data.passwordRequestLink.dateModified,
			// url: envs.FRONTEND_URL + `/users/${data.PasswordRequest.id}`,
			url: envs.FRONTEND_URL + `/login`,
			success: `Password reset requested. If this email account is registered to this site a link will be sent to ${email}`,
		}
	} catch (error) {
		console.log("!!! actionPasswordRequest: ", error)
		return {
			error: "Password Request Failed: " + error,
			success: undefined,
		}
	}
}

function validateValues({ email }: PasswordRequestValues) {
	// @ts-ignore
	let valueErrors: PasswordRequestState["valueErrors"] = {}
	if (!valueErrors) return undefined

	if (!emailRegex.test(email))
		valueErrors.email = "Check spelling or use different email"

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type PasswordRequestValues = {
	email: string
}

export type PasswordRequestState = {
	url?: string
	id?: string
	values?: PasswordRequestValues
	valueErrors?: Record<keyof PasswordRequestValues, string> | undefined
	error?: string
	success?: string
}
