'use client'

import { useCart } from "@hooks/CartStateContext"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { client } from "@lib/request"
import styles from '@styles/ecommerce/cart.module.scss'
import { useState } from "react"
// import { CgRemoveR } from "react-icons/cg"


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
  
      // const res = await client.request(mutation, variables)
      // console.log({res})
      const res = await fetch(`/api/gql/protected`, {
        method: 'POST',
        body: JSON.stringify({query, variables})
      }) 
      const data = await res.json()
      console.log({data})

      removeFromCart(id)
      setisPending(false)
      
    } catch (error) {
      console.log('cart removal: ', error);
      
      setisPending(false)
    }

    
  }
  // ? using react context instead of 'cache'
  // function handleUpdate(cache:any, payload:any) {
  //   cache.evict(cache.identify(payload.data.deleteCartItem))
  // }
    
  return (
    <button 
      className={styles.remove}  
      type="button" 
      title='Remove this item from cart'
      disabled={isPending}
      onPointerUp={handleMutation}
    >
      {isPending ? <LoadingAnim /> : <span> &times; </span>}
    </button>
  )
}

const query = `
  mutation DeleteCartItem($where: CartItemWhereUniqueInput!) {
    deleteCartItem(where: $where) {
      id
      quantity
    }
  }
`
