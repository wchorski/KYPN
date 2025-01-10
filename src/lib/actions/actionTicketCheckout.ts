"use server"
import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"

export async function actionTicketCheckout(
  prevState: TicketCheckoutState,
  formData: FormData
): Promise<TicketCheckoutState> {
  try {
    const values = Object.fromEntries(formData) as TicketCheckoutValues
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
        
      `,
      variables: {
        
      },
    })) as { ticket: { id: string } }
    console.log({data});

    return {
      //@ts-ignore
      // values: {
      // },
      id: data.ticket.id,
      // url: envs.FRONTEND_URL + `/users/${data.PasswordReset.id}`,
      url: envs.FRONTEND_URL + `/account`,
      success: `Ticket Purchased`,
    }
  } catch (error) {
    console.log("!!! actionTicketCheckout: ", error)
    return {
      error: "Gig decision failed: " + error,
      success: undefined,
    }
  }
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
  sessionId:string
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
