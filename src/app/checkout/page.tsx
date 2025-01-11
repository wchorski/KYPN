import { nextAuthOptions } from "@/session"
import { StripeCheckoutForm } from "@components/ecommerce/StripeCheckoutForm"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { getServerSession } from "next-auth"

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
				<h1>CheckoutPage</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<StripeCheckoutForm priceId={"price_1Qg8jEG7Yy3hdDH3hTPw9xp5"}/>
			</div>
		</main>
	)
}
