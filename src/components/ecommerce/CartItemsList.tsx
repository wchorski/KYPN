"use client"
import { useCart } from "@components/hooks/CartStateContext"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"
import { CartItem as TCartItem } from "@ks/types"
import { Callout } from "@components/blocks/Callout"

export function CartItemsList() {
	// const [isPending, setIsPending] = useState(true)
	const { data: session, status } = useSession()
	const { cartItems, closeCart, getUserCart, isPending } = useCart()

	useEffect(() => {
		if (!session?.itemId) return

		getUserCart(session?.itemId)
	}, [session, getUserCart])

	const ticketCartItems = cartItems.filter((item) => item.event?.id)
	// const filteredProductItems = cartItems.filter((item) => item.product?.id)
	// const filteredBookingItems = cartItems.filter((item) => item.booking?.id)

	const typeOrder: Record<string, number> = {
		SALE: 0,
		SUBSCRIPTION: 1,
		RENTAL: 2,
		RENT_RESERVATION: 3,
	}

	const sortedCartItems = cartItems.sort((a, b) => {
		const getTypePriority = (item: typeof a) =>
			item.event
				? 0
				: item.product
				? 1
				: item.booking
				? 2
				: item.subscriptionPlan
				? 3
				: item.rental
				? 4
				: item.coupon
				? 5
				: 6
		const typeDiff = (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99)

		if (typeDiff !== 0) return typeDiff
		return getTypePriority(a) - getTypePriority(b)
	})

	return (
		<>
			<ul style={{ padding: "0" }}>
				{!session || isPending ? (
					<LoadingAnim isVisable={isPending} />
				) : cartItems?.length <= 0 ? (
					<p>
						Cart is empty. View the{" "}
						<Link href={`/shop`} onClick={closeCart}>
							Shop
						</Link>{" "}
						or checkout some{" "}
						<Link href={`/events`} onClick={closeCart}>
							Events
						</Link>
					</p>
				) : (
					<>
						{/* //TODO could just do sort instead of multi maps */}
						{ticketCartItems.length > 0 && (
							<li>
								<TicketAvailabilityMessage />
							</li>
						)}
						{sortedCartItems.map((item, i) => (
							<CartItem key={item.id} item={item} sessionId={session?.itemId} />
						))}
						{/* {ticketCartItems?.map((item, i) => (
							<CartItem key={i} item={item} sessionId={session?.itemId} />
						))}
						{filteredProductItems?.map((item, i) => (
							<CartItem key={i} item={item} sessionId={session?.itemId} />
						))}
						{filteredBookingItems?.map((item, i) => (
							<CartItem key={i} item={item} sessionId={session?.itemId} />
						))} */}
					</>
				)}
			</ul>
		</>
	)
}

function TicketAvailabilityMessage() {
	return (
		<Callout intent={"warning"}>
			<p>
				Tickets added to cart are not guaranteed. Proceed with checkout to
				secure available tickets.
			</p>
		</Callout>
	)
}
