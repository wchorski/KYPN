'use client'

import { useCart } from "@components/context/CartStateContext"
import { client } from "@lib/request"
import styles from '@styles/ecommerce/cart.module.scss'
import { useState } from "react"


export default function CartRemoveItem({id}:{id:string}) {

  const [isPending, setisPending] = useState(false)
  const { removeFromCart } = useCart()

  async function handleMutation() {

    try {
      setisPending(true)
      const variables = {
        where: {
          id: id
        }
      }
  
      const res = await client.request(mutation, variables)
      console.log({res})
      removeFromCart(id)

      setisPending(false)
      
    } catch (error) {
      console.log('cart removal: ', error);
      
      setisPending(false)
    }

    
  }

  function handleUpdate(cache:any, payload:any) {
    cache.evict(cache.identify(payload.data.deleteCartItem))
  }
    
  return (
    <button 
      className={styles.remove}  
      type="button" 
      title='Remove this item from cart'
      disabled={isPending}
      onClick={handleMutation}
    >
      &times;
    </button>
  )
}

const mutation = `
  mutation DeleteCartItem($where: CartItemWhereUniqueInput!) {
    deleteCartItem(where: $where) {
      id
      quantity
    }
  }
`
