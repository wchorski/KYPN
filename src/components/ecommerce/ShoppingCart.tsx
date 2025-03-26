"use client"
import { useCart } from "@components/hooks/CartStateContext"
import Flex from "@components/layouts/Flex"
import styles from "@styles/ecommerce/cart.module.css"
import Link from "next/link"
import React, { useCallback, useEffect, useRef } from "react"
import { TbArrowBarToRight } from "react-icons/tb"

import { CartBadgeButton } from "./CartBadgeButton"
import { CartItemsList } from "./CartItemsList"
import { CartTotal } from "./CartTotal"
import { CouponAddToCartForm } from "./CouponAddToCartForm"

export function ShoppingCart() {
	const elementRef = useRef<HTMLDivElement | null>(null)

	const { isOpen, closeCart, cartItems, cartCount } = useCart()

	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (
				elementRef.current &&
				isOpen &&
				!elementRef.current.contains(e.target as Node)
			) {
				closeCart()
			}
		},
		[isOpen, closeCart]
	)

	useEffect(() => {
		document.addEventListener("click", handleClickOutside)

		return () => {
			// Clean up the event listener when the component unmounts
			document.removeEventListener("click", handleClickOutside)
		}
	}, [handleClickOutside])

	return (
		<div
			className={
				isOpen
					? [styles.shoppingcart, styles.open].join(" ")
					: styles.shoppingcart
			}
			ref={elementRef}
		>
			<header>
				<button
					onClick={(e) => closeCart()}
					className={
						isOpen ? [styles.knob, styles.open].join(" ") : styles.knob
					}
					title="close cart"
				>
					<TbArrowBarToRight />
				</button>
				<Flex
					style={{ paddingTop: "var(--space-l)" }}
					justifyContent="space-between"
				>
					<h2 style={{ margin: "0" }}>Cart</h2>
					<CartBadgeButton isNonInteractive={true} />
				</Flex>
			</header>

			<CartItemsList />

			<footer>
	
				{!cartItems.some((item) => item.coupon !== null) && <CouponAddToCartForm />}

				<div className="flex" style={{ alignItems: "baseline" }}>
					<h3>Total: </h3>
					<div>
						<CartTotal />
						{cartItems.some((i) => i.type === "RENTAL") && (
							<em className={"sub-text"}> + rental </em>
						)}
						{/* {cartItems.some((i) => i.type === "SUBSCRIPTION") && (
							<em className="sub-text">
								{` + ${moneyFormatter(
									cartItems
										.filter((item) => item.subscriptionItem !== null)
										.reduce(
											(acc, item) => acc + (item.subscriptionItem?.price || 0),
											0
										)
								)} subscription`}
							</em>
						)} */}
					</div>
				</div>

				<Link
					href={"/checkout"}
					onClick={() => closeCart()}
					className="button medium"
				>
					Checkout
				</Link>
			</footer>
		</div>
	)
}
