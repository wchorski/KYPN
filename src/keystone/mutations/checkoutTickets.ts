// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from "@keystone-6/core"
// @ts-ignore
import { Context, Lists } from ".keystone/types"
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from "../../lib/stripe"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { KeystoneContextFromListTypeInfo } from "@keystone-6/core/types"
import type {Event} from '../types'
import stripe from "../../lib/stripe"
import { envs } from "../../../envs"

export const checkoutTickets = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("Ticket"),

		args: {
			// chargeId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			sessionId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			eventId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			customerEmail: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			quantity: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
			amount_total: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
		},

		async resolve(source, variables, context: Context) {
			const {
				// chargeId,
				eventId,
				sessionId,
				quantity,
				customerEmail,
				amount_total,
			} = variables
			//Query the current user
			const user = await context.query.User.findOne({
				where: { id: sessionId },
				query: `
          id
          name
          email
        `,
			})

			const event = await context.query.Event.findOne({
				where: { id: eventId },
				query: `
          id
          seats
          price
        `,
			}) as Event
			if (!event) throw new Error("No Event Found")

			const seatsTaken = await countAvailableSeats({
				context,
				eventId,
				quantity,
			})
			if (quantity + seatsTaken > event.seats)
				throw new Error(
					`Not enough seats available for event. ${
						event.seats - seatsTaken
					} seats left.`
				)

      await stripeTicketCheckout(event, quantity, stripeCustomerId)
      
			//Create an order based on the cart item
			const ticketItems = Array.from({ length: quantity }, (_, index) => ({
				event: { connect: { id: eventId } },
				holder: user ? { connect: { id: user.id } } : null,
				price: event.price,
				email: customerEmail,
				orderCount: `${index + 1} of ${quantity}`,
			}))

			const now = new Date()
			const order = await context.db.Order.createOne({
				data: {
					total: amount_total,
					ticketItems: { create: ticketItems },
					user: user ? { connect: { id: user.id } } : null,
					charge: chargeId,
					dateCreated: now.toISOString(),
				},
			})

			//Clean up! Delete all cart items
			// await context.db.CartItem.deleteMany({
			//   where: user.cart.map((cartItem: CartItem) => { return { id: cartItem.id } })
			// })

			// todo SEND EMAIL
			// mailCheckoutReceipt(
			//   order.id,
			//   [user.email, ADMIN_EMAIL_ADDRESS],
			//   user.name,
			//   ADMIN_EMAIL_ADDRESS,
			//   ticketItems,
			//   now.toISOString(),
			//   totalOrder,
			// )

			return {
				status: "success",
				message: "checkout tickets successful",
				order,
				id: order.id,
			}
		},
	})

type CheckSeatsProps = {
	context: KeystoneContextFromListTypeInfo<Lists.Ticket.TypeInfo<any>>
	eventId: string
	quantity: number
}

async function countAvailableSeats({
	context,
	eventId,
	quantity,
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

async function stripeTicketCheckout(event: Event, quantity: number, stripeCustomerId:string) {

  try {
    const lineItems = Array.from({ length: quantity }, (item, i) => {
      return {
        price_data: {
          // TODO make this part of CartItem schema item.currency, not hard coded
          currency: "usd",
          product_data: {
            name: `Ticket to ${event.summary} (${i + 1} of ${quantity})`,
            images: [event.image],
            metadata: {
              eventId: event.id,
              ticketIndex: `${i + 1} of ${quantity}`,
            },
          },
          unit_amount: event.price,
        },
        quantity: 1,
      }
    })
  
    const stripeSession = await stripe.checkout.sessions.create({
      // customer_email: email || 'anonymous',
      customer: stripeCustomerId,
      payment_method_types: ["card", ],
      line_items: lineItems,
      mode: "payment",
      success_url: `${envs.FRONTEND_URL}/account?dashState=tickets#tickets`,
      cancel_url: `${envs.FRONTEND_URL}/events/${event.id}`,
      metadata: {
        type: 'checkout.tickets',
        eventId: event.id,
        quantity: quantity,
      }
    })
  } catch (error) {
    console.log('!!! stripe checkoutTicket: ', error);
    
    
  }
}