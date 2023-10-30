'use client'
import { useCart } from "@components/context/CartStateContext"
import moneyFormatter from "@lib/moneyFormatter"

export function CartTotal () {

  const { cartTotal } = useCart()
  return (
    <span>
      {moneyFormatter(cartTotal)}
    </span>
  )
}