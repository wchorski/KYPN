"use client"
import moneyFormatter from "@lib/moneyFormatter"
import styles from "@styles/ecommerce/cart.module.css"
import CartRemoveItem from "./CartRemoveItem"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { useEffect, useState } from "react"
import type { CartItem } from "@ks/types"
import ErrorMessage from "../ErrorMessage"
import { useCart } from "@components/hooks/CartStateContext"
import Link from "next/link"

type UpdateCartItem = {
	id: string
	quantity: number
}

type Props = {
	item: CartItem
	sessionId: string | undefined
}

export default function CartItem({ item, sessionId }: Props) {

	if (item.event) return <TicketItem item={item}/>
	if (item.product) return <ProductItem item={item} sessionId={sessionId} />
	if (item.booking) return <BookingItem item={item} />

	return <p>no product or event associated</p>
}

function BookingItem({item}:{item: CartItem}) {

	if (!item.booking) return <p>Booking Not Found</p>

	const {
		quantity,
		booking: { id, summary, price },
	} = item
	return (
		<li className={styles.item}>
			{/* <ImageDynamic
				photoIn={{ url: image, altText: `${summary} featured image` }}
			/> */}

			<div>
				<h5>
					<Link href={`/bookings/${id}`}> {summary} </Link>
				</h5>
        
        <span className="sub-text">booking</span>
			</div>

			<div className="perItemTotal">
				<p>{moneyFormatter(price * quantity)}</p>
			</div>

			<CartRemoveItem id={item.id} />
		</li>
	)
}

function TicketItem({item}:{item: CartItem}) {

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
					<Link href={`/shop/products/${id}`}> {summary} </Link>
				</h5>

				<span>{quantity}</span>
			</div>

			<div className="perItemTotal">
				<p>{moneyFormatter(price * quantity)}</p>
				<em> {moneyFormatter(price)} each </em>
			</div>

			<CartRemoveItem id={item.id} />
		</li>
	)
}

function ProductItem({item, sessionId}:{item: CartItem, sessionId: string|undefined}) {
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

				<div>
					<h5>
						<Link href={`/shop/products/${id}`}> {name} </Link>
					</h5>

					<input
						type="number"
						value={quantityState}
						// defaultValue={quantity}
						onChange={(e) => updateQuantity(Number(e.target.value))}
						// todo only update once input is unselected
						// onBlur={e => updateQuantity(Number(e.target.value))}
					/>
				</div>

				<div className="perItemTotal">
					{type === "RENTAL" && rental_price ? (
						<>
							<p>
								{moneyFormatter(rental_price * quantity)} <small>/hour</small>{" "}
							</p>
							<em> {moneyFormatter(rental_price)} /hour each </em>
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

const query = `

  mutation UpdateCartItem($where: CartItemWhereUniqueInput!, $data: CartItemUpdateInput!) {
    updateCartItem(where: $where, data: $data) {
      id
      quantity
    }
  }

`
