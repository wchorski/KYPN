// cred - https://stackoverflow.com/questions/71352151/how-to-access-items-metadata-in-stripe-checkout-session/71352601#71352601
import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { checkout } from "@ks/mutations/checkout"
import { getServerSession } from "next-auth"
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

		case "invoice.payment_failed":
			// The payment failed or the customer does not have a valid payment method.
			// The subscription becomes past_due. Notify your customer and send them to the
			// customer portal to update their payment information.
			// console.log(JSON.stringify(event.data.object, null, 2))

			// afterFailure(event.data.object as Charge, event.data.object.metadata?.type)
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

		default:
			// other events that we don't handle
			break
	}

	//? old forget about it
	//? is there some easier way to do this? where did i get this block?
	// const stripeCheckoutSessionId = searchParams.get("stripeCheckoutSessionId")
	// if (!stripeCheckoutSessionId?.length) return redirect("/shop")
	// const session = await stripe.checkout.sessions.retrieve(
	// 	stripeCheckoutSessionId
	// )
	// console.log({session});

	// if (session.status === "complete") {
	// 	// Go to a success page!

	// 	// TODO if no errors then create Order with KS
	// 	// TODO convert line_items for stripe to KS OrderItems type
	// 	// const order = await keystoneContext.db.Order.createOne({})
	//   console.log('### Stripe COMPLETED ###');
	//   console.log({session});
	//   console.log('### CREATE ORDER AND TICKETS IN KS');
	// 	return redirect(`/checkout/completed`)
	// }

	// if (session.status === "open") {
	// 	// Here you'll likely want to head back to some pre-payment page in your checkout
	// 	// so the user can try again
	// 	return redirect(`/checkout?stripeStatus=open`)
	// }

	NextResponse.json(
		{ recieved: true, message: "stripe integration is connected" },
		{ status: 200 }
	)
	return redirect("/shop")
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
	//@ts-ignore
	const checkoutSession: WithMetadata = await stripe.checkout.sessions
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

	// TODO add to Database!!! because we were successful
	// will need to account for different item types Ticket,Product,Subscription

	const data = (await keystoneContext
		.withSession({
			stripeSession: {
				payment_status: checkoutSession.payment_status,
				id: checkoutSession.id,
				payment_intent: checkoutSession.payment_intent,
				customerId: checkoutSession.metadata.customerId,
        amount_total: checkoutSession.amount_total
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

	console.log("### stripe webhook. checkoutTickets mutation data")
	console.log("🐸🐸🐸 Remove items from CART 🐸🐸🐸")
	console.log({ data })
	if (data.checkout.status === "PAYMENT_RECIEVED") {
	}

	// return {
	//   checkout: data.checkout
	// }

	// switch (checkoutSession.metadata.typeof) {
	// 	case "ticket":
	// 		//? could send stripe session to mutation if tyring to verify
	// 		// const data = (await keystoneContext.withSession({stripeMetaCustomerId: session.metadata?.customerId}).graphql.run({
	// 		const data = (await keystoneContext
	// 			.withSession({
	// 				stripeSession: {
	// 					payment_status: checkoutSession.payment_status,
	// 					id: checkoutSession.id,
	// 					payment_intent: checkoutSession.payment_intent,
	// 				},
	// 			})
	// 			.graphql.run({
	// 				query: `
	//         mutation CheckoutTickets($eventId: String!, $customerEmail: String!, $quantity: Int!,  $userId: String!) {
	//           checkoutTickets(eventId: $eventId, customerEmail: $customerEmail, quantity: $quantity, userId: $userId) {
	//             id
	//             status
	//           }
	//         }
	//       `,
	// 				variables: {
	// 					//? moved them to `.withSession()`
	// 					// stripeCheckoutSessionId
	// 					// stripePaymentIntent
	// 					eventId: checkoutSession.metadata.eventId,
	// 					userId: checkoutSession.metadata.customerId,
	// 					quantity: lineItems.length,
	// 					customerEmail:
	// 						checkoutSession.customer_email ||
	// 						checkoutSession.customer_details?.email ||
	// 						"anonymous",
	// 				},
	// 			})) as { checkoutTickets: { id: string; status: string } }

	// 		break

	// 	// case "product":
	// 	// 	break

	// 	default:
	// 		break
	// }
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
	)
