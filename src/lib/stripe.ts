import Stripe from "stripe"
import "dotenv/config"
import { envs } from "../../envs"
import { Billing_Interval, Duration, SubscriptionItem } from "../keystone/types"

if (!envs.STRIPE_SECRET) throw new Error("!!! STRIP_SECRET is missing.")

const stripeConfig = new Stripe(envs.STRIPE_SECRET, {
	apiVersion: "2024-12-18.acacia; custom_checkout_beta=v1" as any,
})

type StripeProduct = {
	id: string
	name: string
	excerpt: string
	category: string
	status: string
	authorId: string
	type: "subscription" | "product" | "addon" | "service"
	image: string
	price: number
	billing_interval?: Billing_Interval
	url: string
	stripeProductId: string | undefined
}

export async function stripeProductCreate({
	id,
	name,
	excerpt,
	category,
	status,
	authorId,
	type,
	image,
	price,
	billing_interval,
	url,
	stripeProductId,
}: StripeProduct) {
	console.log("### stripeProductCreate ###")
	if (!envs.STRIPE_SECRET || stripeProductId) return
	console.log("### stripeProductCreate continued ###")

	let stripeCreateParams: Stripe.ProductCreateParams = {
		name,
		active: true,
		description: excerpt || "no_description",
		metadata: {
			productId: id,
			category: category,
			status,
			authorId,
			type,
		},
		// attributes: [
		//   'Subscriptionattr1',
		//   'Subscriptionattr2'
		// ],
		shippable: false,
		unit_label: "units",
		default_price_data: {
			currency: "usd",
			unit_amount: price,
			...(billing_interval
				? { recurring: { interval: billing_interval } }
				: {}),
		},
		url: url,
		...(image ? { images: [image] } : {}),
	}

	const res = await stripeConfig.products
		.create(stripeCreateParams)
		// .then((res) => {
		// 	if (!res) return
		// 	resolvedData.stripeProductId = res.id
		// 	resolvedData.stripePriceId = String(res.default_price)
		// 	console.log({ res })
		// 	console.log({ resolvedData })
		// })
		.catch((error) => console.log("!!! ❌💳 STRIPE: ", error))
	//TODO why is this returning `undefined`?
	// console.log({ res })
	return res
}

export async function stripeServiceCreate({
	id,
	name,
	excerpt,
	category,
	status,
	authorId,
	type,
	image,
	price,
	billing_interval,
	url,
}: StripeProduct) {
	if (!envs.STRIPE_SECRET) return

	let stripeCreateParams: Stripe.ProductCreateParams = {
		name,
		active: true,
		description: excerpt || "no_description",
		metadata: {
			serviceId: id,
			category: category,
			status,
			authorId,
			type,
		},
		// attributes: [
		//   'Subscriptionattr1',
		//   'Subscriptionattr2'
		// ],
		shippable: false,
		unit_label: "units",
		url: url,
		default_price_data: {
			currency: "usd",
			unit_amount: price,
			...(billing_interval
				? { recurring: { interval: billing_interval } }
				: {}),
		},
		...(image ? { images: [image] } : {}),
	}

	const res = await stripeConfig.products.create(stripeCreateParams)

	return res
}

type Customer = {
	email: string
	name: string
	nameLast?: string
	isActive: boolean
}

export async function stripeCustomerCreate({
	email,
	name,
	nameLast,
	isActive,
}: Customer) {
	if (!envs.STRIPE_SECRET) return

	const customer = await stripeConfig.customers.create({
		email: email,
		name: name + " " + nameLast,
		metadata: {
			isActive: String(isActive),
		},
	})

	if (!customer) return Promise.reject(new Error("Customer creation failed"))

	return customer
}

export async function stripeProductDelete(id: string | undefined) {
	if (!envs.STRIPE_PUBLIC_KEY || !id) return
	await stripeConfig.products
		.del(id)
		.catch((error) => console.log("!!! ❌💳 STRIPE: ", error))
}

export async function stripeCustomerDelete(id: string) {
	const deleted = await stripeConfig.customers
		.del(id)
		.catch((error) => console.log("!!! ❌💳 STRIPE: ", error))

	return deleted
}

type Price = {
	currency: "usd" | string
	productId: string
	stripeProductId: string
	stripePriceId: string
	price: number
	image: string
	name: string
	status: string
	category: string
	excerpt: string
	authorId: string
	billing_interval: Billing_Interval
}

type ProductUpdate = {
	stripeProductId: string
	stripePriceId: string | undefined
	currency: "usd" | string | undefined
	productId: string | undefined
	price: number | undefined
	image: string | undefined
	name: string | undefined
	status: string | undefined
	category: string | undefined
	excerpt: string | undefined
	authorId: string | undefined
	billing_interval: Billing_Interval | undefined
}

export async function stripeProductUpdate({
	currency = "usd",
	productId,
	image,
	status,
	authorId,
	category,
	name,
	excerpt,
	price,
	stripeProductId,
	stripePriceId,
	billing_interval,
}: ProductUpdate) {
	if (!envs.STRIPE_SECRET || !stripeProductId) return

	let stripeUpdateParams: Stripe.ProductUpdateParams = {
		name,
		description: excerpt,
		// default_price: newPrice.id,
		...(image ? { images: [image] } : {}),
		metadata: {
			...(category ? { category } : {}),
			...(status ? { status } : {}),
			...(authorId ? { authorId } : {}),
			...(productId ? { productId } : {}),
		},
	}

	if (price && stripePriceId) {
		const newPrice = await stripeConfig.prices.create({
			unit_amount: price,
			currency,
			product: stripeProductId,
			...(billing_interval
				? {
						recurring: {
							interval: billing_interval,
						},
				  }
				: {}),
		})
		stripeUpdateParams = { ...stripeUpdateParams, default_price: newPrice.id }
	}

	const product = await stripeConfig.products.update(
		stripeProductId,
		stripeUpdateParams
	)

	return product
}

type Coupon = {
	name: string
	couponId: string
	percent_off?: number
	amount_off?: number
	duration: Duration
	duration_in_months: number
}

export async function stripeCouponCreate({
	name,
	amount_off,
	percent_off,
	duration,
	duration_in_months,
	couponId,
}: Coupon) {
	if (!envs.STRIPE_PUBLIC_KEY) return

	let couponParams: Stripe.CouponCreateParams = {
		name,
		duration,
		metadata: {
			couponId,
		},
	}

	if (duration === "repeating") {
		couponParams = { ...couponParams, duration_in_months }
	}
	if (amount_off) couponParams = { ...couponParams, amount_off }
	if (percent_off) couponParams = { ...couponParams, percent_off }

	const coupon = await stripeConfig.coupons.create(couponParams)
	return coupon
}

//? handeled by /api/checkout/subscriptionplan/route.ts
// type SubscriptionCreate = {
//   stripeCustomerId:string,
//   stripeProductId:string,
//   billing_interval:Billing_Interval,
//   // stripePriceId:string,
// }

// export async function stripeSubscriptionCreate({stripeCustomerId, stripeProductId, billing_interval}:SubscriptionCreate){

//   if(!envs.STRIPE_SECRET) return

//   const subscription = await stripeConfig.subscriptions.create({
//     customer: 'cus_Na6dX7aXxi11N4',
//     items: [
//       {
//         // price: 'price_1MowQULkdIwHu7ixraBm864M',
//         price_data: {
//           currency: 'usd',
//           product: stripeProductId,
//           recurring: {
//             interval: billing_interval,

//           },
//           unit_amount: price,
//         }
//       },
//     ],
//     metadata: {
//       subscriptionId: id,
//     }
//   });
// }

type SubscriptionUpdate = {
	status: SubscriptionItem["status"]
	stripeSubscriptionId: string
	subItemId: string
}

export async function stripeSubscriptionUpdate({
	status,
	stripeSubscriptionId,
	subItemId,
}: SubscriptionUpdate) {
	if (!envs.STRIPE_SECRET) return

	try {
		switch (status) {
			case "PAUSED":
				const resPause = await stripeConfig.subscriptions.update(
					stripeSubscriptionId,
					{
						pause_collection: {
							behavior: "void",
						},
						metadata: {
							subscriptionItemId: subItemId,
						},
					}
				)
				break

			case "ACTIVE":
				const resActive = await stripeConfig.subscriptions.update(
					stripeSubscriptionId,
					{
						pause_collection: "",
					}
				)
				break

			case "CANCELED":
				const resCancle = await stripeConfig.subscriptions.cancel(
					stripeSubscriptionId
				)

			default:
				console.log("### SubscriptionItem Schema. status not supported")
				break
		}
	} catch (error) {
		console.log("sub item update error: ", error)
		// @ts-ignore
		throw new Error("Sub Item Status Change Error: ", error.message)
	}
}

type StripePayInInstallments = Stripe.SubscriptionScheduleCreateParams & {
	product: string
	interval: "day" | "week" | "month" | "year"
	iterations: number
	totalPrice: number
	type: "products" | "services"
	id: string
}

// https://docs.stripe.com/api/subscription_schedules/create
// https://docs.stripe.com/billing/subscriptions/subscription-schedules/use-cases#installment-plans
export async function stripeCreateInstallmentPayment({
	customer,
	start_date = "now",
	end_behavior = "cancel",
	product,
	interval = "month",
	iterations,
	totalPrice,
	type,
	id,
}: StripePayInInstallments) {
	const stripePaymentPlan = await stripeConfig.subscriptionSchedules.create({
		customer,
		start_date,
		end_behavior,
		metadata: {
			type,
			url: envs.BACKEND_URL + `/${type}/${id}`,
		},
		phases: [
			{
				items: [
					{
						price_data: {
							currency: "usd",
							product,
							recurring: {
								interval,
							},
							unit_amount: totalPrice / iterations,
						},
						quantity: 1,
					},
				],
				iterations,
			},
		],
	})

	console.log({ stripePaymentPlan })
}

export default stripeConfig
