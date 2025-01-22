"use server"
import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"
import { redirect, RedirectType } from "next/navigation"

export async function postCheckoutCart(
	prevState: CheckoutCartState,
	formData: FormData
): Promise<CheckoutCartState> {
	//@ts-ignore
	// const values = Object.fromEntries(formData) as CheckoutCartValues
	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	// const {  } = values
	// console.log({values});

	// const valueErrors = validateValues(values)
	// if (valueErrors)
	//   return { valueErrors, values, error: "Check for errors in form fields" }

	//? use if form data needs to be modified before db query
	// const variables = values as CheckoutCartVariables


	try {
		const session = await getServerSession(nextAuthOptions)

		const data = (await keystoneContext.withSession(session).graphql.run({
			query: `
        mutation Checkout {
          checkout {
            id
            status
          }
        }
      `,
			// variables: values,
		})) as { checkout: { id: string; status: string } }

		return {
			//@ts-ignore
			// values: {

			// },
			id: data.checkout.id,
			url: `/checkout/completed?orderId=${data.checkout.id}`,
			success: `Success! CheckoutCart ${data.checkout.status}`,
		}
	} catch (error) {
		console.log("!!! actionCheckoutCart: ", error)

		return {
			error: "CheckoutCart failed: " + error,
			success: undefined,
		}
	} finally {
    //? gotta route in the frontend because it won't clear the cart
		// if (!isErrorFlagged)
		// 	redirect(`/checkout/completed?orderId=${orderId}`, RedirectType.push)
	}
}

// function validateValues({}: CheckoutCartValues) {
// 	// @ts-ignore
// 	let valueErrors: CheckoutCartState["valueErrors"] = {}
// 	if (!valueErrors) return undefined

// 	//TODO add custom validation rules

// 	if (Object.keys(valueErrors).length === 0) return undefined
// 	return valueErrors
// }

export type CheckoutCartValues = {}

export type CheckoutCartState = {
	url?: string
	id?: string
	values?: CheckoutCartValues
	valueErrors?: Record<keyof CheckoutCartValues, string> | undefined
	error?: string
	success?: string
}
