"use client"
import moneyFormatter from "@lib/moneyFormatter"
import styles, { perItemTotal } from "@styles/ecommerce/cart.module.css"
import CartRemoveItem from "./CartRemoveItem"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { useEffect, useState } from "react"
import type { CartItem } from "@ks/types"
import ErrorMessage from "../ErrorMessage"
import { useCart } from "@components/hooks/CartStateContext"
import Link from "next/link"
import Flex from "@components/layouts/Flex"
import { IconCoupon } from "@lib/useIcons"

type UpdateCartItem = {
	id: string
	quantity: number
}

type Props = {
	item: CartItem
	sessionId: string | undefined
}

export default function CartItem({ item, sessionId }: Props) {
	if (item.event) return <TicketItem item={item} />
	if (item.product) return <ProductItem item={item} sessionId={sessionId} />
	if (item.subscriptionItem)
		return <SubscriptionItem item={item} sessionId={sessionId} />
	if (item.booking) return <BookingItem item={item} />
	if (item.rental) return <RentalItem item={item} />
	if (item.coupon) return <CouponCartItem item={item} sessionId={sessionId} />

	return <p>no item associated</p>
}

function RentalItem({ item }: { item: CartItem }) {
	if (!item.rental) return <p>Rental Not Found</p>

	// TODO add rest of data to the cartItem component
	const {
		quantity,
		rental: { id, summary, price, start, end, address, delivery, days },
	} = item
	return (
		<li
			className={styles.item}
			style={{ backgroundColor: "var(--c-txt-bg-darker)" }}
		>
			<ImageDynamic
				photoIn={{
					url: "",
					altText: `${summary} featured image`,
				}}
			/>

			<div>
				<h5>
					<Link href={`/rentals/${id}`}> {summary} </Link>
				</h5>

				<span className="sub-text">rental</span>
			</div>

			<div className={perItemTotal}>
				<p>
					{days}
					<small className="sub-text">/days</small>
				</p>
			</div>

			<CartRemoveItem id={item.id} />
		</li>
	)
}

function BookingItem({ item }: { item: CartItem }) {
	if (!item.booking) return <p>Booking Not Found</p>

	const {
		quantity,
		booking: { id, summary, price, service },
	} = item
	return (
		<li className={styles.item}>
			<ImageDynamic
				photoIn={{
					url: service?.image || "",
					altText: `${summary} featured image`,
				}}
			/>

			<div>
				<h5>
					<Link href={`/bookings/${id}`}> {summary} </Link>
				</h5>

				<span className="sub-text">booking</span>
			</div>

			<div className={perItemTotal}>
				<p>{moneyFormatter(price * quantity)}</p>
			</div>

			<CartRemoveItem id={item.id} />
		</li>
	)
}

function TicketItem({ item }: { item: CartItem }) {
	if (!item.event) return <p>No Event</p>

	const {
		quantity,
		event: { id, summary, image, price },
	} = item
	return (
		<li className={styles.item}>
			<ImageDynamic
				photoIn={{ url: image, altText: `${summary} featured image` }}
			/>

			<div>
				<h5>
					<Link href={`/events/${id}`}> {summary} </Link>
				</h5>

				<span>{quantity}</span>
			</div>

			<div className={perItemTotal}>
				<p>{moneyFormatter(price * quantity)}</p>
				<em> {moneyFormatter(price)} each </em>
			</div>

			<CartRemoveItem id={item.id} />
		</li>
	)
}

export function CouponCartItem({
	item,
	sessionId,
}: {
	item: CartItem
	sessionId: string | undefined
}) {
	const [quantityState, setQuantityState] = useState(item.quantity)

	useEffect(() => {
		setQuantityState(item.quantity)

		// return () =>
	}, [item.quantity])
	const [error, setError] = useState<any>(undefined)
	const { getUserCart } = useCart()

	async function updateQuantity(value: number) {
		const variables = {
			where: {
				id: item.id,
			},
			data: {
				quantity: value,
			},
		}

		// TODO maybe make a server action?
		try {
			// const { user } = await client.request(query, variables) as { user:User }
			const res = await fetch(`/api/gql/protected`, {
				method: "POST",
				body: JSON.stringify({ query, variables }),
			})

			const { updateCartItem } = (await res.json()) as {
				updateCartItem: UpdateCartItem
			}
			setQuantityState(updateCartItem.quantity)
		} catch (error) {
			console.warn("cart item udate error: ", error)
			setError(error)
		} finally {
			getUserCart(sessionId)
		}
	}

	if (!item?.coupon)
		return (
			<li className={styles.item}>
				<p>This cart item is no longer supplied by our store</p>
			</li>
		)

	const {
		coupon: { name, code, percent_off, amount_off, stripeId },
		type,
		quantity,
	} = item

	return (
		<>
			<li className={styles.item} style={{ border: "dashed 1px var(--c-txt)" }}>
				<figure style={{margin: 'var(--space-ms)'}}>
					<IconCoupon />
				</figure>

				<Flex
					flexDirection={"column"}
					gap={"ms"}
					justifyContent={"space-between"}
				>
					<h5>{name}</h5>
					<span>coupon</span>
				</Flex>

				<div className={perItemTotal}>
					{percent_off ? (
						<p>
							-{percent_off} <small>%</small>
						</p>
					) : amount_off ? (
						<p>-{moneyFormatter(amount_off)}</p>
					) : (
						<></>
					)}
				</div>

				<CartRemoveItem id={item.id} />
			</li>

			<ErrorMessage error={error} />
		</>
	)
}
function ProductItem({
	item,
	sessionId,
}: {
	item: CartItem
	sessionId: string | undefined
}) {
	const [quantityState, setQuantityState] = useState(item.quantity)

	useEffect(() => {
		setQuantityState(item.quantity)

		// return () =>
	}, [item.quantity])
	const [error, setError] = useState<any>(undefined)
	const { getUserCart } = useCart()

	async function updateQuantity(value: number) {
		const variables = {
			where: {
				id: item.id,
			},
			data: {
				quantity: value,
			},
		}

		// TODO maybe make a server action?
		try {
			// const { user } = await client.request(query, variables) as { user:User }
			const res = await fetch(`/api/gql/protected`, {
				method: "POST",
				body: JSON.stringify({ query, variables }),
			})

			const { updateCartItem } = (await res.json()) as {
				updateCartItem: UpdateCartItem
			}
			setQuantityState(updateCartItem.quantity)
		} catch (error) {
			console.warn("cart item udate error: ", error)
			setError(error)
		} finally {
			getUserCart(sessionId)
		}
	}

	if (!item?.product)
		return (
			<li className={styles.item}>
				<p>This cart item is no longer supplied by our store</p>
			</li>
		)

	const {
		product: { id, name, price, rental_price, image },
		type,
		quantity,
	} = item

	return (
		<>
			<li className={styles.item}>
				<ImageDynamic
					photoIn={{ url: image, altText: `${name} featured image` }}
				/>

				<Flex
					flexDirection={"column"}
					gap={"ms"}
					justifyContent={"space-between"}
				>
					<h5>
						<Link href={`/products/${id}`}> {name} </Link>
					</h5>

					<input
						className={styles.quantity}
						type="number"
						value={quantityState}
						dir={"rtl"}
						min={1}
						max={999}
						// defaultValue={quantity}
						onChange={(e) => updateQuantity(Number(e.target.value))}
						// todo only update once input is unselected
						// onBlur={e => updateQuantity(Number(e.target.value))}
					/>
				</Flex>

				<div className={perItemTotal}>
					{type === "RENTAL" && rental_price ? (
						<>
							<p>
								{moneyFormatter(rental_price * quantity)} <small>/day</small>{" "}
							</p>
							<em> {moneyFormatter(rental_price)} each </em>
						</>
					) : price ? (
						<>
							<p>{moneyFormatter(price * quantity)}</p>
							<em> {moneyFormatter(price)} each </em>
						</>
					) : (
						<></>
					)}
				</div>

				<CartRemoveItem id={item.id} />
			</li>

			<ErrorMessage error={error} />
		</>
	)
}

function SubscriptionItem({
	item,
	sessionId,
}: {
	item: CartItem
	sessionId: string | undefined
}) {
	const [quantityState, setQuantityState] = useState(item.quantity)

	useEffect(() => {
		setQuantityState(item.quantity)

		// return () =>
	}, [item.quantity])
	const [error, setError] = useState<any>(undefined)
	const { getUserCart } = useCart()

	async function updateQuantity(value: number) {
		const variables = {
			where: {
				id: item.id,
			},
			data: {
				quantity: value,
			},
		}

		try {
			// const { user } = await client.request(query, variables) as { user:User }
			const res = await fetch(`/api/gql/protected`, {
				method: "POST",
				body: JSON.stringify({ query, variables }),
			})

			const { updateCartItem } = (await res.json()) as {
				updateCartItem: UpdateCartItem
			}
			setQuantityState(updateCartItem.quantity)
		} catch (error) {
			console.warn("cart item udate error: ", error)
			setError(error)
		} finally {
			getUserCart(sessionId)
		}
	}

	if (!item?.subscriptionItem)
		return (
			<li className={styles.item}>
				<p>This cart item is no longer supplied by our store</p>
			</li>
		)

	const {
		subscriptionItem: { id, subscriptionPlan, price, billing_interval },
		type,
		quantity,
	} = item

	return (
		<>
			<li className={styles.item}>
				<ImageDynamic
					photoIn={{
						url: subscriptionPlan.image,
						altText: `${name} featured image`,
					}}
				/>

				<Flex
					flexDirection={"column"}
					gap={"ms"}
					justifyContent={"space-between"}
				>
					<h5>
						<Link href={`/shop/subscription-items/${id}`}>
							{subscriptionPlan.name}
						</Link>
					</h5>

					<input
						dir={"rtl"}
						min={1}
						max={999}
						className={styles.quantity}
						type="number"
						value={quantityState}
						// defaultValue={quantity}
						onChange={(e) => updateQuantity(Number(e.target.value))}
						// todo only update once input is unselected
						// onBlur={e => updateQuantity(Number(e.target.value))}
					/>
				</Flex>

				<div className={perItemTotal}>
					<p>{moneyFormatter(price * quantity)}</p>
					<em>{billing_interval} subscription</em>
				</div>

				<CartRemoveItem id={item.id} />
			</li>

			<ErrorMessage error={error} />
		</>
	)
}

const query = `

  mutation UpdateCartItem($where: CartItemWhereUniqueInput!, $data: CartItemUpdateInput!) {
    updateCartItem(where: $where, data: $data) {
      id
      quantity
    }
  }

`
