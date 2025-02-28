import { Coupon } from "../keystone/types"

export default function moneyFormatter(amount: number | undefined = 0) {
	const options = {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}

	if (amount % 100 === 0) {
		options.minimumFractionDigits = 0
	}
	// @ts-ignore
	const formatter = Intl.NumberFormat("en-US", options)

	return formatter.format(amount / 100)
}


export function calcDiscount(total: number, coupon: Coupon) {
  if (coupon.amount_off) {
    return total - coupon.amount_off
  }
  if (coupon.percent_off) {
    const decimal = coupon.percent_off / 100
    const discount = total * decimal
    return total * discount
  }

  return total
}

export function handleCouponDetails(coupon: Coupon) {
  const { duration, duration_in_months } = coupon
  let text = ""
  text += duration
  text += duration_in_months ? `for ${duration_in_months} months` : ""
  return text
}