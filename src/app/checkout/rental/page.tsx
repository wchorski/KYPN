import { nextAuthOptions } from "@/session"
import { CartItemsList } from "@components/ecommerce/CartItemsList"
import { CartTotal } from "@components/ecommerce/CartTotal"
import { RentalForm } from "@components/ecommerce/RentalForm"
import Flex from "@components/layouts/Flex"
import { Grid } from "@components/layouts/Grid"
import { keystoneContext } from "@ks/context"
import CartItem from "@components/ecommerce/CartItem"
import { User } from "@ks/types"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import { plainObj } from "@lib/utils"
import { envs } from "@/envs"
import { sortedCartItems } from "@lib/sortUtils"
import { Callout } from "@components/blocks/Callout"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function RentalPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	if (!session) return redirect("/login")
	// const { data, error } = await fetch()
	// if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
	// if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>
	const user = (await keystoneContext.withSession(session).query.User.findOne({
		where: { id: session.itemId },
		query,
	})) as User

	if (!user) return notFound()

	const cartRental = user.cart.find((item) => item.rental)?.rental
	const sorteCartItems = sortedCartItems(user.cart)
	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Edit Rental</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<Grid layout={"1_1"} isAuto={false}>
					<div>
						{/* // TODO how to show tickets in a pretty manner with cart context */}
						{!user.cart.some((item) => item.rental) && (
							<Callout intent={"warning"}>
								<p>
									Your cart contains rental items. Please fill out rental
									details first before checking out
								</p>
							</Callout>
						)}
						<h2>Cart Items</h2>
            <CartItemsList />
						{/* <ul className={"unstyled grid gap-m"}>
							{sorteCartItems.map((item) => (
								<CartItem
									key={item.id}
									item={plainObj(item)}
									sessionId={session.itemId}
								/>
							))}
						</ul> */}

            {/* // TODO add back in if you make it reactive with RentalForm */}
						{/* <Flex alignItems="baseline">
							<h2>Total: </h2>
							<p style={{ fontSize: "4rem" }}>
								<CartTotal />
							</p>
						</Flex> */}
					</div>
					<div>
						{!user.cart.some((item) => item.type === "RENTAL") ? (
							<div></div>
						) : (
							<>
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
			</div>
		</main>
	)
}

const query = `
  cart {
    id
    type
    quantity
    subTotal
    product {
      id
      rental_price
      name
      image
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
  }
`
