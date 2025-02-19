import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { StripeSubscriptionCheckout } from "@components/ecommerce/StripeSubscriptionCheckout"
import ErrorPage from "@components/layouts/ErrorPage"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
import { keystoneContext } from "@ks/context"
import { User } from "@ks/types"
import fetchSubscriptionPlan from "@lib/fetchdata/fetchSubscriptionPlan"
import { plainObj } from "@lib/utils"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"

type Props = {
	searchParams: { id: string, addons:string, coupons:string }
	params: { id: string }
}

export const metadata: Metadata = {
	title: `Checkout Subscription | ` + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

export default async function CheckoutSubscriptionPage({
	params,
	searchParams,
}: Props) {
	const { id, addons, coupons } = await searchParams
  const addonIds = addons.split(',')
  const couponIds = addons.split(',')
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

	if (!user || !subscriptionPlan) return notFound()
	if (error)
		return (
			<ErrorPage error={error}>
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
          addonIds={addonIds}
          couponIds={couponIds}
					email={session.user.email}
					user={session.user as User}
				/>
			</div>
		</main>
	)
}
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
`