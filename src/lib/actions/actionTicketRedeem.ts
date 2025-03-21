"use server"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function actionTicketRedeem(
	prevState: TicketRedeemState,
	formData: FormData
): Promise<TicketRedeemState> {
	let isErrorFlagged = false

  const values = Object.fromEntries(formData) as TicketRedeemValues
  // // @ts-ignore
  // delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
  const { ticketId, status } = values
  // console.log({ values })

  const valueErrors = validateValues(values)
  if (valueErrors)
    return { valueErrors, values, error: "Check for errors in form fields" }

  //? use if form data needs to be modified before db query
  // const variables = values as TicketRedeemVariables
  
	try {
    const session = await getServerSession(nextAuthOptions)

		const updateTicket = (await keystoneContext
			.withSession(session)
			.query.Ticket.updateOne({
				where: { id: ticketId },
				query: `
          status
        `,
				data: {
					status,
				},
			})) as { status: string }

		return {
			//@ts-ignore
			values: {
				status: updateTicket.status,
			},
			id: ticketId,
			// url: envs.FRONTEND_URL + `/users/${data.TicketRedeem.id}`,
			url: envs.FRONTEND_URL + `/TicketRedeem`,
			success: `Ticket Status: ${updateTicket.status}`,
		}
	} catch (error) {
		console.log("!!! actionTicketRedeem: ", error)
		isErrorFlagged = true
		return {
			error: "TicketRedeem failed: " + error,
			success: undefined,
		}
	} 
  // finally {
	// 	if (!isErrorFlagged) redirect(`/tickets/${ticketId}`, RedirectType.push)
	// }
}

function validateValues({ status, currStatus }: TicketRedeemValues) {
	// @ts-ignore
	let valueErrors: TicketRedeemState["valueErrors"] = {}
	if (!valueErrors) return undefined

	//TODO add custom validation rules
	const invalidStatuses = [
		"PENDING",
		"UNPAID",
    //TODO cant set as ATTENDED and trigger error at the same time
		"ATTENDED",
		"CANCELED",
		"REJECTED",
		"PAST",
	]
	if (invalidStatuses.includes(currStatus)) valueErrors.status = "Ticket is invalid"

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type TicketRedeemValues = {
	ticketId: string
	status: string
	currStatus: string
}

export type TicketRedeemState = {
	url?: string
	id?: string
	values?: TicketRedeemValues
	valueErrors?: Record<keyof TicketRedeemValues, string> | undefined
	error?: string
	success?: string
}
