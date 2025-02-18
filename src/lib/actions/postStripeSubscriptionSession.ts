"use server"
import { envs } from "@/envs"
import type { CartItem, Product, SubscriptionPlan, User } from "@ks/types"
// cred - https://medium.com/@josh.ferriday/intergrating-stripe-payments-with-next-app-router-9e9ba130f101
import { Stripe } from "stripe"

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")

const stripe = new Stripe(envs.STRIPE_SECRET)

export type StripeCheckoutSessionAction = {
	user: User
	email?: string
	subscriptionPlan: SubscriptionPlan
	couponIds: string[]
	addonIds: string[]
	// TODO this is here for my peace of mind, but prob can omit
	// itemType: "ticket" | "product" | "booking"
}
// & (
// 	| {
// 			itemType: "product"
// 			product: Product
// 	  }
// 	| {
// 			itemType: "ticket"
// 			event: Event
// 	  }
//   )

export const postStripeSubscriptionSession = async (props: StripeCheckoutSessionAction) => {
	const { subscriptionPlan, couponIds, addonIds, email, user } = props

  
  const subscriptionLineItem = createSubscriptionLineItem(subscriptionPlan)
  // TODO create couponLineItems via `couponIds`
  // TODO create addonLineItems via `addonIds`

  // const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] | undefined = [
  //   createSubscriptionLineItem(item)
  // ]

	//TODO maybe will be different between item types?
	const returnUrl = `${envs.FRONTEND_URL}/checkout/completed?stripeCheckoutSessionId={CHECKOUT_SESSION_ID}`
	console.log({ subscriptionLineItem })
  if(!subscriptionLineItem) throw new Error('!!! STRIPE subscription line_item not created')
	// https://docs.stripe.com/api/checkout/sessions/create
	const session = await stripe.checkout.sessions.create({
		ui_mode: "embedded",
		line_items: [subscriptionLineItem],
		mode: "subscription",
		return_url: returnUrl,
		...(email ? { customer_email: email } : {}),
		customer: user?.stripeCustomerId,
		metadata: {
			typeof: "subscription-item",
			customerId: user.id,
			orderId: "",
			subscriptionPlanId: subscriptionPlan.id,
		},
		// https://docs.stripe.com/payments/checkout/free-trials
		...(envs.STRIPE_SUB_TRIAL_PERIOD_DAYS
			? {
					subscription_data: {
						trial_period_days: envs.STRIPE_SUB_TRIAL_PERIOD_DAYS,
					},
			  }
			: {}),
	})

	if (!session.client_secret) throw new Error("Error initiating Stripe session")

	return {
		clientSecret: session.client_secret,
	}
}

//* Line Item helper

function createSubscriptionLineItem(
	subscriptionPlan: SubscriptionPlan
): Stripe.Checkout.SessionCreateParams.LineItem | undefined {
	if (!subscriptionPlan) return undefined
	return {
		quantity: 1,
		// price: product.stripePriceId,
		...(subscriptionPlan.stripePriceId
			? { price: subscriptionPlan.stripePriceId }
			: {
					price_data: {
						// TODO make this part of CartItem schema item.currency, not hard coded
						currency: "usd",
						recurring: {
							interval: subscriptionPlan.billing_interval,
						},
						product_data: {
							name: subscriptionPlan.name,
							images: [subscriptionPlan?.image || ""],
							metadata: {
								subscriptionPlanId: subscriptionPlan.id,
								typeof: "subscriptionPlan",
							},
						},

						unit_amount: subscriptionPlan.price,
					},
			  }),
	}
}
