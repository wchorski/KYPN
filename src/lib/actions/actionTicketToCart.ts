"use server"
import { keystoneContext } from "@ks/context"
import type { CartItem } from "@ks/types"
import { plainObj } from "@lib/utils"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function actionTicketToCart(
	prevState: TicketCheckoutState,
	formData: FormData
): Promise<TicketCheckoutState> {
	let isErrorFlagged = false

	// @ts-ignore
	const values = Object.fromEntries(formData) as TicketCheckoutValues
	values.quantity = Number(formData.get("quantity"))
	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	// console.log({ values })
	// TODO i don't need values.email if account is necessary

	const valueErrors = validateValues(values)
	if (valueErrors)
		return { valueErrors, values, error: "Check for errors in form fields" }
	try {
		const session = await getServerSession(nextAuthOptions)

		//? this stops it from being added to cart.
		//? i put in extra measures so user can't query tickets if they are not verified (even if they are purchased)
		if (session?.data.role === null)
			throw new Error(
				`!!! User must verify their account to purchase tickets. Visit "${envs.FRONTEND_URL}/account" for more info.`
			)

		const data = (await keystoneContext.withSession(session).graphql.run({
			//? don't forget to query id, quanitity, subTotal because cartContext needs it
			query: `
		    mutation AddToCart($type: String!, $productId: ID, $eventId: ID, $quantity: Int!) {
          addToCart(type: $type, productId: $productId, eventId: $eventId, quantity: $quantity) {
            id
            quantity
            subTotal
            event {
              id
              image
              summary
              price
            }
          }
        }
		  `,
			variables: {
				type: "SALE",
				quantity: values.quantity,
				eventId: values.eventId,
			},
		})) as { addToCart: CartItem }

		if (!data.addToCart) throw new Error("Ticket Add to Cart Failed")

		return {
			// values: {
			// },
			// id: data.ticket.id,
			// url: envs.FRONTEND_URL + `/users/${data.PasswordReset.id}`,
			url: envs.FRONTEND_URL + `/checkout`,
			success: `Tickets added to cart. Redirecting to checkout`,
			cartItem: plainObj(data.addToCart),
		}
	} catch (error) {
		console.log("!!! actionTicketCheckout: ", error)
		isErrorFlagged = true
		return {
			error: "Ticket Checkout failed: " + error,
			success: undefined,
		}
	}
	// finally {
	// 	if (!isErrorFlagged) redirect("/checkout", RedirectType.push)
	// }
}

// async function stripeCheckout(){
//   const session = await stripeConfig.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     ui_mode: 'custom',
//     // The URL of your payment completion page
//     return_url: envs.FRONTEND_URL + '/checkout/completed'
//   });

//   return session.client_secret
// }

function validateValues({ quantity }: TicketCheckoutValues) {
	// @ts-ignore
	let valueErrors: TicketCheckoutState["valueErrors"] = {}
	if (!valueErrors) return undefined

	//TODO add custom validation rules
	if (quantity <= 0)
		valueErrors.quantity = "Quantity must be at least 1 or above"

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type TicketCheckoutValues = {
	userId?: string
	eventId: string
	quantity: number
	email: string
}

export type TicketCheckoutState = {
	url?: string
	id?: string
	values?: TicketCheckoutValues
	valueErrors?: Record<keyof TicketCheckoutValues, string> | undefined
	error?: string
	success?: string
	cartItem?: CartItem
}
