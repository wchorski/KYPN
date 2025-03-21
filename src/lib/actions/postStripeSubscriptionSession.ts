"use server"
//? look into `stripe.subscriptions.create` instead of `checkout.sessions` - https://docs.stripe.com/billing/subscriptions/multiple-products
//? https://www.youtube.com/watch?v=ag7HXbgJtuk
//! if trial period. create subscription right away, and create a "add credit card" form in the /account dashboard
//? https://docs.stripe.com/payments/save-and-reuse

import type {
	Addon,
	Coupon,
	SubscriptionPlan,
	User,
} from "@ks/types"
// cred - https://medium.com/@josh.ferriday/intergrating-stripe-payments-with-next-app-router-9e9ba130f101
import { Stripe } from "stripe"

import { envs } from "@/envs"

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")

const stripe = new Stripe(envs.STRIPE_SECRET)

export type StripeCheckoutSessionAction = {
	user: User
	email?: string
	subscriptionPlan: SubscriptionPlan
	coupon?: Coupon
	addons: Addon[]
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

export const postStripeSubscriptionSession = async (
	props: StripeCheckoutSessionAction
) => {
	const { subscriptionPlan, coupon, addons, email, user } = props

	const subscriptionLineItem = createSubscriptionLineItem(subscriptionPlan)
	const addonLineItems = addons
		.map((adn) => createAddonLineItem(adn))
		.filter(Boolean) as Stripe.Checkout.SessionCreateParams.LineItem[]
	// TODO create couponLineItems via `couponIds`

	// const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] | undefined = [
	//   createSubscriptionLineItem(item)
	// ]

	//TODO maybe will be different between item types?
	const returnUrl = `${envs.FRONTEND_URL}/checkout/completed?stripeCheckoutSessionId={CHECKOUT_SESSION_ID}`

	if (!subscriptionLineItem)
		throw new Error("!!! STRIPE subscription line_item not created")
	// https://docs.stripe.com/api/checkout/sessions/create
	const session = await stripe.checkout.sessions.create({
		ui_mode: "embedded",
		line_items: [subscriptionLineItem, ...addonLineItems],
		mode: "subscription",
		return_url: returnUrl,
		...(email ? { customer_email: email } : {}),
		customer: user?.stripeCustomerId,
		metadata: {
			typeof: "subscription-item",
			customerId: user.id,
			orderId: "",
      // TODO make this a 'per listItem'. but i'll have to fix it on product creation for it to work
			subscriptionPlanId: subscriptionPlan.id,
			couponCode: coupon?.code || "",
		},
    subscription_data: {
      metadata: {
        typeof: "subscription-item",
        customerId: user.id,
        subscriptionPlanId: subscriptionPlan.id,
      }
    },
		// https://docs.stripe.com/payments/checkout/free-trials
		...(subscriptionPlan.trial_period_days
			? {
					subscription_data: {
						trial_period_days: subscriptionPlan.trial_period_days,
					},
			  }
			: {}),
		...(coupon
			? {
					discounts: [{ coupon: coupon.stripeId }],
			  }
			: {}),
	})

	if (!session.client_secret) throw new Error("Error initiating Stripe session")

	return {
		clientSecret: session.client_secret,
	}
}

//* Line Item helper

function createAddonLineItem(
	addon: Addon
): Stripe.Checkout.SessionCreateParams.LineItem | undefined {
	if (!addon) return undefined

	return {
		quantity: 1,
		// price: product.stripePriceId,
		...(addon.stripePriceId
			? { price: addon.stripePriceId }
			: {
					price_data: {
						// TODO make this part of CartItem schema item.currency, not hard coded
						currency: "usd",
						product_data: {
							name: `ADD-ON: ${addon.name}`,
							images: [addon?.image || ""],
							metadata: {
								productId: addon.id,
								typeof: "addon",
							},
						},

						unit_amount: addon.price,
					},
			  }),
	}
}

function createSubscriptionLineItem(
	subscriptionPlan: SubscriptionPlan
): Stripe.Checkout.SessionCreateParams.LineItem | undefined {
	if (!subscriptionPlan) return undefined
	return {
		quantity: 1,
    
		// price: product.stripePriceId,
		...(subscriptionPlan.stripePriceId
			? { price: subscriptionPlan.stripePriceId,  }
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
								typeof: "subscription-item",
							},
						},

						unit_amount: subscriptionPlan.price,
					},
			  }),
	}
}
