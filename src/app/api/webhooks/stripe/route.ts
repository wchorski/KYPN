// cred - https://stackoverflow.com/questions/71352151/how-to-access-items-metadata-in-stripe-checkout-session/71352601#71352601
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { stripeSubscriptionUpdate } from "@lib/stripe"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")
const stripe = new Stripe(envs.STRIPE_SECRET)

// run in CLI for dev
// stripe listen --forward-to http://localhost:3000/api/checkout/webhook

export const POST = async (request: NextRequest, response: NextResponse) => {
	// const { searchParams } = new URL(request.url)
	if (!envs.STRIPE_WEBHOOK_SECRET || !envs.STRIPE_PUBLIC_KEY)
		return NextResponse.json(
			{ message: "Stripe integration is not setup", recieved: false },
			{ status: 500 }
		)

	const payload = await request.text()
	const signature = request.headers.get("stripe-signature") as string
	// console.log({signature});
	// console.log({searchParams});

	// let event: Stripe.Event | null = null;
	const stripePayload = stripe.webhooks.constructEvent(
		payload,
		signature!,
		envs.STRIPE_WEBHOOK_SECRET
	)
	console.log("💳 STRIPE WEBHOOK: ", stripePayload?.type)

	switch (stripePayload?.type) {
		case "checkout.session.completed":
			// console.log('💳 : stripePayload.data.object ', JSON.stringify(stripePayload.data.object, null, 2))
			console.log("💳 Item type: ", stripePayload.data.object.metadata?.typeof)
			// TODO checkoutSession.payment_status === "unpaid",
			//? free items are marked as "paid"
			if (stripePayload.data.object.payment_status !== "paid")
				throw new Error(
					`!!! 💳❌ stripe payment not recieved: ${stripePayload.data.object.id} ${stripePayload.data.object.payment_intent}`
				)

			handleSuccessfulCheckout(stripePayload.data.object)

		case "payment_intent.canceled":
			// handle other type of stripe events
			break

		case "charge.updated":
			//TODO add back orderId from ks
			break

		case "invoice.paid":
			// Continue to provision the subscription as payments continue to be made.
			// Store the status in your database and check when a user accesses your service.
			// This approach helps you avoid hitting rate limits.
			break

		case "invoice.created":
			break
		case "invoice.updated":
			break
		case "invoice.finalized":
			break
		case "invoice.payment_succeeded":
			break
		case "invoiceitem.created":
			break

		case "invoice.payment_failed":
			// The payment failed or the customer does not have a valid payment method.
			// The subscription becomes past_due. Notify your customer and send them to the
			// customer portal to update their payment information.
			// console.log(JSON.stringify(event.data.object, null, 2))

			// afterFailure(event.data.object as Charge, event.data.object.metadata?.type)
			break
		case "payment_intent.created":
			break

		case "product.created":
			console.log("🐸 product.created")
			break

		case "price.created":
			console.log("🐸 price.created")
			// JSON.stringify(stripePayload.data, null, 2)
			break

		case "product.updated":
			console.log("🐸 product.updated")
			// JSON.stringify(stripePayload.data, null, 2)
			break

		case "customer.subscription.created":
			//? handled with `checkout.session.completed`
			console.log("🐸🐸🐸 customer.subscription.created")
			handleSubscriptionCreate(stripePayload.data.object)
		// if (!["trialing", "active"].includes(stripePayload.data.object.status))
		// 	throw new Error(
		// 		`!!! 💳❌ stripe subscription not "trialing" or "active": ${stripePayload.data.object.id} ${stripePayload.data.object.status}`
		// 	)
		// handleSubscriptionCreate(stripePayload.data.object)

		case "customer.subscription.updated":
			console.log("🐸 customer.subscription.created")
		// TODO is it possible to update KS database if subscription is edited from stripe?
		// console.log(JSON.stringify(stripePayload.data.object, null, 2))

		case "customer.subscription.deleted":
			console.log("🐸 customer.subscription.deleted")
		// TODO is it possible to update KS database if subscription is edited from stripe?
		// console.log(JSON.stringify(stripePayload.data.object, null, 2))
		case "customer.discount.created":
			break
		case "customer.subscription.trial_will_end":
			break

		default:
			// other events that we don't handle
			break
	}

	NextResponse.json(
		{ recieved: true, message: "stripe integration is connected" },
		{ status: 200 }
	)
	return redirect("/shop")
}

// async function handleSubscriptionCreate(subscription: Stripe.Subscription) {
// 	console.log("webhook handleSubscriptionCreate session::: ", { session: subscription })

// 	if (!subscription)
// 		throw new Error("!!! No stripe subscription")

// 	if (!subscription.metadata?.customerId)
// 		throw new Error("!!! ❌ stripe did not have customerId in metadata")

// 	if (!subscription.metadata?.subscriptionPlanId)
// 		throw new Error("!!! ❌ stripe did not have subscriptionPlanId in metadata")

// 	const data = (await keystoneContext
// 		.withSession({
// 			session: {
// 				itemId: subscription.metadata.customerId,
// 			},
// 			stripe: {
// 				payment_status: subscription.payment_status,
// 				id: subscription.id,
// 				payment_intent: subscription.payment_intent,
// 				customerId: subscription.metadata.customerId,
// 				amount_total: subscription.amount_total,
// 				subscriptionId: subscription.subscription,
// 				rentalId: subscription.metadata.rentalId,
// 			},
// 		})
// 		.graphql.run({
// 			query: `
//         mutation CheckoutSubscription {
//           checkoutSubscription {
//             id
//             status
//           }
//         }
//       `,
// 			variables: {
// 				subscriptionPlanId: checkoutSession.metadata.subscriptionPlanId,
// 				addonIds: [],
// 				couponIds: [],
// 			},
// 		})) as { checkoutSubscription: { id: string; status: string } }

// 	return {
// 		checkout: data.checkoutSubscription,
// 	}
// }

type SubscriptionMetadata = {
	metadata: {
		couponId: string
		customerId: string
	}
	items: {
		data: {
			metadata: {
				subscriptionPlanId: string
			}
		}[]
	}
}

async function handleSubscriptionCreate(
	stripeSubscription: Stripe.Subscription
) {
	const {
		// cancel_at,
		// cancel_at_period_end,
		// collection_method,
		// customer,
		// discounts,
		// discount,
		// latest_invoice,
		// trial_start,
		// trial_end,
		id,
		status,
		items,
		metadata,
	} = stripeSubscription as Stripe.Subscription & SubscriptionMetadata
	console.log("stripeSubscription")
	console.log({ id, status, items, metadata })
	if (items.object === "list") {
		// TODO is it safe to do sudo here? should i create a seperate mutation?
		const createdsubscriptionItems = await keystoneContext
			.sudo()
			.db.SubscriptionItem.createMany({
				data: items.data.map((sub) => ({
					stripeSubscriptionId: id,
					stripeSubscriptionItemId: sub.id,
					billing_interval: sub.plan.interval,
					subscriptionPlan: {
						connect: { stripeProductId: sub.plan.id },
					},
					user: { connect: { id: metadata.customerId } },
					status:
						status === "trialing"
							? "TRIAL"
							: status === "active"
							? "ACTIVE"
							: "REQUESTED",
					...(metadata.couponId
						? {
								coupon: { connect: { id: metadata.couponId } },
						  }
						: {}),
				})),
			})

		console.log({ createdsubscriptionItems })
	}
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
	// console.log("webhook handleSuccessfulCheckout session::: ", { session })
	const checkoutSession = await stripe.checkout.sessions
		.retrieve(session.id, {
			// expand: ["line_items"],
		})
		.catch((error) => {
			throw new Error(error)
		})

	const lineItemsObj = await stripe.checkout.sessions
		.listLineItems(session.id, {
			expand: ["data.price.product"],
		})
		.catch((error) => {
			throw new Error(error)
		})
	const lineItems = lineItemsObj.data

	if (!checkoutSession || lineItems.length === 0)
		throw new Error("!!! No checkout session or line items")

	if (!checkoutSession.metadata?.customerId)
		throw new Error("!!! ❌ stripe did not have customerId in metadata")
	// if (!checkoutSession.metadata?.typeof)
	// 	throw new Error("!!! ❌ stripe did not have typeof in metadata")
	if (checkoutSession.mode === "payment") {
		const data = (await keystoneContext
			.withSession({
				session: {
					itemId: checkoutSession.metadata.customerId,
				},
				stripe: {
					payment_status: checkoutSession.payment_status,
					id: checkoutSession.id,
					payment_intent: checkoutSession.payment_intent,
					customerId: checkoutSession.metadata.customerId,
					amount_total: checkoutSession.amount_total,
					subscriptionId: checkoutSession.subscription,
					rentalId: checkoutSession.metadata.rentalId,
				},
			})
			.graphql.run({
				query: `
        mutation Checkout {
          checkout {
            id
            status
          }
        }
      `,
				// variables: values,
			})) as { checkout: { id: string; status: string } }

		return {
			checkout: data.checkout,
		}
	} else if (checkoutSession.mode === "subscription") {
		console.log('🐸🐸🐸 checkoutSession.mode === "subscription"')
		const { id, metadata, amount_total, subscription, payment_status } =
			checkoutSession
		console.log({ id, metadata, amount_total, subscription, payment_status })
		// const data = (await keystoneContext
		// 	.withSession({
		// 		session: {
		// 			itemId: checkoutSession.metadata.customerId,
		// 		},
		// 		stripe: {
		// 			payment_status: checkoutSession.payment_status,
		// 			id: checkoutSession.id,
		// 			payment_intent: checkoutSession.payment_intent,
		// 			customerId: checkoutSession.metadata.customerId,
		// 			amount_total: checkoutSession.amount_total,
		// 			subscriptionId: checkoutSession.subscription,
		// 			rentalId: checkoutSession.metadata.rentalId,
		// 		},
		// 	})
		// 	.graphql.run({
		// 		query: `
		//       mutation CheckoutSubscription($subscriptionPlanId: String!, $addonIds: [String], $couponIds: [String]) {
		//         checkoutSubscription(subscriptionPlanId: $subscriptionPlanId, addonIds: $addonIds, couponIds: $couponIds) {
		//           id
		//           status
		//         }
		//       }
		//     `,
		// 		variables: {
		// 			subscriptionPlanId: checkoutSession.metadata.subscriptionPlanId,
		// 			addonIds: [],
		// 			couponIds: [],
		// 		},
		// 	})) as { checkoutSubscription: { id: string; status: string } }

		// return {
		// 	checkout: data.checkoutSubscription,
		// }
	} else if (checkoutSession.mode === "setup") {
		console.log('🐸🐸🐸 checkoutSession.mode === "setup"')
	}
}

type WithMetadata = Stripe.Checkout.Session &
	(
		| {
				metadata: {
					typeof: "ticket"
					eventId: string
					customerId: string
					orderId: string
				}
		  }
		| {
				metadata: {
					typeof: "product"
					orderId: string
					customerId: string
				}
		  }
		| {
				metadata: {
					typeof: "subscriptionPlan"
					subscriptionPlanId: string
					orderId: string
					customerId: string
				}
		  }
		| {
				metadata: {
					typeof: "subscription-item"
					subscriptionPlanId: string
					orderId: string
					customerId: string
				}
		  }
	)
