import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import CartItem from "@components/ecommerce/CartItem"
import { CartItemsList } from "@components/ecommerce/CartItemsList"
import { CartTotal } from "@components/ecommerce/CartTotal"
import { CheckoutCartForm } from "@components/ecommerce/CheckoutCartForm"
import { StripeCheckoutForm } from "@components/ecommerce/StripeCheckoutForm"
import { Grid } from "@components/layouts/Grid"
import { keystoneContext } from "@ks/context"
import { type CartItem as TCartItem, User } from "@ks/types"
import { plainObj } from "@lib/contentHelpers"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: `Checkout | ` + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function CheckoutPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	// const { data, error } = await fetch()
	// if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
	// if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	if (!session) return redirect("/login")

	const user = (await keystoneContext.withSession(session).query.User.findOne({
		where: { id: session.itemId },
		query: `
      cart {
        id
        type
        quantity
        product {
          id
          name
          image
          price
        }
        event {
          id
          summary
          image
          price
        }
      }
    `,
	})) as User

	const filteredTicketItems: TCartItem[] = plainObj(
		user.cart.filter((item) => item.event)
	)
	const filteredProductItems = plainObj(
		user.cart.filter((item) => item.product)
	)

	// TODO if not using stripe render native checkout form (don't forget to mark as UNPAID)

	// if (!envs.STRIPE_PUBLIC_KEY)
	if ("nostripe" === "nostripe")
		return (
			<main className={[page_layout].join(" ")}>
				<header className={layout_site}>
					<h1>Checkout</h1>
				</header>
				<div className={[page_content, layout_site].join(" ")}>
					<Grid layout={"1_1"} isAuto={false}>
						<div>
              {/* // TODO how to show tickets in a pretty manner with cart context */}
							<CartItemsList />
							<CartTotal />
						</div>
						<div>
							{user.cart.length === 0 ? (
								<p> No items in cart. </p>
							) : filteredTicketItems ? (
								<CheckoutCartForm cartItems={filteredTicketItems} />
							) : filteredProductItems ? (
								<p>CheckoutForm for products</p>
							) : (
								<p> uh..... </p>
							)}
						</div>
					</Grid>
				</div>
			</main>
		)

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Checkout</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				{user.cart.length === 0 ? (
					<p> No items in cart. </p>
				) : filteredTicketItems ? (
					<StripeCheckoutForm
						itemType={"ticket"}
						cartItems={filteredTicketItems}
						email={session.user.email}
						user={session.user as User}
					/>
				) : filteredProductItems ? (
					<StripeCheckoutForm
						itemType={"product"}
						cartItems={filteredProductItems}
						user={session.user as User}
					/>
				) : (
					<p> uh..... </p>
				)}
			</div>
		</main>
	)
}
