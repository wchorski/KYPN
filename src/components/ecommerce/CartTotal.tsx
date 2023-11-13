'use client'
import { useCart } from "@components/hooks/CartStateContext"
import moneyFormatter from "@lib/moneyFormatter"

export function CartTotal () {

  const { cartTotal } = useCart()
  return (
    <strong>
      {moneyFormatter(cartTotal)}
    </strong>
  )
}