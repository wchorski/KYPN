'use client'
import { CartItem, User } from "@ks/types";
import { calcTotalPrice, calcCartRentalTotal, calcCartSaleTotal } from "@lib/calcTotalPrice";
import { ReactNode, createContext, useContext, useState } from "react";

type CartContext = {
  isOpen: boolean,
  cartTotal:number,
}

const defaultCtx= {
  isOpen: false,
  setIsOpen: (isOpen:boolean) => {},
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
  const [cartTotal, setCartTotal] = useState<number>(0)
  const [cartCount, setCartCount] = useState<number>(0)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(cartItem:CartItem){
    setCartItems(prev => [...prev, cartItem])
    calcCartCount
  }

  // TODO add an updateUserCart that acts like a cache, instead of always requesting the sever the whole new cart

  async function getUserCart(sessionId:string|undefined){

    if(!sessionId) return console.log('no sessionId for getUserCart context');
    
    try {
      // const { user } = await client.request(query, variables) as { user:User }
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

      return { success: true }
      
    } catch (error) {
      console.log('!!! getusercart: ', error);

      return { success: false, error }
    }
  }

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
