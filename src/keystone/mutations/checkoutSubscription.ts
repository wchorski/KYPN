// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts
//! trying to fit this all into `addToCart.ts`
import { graphql } from "@keystone-6/core"
import type { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"

import type {
	Context,
	OrderItemCreateInput} from ".keystone/types";



type StripeSession = {
	stripe?: {
		payment_status: "paid" | "unpaid"
		id: string
		payment_intent: string
		customerId: string
		amount_total: number
		subscriptionId: string | undefined
		rentalId: string | undefined
	}
}

// type SessionWStripe = Session & StripeSession
type SessionWStripe = {
	itemId?: string
	user: { email: string }
} & StripeSession

// TODO consolidate into one checkout mutation
// grab items from cart instead of doing all this song and dance with form input

export const checkoutSubscription = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("Order"),
		args: {
			subscriptionPlanId: graphql.arg({
				type: graphql.nonNull(graphql.String),
			}),
			addonIds: graphql.arg({ type: graphql.list(graphql.String) }),
			couponIds: graphql.arg({ type: graphql.list(graphql.String) }),
		},
		async resolve(source, variables, context: Context) {
			const { subscriptionPlanId, addonIds, couponIds } = variables

			//? Stripe Webhook validates payment success
			const sudoContext = context.sudo()
			const session: SessionWStripe = context.session
			if (!session)
				throw new Error(
					"!!! mutation.checkoutSubscription: Session not available"
				)

			// console.log({ variables })
			// console.log({ session })

			const paymentStatus = session.stripe?.payment_status || "unpaid"
			const customerId = session.itemId || session.stripe?.customerId

			// TODO fix. this allows anyone to subscribe even to PRIVATE or DRAFT plans
			const subscriptionPlan = await sudoContext.query.SubscriptionPlan.findOne(
				// context.withSession(session)
				{
					where: { id: subscriptionPlanId },
					query: `
            id
            billing_interval
            price
          `,
				}
			)

			if (!subscriptionPlan)
				throw new Error(
					"!!! mutation.checkoutSubscription: no subscriptionPlan found"
				)

			// TODO addonIds
			// const addons = await

			// TODO couponIds
			// const coupons = await

			// const amountTotal = subscriptionPlan.price
			// const transactionFees =
			// 	(session.stripe?.amount_total || amountTotal) - amountTotal

			const newOrderItem = {
				type: "SUBSCRIPTION",
				quantity: 1,
				subscriptionItem: {
					create: {
						subscriptionPlan: {
							connect: { id: subscriptionPlan.id },
						},
						status: paymentStatus === "paid" ? "ACTIVE" : "TRIAL",
						billing_interval: subscriptionPlan?.billing_interval,
						user: {
							connect: {
								id: session.itemId || session.stripe?.customerId,
							},
						},
						// TODO this is combined `sub_***` checkout. we want single `si_***` saved here
						stripeSubscriptionId: session.stripe?.subscriptionId,
					},
				},
			} as OrderItemCreateInput

			const order = await sudoContext.db.Order.createOne({
				// const order = await context.withSession(session).db.Order.createOne({
				data: {
					// fees: transactionFees,
					...(newOrderItem ? { items: { create: newOrderItem } } : {}),
					user: { connect: { id: customerId } },
					stripeCheckoutSessionId: session.stripe?.id || "",
					stripePaymentIntent: session.stripe?.payment_intent || "",
					//TODO maybe not secure
					...(session.stripe?.payment_status === "paid" || subscriptionPlan.price === 0
						? { status: "PAYMENT_RECIEVED" }
						: { status: "REQUESTED" }),
				},
			})

			if (!order) throw new Error("!!! mutation.checkout: order not created")
			console.log({ order })
			//? email sent with Order afterOperation

			return {
				status: order.status,
				id: order.id,
			}
		},
	})
