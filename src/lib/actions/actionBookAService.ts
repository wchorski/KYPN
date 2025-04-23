"use server"
import { keystoneContext } from "@ks/context"
import type { CartItem } from "@ks/types";
import { emailRegex } from "@lib/regexPatterns"
import { plainObj } from "@lib/utils"
import { getServerSession } from "next-auth"

import { nextAuthOptions } from "@/session"

export async function actionBookAService(
	prevState: BookAServiceState,
	formData: FormData
): Promise<BookAServiceState> {
	// @ts-ignore
	const values = Object.fromEntries(formData) as BookAServiceValues
	//? array of checkboxes w same name `addonIds`
	values.addonIds = formData.getAll("addonIds") as string[]
	// console.log("action values: ", { values })
	const session = await getServerSession(nextAuthOptions)

	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	// const {  } = values

	const valueErrors = validateValues(values)
	if (valueErrors)
		return { valueErrors, values, error: "Check for errors in form fields" }

	let isErrorFlagged = false
	let bookingId = ""
  
	try {
		// TODO left off seeing how ks catches this mutation
		const data = (await keystoneContext.withSession(session).graphql.run({
			// const data = (await keystoneContext.sudo().graphql.run({
			query: `
        mutation BookAService($address: String, $serviceId: String!, $date: String!, $time: String!, $timeZone: String!, $email: String!, $locationId: String, $addonIds: [String], $employeeId: String, $customerId: String, $name: String, $phone: String, $notes: String, $amountTotal: Int) {
          bookAService(address: $address, serviceId: $serviceId, date: $date, time: $time, timeZone: $timeZone, email: $email, locationId: $locationId, addonIds: $addonIds, employeeId: $employeeId, customerId: $customerId, name: $name, phone: $phone, notes: $notes, amount_total: $amountTotal) {
            id
            quantity
            type
            subTotal
            email
            booking {
              id
              price
              summary
              service {
                image
              }
            }
          }
        }
      `,
			variables: values,
		})) as { bookAService: CartItem }

		bookingId = data.bookAService.booking?.id || ""

		return {
			// values: {
			// },
			id: bookingId || "",
			url: `/bookings/${bookingId}`,
			cartItem: plainObj(data.bookAService),
			success: `Booking has been requested. Lookout for a reply with the provided contact. email ${values.email} or phone ${values.phone}`,
		}
	} catch (error) {
		console.log("!!! actionBookAService: ", error)
		isErrorFlagged = true
		return {
			error: "Booking Failed: " + error,
			success: undefined,
		}
	}
	// finally {
	// 	if (!isErrorFlagged && values.customerId && bookingId)
	// 		redirect(`/bookings/${bookingId}`)
	// }
}

function validateValues({ email, date, time }: BookAServiceValues) {
	// @ts-ignore
	let valueErrors: BookAServiceState["valueErrors"] = {}
	if (!valueErrors) return undefined

	if (!emailRegex.test(email))
		valueErrors.email = "Check spelling or use different email"

	if (!date) valueErrors.date = "Event date must be selected"

	if (!time) valueErrors.time = "Start time must be selected"

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
	cartItem?: CartItem
}
