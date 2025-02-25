"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { Coupon } from "@ks/types"
import { plainObj } from "@lib/utils"

export async function postRedeemCoupon(
	prevState: RedeemCouponState,
	formData: FormData
): Promise<RedeemCouponState> {
	const values = Object.fromEntries(formData) as RedeemCouponValues
	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	// const {} = values
	// console.log({ values })

	const valueErrors = validateValues(values)
	if (valueErrors)
		return { valueErrors, values, error: "Check for errors in form fields" }

	//? use if form data needs to be modified before db query
	// const variables = values as RedeemCouponVariables
	try {
		// const session = await getServerSession(nextAuthOptions)

		const data = (await keystoneContext.graphql.run({
			query: `
        mutation RedeemCoupon($code: String!) {
          redeemCoupon(code: $code) {
            id
            name
            code
            amount_off
            percent_off
            duration_in_months
            duration
            redeem_by
            max_redemptions
            redemptions
          }
        }
      `,
			variables: values,
		})) as { redeemCoupon: Coupon }
		

		return {
			values,
			id: data.redeemCoupon.id,
			// url: envs.FRONTEND_URL + `/users/${data.RedeemCoupon.id}`,
			// url: envs.FRONTEND_URL + `/RedeemCoupon`,
			success: `Coupon Applied!`,
      coupon: plainObj(data.redeemCoupon),
		}
	} catch (error) {
		console.log("!!! postRedeemCoupon: ", error)
		return {
			error: "RedeemCoupon failed: " + error,
			success: undefined,
      coupon: undefined,
		}
	}
}

function validateValues({}: RedeemCouponValues) {
	// @ts-ignore
	let valueErrors: RedeemCouponState["valueErrors"] = {}
	if (!valueErrors) return undefined

	//TODO add custom validation rules

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type RedeemCouponValues = {
	code: string
}

export type RedeemCouponState = {
	url?: string
	id?: string
	values?: RedeemCouponValues
  coupon?:Coupon
	valueErrors?: Record<keyof RedeemCouponValues, string> | undefined
	error?: string
	success?: string
}
