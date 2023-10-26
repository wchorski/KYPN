'use client'
import { CartItem, User } from "@ks/types";
import { ReactNode, createContext, useContext, useState } from "react";

const defaultCtx= {
  isOpen: false,
  setIsOpen: (isOpen:boolean) => {},
  toggleCart: () => {},
  closeCart: () => {},
  openCart: () => {},

  cartItems: [],
  setCartItems: (cartItems:CartItem[]) => [],
  addToCart: (cartItem:CartItem) => {},
  removeFromCart: (id:string) => {},
  getUserCart: (sessionId:string|undefined) => {},
}

const LocalStateContext = createContext(defaultCtx)

function CartStateProvider ({children}:{children: ReactNode}){

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // function addToCart(cartItem:CartItem){
  //   console.log('add to cart');
    
  //   console.log({cartItem});
  //   setCartItems(prev => [...prev, cartItem])
  // }

  // TODO add an updateUserCart that acts like a cache, instead of always requesting the sever the whole new cart

  async function getUserCart(sessionId:string|undefined){

    if(!sessionId) return console.log('no sessionId for getUserCart context');
    
    const variables = {
      where: {
        id: sessionId
      }
    }

    try {
      // const { user } = await client.request(query, variables) as { user:User }
      const res = await fetch(`/api/gql/protected`, {
        method: 'POST',
        body: JSON.stringify({query, variables})
      }) 
      const data = await res.json()
      const { user } = data 
      // console.log(user.cart);

      if(!user.cart) return console.log('cart not found');
      
      console.log('cart context');
      
      console.log(user.cart)
      user.cart.sort((a:CartItem, b:CartItem) => {
        // Use localeCompare to compare strings
        return a.id.localeCompare(b.id);
      });

      setCartItems(user.cart)
      
      
    } catch (error) {
      console.log('!!! getusercart: ', error);
      return { error }
    }
  }

  function removeFromCart(id:string){
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems)
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
        // @ts-ignore
        cartItems,
        // @ts-ignore
        setCartItems,
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

const query = `
  query getUserCart($where: UserWhereUniqueInput!) {
    user(where: $where) {
      cart {
        id
        quantity
        product {
          id
          price
          name
          image
        }
      }
    }
  }
`