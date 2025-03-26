import type {  CartItem, OrderItem  } from "@ks/types"
const typeOrder: Record<string, number> = {
	SALE: 0,
	SUBSCRIPTION: 1,
	RENTAL: 2,
	RENT_RESERVATION: 3,
}
export const sortedCartItems = (cartItems: CartItem[]) =>
	cartItems.sort((a, b) => {
		const getTypePriority = (item: typeof a) =>
			item.event
				? 0
				: item.product
				? 1
				: item.booking
				? 2
				: item.subscriptionItem
				? 3
				: item.rental
				? 4
				: item.coupon?.amount_off
				? 5
				: item.coupon?.percent_off
				? 6
				: 7
		const typeDiff = (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99)

		if (typeDiff !== 0) return typeDiff
		return getTypePriority(a) - getTypePriority(b)
	})

export const sortOrderItems = (cartItems: OrderItem[]) =>
	cartItems.sort((a, b) => {
		const getTypePriority = (item: typeof a) =>
			item.tickets
				? 0
				: item.product
				? 1
				: item.booking
				? 2
				: item.subscriptionItem
				? 3
				: item.rental
				? 4
				: item.coupon?.amount_off
				? 5
				: item.coupon?.percent_off
				? 6
				: 7
		const typeDiff = (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99)

		if (typeDiff !== 0) return typeDiff
		return getTypePriority(a) - getTypePriority(b)
	})
