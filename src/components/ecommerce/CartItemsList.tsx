'use client'
import { useCart } from "@hooks/CartStateContext"
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

    if(!session?.itemId) return 
    
    (async () => {
      //TODO id how to get getUserCart to be async
      // @ts-ignore
      await getUserCart(session?.itemId).then(
        setIsPending(false)
      )
    })();
    

  
  }, [session])
  
  return <>
    <ul 
      style={{padding: '0'}}
    >
      {isPending && <LoadingAnim /> }
      {!isPending && cartItems?.length <= 0 && <p> Cart is empty. <Link href={`/shop`} onClick={closeCart}> Go to shop </Link> </p>}
      {cartItems?.map((item: any) => <CartItem key={item.id} item={item} sessionId={session?.itemId}/>)}
    </ul>
  </>
}