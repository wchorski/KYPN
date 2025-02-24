"use server"
import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { keystoneContext } from "@ks/context"
import { CartItem } from "@ks/types"
import { delay, plainObj } from "@lib/utils"
import { getServerSession } from "next-auth"

export async function postAddToCart(
	prevState: AddToCartState,
	formData: FormData
): Promise<AddToCartState> {
	// @ts-ignore
	const values = Object.fromEntries(formData) as AddToCartValues
	// // @ts-ignore
	// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
	// const {  } = values
  values.quantity = Number(formData.get("quantity"))
	console.log({ values })

	const valueErrors = validateValues(values)
	if (valueErrors)
		return { valueErrors, values, error: "Check for errors in form fields" }

	//? use if form data needs to be modified before db query
	// const variables = values as AddToCartVariables
	try {
		const session = await getServerSession(nextAuthOptions)

		const data = (await keystoneContext.withSession(session).graphql.run({
			query: `
        mutation AddToCart($type: String!, $quantity: Int!, $productId: ID, $eventId: ID, $couponCode: ID) {
          addToCart(type: $type, quantity: $quantity, productId: $productId, eventId: $eventId, couponCode: $couponCode) {
            ${QUERY_CARTITEMS}
          }
        }
      `,
			variables: values,
		})) as { addToCart: CartItem }
		// console.log({ data })

		// await delay(800)
		// console.log("postAddToCart Triggered")

		return {
      values: {
        ...values,
        couponCode: '',
      },
			id: data.addToCart.id,
			// url: envs.FRONTEND_URL + `/checkout`,
			success: `Item added to cart`,
			cartItem: plainObj(data.addToCart),
		}
	} catch (error) {
		console.log("!!! actionAddToCart: ", error)
		return {
      values,
			error: "AddToCart failed: " + error,
			success: undefined,
		}
	}
}

function validateValues({}: AddToCartValues) {
	// @ts-ignore
	let valueErrors: AddToCartState["valueErrors"] = {}
	if (!valueErrors) return undefined

	//TODO check against user's cart for better messaged errors on coupons or products
  //

	if (Object.keys(valueErrors).length === 0) return undefined
	return valueErrors
}

export type AddToCartValues = {
	type: CartItem["type"]
	quantity: number
	productId: string | undefined
	eventId: string | undefined
	// subscriptionPlanId: string | undefined
	couponCode: string | undefined
}

export type AddToCartState = {
	url?: string
	id?: string
	values?: AddToCartValues
	valueErrors?: Record<keyof AddToCartValues, string> | undefined
	error?: string
	success?: string
	cartItem?: CartItem
	data?: any | undefined
}

const QUERY_CARTITEMS = `
  id
  type
  quantity
  subTotal
  event {
    id
    summary
    price
    image
  }
  product {
    id
    price
    rental_price
    name
    image
    stripePriceId
    stripeProductId
  }
  booking {
    id
    price
    summary
    service {
      image
    }
  }
  rental {
    id
    summary
    start
    end
    days
    address
    delivery
    timeZone
  }
  coupon {
    name
    code
    amount_off
    percent_off
    stripeId
  }
`
