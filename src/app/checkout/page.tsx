import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { StripeCheckoutForm } from "@components/ecommerce/StripeCheckoutForm"
import { Event, Product } from "@ks/types"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { Metadata } from "next"
import { getServerSession } from "next-auth"

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

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Checkout</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				{/* // TODO if price is 0 then show non */}
				{/* <StripeCheckoutForm
					itemType={"product"}
					quantity={1}
					product={
						{ stripePriceId: "price_1Qg8jEG7Yy3hdDH3hTPw9xp5" } as Product
					}
				/> */}
				{/* // TODO if price is 0 then show non stripe form */}
				<StripeCheckoutForm
					itemType={"ticket"}
					quantity={3}
					event={
						{
							id: "123",
							summary: "My Cool Event",
							image:
								"https://cdn.pixabay.com/photo/2020/04/19/06/45/icecream-5062097_1280.jpg",
							price: 55500,
						} as Event
					}
          email={'Fireatwill35@gmail.com'}
          stripeCustomerId={session?.user.stripeCustomerId}
				/>
			</div>
		</main>
	)
}
