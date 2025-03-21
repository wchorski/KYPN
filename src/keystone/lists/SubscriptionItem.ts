import "dotenv/config"

import { graphql, group,list } from "@keystone-6/core"
import {
	checkbox,
	integer,
	relationship,
	select,
	text,
	timestamp,
	virtual,
} from "@keystone-6/core/fields"

import { envs } from "../../../envs"
import { mailSubscription } from "../../lib/mail"
import { stripeSubscriptionUpdate } from "../../lib/stripe"
import { isLoggedIn, permissions, rules } from "../access"
import type {
	Coupon,
	SubscriptionItem as TypeSubsItem,
	SubscriptionPlan,
	User,
} from "../types"
import type { Lists } from ".keystone/types"

export const SubscriptionItem: Lists.SubscriptionItem = list({
	// access: allowAll,
	access: {
		filter: {
			// todo throwing strange error in keystone main dash
			// query: rules.canManageOrderItems,
			query: rules.canViewSubscriptionItems,
			update: rules.canManageSubscriptionItems,
			delete: rules.canManageSubscriptionItems,
		},
		operation: {
			create: permissions.canManageSubscriptionItems,
			query: isLoggedIn,
			update: permissions.canManageSubscriptionItems,
			delete: permissions.canManageSubscriptionItems,
		},
	},

	ui: {
		listView: {
			initialColumns: [
				"user",
				"subscriptionPlan",
				"status",
				"custom_price",
				"billing_interval",
				"dateModified",
			],
			initialSort: {
				field: "dateModified",
				direction: "DESC",
			},
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "subscriptionItem"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		summary: virtual({
			field: graphql.field({
				type: graphql.String,
				async resolve(item, args, context) {
					// if(!item.serviceId) return item.name
					const subPlan = (await context.query.SubscriptionPlan.findOne({
						where: { id: item.subscriptionPlanId || "null" },
						query: `
              name
            `,
					})) as SubscriptionPlan

					const customer = await context.query.User.findOne({
						where: { id: item.userId },
						query: `
              name
            `,
					})

					return `${customer?.name || "Anonymous"}'s ${
						subPlan?.name || "No Service Selected"
					}`
				},
			}),
		}),
		custom_price: integer(),

		price: virtual({
			ui: {
				description: "charged per interval",
			},
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {
					// const orderItem = await context.query.OrderItem.findOne({
					//   where: { id: item.}
					// })
					// throw new Error('get subTotal from OrderItem ')
					// // if(!item.serviceId) return item.name
					const subPlan = (await context.query.SubscriptionPlan.findOne({
						where: { id: item.subscriptionPlanId || "no_service" },
						query: `
              price
            `,
					})) as SubscriptionPlan

					if (!item.couponId) return subPlan.price

					const coupon = (await context.query.Coupon.findOne({
						where: { id: item.couponId },
						query: `
              amount_off
              percent_off
            `,
					})) as Coupon

					if (coupon.amount_off) return subPlan.price - coupon.amount_off
					if (coupon.percent_off)
						return subPlan.price - subPlan.price * (coupon.percent_off / 100)

					// TODO add addons back into the price once I figure that out....
					// const addons = await context.query.Addon.findMany({
					// 	where: {
					// 		subscriptionItems: {
					// 			every: {
					// 				id: {
					// 					equals: item.id,
					// 				},
					// 			},
					// 		},
					// 	},
					// 	query: `
					//     price
					//   `,
					// })
					// console.log('🐸 addons dont work exactly right for subscritions fyi');
					// const addonsPrice = addons.reduce((acc, item) => acc + item.price, 0)

					// const subTotal = subPlan.price + addonsPrice

					// return subTotal
				},
			}),
		}),

		subscriptionPlan: relationship({
			ref: "SubscriptionPlan.items",
			many: false,
			// todo this validation seems nice but messes up updating
			// hooks: {
			//   validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
			//     const connection = resolvedData[fieldKey];
			//     if (!connection) return addValidationError(`Must choose a Subscription Plan`);
			//   },
			// },
		}),
		isActive: checkbox({ defaultValue: true }),
		isDelinquent: checkbox({ defaultValue: false }),
		trial_end: timestamp(),
		status: select({
			options: [
				{ label: "Active", value: "ACTIVE" },
				// { label: "Trial", value: "TRIAL" },
				{ label: "Expired", value: "EXPIRED" },
				{ label: "Canceled", value: "CANCELED" },
				{ label: "Suspended", value: "SUSPENDED" },
				{ label: "Paused", value: "PAUSED" },
				{ label: "Delinquent", value: "DELINQUENT" },
				{ label: "Requested", value: "REQUESTED" },
			],
			defaultValue: "REQUESTED",
			validation: { isRequired: true },
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		billing_interval: select({
			options: [
				{ label: "Daily", value: "day" },
				{ label: "Weekly", value: "week" },
				{ label: "Monthly", value: "month" },
				{ label: "Yearly", value: "year" },
			],
			// defaultValue: "month",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
			validation: { isRequired: true },
			hooks: {
				resolveInput: async ({ inputData, operation, context }) => {
					if (operation === "create") {
						const subPlan = await context.query.SubscriptionPlan.findOne({
							where: {
								id: inputData.subscriptionPlan?.connect?.id,
							},
							query: `
                billing_interval
              `,
						})
						return subPlan.billing_interval
					}
				},
			},
		}),
		notes: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		addons: relationship({ ref: "Addon.subscriptionItems", many: true }),
		user: relationship({
			ref: "User.subscriptions",
			ui: {
				displayMode: "cards",
				cardFields: ["name", "email"],
				inlineEdit: { fields: ["name", "email"] },
				linkToItem: true,
				inlineConnect: true,
			},

			many: false,
			// hooks: {
			//   validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
			//     const connection = resolvedData[fieldKey];
			//     if (!connection) return addValidationError(`Must choose a User`);
			//   },
			// }
		}),
		...group({
			label: "Metadata",
			fields: {
        // TODO may cause problems if bundling subscriptions?
				stripeSubscriptionId: text({
					isIndexed: "unique",
					validation: { isRequired: false },
				}),
				stripeSubscriptionItemId: text({
					isIndexed: 'unique',
					validation: { isRequired: false },
				}),
				dateCreated: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
				}),
				dateModified: timestamp({
					defaultValue: { kind: "now" },
					validation: { isRequired: true },
				}),
			},
		}),
		orderItem: relationship({ ref: "OrderItem.subscriptionItem", many: false }),
		coupon: relationship({ ref: "Coupon.subscriptionItems", many: false }),
	},

	hooks: {
		validate: {
			create: async ({ resolvedData }) => {
				if (!resolvedData.subscriptionPlan)
					throw new Error("!!! SubscriptionItem must have SubscriptionPlan")

				// TODO check to see if addons are allowed to be put on by checking SubscriptionPlan.addons ids
				console.log(
					"🐸 TODO check to see if addons are allowed to be put on by checking SubscriptionPlan.addons ids"
				)
			},
			update: async ({ resolvedData, item }) => {
				if (resolvedData.subscriptionPlan)
					throw new Error(
						"!!! SubscriptionItem: SubscriptionPlan cannot be changed on update"
					)
				if (item.status === "CANCELED" && resolvedData.status !== "CANCELED") {
					throw new Error("!!! sub item is canceled and cannot be re-activated")
				}
				if (resolvedData.billing_interval) {
					throw new Error(
						"!!! sub item's billing_interval cannot be updated. Create new subscription instead"
					)
				}
			},
		},
		beforeOperation: {
			update: async ({ resolvedData, item }) => {
				const now = new Date()
				resolvedData.dateModified = now

				if (resolvedData.status)
					await stripeSubscriptionUpdate({
						subItemId: item.id,
						stripeSubscriptionId: item.stripeSubscriptionId,
						status: resolvedData.status as TypeSubsItem["status"],
					})
			},
			delete: async ({ item,  }) => {
				await stripeSubscriptionUpdate({
					subItemId: item.id,
					stripeSubscriptionId: item.stripeSubscriptionId,
					status: "CANCELED",
				})
			},
		},
		afterOperation: async ({ operation, resolvedData, item, context }) => {
			if (operation === "create" || operation === "update") {
				const customer = (await context.sudo().query.User.findOne({
					where: { id: item?.userId },
					query: `
            email
          `,
				})) as User

				const subscriptionItem = (await context
					.sudo()
					.query.SubscriptionItem.findOne({
						where: { id: item?.id },
						query: `
            id
            status
            billing_interval
            dateCreated
            custom_price
            user {
              name
              email
            }
            subscriptionPlan {
              name
            }
          `,
					})) as TypeSubsItem

				if (!subscriptionItem) return console.log("!!! no sub item found")

				const mail = await mailSubscription({
					to: [envs.ADMIN_EMAIL_ADDRESS, customer?.email],
					operation,
					subscriptionItem,
				})
			}
		},
	},
})
