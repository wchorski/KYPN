import { StripeSubscriptionCheckout } from "@components/ecommerce/StripeSubscriptionCheckout"
import ErrorPage from "@components/layouts/ErrorPage"
import { keystoneContext } from "@ks/context"
import type {  Addon, User  } from "@ks/types"
import fetchRedeemCoupon from "@lib/fetchdata/fetchRedeemCoupon"
import fetchSubscriptionPlan from "@lib/fetchdata/fetchSubscriptionPlan"
import { plainObj } from "@lib/utils"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

type Props = {
	searchParams: {
		id: string
		addons: string | undefined
		couponCode: string | undefined
	}
	params: { id: string }
}

export const metadata: Metadata = {
	title: `Checkout Subscription | ` + envs.SITE_TITLE,
	description: envs.SITE_DESCRIPTION,
}

export default async function CheckoutSubscriptionPage({
	params,
	searchParams,
}: Props) {
	const { id, addons: addonParams, couponCode } = await searchParams
	const addonIds = addonParams?.split(",") || []

	const session = await getServerSession(nextAuthOptions)
	if (!session) return redirect("/login")
	const user = (await keystoneContext.withSession(session).query.User.findOne({
		where: { id: session.itemId },
		//! Error: Syntax Error: Expected Name, found "[". for below
		// query: QUERY_USER_CART,
		query: QUERY_USER,
	})) as User

	const { subscriptionPlan, error } = await fetchSubscriptionPlan({
		id,
		query: QUERY_SUBPLAN,
		session,
	})
	// const { addons = [], error: errorAddons } = await fetchAddons({
	// 	ids: addonIds,
	// 	query: QUERY_ADDONS,
	// 	session,
	// })
	// console.log({ addons })
  // TODO currently not supporting subscription addons because it's a mf headache
  const addons = [] as Addon[]
  const errorAddons = false

  const { coupon, error: errorCoupon } = (await fetchRedeemCoupon({
    code: couponCode,
    query: COUPON_QUERY,
  })) ?? {}

	if (!user || !subscriptionPlan) return notFound()
	if (error || errorAddons || errorCoupon)
		return (
			<ErrorPage error={error || errorAddons || errorCoupon}>
				<p>data fetch error </p>
			</ErrorPage>
		)

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Checkout Subscription</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<StripeSubscriptionCheckout
					subscriptionPlan={plainObj(subscriptionPlan)}
					addons={plainObj(addons)}
					coupon={coupon ? plainObj(coupon) : undefined}
					email={session.user.email}
					user={session.user as User}
				/>
			</div>
		</main>
	)
}
const COUPON_QUERY = `
  id
  stripeId
  code
`
const QUERY_ADDONS = `
  id
  name
  image
  price
  stripePriceId
`

const QUERY_USER = `
  id
  name
  email
  cart {
    id
    type
    quantity
    subTotal
    coupon {
      id
      name
      amount_off
      percent_off
    }
  }
`
const QUERY_SUBPLAN = `
  id
  typeof
  image
  name
  slug
  excerpt
  status
  price
  billing_interval
  stockMax
  stripePriceId
  stripeProductId
  trial_period_days
`
