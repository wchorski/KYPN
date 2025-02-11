"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import type { CartItem, Event, Product, Ticket, User } from "@ks/types"
// cred - https://medium.com/@josh.ferriday/intergrating-stripe-payments-with-next-app-router-9e9ba130f101
import { Stripe } from "stripe"

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")

const stripe = new Stripe(envs.STRIPE_SECRET)

export type StripeCheckoutSessionAction = {
	user: User
	email?: string
	cartItems: CartItem[]
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

export const postStripeSession = async (props: StripeCheckoutSessionAction) => {
	const { cartItems, email, user } = props

	// const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] | undefined =
	// 	(() => {

	// 		switch (itemType) {
	// 			case "product":
	// 				return createProductLineItems(cartItems)

	// 			case "ticket":
	// 				return createTicketLineItems(cartItems, user)

	// 			case "booking":
	// 				return createBookingLineItems(cartItems)

	// 			default:
	// 				return undefined
	// 		}
	// 	})()

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] | undefined =
		(() => {
			const theseCartItems = cartItems.map((item) => {
				switch (true) {
					case !!item.product:
						return createProductLineItem(item)
					case !!item.subscriptionPlan:
						return createSubscriptionLineItem(item)
					case !!item.booking:
						return createBookingLineItems(item)
					case !!item.event:
						return createTicketLineItem(item, user)
					default:
						return undefined
				}
			})

			return theseCartItems.filter((item) => item !== undefined).flat()
		})()

	//TODO maybe will be different between item types?
	const returnUrl = `${envs.FRONTEND_URL}/checkout/completed?stripeCheckoutSessionId={CHECKOUT_SESSION_ID}`

	const hasSubscription = cartItems.some((obj) => obj.subscriptionPlan !== null)
	// https://docs.stripe.com/api/checkout/sessions/create
	const session = await stripe.checkout.sessions.create({
		ui_mode: "embedded",
		line_items,
		mode: hasSubscription ? "subscription" : "payment",
		return_url: returnUrl,
		...(email ? { customer_email: email } : {}),
		customer: user?.stripeCustomerId,
		metadata: {
			// typesof: ,
			customerId: user.id,
			// ...(itemType === "ticket"
			// 	? { eventId: props.cartItems.map((it) => it.event?.id).join(", ") }
			// 	: {}),
			orderId: null,
		},
    // https://docs.stripe.com/payments/checkout/free-trials
		...(hasSubscription
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

//* Line Item helpers
//* Line Item helpers
//* Line Item helpers
function createBookingLineItems(
	cartItem: CartItem
): Stripe.Checkout.SessionCreateParams.LineItem | undefined {
	if (!cartItem.booking) return undefined
	const { booking, quantity } = cartItem
	return {
		price_data: {
			// TODO make this part of CartItem schema item.currency, not hard coded
			currency: "usd",
			product_data: {
				name: booking.summary,
				images: [booking.service?.image || ""],
				metadata: {
					bookingId: booking.id,
					typeof: "booking",
				},
			},

			unit_amount: booking.price,
		},
		quantity,
	}
}

function createProductLineItem(
	cartItem: CartItem
): Stripe.Checkout.SessionCreateParams.LineItem | undefined {
	if (!cartItem.product) return undefined
	const { product, quantity } = cartItem
	return {
		quantity,
		// price: product.stripePriceId,
		...(product.stripePriceId
			? { price: product.stripePriceId }
			: {
					price_data: {
						// TODO make this part of CartItem schema item.currency, not hard coded
						currency: "usd",
						product_data: {
							name: product.name,
							images: [product?.image || ""],
							metadata: {
								productId: product.id,
								typeof: "product",
							},
						},

						unit_amount: product.price,
					},
			  }),
	}
}

function createSubscriptionLineItem(
	cartItem: CartItem
): Stripe.Checkout.SessionCreateParams.LineItem | undefined {
	if (!cartItem.subscriptionPlan) return undefined
	const { subscriptionPlan, quantity } = cartItem
	return {
		quantity,
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

function createTicketLineItem(
	cartItem: CartItem,
	user?: User
): Stripe.Checkout.SessionCreateParams.LineItem | undefined {
	if (!cartItem.event) return undefined
	const { event, quantity } = cartItem
	return {
		price_data: {
			// TODO make this part of CartItem schema item.currency, not hard coded
			currency: "usd",
			product_data: {
				name: `Ticket to ${event.summary} (x${quantity})`,
				images: [event?.image || ""],
				metadata: {
					eventId: event.id,
					typeof: "ticket",
					holderId: user?.id || "anonymous",
				},
			},

			unit_amount: event.price,
		},
		quantity,
	}
}
//! creating seperate line item per ticket is a bit too complicated
// function createTicketLineItems(cartItems: CartItem[], user?: User) {
// 	return cartItems.flatMap(({ event, quantity }) => {
// 		if (!event) return []
// 		return Array.from(
// 			{ length: quantity },
// 			(_, i: number): Stripe.Checkout.SessionCreateParams.LineItem => {
// 				return {
// 					price_data: {
// 						// TODO make this part of CartItem schema item.currency, not hard coded
// 						currency: "usd",
// 						product_data: {
// 							name: `Ticket to ${event.summary} (${i + 1} of ${quantity})`,
// 							images: [event?.image || ""],
// 							metadata: {
// 								eventId: event.id,
// 								ticketIndex: `${i + 1} of ${quantity}`,
// 								typeof: "ticket",
// 								holderId: user?.id || "anonymous",
// 							},
// 						},

// 						unit_amount: event.price,
// 					},
// 					quantity: 1,
// 				}
// 			}
// 		)
// 	})
// }

//! moving to single item creator
// function createProductLineItems(cartItems: CartItem[]) {
// 	return cartItems.flatMap(
// 		({ product, quantity }): Stripe.Checkout.SessionCreateParams.LineItem[] => {
// 			if (!product) return []
// 			return [
// 				{
// 					price_data: {
// 						// TODO make this part of CartItem schema item.currency, not hard coded
// 						currency: "usd",
// 						product_data: {
// 							name: product.name,
// 							images: [product?.image || ""],
// 							metadata: {
// 								productId: product.id,
// 								typeof: "product",
// 							},
// 						},

// 						unit_amount: product.price,
// 					},
// 					quantity,
// 				},
// 			]
// 		}
// 	)
// }
