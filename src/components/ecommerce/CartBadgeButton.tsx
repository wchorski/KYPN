"use client"

import { useCart } from "@components/hooks/CartStateContext"
import styles, { badge } from "@styles/ecommerce/cart.module.css"
import { IconShoppingBag, IconSpinnerLines } from "@lib/useIcons"

type Props = {
	isNonInteractive?: boolean
}

export function CartBadgeButton({ isNonInteractive }: Props) {
	const { isOpen, openCart, isPending, cartCount } = useCart()

  if(isNonInteractive) return (
    <i
			className={[badge].join(" ")}
			data-tooltip="cart"
			title="shopping cart"
      style={{fontStyle: 'inherit'}}
		>
			<span key={cartCount} className="count tick-down-flick">
				{isPending ? <IconSpinnerLines /> : cartCount}
			</span>
			<IconShoppingBag />
		</i>
  )

	return (
		<button
			onClick={openCart}
			className={[isOpen ? "open" : "", badge].join(" ")}
			data-tooltip="cart"
			title="shopping cart"
		>
			<span key={cartCount} className="count tick-down-flick">
				{isPending ? <IconSpinnerLines /> : cartCount}
			</span>
			<IconShoppingBag />
		</button>
	)
}
