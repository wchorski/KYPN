'use client'
import { useCart } from "@components/hooks/CartStateContext"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"


export function CartItemsList () {

  const [isPending, setIsPending] = useState(true)
  const { data: session, status }  = useSession()
  const { cartItems, closeCart, getUserCart } = useCart()

  useEffect(() => {
    // @ts-ignore 
    if(!session?.itemId) return console.log('no session itemId found');
    // @ts-ignore
    getUserCart(session?.itemId)

    setIsPending(false)
  
  }, [session])
  
  return <>
    {isPending && <LoadingAnim /> }
    {!isPending && cartItems?.length <= 0 && <p> Cart is empty. <Link href={`/shop`} onClick={closeCart}> Go to shop </Link> </p>}
    <ul>
      {cartItems?.map((item: any) => <CartItem key={item.id} item={item} sessionId={session?.itemId}/>)}
    </ul>
  </>
}