// docs - https://keystonejs.com/docs/guides/schema-extension
import { graphql } from "@keystone-6/core"
import { Context } from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { Coupon } from "../types"

export const redeemCoupon = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("Coupon"),
		args: {
			code: graphql.arg({ type: graphql.nonNull(graphql.String) }),
		},

		async resolve(source, variables, context: Context) {
			const { code } = variables

			const { db: sudoDb } = context.sudo()

      //? must use `context.db` for proper return of `Coupon` 
			const coupon = (await sudoDb.Coupon.findOne({
				where: { code: code },
				// query: `
        //   id
        //   name
        //   code
        //   amount_off
        //   percent_off
        //   duration
        //   duration_in_months
        //   redeem_by
        //   max_redemptions
        //   redemptions
        // `,
			})) as Coupon

			// Validation
			if (!coupon) throw new Error("!!! Coupon not found")

			if (coupon.redemptions > coupon.max_redemptions)
				throw new Error("!!! Reached max redemptions")

			const now = new Date()
			const expirationDate = new Date(coupon.redeem_by)

			if (now > expirationDate) throw new Error("!!! Coupon has expired")

			return coupon
		},
	})
