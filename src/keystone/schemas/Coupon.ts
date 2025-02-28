import { list, group, graphql } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"
import { stripeCouponCreate, stripeCouponDelete } from "../../lib/stripe"
import { isLoggedIn, permissions, rules } from "../access"
import { Duration, OrderItem } from "../types"
import { codeFormat } from "../../lib/slugFormat"

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

	ui: {
		listView: {
			initialColumns: [
				"name",
				"code",
				"amount_off",
				"percent_off",
				"max_redemptions",
				"dateModified",
			],
			initialSort: { field: "dateModified", direction: "DESC" },
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "coupon"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		name: text({
			isIndexed: "unique",
			validation: { isRequired: true, length: { min: 5, max: 200 } },
		}),
		code: text({
			isIndexed: "unique",
			validation: { isRequired: true, length: { max: 200 } },
			ui: {
				description:
					"may only contain alphanumeric characters in addition to - and _. Treat this field like a password. Make it hard to guess as customers will be able to guess when adding to their checkout",
			},
			hooks: {
				resolveInput: ({ inputData, operation }) => {
					if (operation === "create") {
						if (inputData.code) {
							return codeFormat(inputData.code)
						} else {
							throw new Error("code is required")
						}
					}
				},
			},
		}),
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
				redeem_by: timestamp({
					validation: { isRequired: true },
					// defaultValue: { kind: "now" },
					ui: {
						description:
							"The timestamp of last allowed redemption. Currently applied coupons do not expire and must be removed.",
					},
				}),
				max_redemptions: integer({
					validation: { isRequired: true, min: 0 },
					defaultValue: 9999,
					ui: {
						description:
							"This limit applies across customers so it won't prevent a single customer from redeeming multiple times.",
					},
				}),
			},
		}),

		// TODO fields
		// applies_too [products, services, etc]
		//? needs to be virtual (check `redeem_by` and current date or product is `applies_too`)
		// valid (checkbox)
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
		subscriptionItems: relationship({
			ref: "SubscriptionItem.coupon",
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
		...group({
			label: "Metadata",
			// description: 'Group description',

			fields: {
				// redemptions: integer({
				// 	validation: { isRequired: true, min: 0 },
				// 	defaultValue: 0,
				// }),
				redemptions: virtual({
					field: graphql.field({
						type: graphql.Int,
						async resolve(item, args, context) {
							const orderItemsCount = await context.db.OrderItem.count({
								where: { coupon: { id: { equals: item.id } } },
							})

							return orderItemsCount
						},
					}),
				}),
				dateCreated: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
				}),
				dateModified: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
					// https://keystonejs.com/docs/fields/timestamp#title
					db: {
						updatedAt: true,
					},
				}),
				// categories: relationship({
				// 	ref: "Category.products",
				// 	many: true,
				// }),

				// tags: relationship({
				// 	ref: "Tag.products",
				// 	many: true,
				// }),
				stripeId: text({ isIndexed: true, hooks: {
          validate: {
            create: async ({ resolvedData, context, addValidationError }) => {
              //? custom `unique` validation that also allows the field to be empty is not using stripe at all
              if(!resolvedData.stripeId) return
              const coupons = await context
                .sudo()
                .db.Coupon.findMany({
                  where: {
                    stripeId: {
                      equals: resolvedData.stripeId,
                    },
                  },
                })
              if(coupons.length > 0) addValidationError('!!! Coupon can not share same stripeId with others')
            },
            update: async ({ resolvedData, context, addValidationError }) => {
              if(!resolvedData.stripeId) return
              const coupons = await context
                .sudo()
                .db.Coupon.findMany({
                  where: {
                    stripeId: {
                      equals: resolvedData.stripeId,
                    },
                  },
                })
              if(coupons.length > 1) addValidationError('!!! Coupon can not share same stripeId with others')
            },
          },
        }, }),
			},
		}),
	},

	hooks: {
		validate: {
			create: ({ resolvedData }) => {
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
					resolvedData.code ||
					resolvedData.duration_in_months
				) {
					throw new Error(
						"!!! Can NOT update Coupon's details that affects Discount amount. A new Coupon must be created"
					)
				}
			},
		},
		beforeOperation: {
			create: async ({ resolvedData }) => {
				await stripeCouponCreate({
					name: String(resolvedData.name),
					code: String(resolvedData.code),
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
					console.log({ resolvedData })
				})
				console.log({ resolvedData })
			},
			//? for now not allowing any updating of coupon, just create a new one
			// update: async ({ resolvedData, context, item }) => {
			// },
		},
		afterOperation: {
			delete: async ({ originalItem }) => {
				await stripeCouponDelete(originalItem.stripeId)
			},
		},
	},
})
