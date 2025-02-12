import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { CartItemsList } from "@components/ecommerce/CartItemsList"
import { CartTotal } from "@components/ecommerce/CartTotal"
import { CheckoutCartForm } from "@components/ecommerce/CheckoutCartForm"
import { RentalForm } from "@components/ecommerce/RentalForm"
import { StripeCheckoutForm } from "@components/ecommerce/StripeCheckoutForm"
import { QUERY_USER_CART } from "@components/hooks/CartStateContext"
import Flex from "@components/layouts/Flex"
import { Grid } from "@components/layouts/Grid"
import { keystoneContext } from "@ks/context"
import type { User } from "@ks/types"
import { plainObj } from "@lib/contentHelpers"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: `Checkout | ` + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

// throw new Error(
// TODO
// 	"allow payment installments with /lib/stripe > stripeCreateInstallmentPayment"
// )

export default async function CheckoutPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	// const { data, error } = await fetch()
	// if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
	// if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	if (!session) return redirect("/login")

	const user = (await keystoneContext.withSession(session).query.User.findOne({
		where: { id: session.itemId },
		//! Error: Syntax Error: Expected Name, found "[". for below
		// query: QUERY_USER_CART,
		query,
	})) as User

	const cartRental = user.cart.find((item) => item.rental)?.rental

	// TODO if not using stripe render native checkout form (don't forget to mark as UNPAID)

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Checkout</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<Grid layout={"1_1"} isAuto={false}>
					<div>
						{/* // TODO how to show tickets in a pretty manner with cart context */}
						<h2>Cart Items</h2>
						<CartItemsList />
						<Flex alignItems="baseline">
							<h2>Total: </h2>
							<p style={{ fontSize: "4rem" }}>
								<CartTotal />
							</p>
						</Flex>
					</div>
					<div>
						{!user.cart.some((item) => item.type === "RENTAL") ? (
							<div></div>
						) : (
							<>
								{!user.cart.some((item) => item.rental) && (
									<p>
										Your cart contains rental items. Please fill out rental
										details first before checking out
									</p>
								) }
								<RentalForm
									currRental={cartRental ? plainObj(cartRental) : undefined}
									customerId={session.itemId}
									timeZoneOptions={envs.TIMEZONES.map((tz) => ({
										label: tz,
										value: tz,
									}))}
								/>
							</>
						)}
					</div>
				</Grid>

				<hr />
				{user.cart.length === 0 ? (
					<CartEmptyMessage />
				) : !envs.STRIPE_PUBLIC_KEY ? (
					<CheckoutCartForm cartItems={plainObj(user.cart)} />
				) : (
					<StripeCheckoutForm
						// itemType={"ticket"}
						cartItems={plainObj(user.cart)}
						email={session.user.email}
						user={session.user as User}
					/>
				)}
			</div>
		</main>
	)
}

export function CartEmptyMessage() {
	return (
		<p>
			Cart is empty. View the <Link href={`/shop`}>Shop</Link> or checkout some{" "}
			<Link href={`/events`}>Events</Link>
		</p>
	)
}

const query = `
  cart {
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
    }
    booking {
      id
      price
      summary
      service {
        image
      }
    }
    subscriptionPlan {
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
      id
      name
      amount_off
      percent_off
    }
  }
`
