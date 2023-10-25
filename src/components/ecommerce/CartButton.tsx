'use client'

import { useCart } from "@components/context/CartStateContext"
import { MdShoppingBag } from "react-icons/md"

type Props = {
  prop?:string
}

export function CartButton ({ prop }:Props) {

  const { isOpen, openCart } = useCart()
  
  return (
    <button onClick={openCart} className={isOpen ? 'open' : ''} data-tooltip="cart">
      <MdShoppingBag className="cart"/>
    </button>
  )
}