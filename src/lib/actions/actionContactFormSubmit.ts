"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { emailRegex, passwordRegExp } from "@lib/regexPatterns"

export async function actionContactFormSubmit(
	prevState: ContactState,
	formData: FormData
): Promise<ContactState> {
  
  const values = Object.fromEntries(formData) as ContactValues
  // // @ts-ignore
  // delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
  const { name, tel, date, time, email, notes, customerId } = values
  values.tel = formatFlattenUSPhoneNumber(tel)
  const valueErrors = validateForm(values)
  if (valueErrors)
    return { valueErrors, values, error: "Check for errors in form fields" }

  const variables = values as ContactVariables
  delete variables.time
  delete variables.date
  variables.start = new Date(date + "T" + time).toISOString()
  
	try {

		const data = (await keystoneContext.graphql.run({
			query: `
        mutation Contact($name: String!, $tel: String!, $start: String!, $notes: String!, $email: String!, $customerId: String) {
          contact(name: $name, tel: $tel, start: $start, notes: $notes, email: $email, customerId: $customerId) {
            id
          }
        }
      `,
			variables,
		})) as { contact: { id: string } }

		return {
			id: data.contact.id,
			url: envs.FRONTEND_URL + `/contact`,
			success: `Got it! Expect a follow up with the contact provided. \n\nemail: ${email} \nphone: ${prettyUSNumber(
				tel
			)} \n`,
		}
	} catch (error) {
		console.log("!!! actionContactFormSubmit: ", error)
		return {
			error: "Contact Failed: " + error,
			success: undefined,
		}
	}
}

function validateForm({ tel, email }: ContactValues) {
	//@ts-ignore
	let valueErrors: ContactState["valueErrors"] = {}
	if (!valueErrors) return undefined

	if (!emailRegex.test(email))
		valueErrors.email = "Check spelling or use different email"

	if (tel) {
		console.log("### TODO VALIDATE THIS action tel number ", tel)

		// valueErrors.tel = "Not valid phone number"
	}

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}
// TODO
// validate phone number
// sanatize phone number (remove all special characters
// and spaces as I want a standard format)
// use for `tel:###` button links
// https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number

// TODO
// some kind of `onChange` handler that auto formats
// on user input
// https://stackoverflow.com/a/66656607/15579591

//TODO validate date + time as a proper Date() string?
// TODO is start date before current date?

function formatFlattenUSPhoneNumber(entry: string) {
	if (!entry) return ""

	// @ts-ignore
	const match = entry
		.replace(/\D+/g, "")
		.replace(/^1/, "")
		.match(/([^\d]*\d[^\d]*){1,10}$/)[0]

	const part1 = match.length > 2 ? `${match.substring(0, 3)}` : match
	const part2 = match.length > 3 ? `${match.substring(3, 6)}` : ""
	const part3 = match.length > 6 ? `${match.substring(6, 10)}` : ""
	return `${part1}${part2}${part3}`
}

function prettyUSNumber(entry: string) {
	if (!entry) return ""

	// @ts-ignore
	const match = entry
		.replace(/\D+/g, "")
		.replace(/^1/, "")
		.match(/([^\d]*\d[^\d]*){1,10}$/)[0]
	const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match
	const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : ""
	const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : ""
	return `${part1}${part2}${part3}`
}

// 123 4567890
// (123) 456-7890
// (123)456-7890
// 123 456 7890
// 123.456.7890
// (blank/null)
// 1234567890
// +1(123) 456-7890
// +1 123 456 7890
// 1 123-456-7890

export type ContactValues = {
	name: string
	tel: string
	date: string
	time: string
	email: string
	notes: string
	customerId: string
}
export type ContactVariables = Omit<ContactValues, "date" | "time"> & {
	date?: string
	time?: string
	start: string
}

export type ContactState = {
	url?: string
	id?: string
	values?: ContactValues
	valueErrors?: Record<keyof ContactValues, string> | undefined
	error?: string
	success?: string
}
