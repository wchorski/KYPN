"use server"
import { keystoneContext } from "@ks/context"
import type {  CartItem, Rental  } from "@ks/types"
import { dateTimeToISOTimezone } from "@lib/dateFormatter"
import { plainObj } from "@lib/utils"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

export async function postRentalToCart(
	prevState: RentalToCartState,
	formData: FormData
): Promise<RentalToCartState> {
	//@ts-ignore
	const values = Object.fromEntries(formData) as RentalToCartValues
	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	const {} = values
	values.delivery = Boolean(formData.get("delivery"))
	values.start = dateTimeToISOTimezone(values.start, values.timeZone)
	values.end = dateTimeToISOTimezone(values.end, values.timeZone)
	// console.log({ values })

	const valueErrors = validateValues(values)
	if (valueErrors)
		return { valueErrors, values, error: "Check for errors in form fields" }

	//? use if form data needs to be modified before db query
	// const variables = values as RentalToCartVariables
	try {
		const session = await getServerSession(nextAuthOptions)

		// TODO should i just make a mutation of this or put it in a hook?
		if (values.rentalId) {
			const rental = (await keystoneContext
				.withSession(session)
				.db.Rental.updateOne({
					where: { id: values.rentalId },
					data: {
						start: values.start,
						end: values.end,
						address: values.address,
						delivery: values.delivery,
						customer: {
							connect: {
								id: values.customerId,
							},
						},
						notes: values.notes,
					},
				})) as Rental

			return {
				values,
				id: rental.id,
				url: envs.FRONTEND_URL + `/checkout`,
				success: `Rental Updated! Status: ${rental.status}`,
			}
		} else {
			const rental = (await keystoneContext
				.withSession(session)
				.db.Rental.createOne({
					data: {
						start: values.start,
						end: values.end,
						address: values.address,
						delivery: values.delivery,
						customer: {
							connect: {
								id: values.customerId,
							},
						},
						notes: values.notes,
					},
				})) as Rental

			const data = (await keystoneContext.withSession(session).graphql.run({
				query: `
          mutation AddToCart($type: String!, $quantity: Int!, $rentalId: ID) {
            addToCart(type: $type, quantity: $quantity, rentalId: $rentalId) {
              id
              type
              quantity
              subTotal
              rental {
                id
                summary
                start
                end
                days
                price
                notes
              }
            }
          }
        `,
				variables: {
					rentalId: rental.id,
					quantity: 1,
					type: "RENT_RESERVATION",
				},
			})) as { addToCart: CartItem }
			console.log({ data })

			return {
				values,
				cartItem: plainObj(data.addToCart),
				id: rental.id,
				url: envs.FRONTEND_URL + `/checkout`,
				success: `Rental Created! Status: ${rental.status}`,
			}
		}
	} catch (error) {
		console.log("!!! actionRentalToCart: ", error)
		return {
			error: "RentalToCart failed: " + error,
			success: undefined,
		}
	}
}

function validateValues({ customerId }: RentalToCartValues) {
	// @ts-ignore
	let valueErrors: RentalToCartState["valueErrors"] = {}
	if (!valueErrors) return undefined

	if (!customerId) throw new Error("!!! Customer Id not set")

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type RentalToCartValues = {
	start: string
	end: string
	timeZone: string
	address: string
	delivery: boolean
	customerId: string
	notes: string
	rentalId: string | undefined
}

export type RentalToCartState = {
	url?: string
	id?: string
	cartItem?: CartItem
	values?: RentalToCartValues
	valueErrors?: Record<keyof RentalToCartValues, string> | undefined
	error?: string
	success?: string
}
