import { Coupon } from "@ks/types"
import { keystoneContext } from "@ks/context"

type Props = {
	code: string | undefined
	query: string
}

export default async function fetchRedeemCoupon({
	code,
	query,
}: Props): Promise<{ coupon?: Coupon; error?: unknown } | undefined> {
	try {
		if (!code) return undefined
		const data = (await keystoneContext.graphql.run({
			query: `
        mutation RedeemCoupon($code: String!) {
          redeemCoupon(code: $code) {
            ${query}
          }
        }
      `,
			variables: { code },
		})) as { redeemCoupon: Coupon }

		return { coupon: data.redeemCoupon }
	} catch (error) {
		console.log("!!! fetch Coupon by code:: ", error)
		return { error }
	}
}

// const COUPON_QUERY = `
//   id
//   name
//   code
//   amount_off
//   percent_off
//   duration_in_months
//   duration
//   redeem_by
//   max_redemptions
//   redemptions
// `
