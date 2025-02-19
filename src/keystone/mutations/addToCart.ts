// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from "@keystone-6/core"
import { Context } from ".keystone/types"
import { BaseSchemaMeta } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema"
import { countAvailableSeats } from "./checkoutTickets"
import type { Event } from "../types"
import { hasOnlyOneValue } from "../../lib/utils"

export const addToCart = (base: BaseSchemaMeta) =>
	graphql.field({
		type: base.object("CartItem"),
		args: {
			type: graphql.arg({ type: graphql.nonNull(graphql.String) }),
			quantity: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
			productId: graphql.arg({ type: graphql.ID }),
			eventId: graphql.arg({ type: graphql.ID }),
			rentalId: graphql.arg({ type: graphql.ID }),
			subscriptionPlanId: graphql.arg({ type: graphql.ID }),
			couponId: graphql.arg({ type: graphql.ID }),
			addonIds: graphql.arg({ type: graphql.list(graphql.String) }),
		},
		async resolve(source, variables, context: Context) {
			const {
				type,
				quantity,
				productId,
				eventId,
				subscriptionPlanId,
				rentalId,
				couponId,
				addonIds,
			} = variables

			const validationStrings = [
				"productId",
				"eventId",
				"subscriptionPlanId",
				"rentalId",
				"couponId",
			]
			const hasOnlyOne = hasOnlyOneValue(variables, validationStrings)
			if (!hasOnlyOne)
				throw new Error(
					`!!! addToCart Item can only have one of[${validationStrings.join(
						", "
					)}] set`
				)

			// const session = await getServerSession(nextAuthOptions)
			//? prob should use the included ks context
			const session = await context.session
			const { sudo: sudoContext } = context

			if (!session) {
				throw new Error("!!!! you must be logged in")
			}

			if (eventId) {
				// TODO this is duplicate code of `checkoutTickets.ts` maybe DRY it up
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
			}

			const allCartItems = await sudoContext().db.CartItem.findMany({
				where: {
					user: { id: { equals: session.itemId } },
					...(productId ? { product: { id: { equals: productId } } } : {}),
					...(eventId ? { event: { id: { equals: eventId } } } : {}),
					...(subscriptionPlanId
						? {
								subscriptionItem: {
									subscriptionPlan: { id: { equals: subscriptionPlanId } },
								},
						  }
						: {}),
					...(couponId ? { coupon: { id: { equals: couponId } } } : {}),

					type: { equals: type },
				},
			})

			const [exisitingItem] = allCartItems

			if (exisitingItem) {
				if (exisitingItem.rentalId)
					throw new Error("!!! Cart can only have one Rental Item")
				if (exisitingItem.couponId)
					throw new Error("!!! Cart can only have one Coupon Item")

				const cartItemUpdate = await sudoContext().db.CartItem.updateOne({
					where: { id: exisitingItem.id },
					data: {
						quantity: exisitingItem.quantity + quantity,
					},
				})

				return cartItemUpdate
			} else {
				if (type === "DISCOUNT" && !couponId)
					throw new Error(
						"!!! cannot mark cart item as DISCOUNT unless it is a coupon"
					)

				const cartItemAdded = await sudoContext().db.CartItem.createOne({
					data: {
						type,
						...(productId ? { product: { connect: { id: productId } } } : {}),
						...(eventId ? { event: { connect: { id: eventId } } } : {}),
						...(rentalId
							? {
									rental: { connect: { id: rentalId } },
									addons: {
										connect: addonIds ? addonIds.map((id) => ({ id: id })) : [],
									},
							  }
							: {}),
						...(subscriptionPlanId
							? {
									subscriptionItem: {
										create: {
											status: "REQUESTED",
											subscriptionPlan: { connect: { id: subscriptionPlanId } },
											user: { connect: { id: session?.itemId } },
											addons: {
												connect: addonIds
													? addonIds.map((id) => ({ id: id }))
													: [],
											},
										},
									},
							  }
							: {}),
						// ...(subscriptionPlanId
						// 	? { subscriptionPlan: { connect: { id: subscriptionPlanId } } }
						// 	: {}),
						...(couponId ? { coupon: { connect: { id: couponId } } } : {}),
						user: { connect: { id: session?.itemId } },
						quantity,
					},
				})

				return cartItemAdded
			}
		},
	})
