"use client"
import type {  CartItem, User  } from "@ks/types"
import {
	calcTotalPrice,
} from "@lib/calcTotalPrice"
import type {
	ReactNode} from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"

const defaultCtx = {
	cartTotal: 0,
	cartCount: 0,
	isOpen: false,
	setIsOpen: (isOpen: boolean) => {},
	isPending: false,
	toggleCart: () => {},
	closeCart: () => {},
	openCart: () => {},
	cartItems: [] as CartItem[],
	setCartItems: (cartItems: CartItem[]) => [],
	addToCart: (cartItem: CartItem) => {},
	removeFromCart: (id: string) => {},
	getUserCart: (sessionId: string | undefined) => {},
}

const LocalStateContext = createContext(defaultCtx)

function CartStateProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isPending, setIsPending] = useState<boolean>(false)
	const [cartTotal, setCartTotal] = useState<number>(0)
	const [cartCount, setCartCount] = useState<number>(0)
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	function addToCart(cartItem: CartItem) {

		setCartItems((prev) => {
			const exists = prev.some((item) => item.id === cartItem.id)
			return exists
				? prev.map((item) =>
						item.id === cartItem.id
							? cartItem
							: item
				  )
				: [...prev, cartItem]
		})
	}

	// TODO add an updateUserCart that acts like a cache, instead of always requesting the sever the whole new cart

	// non memoized function (caused probs with useEffect dependancies)
	// async function getUserCart(sessionId:string|undefined){
	const getUserCart = useCallback(async (sessionId: string | undefined) => {
		if (!sessionId) return []
		setIsPending(true)

		try {
			const res = await fetch(`/api/gql/protected`, {
				method: "POST",
				body: JSON.stringify({
					variables: { where: { id: sessionId } },
					query: `
            query getUserCart($where: UserWhereUniqueInput!) {
              user(where: $where) {
                cartTotalPrice
                ${QUERY_USER_CART}
              }
            }
          `,
				}),
			})

			const data = await res.json()

			const { user }: { user: User } = data

			if (!user?.cart) return console.log("!!! user or cart not found")

			user.cart.sort((a: CartItem, b: CartItem) => {
				// Use localeCompare to compare strings
				return a.id.localeCompare(b.id)
			})

			setCartItems(user.cart)
			//? moved to ks virtual field
			// const total = calcCartSaleTotal(user.cart)
			// setCartTotal(user.cartTotalPrice)
			setIsPending(false)

			return { success: true }
		} catch (error) {
			console.log("!!! getusercart: ", error)

			return { success: false, error }
		}
	}, [])

	function calcCartCount(items: CartItem[]) {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
		setCartCount(totalQuantity)
	}

	function removeFromCart(id: string) {
		const updatedItems = cartItems.filter((item) => item.id !== id)
		setCartItems(updatedItems)
		// const total = calcTotalPrice(updatedItems)
		// setCartTotal(total)
	}

	function toggleCart() {
		setIsOpen(!isOpen)
	}
	function closeCart() {
		setIsOpen(false)
	}
	function openCart() {
		setIsOpen(true)
	}

  useEffect(() => {
    calcCartCount(cartItems)
    setCartTotal(calcTotalPrice(cartItems))
  
    // return () => 
  }, [cartItems])
  

	return (
		<LocalStateContext.Provider
			value={{
				isOpen,
				isPending,
				setIsOpen,
				toggleCart,
				closeCart,
				openCart,
				cartItems,
				// @ts-ignore
				setCartItems,
				cartTotal,
				cartCount,
				addToCart,
				getUserCart,
				removeFromCart,
			}}
		>
			{children}
		</LocalStateContext.Provider>
	)
}

function useCart() {
	const all = useContext(LocalStateContext)
	return all
}
export { CartStateProvider, useCart }

export const QUERY_USER_CART = `
  cart {
    id
    type
    quantity
    subTotal
    event {
      id
      summary
      price
      image
    }
    product {
      id
      price
      rental_price
      name
      image
      stripePriceId
      stripeProductId
    }
    booking {
      id
      price
      summary
      service {
        image
      }
    }
    rental {
      id
      summary
      start
      end
      days
      address
      delivery
      timeZone
    }
    coupon {
      name
      code
      amount_off
      percent_off
      stripeId
    }
  }
`