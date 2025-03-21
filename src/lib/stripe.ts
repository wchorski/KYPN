import "dotenv/config"

import Stripe from "stripe"

import { envs } from "../../envs"
import type { Billing_Interval, Duration, SubscriptionItem } from "../keystone/types"

if (!envs.STRIPE_SECRET) throw new Error("!!! STRIP_SECRET is missing.")

const stripeConfig = new Stripe(envs.STRIPE_SECRET, {
	apiVersion: "2024-12-18.acacia; custom_checkout_beta=v1" as any,
})

type StripeProductCreate = {
	// id: string
	name: string
	excerpt: string | undefined
	category: string | undefined
	status: string | undefined
	authorId: string
	type: "subscriptionPlan" | "product" | "addon" | "service"
	image: string | undefined
	price: number
	billing_interval: Billing_Interval | undefined
	url: string
	stripeProductId: string | undefined
	stripePriceId: string | undefined
}

export async function stripeProductRetrieve(id: string | undefined) {
	if (!id) return
	// const products = await stripeConfig.products.search({
	//   query: 'active:\'true\' AND metadata[\'order_id\']:\'6735\'',
	// });
	const product = await stripeConfig.products.retrieve(id)
	return product
}
export async function stripePriceRetrieve(id: string | undefined) {
	if (!id) return
	// const products = await stripeConfig.products.search({
	//   query: 'active:\'true\' AND metadata[\'order_id\']:\'6735\'',
	// });
	const price = await stripeConfig.prices.retrieve(id)
	return price
}

export async function stripeProductCreate(props: StripeProductCreate) {
	if (!envs.STRIPE_SECRET) return
	//? if product has stripeId then find and update existing product
	// if (props.stripeProductId) stripeProductUpdate(props)
	if (props.stripeProductId) {
		try {
			const product = await stripeProductRetrieve(props.stripeProductId)

			if (product) return await stripeProductUpdate(props)
		} catch (error: any) {
			console.log("!!! 💳 STRIPE:: ", {
				type: error.type,
				code: error.code,
				message: error.raw.message,
				log: "!!! If seeding, stripe product did not exist and this func will create a new one with a new ID",
			})
		}
	}

	const {
		// id,
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
	} = props

	const stripeCreateParams: Stripe.ProductCreateParams = {
		name,
		active: !["ARCHIVED", "DRAFT"].includes(String(status)),
		description: excerpt || "no_description",
		metadata: {
			// productId: id,
			category: category || "no_category",
			status: status || "no_status",
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
		.catch((error) =>
			console.log("!!! 💳 STRIPE:: ", {
				code: error.code,
				message: error.raw.message,
			})
		)
	//TODO why is this returning `undefined`?
	// console.log({ res })
	return res
}

export async function stripeServiceCreate({
	// id,
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
}: StripeProductCreate) {
	if (!envs.STRIPE_SECRET) return

	let stripeCreateParams: Stripe.ProductCreateParams = {
		name,
		active: true,
		description: excerpt || "no_description",
		metadata: {
			// serviceId: id,
			category: category || "no_category",
			status: status || "no_status",
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
	stripeCustomerId?: string
	email: string
	name: string
	nameLast?: string
	isActive: boolean
}

export async function stripeCustomerCreate({
	stripeCustomerId,
	email,
	name,
	nameLast,
	isActive,
}: Customer) {
	if (!envs.STRIPE_SECRET) return

	if (stripeCustomerId) {
		const exisitingCustomer = await stripeConfig.customers.retrieve(
			stripeCustomerId
		)

		if (exisitingCustomer) {
			return await stripeCustomerUpdate({
				stripeCustomerId,
				email,
				name,
				nameLast,
				isActive,
			})
		}
	}

	const customer = await stripeConfig.customers.create({
		email: email,
		name: name + (nameLast ? ` ${nameLast}` : ""),
		metadata: {
			isActive: String(isActive),
		},
	})

	if (!customer) return Promise.reject(new Error("Customer creation failed"))

	return customer
}

type CustomerUpdate = {
	userId?: string
	stripeCustomerId: string
	email?: string
	name?: string
	nameLast?: string
	isActive: boolean
}

export async function stripeCustomerUpdate({
	stripeCustomerId,
	userId,
	email,
	name,
	nameLast,
	isActive,
}: CustomerUpdate) {
	const customer = await stripeConfig.customers.update(stripeCustomerId, {
		...(email ? { email } : {}),
		...(name ? { name: name + (nameLast ? ` ${nameLast}` : "") } : {}),
		metadata: {
			...(isActive ? { isActive: String(isActive) } : {}),
			...(userId ? { userId } : {}),
		},
	})

	return customer
}

//? stripe. deleting product is not recommended
// as product history will also be erased
export async function stripeProductDelete(id: string | undefined) {
	if (!envs.STRIPE_PUBLIC_KEY || !id) return
	await stripeConfig.products.del(id).catch((error) =>
		console.log("!!! 💳 STRIPE:: ", {
			code: error.code,
			message: error.raw.message,
		})
	)
}

export async function stripeArchiveProduct(id: string | undefined) {
	if (!envs.STRIPE_PUBLIC_KEY || !id) return
	const product = await stripeConfig.products
		.update(id, {
			active: false,
		})
		.catch((error) =>
			console.log("!!! 💳 STRIPE::", {
				type: error.type,
				message: error.raw.message,
			})
		)

	return product
}

export async function stripeCustomerDelete(id: string) {
	const deleted = await stripeConfig.customers.del(id).catch((error) =>
		console.log("!!! 💳 STRIPE:: ", {
			code: error.code,
			message: error.raw.message,
		})
	)

	return deleted
}

type ProductUpdate = {
	stripeProductId: string | undefined
	stripePriceId: string | undefined
	currency?: "usd" | string
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
	if (!envs.STRIPE_PUBLIC_KEY || !stripeProductId) return

	let stripeUpdateParams: Stripe.ProductUpdateParams = {
		name,
		description: excerpt,
		...(status
			? { active: !["ARCHIVED", "DRAFT"].includes(String(status)) }
			: {}),
		// default_price: newPrice.id,
		...(image ? { images: [image] } : {}),
		metadata: {
			...(category ? { category } : {}),
			...(status ? { status } : {}),
			...(authorId ? { authorId } : {}),
		},
	}

	//TODO check if stripePriceId exists. Is it the same amount, billing_interval, etc? then just link existing
	if (price) {
		// check if stripePriceId exists?

		const retrievedPrice = await stripePriceRetrieve(stripePriceId)
		// if it exists then set .default_price to ID
		if (retrievedPrice) {
			// retrievedPrice.unit_amount
			// retrievedPrice.billing_scheme
			stripeUpdateParams.default_price = stripePriceId
		} else {
			// if not create new
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

			stripeUpdateParams.default_price = newPrice.id
		}
	}

	const product = await stripeConfig.products.update(
		stripeProductId,
		stripeUpdateParams
	)

	return product
}

type Coupon = {
	stripeId?: string
	name: string
	code: string
	couponId?: string
	percent_off?: number
	amount_off?: number
	duration: Duration
	duration_in_months?: number
	currency?: string
}

export async function stripeCouponDelete(id: string) {
	try {
		await stripeConfig.coupons.del(id)
	} catch (error) {
		console.log("💳❌ STRIPE:: ", error)
	}
}

export async function stripeCouponCreate({
	stripeId,
	name,
	code,
	amount_off,
	percent_off,
	duration,
	duration_in_months,
	couponId,
	currency = "usd",
}: Coupon) {
	if (!envs.STRIPE_PUBLIC_KEY) return
	//? if product has stripeId then find and update existing product
	// if (props.stripeProductId) stripeProductUpdate(props)
	if (stripeId) {
		try {
			const coupon = await stripeConfig.coupons.retrieve(stripeId)

			if (coupon) {
				return await stripeConfig.coupons.update(stripeId, {
					name,
					metadata: {
						couponId: couponId || "",
					},
				})
			}
		} catch (error: any) {
			console.log("!!! 💳 STRIPE:: ", {
				type: error.type,
				code: error.code,
				message: error.raw.message,
				log: "!!! If seeding, stripe product did not exist and this func will create a new one with a new ID",
			})
		}
	}

	let couponParams: Stripe.CouponCreateParams = {
		id: code,
		name,
		duration,
		...(duration === "repeating" ? { duration_in_months } : {}),
		...(amount_off ? { amount_off } : {}),
		...(percent_off ? { percent_off } : {}),
		currency,
		metadata: {
			couponId: couponId || "",
		},
	}

	const coupon = await stripeConfig.coupons.create(couponParams)
	return coupon
}

type SubscriptionCreate = {
	subscriptionPlanId: string
	stripeCustomerId: string
  customerId:string,
	stripePriceId: string
	couponId?: string
	trial_period_days?: number
}

export async function stripeSubscriptionCreate({
	stripeCustomerId,
  customerId,
	stripePriceId,
	subscriptionPlanId,
	couponId,
	//? override on subscriptionPlan trial
	trial_period_days,
}: SubscriptionCreate) {
	if (!envs.STRIPE_PUBLIC_KEY) return

	try {
		const subscription = await stripeConfig.subscriptions.create({
			customer: stripeCustomerId,

			items: [
				{
					price: stripePriceId,
					quantity: 1,
					metadata: {
						subscriptionPlanId: subscriptionPlanId,
						customerId: customerId,
					},
				},
			],
			...(couponId
				? {
						discounts: [{ coupon: couponId }],
				  }
				: {}),
			...(trial_period_days
				? {
						trial_period_days: trial_period_days,
				  }
				: {}),
			metadata: {
				type: "subscriptionItem",
        customerId: customerId,
			},
		})

		return subscription
	} catch (error: any) {
		console.log("!!! 💳 STRIPE:: ", {
			type: error.type,
			code: error.code,
			message: error.raw.message,
			log: "!!! If seeding, stripe subscriptionPlan did not exist and this func will create a new one with a new ID",
		})
	}
}

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
	if (!envs.STRIPE_SECRET || !stripeSubscriptionId) return

	console.log("🐸 stripeSubscriptionUpdate. DOES THIS WORK w STRIPE???")

	try {
		switch (status) {
			case "PAUSED":
				await stripeConfig.subscriptions.update(stripeSubscriptionId, {
					pause_collection: {
						behavior: "void",
					},
					metadata: {
						subscriptionItemId: subItemId,
					},
				})
				break

			case "ACTIVE":
				await stripeConfig.subscriptions.update(stripeSubscriptionId, {
					pause_collection: "",
					metadata: {
						subscriptionItemId: subItemId,
					},
				})
				break

			case "CANCELED":
				await stripeConfig.subscriptions.cancel(stripeSubscriptionId)

			default:
				console.log("### SubscriptionItem Schema. status not supported")
				break
		}
	} catch (error: any) {
		console.log("sub item update error: ", error)

		throw new Error(
			"💳❌ Subscription Item Status Change Error: ",
			error.message
		)
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
			url: envs.CMS_URL + `/${type}/${id}`,
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

export async function stripeWebhookCreate(){
  const webhookEndpoint = await stripeConfig.webhookEndpoints.create({
    enabled_events: ['checkout.session.completed'],
    url: envs.FRONTEND_URL + `/api/webhooks/stripe`,
  });
  console.log(`💳 Stripe Webhook created for production: ${webhookEndpoint}`);
}

export default stripeConfig
