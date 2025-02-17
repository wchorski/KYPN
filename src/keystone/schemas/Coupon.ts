import { list, group } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import { integer, relationship, select, text } from "@keystone-6/core/fields"
import stripeConfig, { stripeCouponCreate } from "../../lib/stripe"
import { isLoggedIn, permissions, rules } from "../access"
import { Duration } from "@ks/types"

// TODO figoure out coupons
export const Coupon: Lists.Coupon = list({
	access: {
		filter: {
			query: rules.canManageCoupons,
			update: rules.canManageCoupons,
			delete: rules.canManageCoupons,
		},
		operation: {
			create: permissions.canManageCoupons,
			query: isLoggedIn,
			update: permissions.canManageCoupons,
			delete: permissions.canManageCoupons,
		},
	},

	// setting this to isHidden for the user interface prevents this list being visible in the Admin UI
	// todo hide these again
	// ui: {
	//   isHidden: true,
	// },

	fields: {
		name: text({ isIndexed: "unique", validation: { isRequired: true } }),
		stripeId: text(),
		...group({
			label: "Discount",
			description: "may only choose one. Leave other blank",
			fields: {
				amount_off: integer({ validation: { min: 0 } }),
				percent_off: integer({
					validation: {
						min: 1,
						max: 100,
					},
				}),
			},
		}),
		duration_in_months: integer({}),
		duration: select({
			options: [
				{ label: "once", value: "once" },
				{ label: "repeating", value: "repeating" },
				{ label: "forever", value: "forever" },
			],
			// defaultValue: 'once',
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
		}),
		// this can be helpful to find out all the Posts associated with a Tag

		// todo add coupon relations
		products: relationship({
			ref: "Product.coupons",
			many: true,
			ui: { description: "available coupons before purchase" },
		}),
		subscriptionPlans: relationship({
			ref: "SubscriptionPlan.coupons",
			many: true,
		}),
		events: relationship({
			ref: "Event.coupons",
			many: true,
			ui: { description: "available coupons before purchase" },
		}),
		services: relationship({
			ref: "Service.coupons",
			many: true,
			ui: { description: "available coupons before purchase" },
		}),
	},

	hooks: {
		// validate: {
		//   create: ({}) => {}
		// },
		beforeOperation: async ({ operation, resolvedData, item, context }) => {
			if (operation === "create") {
				// TODO move to validate hook
				if (resolvedData.amount_off && resolvedData.percent_off)
					throw new Error(
						"Cannot have 'Amount Off and Percent Off chosen together. Chose only one option and leave the other blank"
					)

				if (
					resolvedData?.duration === "repeating" &&
					!resolvedData.duration_in_months
				)
					throw new Error(
						"if Duration is 'repeating', Duration in Months must be above 0 months"
					)

				// const coupon = await stripeCouponCreate({
				//   name: String(resolvedData.name),
				//   percent_off: resolvedData.percent_off || 0,
				//   // @ts-ignore
				//   duration: resolvedData.duration as Duration,
				//   duration_in_months: Number(resolvedData.duration_in_months),

				// }).then(async (coupon) => {
				//   if(coupon) resolvedData.stripeId = coupon.id
				// }).catch(err => console.log(err))
			}
		},
		afterOperation: async ({ operation, resolvedData, item, context }) => {
			if (operation === "create") {
				await stripeCouponCreate({
					couponId: item.id,
					name: item.name,
					percent_off: item.percent_off || 0,
					duration: item.duration as Duration,
					duration_in_months: Number(item.duration_in_months),
				})
					.then(async (stripeCoupon) => {
						if (stripeCoupon) resolvedData.stripeId = stripeCoupon.id
					})
					.catch((err) => console.log(err))
			}
		},
	},
})
