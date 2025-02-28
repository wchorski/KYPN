// cred - https://stackoverflow.com/questions/71352151/how-to-access-items-metadata-in-stripe-checkout-session/71352601#71352601
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"

import type { SubscriptionItemCreateInput } from ".keystone/types"
import { stripeSubscriptionUpdate } from "@lib/stripe"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { User } from "@ks/types"

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

		//! does not included important metadata set by this app
		// case "customer.subscription.created":
		// 	//? handled with `checkout.session.completed`
		// 	console.log("🐸🐸🐸 customer.subscription.created")
		// 	handleSubscriptionCreate(stripePayload.data.object)
		// // if (!["trialing", "active"].includes(stripePayload.data.object.status))
		// // 	throw new Error(
		// // 		`!!! 💳❌ stripe subscription not "trialing" or "active": ${stripePayload.data.object.id} ${stripePayload.data.object.status}`
		// // 	)
		// // handleSubscriptionCreate(stripePayload.data.object)

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

type SubscriptionMetadata = {
	metadata: {
		couponCode: string
		customerId: string
		customerEmail: string
		subscriptionPlanId: string
	}
}

async function handleSubscriptionCreate(
	checkoutSession: Stripe.Checkout.Session,
	lineItems: Stripe.LineItem[]
) {
	const {
		id,
		metadata,
		// amount_total,
		subscription,
		// payment_status,
		// total_details,
    //@ts-ignore
    discounts,
		customer,
	} = checkoutSession as Stripe.Checkout.Session & SubscriptionMetadata

	const couponCode = discounts[0].coupon as string || metadata.couponCode
	// console.log(JSON.stringify({ items }, null, 2))
	const stripeSubscription = await stripe.subscriptions.retrieve(
		String(subscription)
	)
	const status = stripeSubscription.status
	if (lineItems) {
		const data: SubscriptionItemCreateInput[] = await Promise.all(
			lineItems.map(async (item) => ({
				stripeSubscriptionId: id,
				stripeSubscriptionItemId: String(subscription),
				//? this is set in subscriptionItem billing_interval resolveInput field hook
				// billing_interval: sub.plan.interval,
				subscriptionPlan: {
					connect: {
						id: await findSubscriptionPlanId(
							item.price?.id,
							metadata.subscriptionPlanId,
						),
					},
				},
				user: {
					connect: {
						id: await findUserId(customer?.toString(), metadata.customerId),
					},
				},
				status:
					status === "trialing"
						? "TRIAL"
						: status === "active"
						? "ACTIVE"
						: "REQUESTED",
				...(couponCode
					? {
							coupon: {
								connect: { code: couponCode },
							},
					  }
					: {}),
			}))
		)

		// TODO is it safe to do sudo here? should i create a seperate mutation?
		const createdsubscriptionItems = await keystoneContext
			.sudo()
			.db.SubscriptionItem.createMany({
				data,
			})
	}
}

// async function handleSubscriptionCreate(
// 	stripeSubscription: Stripe.Subscription
// ) {
// 	const {
// 		// cancel_at,
// 		// cancel_at_period_end,
// 		// collection_method,
// 		// customer,
// 		// discounts,
// 		// discount,
// 		// latest_invoice,
// 		// trial_start,
// 		// trial_end,
// 		id,
// 		customer,

// 		status,
// 		items,
// 		metadata,
// 		discounts,
// 	} = stripeSubscription as Stripe.Subscription & SubscriptionMetadata
// 	console.log("stripeSubscription")
// 	console.log(JSON.stringify({ stripeSubscription }, null, 2))
// 	console.log({ id, status, metadata })
// 	// console.log(JSON.stringify({ items }, null, 2))
// 	if (items.object === "list") {
// 		const data: SubscriptionItemCreateInput[] = await Promise.all(
// 			items.data.map(async (sub) => ({
// 				stripeSubscriptionId: id,
// 				stripeSubscriptionItemId: sub.id,
// 				billing_interval: sub.plan.interval,
// 				subscriptionPlan: {
// 					connect: { id: await findSubscriptionPlanId(sub.plan.id) },
// 				},
// 				user: {
// 					connect: {
// 						id: await findUserId(customer.toString(), metadata.customerId),
// 					},
// 				},
// 				status:
// 					status === "trialing"
// 						? "TRIAL"
// 						: status === "active"
// 						? "ACTIVE"
// 						: "REQUESTED",
// 				...(discounts[0]
// 					? {
// 							coupon: {
// 								connect: { id: await findCouponId(discounts[0].toString()) },
// 							},
// 					  }
// 					: {}),
// 			}))
// 		)

// 		// TODO is it safe to do sudo here? should i create a seperate mutation?
// 		const createdsubscriptionItems = await keystoneContext
// 			.sudo()
// 			.db.SubscriptionItem.createMany({
// 				data,
// 			})

// 		console.log({ createdsubscriptionItems })
// 	}
// }

async function findSubscriptionPlanId(
	stripePriceId: string|undefined,
	subscriptionPlanId: string
) {
	
	if (subscriptionPlanId) return subscriptionPlanId
	try {
		const subPlans = await keystoneContext.sudo().db.SubscriptionPlan.findMany({
			where: {
				stripePriceId: {
					equals: stripePriceId,
				},
			},
		})

		if (!subPlans[0].id || subPlans.length > 1)
			throw new Error(
				`!!! subscriptionPlan not found with stripePriceId:: ${stripePriceId}`
			)
		//? schema field validation should not allow multiple items in this array
		return subPlans[0].id
	} catch (error) {
		console.log("!!! find error:: ", error)
	}
}
// async function findCouponId(stripeId: string) {
// 	console.log(`findCouponId id ${stripeId}`)
// 	const coupons = await keystoneContext.sudo().db.Coupon.findMany({
// 		where: {
// 			stripeId: {
// 				equals: stripeId,
// 			},
// 		},
// 	})
// 	console.log({ coupons })
// 	if (!coupons[0].id)
// 		throw new Error(`!!! Coupon not found with stripeId:: ${stripeId}`)
// 	//? schema field validation should not allow multiple items in this array
// 	return coupons[0].id
// }
async function findUserId(stripeCustomerId?: string, customerId?: string) {
	console.log({ stripeCustomerId, customerId })
	//? go off of native user id, and if not set in metadata, then use stripe customer id
	if (customerId) return customerId
	const users = await keystoneContext.sudo().db.User.findMany({
		where: {
			stripeCustomerId: {
				equals: stripeCustomerId,
			},
		},
	})
	
	if (!users[0].id || users.length > 1)
		throw new Error(
			`!!! User not found with stripeCustomerId:: ${stripeCustomerId}`
		)
	//? schema field validation should not allow multiple items in this array
	return users[0].id

	//? thought I had to be clever w email search, but can just use metadata
	// } else if (email) {
	// 	const data = (await keystoneContext.sudo().graphql.run({
	// 		query: `
	//       query Query($where: UserWhereInput!) {
	//         users(where: $where)
	//       }
	//     `,
	// 		variables: {
	// 			where: {
	// 				email: {
	// 					equals: email,
	// 					mode: "insensitive",
	// 				},
	// 			},
	// 		},
	// 	})) as { users: User[] }

	// 	if (data.users.length > 1 || !data.users[0].id)
	// 		throw Error(`!!! User not found with email:: ${email}`)

	// 	return data.users[0].id
	// } else {
	// 	throw new Error("!!! no stripe ID or email provided")
	// }
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
	// console.log("webhook handleSuccessfulCheckout session::: ", { session })
	// TODO do i need to refetch the session? don't i already have all the data avail from the session?
	const checkoutSession = session
	// const checkoutSession = await stripe.checkout.sessions
	// 	.retrieve(session.id, {
	// 		// expand: ["line_items"],
	// 	})
	// 	.catch((error) => {
	// 		throw new Error(error)
	// 	})

	const lineItemsObj = await stripe.checkout.sessions
		.listLineItems(session.id, {
			expand: ["data.price.product"],
		})
		.catch((error) => {
			throw new Error(error)
		})
	const lineItems = lineItemsObj.data

	// if (!checkoutSession || lineItems.length === 0)
	// 	throw new Error("!!! No checkout session or line items")

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

		const sub = await handleSubscriptionCreate(checkoutSession, lineItems)
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
