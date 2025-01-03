"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { emailRegex, passwordRegExp } from "@lib/regexPatterns"

export async function actionBookAService(
	prevState: BookAServiceState,
	formData: FormData
): Promise<BookAServiceState> {
	try {
		// @ts-ignore
		const values = Object.fromEntries(formData) as BookAServiceValues
		//? array of checkboxes w same name `addonIds`
		values.addonIds = formData.getAll("addonIds") as string[]
    // console.log("action: ", {values});
		// // @ts-ignore
		// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
		// const {  } = values

		const valueErrors = validateValues(values)
		if (valueErrors)
			return { valueErrors, values, error: "Check for errors in form fields" }

		// TODO left off seeing how ks catches this mutation
		const data = (await keystoneContext.graphql.run({
			query: `
        mutation BookAService($serviceId: String!, $date: String!, $time: String!, $timeZone: String!, $email: String!, $locationId: String, $addonIds: [String], $employeeId: String, $customerId: String, $name: String, $phone: String, $notes: String, $amountTotal: Int) {
          bookAService(serviceId: $serviceId, date: $date, time: $time, timeZone: $timeZone, email: $email, locationId: $locationId, addonIds: $addonIds, employeeId: $employeeId, customerId: $customerId, name: $name, phone: $phone, notes: $notes, amount_total: $amountTotal) {
            id
          }
        }
      `,
			variables: values,
		})) as { bookAService: { id: string } }

		return {
			// values: {
			//   serviceId: '',
			//   locationId: '',
			//   addonIds: [],
			//   employeeId: [],
			//   // start: '',
			//   date: '',
			//   time: '',
			//   timeZone: '',
			//   address: '',
			//   customerId: '',
			//   name: '',
			//   email: '',
			//   phone: '',
			//   notes: '',
			//   amountTotal: 0,
			// },
			id: data.bookAService.id,
			url: `/account?dashState=orders#orders`,
			success: `Booking has been requested. Lookout for a reply with the provided contact. email: ${values.email}`,
		}
	} catch (error) {
		console.log("!!! actionBookAService: ", error)
		return {
			error: "Booking Failed: " + error,
			success: undefined,
		}
	}
}

function validateValues({ email }: BookAServiceValues) {
	// @ts-ignore
	let valueErrors: BookAServiceState["valueErrors"] = {}
	if (!valueErrors) return undefined

	if (!emailRegex.test(email))
		valueErrors.email = "Check spelling or use different email"

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type BookAServiceValues = {
	serviceId: string
	locationId?: string
	addonIds?: string[]
	employeeId?: string
	// start: string
	date: string
	time: string
	timeZone: string
	address: string
	customerId?: string
	name?: string
	email: string
	phone?: string
	notes?: string
	amountTotal: number
}

export type BookAServiceState = {
	url?: string
	id?: string
	values?: BookAServiceValues
	valueErrors?: Record<keyof BookAServiceValues, string> | undefined
	error?: string
	success?: string
}
