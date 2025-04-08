// cred - https://stackoverflow.com/questions/71352151/how-to-access-items-metadata-in-stripe-checkout-session/71352601#71352601
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"

import type {
	OrderItemRelateToManyForCreateInput,
	SubscriptionItemCreateInput,
} from ".keystone/types"
import { stripeSubscriptionUpdate } from "@lib/stripe"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { SubscriptionItem, User } from "@ks/types"

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")
const stripe = new Stripe(envs.STRIPE_SECRET)

// run in CLI for dev
// stripe listen --forward-to http://localhost:3000/api/checkout/webhook

export const GET = async (request: NextRequest) => {
	return NextResponse.json({ message: "Stripe integration" }, { status: 200 })
}

export const POST = async (request: NextRequest) => {
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
			break

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

		// case "invoice.created":
		// 	break
		// case "invoice.updated":
		// 	break
		// case "invoice.finalized":
		// case "invoiceitem.created":
		// 	break
		case "invoice.payment_succeeded":
			console.log(
				"🐸 handle subscription payment success. create orderItem & Order"
			)
			await createSubscriptionOrder({
				stripeInvoice: stripePayload.data.object,
			})
			break
		case "invoice.payment_failed":
			console.log(
				"🐸 handle subscription payment failure. mark sub as delinquent"
			)
			await updateSubscriptionDelinquent(stripePayload.data.object)
			break

		// case "payment_intent.created":
		// 	break

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
		//? handled with `checkout.session.completed`
		// case "customer.subscription.created":
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
			break
		case "customer.subscription.deleted":
			console.log("🐸 customer.subscription.deleted")
			// TODO is it possible to update KS database if subscription is edited from stripe?
			// console.log(JSON.stringify(stripePayload.data.object, null, 2))
			break
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

async function updateSubscriptionDelinquent(stripeInvoice: Stripe.Invoice) {
	console.log({ stripeInvoice })
	const { subscription } = stripeInvoice
	if (!subscription)
		return console.log("### 💳 stripe-wh no subscription on this invoice")
	const subCount = await keystoneContext.sudo().db.SubscriptionItem.count({
		where: {
			stripeSubscriptionId: { equals: subscription as string },
		},
	})
	if (subCount === 0) {
		return console.log(
			`subscription not found. stripeSubscriptionId: ${subscription} `
		)
	}

	await keystoneContext.sudo().db.SubscriptionItem.updateOne({
		where: { stripeSubscriptionId: subscription as string },
		data: {
			status: "DELINQUENT",
		},
	})
}

type CreateSubscriptionOrder = {
	stripeInvoice?: Stripe.Invoice
	stripeCheckoutSesh?: Stripe.Checkout.Session
	createdsubscriptionItems?: SubscriptionItem[]
}

// TODO kind of a mess just to create an order of a subsription.
// All this logic because `invoice.payment_succeeded` triggers before `checkout.session.completed`
async function createSubscriptionOrder({
	stripeInvoice,
	stripeCheckoutSesh,
	createdsubscriptionItems,
}: CreateSubscriptionOrder) {
	// console.log(stripePayload.data.object)

	if (stripeInvoice) {
		console.log({ stripeInvoice })
		const {
			id,
			subscription,
			payment_intent,
			customer,
			total,
			subtotal,
			status,
			// metadata,
		} = stripeInvoice
		console.log({ total, subtotal })

		if (subscription) {
			const subCount = await keystoneContext.sudo().db.SubscriptionItem.count({
				where: {
					stripeSubscriptionId: { equals: subscription as string },
				},
			})
			if (subCount === 0)
				return console.log(
					`### First time created subscription. does not exist in db yet. stripeSubscriptionId: ${subscription}`
				)
			console.log(
				`### 💳 now for real invoice (sub renewal) after first purchase. stripeSubscriptionId: ${subscription}`
			)

			// console.log({ id, subscription, customer })

			const orderItems = {
				create: [
					{
						quantity: 1,
						subTotal: subtotal,
						type: "SUBSCRIPTION",
						subscriptionItem: {
							connect: {
								stripeSubscriptionId: subscription as string,
							},
						},
					},
				],
			} as OrderItemRelateToManyForCreateInput

			await keystoneContext.sudo().db.Order.createOne({
				data: {
					stripePaymentIntent: payment_intent as string,
					...(id ? { stripeInvoiceId: id } : {}),
					status: status === "paid" ? "PAYMENT_RECIEVED" : "PROCESSING",
					user: { connect: { stripeCustomerId: customer as string } },
					// stripeCheckoutSessionId: // this isn't a checkout session
					items: orderItems,
					fees: 0,
				},
			})
		}
	}

	if (stripeCheckoutSesh && createdsubscriptionItems) {
		console.log({ stripeCheckoutSesh })
		console.log({ createdsubscriptionItems })

		const {
			id,
			subscription,
			payment_intent,
			customer,
			amount_total,
			amount_subtotal,
			status,
			invoice,
			discounts,
		} = stripeCheckoutSesh

		console.log({ amount_total, amount_subtotal })

		// console.log({ stripeCheckoutSesh })
		// console.log({ invoice, subscription, customer })
		if (subscription) {
			// TODO is this count check necessary here after checkout sesh?
			const subCount = await keystoneContext.sudo().db.SubscriptionItem.count({
				where: {
					stripeSubscriptionId: { equals: subscription as string },
				},
			})
			if (subCount === 0)
				return console.log(
					`### First time created subscription. does not exist in db yet. stripeSubscriptionId: ${subscription}`
				)

			// TODO ADD COUPON
			console.log({ discounts })
			console.log("🐸 ADD COUPON as ORDERITEM")
			const coupon = await keystoneContext.sudo().db.Coupon.findOne({
				// @ts-ignore
				where: { code: String(discounts[0].coupon) || "no_coupon" },
			})

			// console.log({ coupon })

			const orderItems = {
				create: [
					...(coupon
						? [
								{
									quantity: 1,
									//? required
									subTotal: 0,
									type: "DISCOUNT",
									...(coupon.amount_off
										? { amount_off: coupon.amount_off }
										: {}),
									...(coupon.percent_off
										? { percent_off: coupon.percent_off }
										: {}),

									coupon: {
										connect: {
											id: coupon.id,
										},
									},
								},
						  ]
						: []),
					...createdsubscriptionItems.map((subItem) => ({
						quantity: 1,
						subTotal: amount_subtotal,
						type: "SUBSCRIPTION",

						subscriptionItem: {
							connect: {
								stripeSubscriptionId: subItem.stripeSubscriptionId,
							},
						},
					})),
				],
			} as OrderItemRelateToManyForCreateInput

			await keystoneContext.sudo().db.Order.createOne({
				data: {
					...(payment_intent
						? { stripePaymentIntent: payment_intent as string }
						: {}),
					...(invoice ? { stripeInvoiceId: invoice as string } : {}),
					...(id ? { stripeCheckoutSessionId: id } : {}),
					status: status === "complete" ? "PAYMENT_RECIEVED" : "PROCESSING",
					user: { connect: { stripeCustomerId: customer as string } },
					items: orderItems,
					fees: 0,
				},
			})
		}
	}
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
	checkoutSession: Stripe.Checkout.Session
) {
	const {
		id: csId,
		metadata,
		// amount_total,
		subscription,
		// payment_status,
		// total_details,
		//@ts-ignore
		discounts,
		customer,
	} = checkoutSession as Stripe.Checkout.Session & SubscriptionMetadata

	const couponCode =
		//@ts-ignore
		(discounts[0]?.coupon as string) || metadata.couponCode || undefined

	const stripeSubscription = await stripe.subscriptions.retrieve(
		String(subscription)
	)
	const { id: subId, status, trial_end, items } = stripeSubscription
	console.log(`🐸 insert checkout session id to Order ${csId}`)
	if (items) {
		const data: SubscriptionItemCreateInput[] = await Promise.all(
			items.data.map(async (item) => ({
				stripeSubscriptionId: subId,
				stripeSubscriptionItemId: item.id,
				//? this is set in subscriptionItem billing_interval resolveInput field hook
				// billing_interval: sub.plan.interval,
				subscriptionPlan: {
					connect: {
						// TODO use stripeProductId instead?
						id: await findSubscriptionPlanId(
							item.price?.id,
							metadata.subscriptionPlanId
						),
					},
				},
				user: {
					connect: {
						id: await findUserId(customer?.toString(), metadata.customerId),
					},
				},
				status: ![
					"incomplete",
					"incomplete_expired",
					"past_due",
					"canceled",
					"unpaid",
					"paused",
				].includes(status)
					? "ACTIVE"
					: status === "paused"
					? "PAUSED"
					: "REQUESTED",
				...(trial_end
					? {
							//? convert value from milliseconds to seconds
							trial_end: new Date(trial_end * 1000).toISOString(),
					  }
					: {}),
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
		const createdsubscriptionItems = (await keystoneContext
			.sudo()
			.db.SubscriptionItem.createMany({
				data,
			})) as SubscriptionItem[]

		await createSubscriptionOrder({
			stripeInvoice: undefined,
			stripeCheckoutSesh: checkoutSession,
			createdsubscriptionItems,
		})
		// await createSubscriptionOrder({
		// 	// id: invoice,
		// 	subscription,
		// 	payment_intent,
		// 	customer,
		// 	total: amount_total,
		// 	status,
		// }, createdsubscriptionItems)
	}
}

async function findSubscriptionPlanId(
	stripePriceId: string | undefined,
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

		await handleSubscriptionCreate(checkoutSession)
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
