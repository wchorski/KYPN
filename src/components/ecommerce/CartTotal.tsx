'use client'
import { useCart } from "@components/hooks/CartStateContext"
import moneyFormatter from "@lib/moneyFormatter"
import { IconSpinnerLines } from "@lib/useIcons"

export function CartTotal () {

  const { cartTotal, isPending, cartItems } = useCart()


  if(isPending) return <IconSpinnerLines  />
  if(cartItems.length <= 0) return 
  return (
    <strong>
      {moneyFormatter(cartTotal)}
    </strong>
  )
}