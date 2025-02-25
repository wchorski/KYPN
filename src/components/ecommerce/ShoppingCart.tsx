"use client"
import { calcTotalPrice } from "@lib/calcTotalPrice"
import { useCart } from "@components/hooks/CartStateContext"
import moneyFormatter from "@lib/moneyFormatter"
import styles from "@styles/ecommerce/cart.module.css"
import React, { useCallback, useEffect, useRef, useState } from "react"
import CartItem from "./CartItem"
import { TbArrowBarToRight } from "react-icons/tb"
import Link from "next/link"
import { CartCount2 } from "./CartCount2"
import { useSession } from "next-auth/react"

import { LoadingAnim } from "@components/elements/LoadingAnim"
import { CartItemsList } from "./CartItemsList"
import { CartTotal } from "./CartTotal"
import { CartBadgeButton } from "./CartBadgeButton"
import Flex from "@components/layouts/Flex"
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
