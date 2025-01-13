"use server"
import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import stripeConfig from "@lib/stripe"
import { getServerSession } from "next-auth"

export async function actionTicketCheckout(
  prevState: TicketCheckoutState,
  formData: FormData
): Promise<TicketCheckoutState> {
  try {
    // @ts-ignore
    const values = Object.fromEntries(formData) as TicketCheckoutValues
    values.quantity = Number(formData.get('quantity'))
    // // @ts-ignore
    // delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
    const {  } = values
    console.log({values});
    

    const valueErrors = validateValues(values)
    if (valueErrors)
    	return { valueErrors, values, error: "Check for errors in form fields" }
    const session = await getServerSession(nextAuthOptions)

    const data = (await keystoneContext.withSession(session).graphql.run({
      query: `
        mutation CheckoutTickets($chargeId: String!, $sessionId: String!, $eventId: String!, $customerEmail: String!, $quantity: Int!, $amountTotal: Int!) {
          checkoutTickets(chargeId: $chargeId, sessionId: $sessionId, eventId: $eventId, customerEmail: $customerEmail, quantity: $quantity, amount_total: $amountTotal) {
            id
          }
        }
      `,
      variables: values,
    })) as { ticket: { id: string } }
    console.log({data});
    stripeCheckout()

    return {
      //@ts-ignore
      // values: {
      // },
      // id: data.ticket.id,
      // url: envs.FRONTEND_URL + `/users/${data.PasswordReset.id}`,
      url: envs.FRONTEND_URL + `/account`,
      success: `Ticket Purchased`,
    }
  } catch (error) {
    console.log("!!! actionTicketCheckout: ", error)
    return {
      error: "Ticket Checkout failed: " + error,
      success: undefined,
    }
  }
}

async function stripeCheckout(){
  const session = await stripeConfig.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    ui_mode: 'custom',
    // The URL of your payment completion page
    return_url: envs.FRONTEND_URL + '/checkout/completed'
  });

  return session.client_secret
}


function validateValues({}: TicketCheckoutValues) {
  // @ts-ignore
  let valueErrors: TicketCheckoutState["valueErrors"] = {}
  if (!valueErrors) return undefined

  //TODO add custom validation rules

  if (Object.keys(valueErrors).length === 0) return undefined
  return valueErrors
}

export type TicketCheckoutValues = {
  userId?:string
  eventId:string
  quantity:number
  email:string
}

export type TicketCheckoutState = {
  url?: string
  id?: string
  values?: TicketCheckoutValues
  valueErrors?: Record<keyof TicketCheckoutValues, string> | undefined
  error?: string
  success?: string
}
