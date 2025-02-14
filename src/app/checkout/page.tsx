import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { CheckoutCartForm } from "@components/ecommerce/CheckoutCartForm"
import { StripeCheckoutForm } from "@components/ecommerce/StripeCheckoutForm"
import { Grid } from "@components/layouts/Grid"
import { keystoneContext } from "@ks/context"
import CartItem from "@components/ecommerce/CartItem"
import type { User } from "@ks/types"
import { plainObj } from "@lib/contentHelpers"
import {
	layout_content,
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Card } from "@components/layouts/Card"
import { CartItemsList } from "@components/ecommerce/CartItemsList"
import { CartTotal } from "@components/ecommerce/CartTotal"

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
	const someRentalItems = user.cart.some((item) => item.type === "RENTAL")
	const cartRentalItems = user.cart.filter((item) => item.type === "RENTAL")

	if (someRentalItems && !cartRental) return redirect(`/checkout/rental`)
	// TODO if not using stripe render native checkout form (don't forget to mark as UNPAID)

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_content}>
				<h1>Checkout</h1>
			</header>
			<div
				className={[page_content, layout_site, "grid"].join(" ")}
				style={{ gridTemplateColumns: "inherit" }}
			>
				<section className={layout_content}>
					{someRentalItems && user.cart.find((item) => item.rental) && (
						<>
							<h2>Cart Items</h2>
							{/* <ul className={"unstyled grid gap-m"}>
								{cartRentalItems.map((item) => (
									<CartItem
										key={item.id}
										item={plainObj(item)}
										sessionId={session.itemId}
									/>
								))}
								<CartItem
									item={plainObj(user.cart.find((item) => item.rental))}
									sessionId={session.itemId}
								/>
							</ul> */}
							<CartItemsList />
							<Card>
								<h4>Notes</h4>
								<p>{cartRental?.notes}</p>
							</Card>

							<Link className={"button medium"} href={`/checkout/rental`}>
								Update Rental Details
							</Link>
              <br />
              <br />
							<p>
								Total: <CartTotal />
							</p>
						</>
					)}
				</section>

				<hr />
				<section className={layout_site}>
					{user.cart.length === 0 ? (
						<CartEmptyMessage />
					) : !envs.STRIPE_PUBLIC_KEY ? (
						<CheckoutCartForm cartItems={plainObj(user.cart)} />
					) : (
						<StripeCheckoutForm
							// itemType={"ticket"}
							// cartItems={plainObj(user.cart)}
							email={session.user.email}
							user={session.user as User}
						/>
					)}
				</section>
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
      notes
    }
    coupon {
      id
      name
      amount_off
      percent_off
    }
  }
`
