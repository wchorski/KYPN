import { ImageDynamic } from "@components/elements/ImageDynamic"
import { OrderItem } from "@ks/types"
import Link from "next/link"
import { PriceTag } from "./PriceTag"
import moneyFormatter from "@lib/moneyFormatter"
import styles, { perItemTotal } from "@styles/ecommerce/cart.module.css"

export function ProductOrderItem({ item }: { item: OrderItem }) {
	const { name, price, image, id, rental_price } = item.product
	return (
		<li className={styles.item}>
			<ImageDynamic photoIn={image} />

			<div>
				<Link href={`/products/${id}`}>
					<h5>{name}</h5>
				</Link>
				{/* <em>
					<abbr title="quantity" style={{textDecoration: 'none'}}>qty </abbr>
					{item.quantity}
				</em> */}
				<em>
					<abbr title="quantity" style={{ textDecoration: "none" }}>
						&times;{" "}
					</abbr>
					{item.quantity}
				</em>
			</div>
			<div className={perItemTotal}>
				{item.type === "RENTAL" && rental_price ? (
					<>
						<p>
							{moneyFormatter(rental_price * item.quantity)} <small>/day</small>{" "}
						</p>
						<em> {moneyFormatter(rental_price)} each </em>
					</>
				) : price ? (
					<>
						<p>{moneyFormatter(price * item.quantity)}</p>
						<em> {moneyFormatter(price)} each </em>
					</>
				) : (
					<></>
				)}
			</div>
		</li>
	)
}
