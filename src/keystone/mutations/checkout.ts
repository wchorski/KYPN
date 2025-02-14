// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from "@keystone-6/core"
import {
	Context,
	Lists,
	OrderItemCreateInput,
	TicketCreateInput,
} from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { KeystoneContextFromListTypeInfo } from "@keystone-6/core/types"
import type { CartItem } from "../types"
import { calcTotalPrice } from "../../lib/calcTotalPrice"

type StripeSession = {
	stripe?: {
		payment_status: "paid" | "unpaid"
		id: string
		payment_intent: string
		customerId: string
		amount_total: number
		subscriptionId: string | undefined
		rentalId: string | undefined
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
		async resolve(source, variables, context: Context) {
			// const {} = variables

			//? Stripe Webhook validates payment success
			const sudoContext = context.sudo()
			const session: SessionWStripe = context.session
			if (!session)
				throw new Error("!!! mutation.checkout: Session not available")

      console.log('### mutation/checkout');
			console.log({ session })

			const paymentStatus = session.stripe?.payment_status || "unpaid"
			const customerId = session.itemId || session.stripe?.customerId

			const cartItems = (await sudoContext.query.CartItem.findMany({
				where: {
					user: {
						id: { equals: customerId },
					},
				},
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
          }
          booking {
            id
          }
          subscriptionPlan {
            id
            billing_interval
          }
          rental {
            id
          }
          coupon {
            id
          }
        `,
			})) as CartItem[]

			const rentalItem = cartItems.find((item) => item.rental)?.rental

			const amountTotal = calcTotalPrice(cartItems)
			const transactionFees =
				(session.stripe?.amount_total || amountTotal) - amountTotal

			const newOrderItems: OrderItemCreateInput[] = await (async () => {
				const theseOrderItems = await Promise.all(
					cartItems.map(
						async (item): Promise<OrderItemCreateInput | undefined> => {
							switch (true) {
								case item.booking !== null:
									return {
										type: item.type,
										quantity: item.quantity,
										booking: { connect: { id: item.booking?.id } },
									}

								case item.rental !== null:
									return {
										type: item.type,
										quantity: item.quantity,
										rental: { connect: { id: item.rental?.id } },
									}

								case item.product !== null:
									return {
										type: item.type,
										quantity: item.quantity,
										product: { connect: { id: item.product?.id } },
									}

								case item.event !== null:
									const tixs = await createTicketItemsPerEvent(
										item,
										paymentStatus,
										customerId,
										context
									)
									if (!tixs) return undefined

									return {
										type: item.type,
										quantity: item.quantity,
										tickets: {
											create: tixs,
										},
									}

								case item.subscriptionPlan !== null:
									return {
										type: item.type,
										quantity: item.quantity,
										subscriptionItem: {
											create: {
												subscriptionPlan: {
													connect: { id: item.subscriptionPlan?.id },
												},
												status:
													session.stripe?.payment_status === "paid"
														? "ACTIVE"
														: "TRIAL",
												billing_interval:
													item.subscriptionPlan?.billing_interval,
												user: {
													connect: {
														id: session.itemId || session.stripe?.customerId,
													},
												},
												stripeSubscriptionId: session.stripe?.subscriptionId,
											},
										},
									}

								default:
									return undefined
							}
						}
					)
				)
				return theseOrderItems.filter((item) => item !== undefined)
			})()

			if (!newOrderItems)
				throw new Error("!!! mutation.checkout: no newOrderItems ")

			JSON.stringify({ newOrderItems }, null, 2)

			const order = await sudoContext.db.Order.createOne({
				// const order = await context.withSession(session).db.Order.createOne({
				data: {
					subTotal: amountTotal,
					fees: transactionFees,
					...(newOrderItems ? { items: { create: newOrderItems } } : {}),
					user: { connect: { id: customerId } },
					stripeCheckoutSessionId: session.stripe?.id || "",
					stripePaymentIntent: session.stripe?.payment_intent || "",
					//TODO maybe not secure
					...(session.stripe?.payment_status === "paid" || amountTotal === 0
						? { status: "PAYMENT_RECIEVED" }
						: { status: "REQUESTED" }),
				},
			})

			if (!order) throw new Error("!!! mutation.checkout: order not created")

			await sudoContext.db.CartItem.deleteMany({
				where: cartItems.map((item) => ({ id: item.id })),
			})

			if (rentalItem) {
				await sudoContext.db.Rental.updateOne({
					where: { id: rentalItem.id },
					data: {
						status:
							session.stripe?.payment_status === "paid"
								? "PAYMENT_RECIEVED"
								: "REQUESTED",
					},
				})
			}

			await sudoContext.db.Booking.updateMany({
				data: cartItems
					.filter((item) => item.booking?.id)
					.map((cartItem) => ({
						where: { id: cartItem.booking?.id || "no_booking_id" },
						// data: { status: "HOLDING" },
						data: {
							status:
								cartItem.booking?.price === 0
									? "RSVP"
									: paymentStatus === "paid"
									? "PAID"
									: "HOLDING",
						},
					})),
			})

			//? email sent with Order afterOperation

			return {
				status: order.status,
				id: order.id,
			}
		},
	})

async function createTicketItemsPerEvent(
	cartItem: CartItem,
	payment_status: "paid" | "unpaid",
	customerId: string | undefined,
	context: Context
) {
	if (!cartItem.event) return
	const { event, quantity } = cartItem

	if (!event) throw new Error("!!! mutation.checkout: No Event Found")

	const seatsTaken = await countAvailableSeats({
		context,
		eventId: event.id,
	})
	//? if (# of seats customer is requesting + already taken seats) is over event.seats max
	if (quantity + seatsTaken > event.seats)
		throw new Error(
			`!!! mutation.checkout: Not enough seats available for event. ${
				event.seats - seatsTaken
			} seats left.`
		)

	const tickets: TicketCreateInput[] = Array.from(
		{ length: quantity },
		(_, index) => ({
			status:
				event.price === 0
					? "RSVP"
					: payment_status === "paid"
					? "PAID"
					: "PENDING",
			event: { connect: { id: event.id } },
			holder: customerId ? { connect: { id: customerId } } : null,
		})
	)

	return tickets
}
//! made things too complicated for this, but i like the logic of creating a nested async loop
// async function createTicketItemsMultiEvents(
// 	ticketCartItems: TicketCartItem[],
// 	context: any,
// 	session: SessionWStripe
// ) {
// 	const ticketsToCreate = await Promise.all(
// 		ticketCartItems.map(async ({ event, quantity }) => {
// 			if (!event) throw new Error("!!! mutation.checkout: No Event Found")

// 			const seatsTaken = await countAvailableSeats({
// 				context,
// 				eventId: event.id,
// 			})
// 			//? if (# of seats customer is requesting + already taken seats) is over event.seats max
// 			if (quantity + seatsTaken > event.seats)
// 				throw new Error(
// 					`!!! mutation.checkout: Not enough seats available for event. ${
// 						event.seats - seatsTaken
// 					} seats left.`
// 				)

// 			const tickets: TicketCreateInput[] = Array.from(
// 				{ length: quantity },
// 				(_, index) => ({
// 					event: { connect: { id: event.id } },
// 					holder: session.itemId ? { connect: { id: session.itemId } } : null,
// 					email: session.user.email,
// 				})
// 			)

// 			return tickets
// 		})
// 	)

// 	return ticketsToCreate.flat()
// }

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
	bookingId: null
	event: {
		id: string
		seats: number
		price: number
	}
}
