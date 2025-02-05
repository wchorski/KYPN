"use client"

import { useCart } from "@components/hooks/CartStateContext"
import { MdShoppingBag } from "react-icons/md"
import styles from "@styles/ecommerce/cart.module.css"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { IconSpinnerLines } from "@lib/useIcons"

type Props = {
	prop?: string
}

export function CartBadgeButton({ prop }: Props) {
	const { isOpen, openCart, isPending, cartCount } = useCart()

	// const count = cartItems?.reduce(
	// 	(tally: any, cartItem: any) => tally + cartItem.quantity,
	// 	0
	// )

	return (
		<button
			onClick={openCart}
			className={isOpen ? ["open", styles.badge].join(" ") : styles.badge}
			data-tooltip="cart"
			title="shopping cart"
		>
			<span key={cartCount} className="count tick-down-flick">{isPending ? <IconSpinnerLines /> : cartCount}</span>
			<MdShoppingBag className="cart" />
		</button>
	)
}
