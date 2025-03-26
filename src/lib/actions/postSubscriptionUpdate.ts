"use server"
import { keystoneContext } from "@ks/context"
import type {  SubscriptionItem  } from "@ks/types"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function postSubscriptionUpdate(
	prevState: SubscriptionUpdateState,
	formData: FormData
): Promise<SubscriptionUpdateState> {
	let isErrorFlagged = false

	const values = Object.fromEntries(formData) as SubscriptionUpdateValues
	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	const { subscriptionItemId, status } = values

	const valueErrors = validateValues(values)
	if (valueErrors)
		return { valueErrors, values, error: "Check for errors in form fields" }

	//? use if form data needs to be modified before db query
	// const variables = values as SubscriptionUpdateVariables

	try {
		const session = await getServerSession(nextAuthOptions)

		const updatedSubscription = (await keystoneContext
			.withSession(session)
			.query.SubscriptionItem.updateOne({
				where: { id: subscriptionItemId },
				query: `
          status
        `,
				data: {
					status,
				},
			})) as { status: string }

		console.log({ updatedSubscription })

		return {
			values: {
				...values,
				status: updatedSubscription.status,
			},
			id: subscriptionItemId,
			url: envs.FRONTEND_URL + `/subscription-items/${subscriptionItemId}`,
			success: `Subscription Status: ${updatedSubscription.status}`,
		}
	} catch (error) {
		console.log("!!! postSubscriptionUpdate: ", error)
		isErrorFlagged = true
		return {
			error: "SubscriptionUpdate failed: " + error,
			success: undefined,
		}
	}
	// finally {
	// 	if (!isErrorFlagged) redirect(`/tickets/${id}`, RedirectType.push)
	// }
}

function validateValues({ status, currStatus }: SubscriptionUpdateValues) {
	// @ts-ignore
	let valueErrors: SubscriptionUpdateState["valueErrors"] = {}
	if (!valueErrors) return undefined

	//TODO add custom validation rules
	const invalidStatuses = [
		"ACTIVE",
		"TRIAL",
		"EXPIRED",
		"CANCELED",
		"SUSPENDED",
		"PAUSED",
		"DELINQUENT",
		"REQUESTED",
	]
	if (invalidStatuses.includes(currStatus))
		valueErrors.status = "Ticket is invalid"

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type SubscriptionUpdateValues = {
	subscriptionItemId: string
	status: SubscriptionItem["status"] | string
	currStatus: SubscriptionItem["status"] | string
}

export type SubscriptionUpdateState = {
	url?: string
	id?: string
	values?: SubscriptionUpdateValues
	valueErrors?: Record<keyof SubscriptionUpdateValues, string> | undefined
	error?: string
	success?: string
}
