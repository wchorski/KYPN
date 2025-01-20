"use client"

import { useCart } from "@components/hooks/CartStateContext"
import { MdShoppingBag } from "react-icons/md"
import styles from "@styles/ecommerce/cart.module.scss"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { IconSpinnerLines } from "@lib/useIcons"

type Props = {
	prop?: string
}

export function CartButton({ prop }: Props) {
	const { isOpen, openCart, cartItems, isPending } = useCart()

	const count = cartItems?.reduce(
		(tally: any, cartItem: any) => tally + cartItem.quantity,
		0
	)

	return (
		<button
			onClick={openCart}
			className={isOpen ? ["open", styles.badge].join(" ") : styles.badge}
			data-tooltip="cart"
			title="shopping cart"
		>
			<span className="count">{isPending ? <IconSpinnerLines /> : count}</span>
			<MdShoppingBag className="cart" />
		</button>
	)
}
