'use client'
import { useCart } from "@hooks/CartStateContext"
import moneyFormatter from "@lib/moneyFormatter"

export function CartTotal () {

  const { cartTotal } = useCart()
  return (
    <strong>
      {moneyFormatter(cartTotal)}
    </strong>
  )
}