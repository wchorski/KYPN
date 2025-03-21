import type {  CartItem  } from "@ks/types"

export function calcTotalPrice(cart: CartItem[]) {
  //? Cartitem.ts set's rental products subTotal to 0
	const subTotal = cart.reduce((accumulator, item) => {
		return accumulator + item.subTotal
	}, 0)

	if (subTotal <= 0) return 0

	const discount = cart
		.filter((cartItem) => cartItem.coupon)
		.reduce(
			(acc, { coupon }) => {
				// one coupon is only allowed to have one positive value in `amount_off` or `percent_off`
				if (coupon?.amount_off) {
					acc.amount_off += coupon.amount_off
				} else if (coupon?.percent_off) {
					acc.percent_off += coupon.percent_off
				}

				return acc
			},
			{ amount_off: 0, percent_off: 0 }
		)

	const totalAfterAmountOff = subTotal - discount.amount_off
	const percentToDecimal = discount.percent_off / 100

  //TODO don't allow negative numbers
	return totalAfterAmountOff - totalAfterAmountOff * percentToDecimal
}

export function calcCartRentalTotal(cartItems: CartItem[]) {
	const rentalItems = cartItems.filter((item) => item.type === "RENTAL")

	const total_per_hour = rentalItems.reduce((accumulator, item) => {
		return accumulator + (item.product?.rental_price || 0 * item.quantity)
	}, 0)

	return total_per_hour
	// return total_per_hour * hours
}

export function calcCartSaleTotal(cartItems: CartItem[]) {
	const saleItems = cartItems.filter((item) => item.type === "SALE")

	const subTotal = saleItems.reduce((accumulator, item) => {
		const itemPrice =
			item.product?.price || item.event?.price || item.booking?.price || 0
		return accumulator + (itemPrice || 0 * item.quantity)
	}, 0)

	if (subTotal <= 0) return 0

	const discount = cartItems
		.filter((cartItem) => cartItem.coupon)
		.reduce(
			(acc, { coupon }) => {
				// one coupon is only allowed to have one positive value in `amount_off` or `percent_off`
				if (coupon?.amount_off) {
					acc.amount_off += coupon.amount_off
				} else if (coupon?.percent_off) {
					acc.percent_off += coupon.percent_off
				}

				return acc
			},
			{ amount_off: 0, percent_off: 0 }
		)

	const totalAfterAmountOff = subTotal - discount.amount_off

	return (
		totalAfterAmountOff - (totalAfterAmountOff * discount.percent_off) / 100
	)
}
