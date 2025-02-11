"use server"
import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { delay } from "@lib/utils"
import { getServerSession } from "next-auth"

export async function postAddToCart(
	prevState: AddToCartState,
	formData: FormData
): Promise<AddToCartState> {
	// @ts-ignore
	const values = Object.fromEntries(formData) as AddToCartValues
	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	// const {  } = values
	// console.log({values});

	const valueErrors = validateValues(values)
	if (valueErrors)
		return { valueErrors, values, error: "Check for errors in form fields" }

	//? use if form data needs to be modified before db query
	// const variables = values as AddToCartVariables
	try {
		const session = await getServerSession(nextAuthOptions)

		const data = (await keystoneContext.withSession(session).graphql.run({
			query: `
        mutation AddToCart($type: String!, $quantity: Int!, $productId: ID, $eventId: ID) {
          addToCart(type: $type, quantity: $quantity, productId: $productId, eventId: $eventId) {
            id
          }
        }
      `,
			variables: values,
		})) as { addToCart: { id: string } }
		console.log({ data })

		await delay(800)
		console.log("postAddToCart Triggered")

		return {
			// values: {

			// },
			// id: data.AddToCart.id,
			id: "DEBUG",
			// url: envs.FRONTEND_URL + `/users/${data.AddToCart.id}`,
			url: envs.FRONTEND_URL + `/AddToCart`,
			success: `Success! AddToCart`,
		}
	} catch (error) {
		console.log("!!! actionAddToCart: ", error)
		return {
			error: "AddToCart failed: " + error,
			success: undefined,
		}
	}
}

function validateValues({}: AddToCartValues) {
	// @ts-ignore
	let valueErrors: AddToCartState["valueErrors"] = {}
	if (!valueErrors) return undefined

	//TODO add custom validation rules

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type AddToCartValues = {
	type: "SALE" | "RENTAL" | "SUBSCRIPTION"
	quantity: number
	productId: string | undefined
	eventId: string | undefined
	subscriptionPlanId: string | undefined
}

export type AddToCartState = {
	url?: string
	id?: string
	values?: AddToCartValues
	valueErrors?: Record<keyof AddToCartValues, string> | undefined
	error?: string
	success?: string
	data?: any | undefined
}
