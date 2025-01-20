'use client'
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { useCart } from "@components/hooks/CartStateContext"
import moneyFormatter from "@lib/moneyFormatter"

export function CartTotal () {

  const { cartTotal, isPending, cartItems } = useCart()


  if(isPending) return <LoadingAnim isVisable={isPending} />
  if(cartItems.length <= 0) return 
  return (
    <strong>
      Total: {moneyFormatter(cartTotal)}
    </strong>
  )
}