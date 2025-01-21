'use client'
import { CartItem, User } from "@ks/types";
import { calcTotalPrice, calcCartRentalTotal, calcCartSaleTotal } from "@lib/calcTotalPrice";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";

const defaultCtx= {
  isOpen: false,
  setIsOpen: (isOpen:boolean) => {},
  isPending: true,
  toggleCart: () => {},
  closeCart: () => {},
  openCart: () => {},

  cartItems: [] as CartItem[],
  setCartItems: (cartItems:CartItem[]) => [],
  addToCart: (cartItem:CartItem) => {},
  removeFromCart: (id:string) => {},
  getUserCart: (sessionId:string|undefined) => {},
  cartTotal: 0,
}

const LocalStateContext = createContext(defaultCtx)

function CartStateProvider ({children}:{children: ReactNode}){

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(true)
  const [cartTotal, setCartTotal] = useState<number>(0)
  const [cartCount, setCartCount] = useState<number>(0)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(cartItem:CartItem){
    setCartItems(prev => [...prev, cartItem])
    calcCartCount
  }

  // TODO add an updateUserCart that acts like a cache, instead of always requesting the sever the whole new cart

  // non memoized function (caused probs with useEffect dependancies)
  // async function getUserCart(sessionId:string|undefined){
  const getUserCart = useCallback(async (sessionId:string|undefined) => {

    // setIsPending(true) // is already set to true
    if(!sessionId) return []

    try {
      const res = await fetch(`/api/gql/protected`, {
        method: 'POST',
        body: JSON.stringify({
          variables: { where: {id: sessionId} },
          query: `
            query getUserCart($where: UserWhereUniqueInput!) {
              user(where: $where) {
                cart {
                  id
                  type
                  quantity
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
                  }
                }
              }
            }
          `, 
        })
      }) 
      const data = await res.json()
      
      const { user }:{user:User} = data 

      if(!user?.cart) return console.log('!!! user or cart not found');
      
      user.cart.sort((a:CartItem, b:CartItem) => {
        // Use localeCompare to compare strings
        return a.id.localeCompare(b.id);
      });

      setCartItems(user.cart)
      const total = calcCartSaleTotal(user.cart)
      setCartTotal(total)
      setIsPending(false)

      return { success: true }
      
    } catch (error) {
      console.log('!!! getusercart: ', error);

      return { success: false, error }
    }
  }, [])

  function calcCartCount(items:CartItem[]){
    const accum = items.reduce((accumulator, item) => {
      return 1 * item.quantity;
    }, 0)
    setCartCount(accum)
  }

  function removeFromCart(id:string){
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems)
    const total = calcTotalPrice(updatedItems)
    setCartTotal(total)
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

  return(
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

function useCart(){
  const all = useContext(LocalStateContext)
  return all
}
export {CartStateProvider, useCart}
