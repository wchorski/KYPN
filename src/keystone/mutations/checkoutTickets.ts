// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from "@keystone-6/core"
import { Context, Lists, TicketCreateInput } from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { KeystoneContextFromListTypeInfo } from "@keystone-6/core/types"
import type { Event } from "../types"

type StripeSession = {
  payment_status:'paid'|'unpaid'
  id:string
  payment_intent: string
}

// TODO consolidate into one checkout mutation
// grab items from cart instead of doing all this song and dance with form input

export const checkoutTickets = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("Order"),

		args: {
      //TODO I'm sending over session instead. i think it's safer?
			// stripeCheckoutSessionId: graphql.arg({ type: graphql.String }),
			// stripePaymentIntent: graphql.arg({ type: graphql.String }),
			userId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			eventId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			customerEmail: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			quantity: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
		},

		async resolve(source, variables, context: Context) {
			//? Stripe Webhook validates payment success
			// TODO SECURITY!!!!!
			console.log(
				"### !!! SECURITY ISSUE. Is there a way to 'unit test' this?"
			)
			const sudoContext = context.sudo()
			const session = context.session
      const stripeSession:StripeSession = session.stripeSession

			// console.log(
			// 	"### checkoutTickets session::",
			// 	JSON.stringify(session, null, 2)
			// )
			// if (!session) throw new Error("checkoutTicket: No Session provided")

			const {
				// stripeCheckoutSessionId,
				// stripePaymentIntent,
				eventId,
				userId,
				quantity,
				customerEmail,
			} = variables

			// const user = await sudoContext.query.User.findOne({
			// 	where: { id: session.stripeMetaCustomerId || userId },
			// 	query: `
      //     role {
      //       id
      //     }
      //   `,
			// })
			// if (!user) throw new Error("checkoutTicket Error 🫥")
			// console.log({ user })

      // TODO this won't work for private events. session will be empty if coming from webhook
			const event = (await context.withSession(session).query.Event.findOne({
				where: { id: eventId },
				query: `
          id
          seats
          price
        `,
			})) as Event
			if (!event) throw new Error("No Event Found")

			const seatsTaken = await countAvailableSeats({
				context,
				eventId,
			})
			//? if (# of seats customer is requesting + already taken seats) is over event.seats max
			if (quantity + seatsTaken > event.seats)
				throw new Error(
					`Not enough seats available for event. ${
						event.seats - seatsTaken
					} seats left.`
				)

			// const stripeSession = await stripeTicketCheckout(event, quantity, stripeCustomerId)
			// if(stripeSession === 'failed') throw new Error('payment failed')

			//Create an order based on the cart item
			const ticketItems: TicketCreateInput[] = Array.from(
				{ length: quantity },
				(_, index) => ({
					event: { connect: { id: eventId } },
					holder: userId ? { connect: { id: userId } } : null,
					price: event.price,
					email: customerEmail,
				})
			)

			// TODO perform any coupons here
			const amountTotal = event.price * quantity

      // TODO catch any orders that may have backdoored and were not verified
			//? still create an order that has status = 'FAILED'
      //* nvm ALLOW unverified to buy, but don't allow them to retrieve ticket if not verified
			// if (user.role === null) {
			// 	const order = await sudoContext.db.Order.createOne({
			// 		// const order = await context.withSession(session).db.Order.createOne({
			// 		data: {
      //       total: amountTotal,
			// 			user: userId
			// 				? { connect: { id: session.stripeMetaCustomerId || userId } }
			// 				: null,
			// 			stripeCheckoutSessionId,
			// 			stripePaymentIntent,
			// 			email: customerEmail,
			// 			//TODO maybe not secure
			// 			...(stripeCheckoutSessionId ? { status: "FAILED" } : {}),
			// 		},
			// 	})
			// 	console.log("❌ order FAILEd, ", { order })

			// 	throw new Error(
			// 		"!!! User must verify their account to purchase tickets"
			// 	)

			// 	// return {
			// 	//   status: order.status,
			// 	//   id: order.id,
			// 	// }
			// }

			const order = await sudoContext.db.Order.createOne({
				// const order = await context.withSession(session).db.Order.createOne({
				data: {
					total: amountTotal,
					ticketItems: { create: ticketItems },
					user: userId ? { connect: { id: userId } } : null,
					stripeCheckoutSessionId: stripeSession.id || 'NO_STRIPE_PLUGIN',
					stripePaymentIntent: stripeSession.payment_intent || 'FREE or NO_STRIPE_PLUGIN',
					email: customerEmail,
					//TODO maybe not secure
					...(stripeSession.payment_status === 'paid' ? { status: "PAYMENT_RECIEVED" } : {}),
				},
			})
			// console.log("### ORDER CREATED, ", {order});

			const cartItemsToDelete = (await sudoContext.query.CartItem.findMany({
				where: { user: { id: { equals: userId } } },
				query: `id`,
			})) as { id: string }[]

			await sudoContext.db.CartItem.deleteMany({
				where: cartItemsToDelete,
			})

			//? email sent with Order afterOperation

			return {
				status: order.status,
				id: order.id,
			}
		},
	})

type CheckSeatsProps = {
	context: KeystoneContextFromListTypeInfo<Lists.Ticket.TypeInfo<any>>
	eventId: string
}

export async function countAvailableSeats({
	context,
	eventId,
}: CheckSeatsProps) {
	const seatsTaken = (await context.sudo().query.Ticket.count({
		where: {
			event: {
				id: {
					equals: eventId,
				},
			},
		},
	})) as number

	return seatsTaken
}

// TODO do i want to process stripe in mutation or with embeded form + webhook?
// async function stripeTicketCheckout(event: Event, quantity: number, stripeCustomerId:string) {

//   try {
//     const lineItems = Array.from({ length: quantity }, (item, i) => {
//       return {
//         price_data: {
//           // TODO make this part of CartItem schema item.currency, not hard coded
//           currency: "usd",
//           product_data: {
//             name: `Ticket to ${event.summary} (${i + 1} of ${quantity})`,
//             images: [event.image],
//             metadata: {
//               eventId: event.id,
//               ticketIndex: `${i + 1} of ${quantity}`,
//             },
//           },
//           unit_amount: event.price,
//         },
//         quantity: 1,
//       }
//     })

//     const stripeSession = await stripe.checkout.sessions.create({
//       // customer_email: email || 'anonymous',
//       customer: stripeCustomerId,
//       payment_method_types: ["card", ],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${envs.FRONTEND_URL}/account?dashState=tickets#tickets`,
//       cancel_url: `${envs.FRONTEND_URL}/events/${event.id}`,
//       metadata: {
//         type: 'checkout.tickets',
//         eventId: event.id,
//         quantity: quantity,
//       }
//     })
//   } catch (error) {
//     console.log('!!! stripe checkoutTicket: ', error);

//   }
// }
