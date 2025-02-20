import { list, group } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import { integer, relationship, select, text } from "@keystone-6/core/fields"
import stripeConfig, { stripeCouponCreate, stripeCouponDelete, stripeProductUpdate } from "../../lib/stripe"
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
		name: text({ isIndexed: "unique", validation: { isRequired: true, length: { min: 5 } } }),
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
        duration_in_months: integer({ validation: { min: 1 } }),
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
			},
      // TODO fields
      // applies_too
      // redeem_by
      // max_redemptions
      // valid (checkbox)
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
		validate: {
			create: ({ resolvedData }) => {
        console.log({resolvedData});
				if (resolvedData.amount_off && resolvedData.percent_off)
					throw new Error(
						"Cannot have 'Amount Off and Percent Off chosen together. Chose only one option and leave the other blank"
					)

				if (
					resolvedData.duration === "repeating" &&
					!resolvedData.duration_in_months
				)
					throw new Error(
						"if Duration is 'repeating', Duration in Months must be set to 1 or above"
					)
			},
			update: ({ resolvedData }) => {
				if (
					resolvedData.duration ||
					resolvedData.amount_off ||
					resolvedData.percent_off ||
					resolvedData.duration_in_months
				) {
					throw new Error("!!! Can NOT update Coupon's details that affects Discount amount. A new Coupon must be created")
				}
			},
		},
		beforeOperation: {
			create: async ({ resolvedData }) => {
				await stripeCouponCreate({
					name: String(resolvedData.name),
					percent_off: resolvedData.percent_off || 0,
					amount_off: resolvedData.amount_off || 0,
					duration: resolvedData.duration as Duration,
					...(resolvedData.duration_in_months
						? { duration_in_months: resolvedData.duration_in_months }
						: {}),
					// couponId: "",
          stripeId: resolvedData.stripeId,
				}).then((res) => {
					if (!res) return

					resolvedData.stripeId = res.id
				})
			},
      //? for now not allowing any updating of coupon, just create a new one
      // update: async ({ resolvedData, context, item }) => {
      // },
		},
		afterOperation: {
      delete: async ({originalItem}) => {
        await stripeCouponDelete(originalItem.stripeId)
      }
		},
	},
})
