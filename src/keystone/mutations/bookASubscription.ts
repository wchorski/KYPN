// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts
//! trying to fit this all into `addToCart.ts`
import { graphql } from "@keystone-6/core"
import {
  CartItemCreateInput,
	Context,
	Lists,
	OrderItemCreateInput,
	TicketCreateInput,
} from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"

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

export const bookASubscription = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("SubscriptionItem"),
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

			const newCartItem = {
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
			} as CartItemCreateInput

			const cartItem = await sudoContext.db.CartItem.createOne({
				// const order = await context.withSession(session).db.Order.createOne({
				data: {
					// subTotal: subscriptionPlan.price,
					// fees: transactionFees,
					...(newCartItem ? { items: { create: newCartItem } } : {}),
					user: { connect: { id: customerId } },
					// stripeCheckoutSessionId: session.stripe?.id || "",
					// stripePaymentIntent: session.stripe?.payment_intent || "",
				},
			})

			if (!cartItem) throw new Error("!!! mutation.checkout: order not created")
			console.log({ order: cartItem })
			//? email sent with Order afterOperation

			return {
				id: cartItem.id,
			}
		},
	})
