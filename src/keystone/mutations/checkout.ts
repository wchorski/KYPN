// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from "@keystone-6/core"
import { Context, Lists, TicketCreateInput } from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { KeystoneContextFromListTypeInfo } from "@keystone-6/core/types"
import type { CartItem, Event } from "../types"
import { Session } from "next-auth"

type StripeSession = {
	stripeSession?: {
		payment_status: "paid" | "unpaid"
		id: string
		payment_intent: string
	}
}

// type SessionWStripe = Session & StripeSession
type SessionWStripe = {
	itemId?: string
	user: { email: string }
} & StripeSession

// TODO consolidate into one checkout mutation
// grab items from cart instead of doing all this song and dance with form input

export const checkout = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("Order"),
		// args: {},
		async resolve(source, variables, context: Context) {
			// const {} = variables

			//? Stripe Webhook validates payment success
			const sudoContext = context.sudo()

			// const session = {
			// 	itemId: "cm4sx7aax000087am4okv1u1d",
			// 	user: { email: "debug@debug" },
			// }
			const session: SessionWStripe = context.session
			if (!session) throw new Error("Session not available")

			const cartItems = (await sudoContext.query.CartItem.findMany({
				where: { user: { id: { equals: session.itemId } } },
				query: `
          id
          quantity
          type
          subTotal
          product {
            id
          }
          event {
            id
            seats
            price
          }
        `,
			})) as CartItem[]

			const ticketCartItems = cartItems.filter(
				(item) => item.event?.id
			) as unknown as TicketCartItem[]

			// TODO don't forget about products (rentals)
			const filteredProductItems = cartItems.filter((item) => item.product?.id)

			// TODO why is it returning promises and not array of objs?
			const ticketsToCreate = await createTicketItems(
				ticketCartItems,
				context,
				session
			)

			const subTotals = cartItems.reduce((accumulator, item) => {
				return accumulator + item.subTotal
			}, 0)
			// TODO perform any coupons here
			const amountTotal = subTotals

			const order = await sudoContext.db.Order.createOne({
				// const order = await context.withSession(session).db.Order.createOne({
				data: {
					total: amountTotal,
					...(ticketsToCreate
						? { ticketItems: { create: ticketsToCreate } }
						: {}),
					user: session.itemId ? { connect: { id: session.itemId } } : null,
					stripeCheckoutSessionId:
						session.stripeSession?.id || null,
					stripePaymentIntent:
						session.stripeSession?.payment_intent || null,
					email: session.user.email || "",
					//TODO maybe not secure
					...(session.stripeSession?.payment_status === "paid" ||
					amountTotal === 0
						? { status: "PAYMENT_RECIEVED" }
						: { status: "REQUESTED" }),
				},
			})

			await sudoContext.db.CartItem.deleteMany({
				where: cartItems.map((item) => ({ id: item.id })),
			})

			//? email sent with Order afterOperation

			return {
				status: order.status,
				id: order.id,
			}
		},
	})

async function createTicketItems(
	ticketCartItems: TicketCartItem[],
	context: any,
	session: SessionWStripe
) {
	const ticketsToCreate = await Promise.all(
		ticketCartItems.map(async ({ event, quantity }) => {
			if (!event) throw new Error("No Event Found")

			const seatsTaken = await countAvailableSeats({
				context,
				eventId: event.id,
			})
			//? if (# of seats customer is requesting + already taken seats) is over event.seats max
			if (quantity + seatsTaken > event.seats)
				throw new Error(
					`Not enough seats available for event. ${
						event.seats - seatsTaken
					} seats left.`
				)

			const tickets: TicketCreateInput[] = Array.from(
				{ length: quantity },
				(_, index) => ({
					event: { connect: { id: event.id } },
					holder: session.itemId ? { connect: { id: session.itemId } } : null,
					email: session.user.email,
				})
			)

			return tickets
		})
	)

	return ticketsToCreate.flat()
}

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

type TicketCartItem = {
	id: string
	quantity: number
	type: "SALE"
	productId: null
	event: {
		id: string
		seats: number
		price: number
	}
}
