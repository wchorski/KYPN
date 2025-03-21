"use server"
import { keystoneContext } from "@ks/context"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function actionEmployeeGigDecision(
	prevState: EmployeeGigDecisionState,
	formData: FormData
): Promise<EmployeeGigDecisionState> {
  const values = Object.fromEntries(formData) as EmployeeGigDecisionValues
  // // @ts-ignore
  // delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
  const { userId, bookingId, decision } = values
  

  // const valueErrors = validateValues(values)
  // if (valueErrors)
  // 	return { valueErrors, values, error: "Check for errors in form fields" }
  
	try {
    const session = await getServerSession(nextAuthOptions)

		const data = (await keystoneContext.withSession(session).graphql.run({
			query: `
        mutation UpdateBooking($where: BookingWhereUniqueInput!, $data: BookingUpdateInput!) {
          updateBooking(where: $where, data: $data) {
            id
          }
        }
      `,
			variables: {
				where: { id: bookingId },
				data:
					decision === "CONFIRMED"
						? {
								status: decision,
								employee_requests: {
									disconnect: [
										{
											id: userId,
										},
									],
								},
								employees: {
									connect: [
										{
											id: userId,
										},
									],
								},
						  }
						: // todo may add ability to decline gig
						  {
                status: decision,
								employee_requests: {
									connect: [
										{
											id: userId,
										},
									],
								},
								employees: {
									disconnect: [
										{
											id: userId,
										},
									],
								},
						  },
			},
		})) as { updateBooking: { id: string } }
    console.log({data});

		return {
      //@ts-ignore
      values: {
        decision
      },
			id: data.updateBooking.id,
			// url: envs.FRONTEND_URL + `/users/${data.PasswordReset.id}`,
			url: envs.FRONTEND_URL + `/account`,
			success: `Gig decision made`,
		}
	} catch (error) {
		console.log("!!! actionEmployeeGigDecision: ", error)
		return {
			error: "Gig decision failed: " + error,
			success: undefined,
		}
	}
}

function validateValues({}: EmployeeGigDecisionValues) {
	// @ts-ignore
	let valueErrors: EmployeeGigDecisionState["valueErrors"] = {}
	if (!valueErrors) return undefined

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type EmployeeGigDecisionValues = {
	userId: string
	bookingId: string
	decision: "" | "CONFIRMED" | "DECLINED" | string | null
}

export type EmployeeGigDecisionState = {
	url?: string
	id?: string
	values?: EmployeeGigDecisionValues
	valueErrors?: Record<keyof EmployeeGigDecisionValues, string> | undefined
	error?: string
	success?: string
}
