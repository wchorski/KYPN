// cred - https://stackoverflow.com/questions/71352151/how-to-access-items-metadata-in-stripe-checkout-session/71352601#71352601
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")
const stripe = new Stripe(envs.STRIPE_SECRET)

// run in CLI for dev
// stripe listen --forward-to http://localhost:3000/api/checkout/webhook

export const POST = async (request: NextRequest, response: NextResponse) => {
	const { searchParams } = new URL(request.url)

	console.log("### stripe webhook checkout session ###")
	console.log("### stripe webhook checkout session ###")
	console.log("### stripe webhook checkout session ###")
	const payload = await request.text()
	const signature = request.headers.get("stripe-signature") as string
	// console.log({payload});
	// console.log({signature});
	// console.log({searchParams});

	console.log("### stripe webhook checkout session ###")
	// let event: Stripe.Event | null = null;
	const stripePayload = stripe.webhooks.constructEvent(
		payload,
		signature!,
		envs.STRIPE_WEBHOOK_SECRET as string
	)
	console.log("💳 STRIPE WEBHOOK: ", stripePayload?.type)

	switch (stripePayload?.type) {
		case "checkout.session.completed":
			// console.log('💳 : stripePayload.data.object ', JSON.stringify(stripePayload.data.object, null, 2))
			console.log("💳 Item type: ", stripePayload.data.object.metadata?.typeof)

			handleSuccessfulCheckout(stripePayload.data.object)

		case "payment_intent.canceled":
			// handle other type of stripe events
			break

		case "charge.updated":
			//TODO add back orderId from ks
			break

		case "product.updated":
			// handle other type of stripe events
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
	// console.log("### lineItems")
	// console.log(JSON.stringify(lineItems, null, 2))
	// TODO add to Database!!! because we were successful
	// will need to account for different item types Ticket,Product,Subscription

	if (!checkoutSession.metadata?.typeof)
		throw new Error("!!! ❌ stripe did not have typeof in metadata")

	// console.log("### 🛒 checkoutSession FULL")
	// console.log(JSON.stringify(checkoutSession, null, 2))
  // TODO checkoutSession.payment_status === "unpaid",
  if(checkoutSession.payment_status !== "paid") throw new Error('!!! 💳❌ stripe payment not recieved')

	switch (checkoutSession.metadata.typeof) {
		case "ticket":
			// Array(lineItems[i].id) = stripeLineItemIds ?
			// checkoutSession.id = stripeCheckoutSessionId
			const data = (await keystoneContext.graphql.run({
				query: `
          mutation CheckoutTickets($eventId: String!, $customerEmail: String!, $quantity: Int!, $stripeCheckoutSessionId: String, $userId: String!, $stripePaymentIntent: String) {
            checkoutTickets(eventId: $eventId, customerEmail: $customerEmail, quantity: $quantity, stripeCheckoutSessionId: $stripeCheckoutSessionId, userId: $userId, stripePaymentIntent: $stripePaymentIntent) {
              id
              status
            }
          }
        `,
				variables: {
					stripeCheckoutSessionId: checkoutSession.id,
					stripePaymentIntent: checkoutSession.payment_intent,
					eventId: checkoutSession.metadata.eventId,
					userId: checkoutSession.metadata.customerId,
					quantity: lineItems.length,
					customerEmail: checkoutSession.customer_email || checkoutSession.customer_details?.email || 'anonymous',
				},
			})) as { checkoutTickets: { id: string; status: string } }
			// console.log("### stripe webhook. checkoutTickets mutation data")
			// console.log({ data })
			break

		// case "product":
		// 	break

		default:
			break
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
	)
