'use client'
import moneyFormatter from "@lib/moneyFormatter"
import styles from '@styles/ecommerce/cart.module.scss'
import Image from "next/image"
import CartRemoveItem from "./CartRemoveItem"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { useEffect, useState } from "react"
import { CartItem as TCartItem, CartItem as CartItemType } from "@ks/types"
import ErrorMessage from "../ErrorMessage"
import { useCart } from "@hooks/CartStateContext"
import Link from "next/link"

type UpdateCartItem = {
  id:string,
  quantity:number,
}

type Props = {
  item:TCartItem,
  sessionId:string|undefined,
}

export default function CartItem({ item, sessionId }:Props) {

  const [error, setError] = useState<any>(undefined)
  const { getUserCart } = useCart()

  if (!item?.product) return (
    <li className={styles.item} >
      <p>This cart item is no longer supplied by our store</p>
    </li>
  )
  
  const { product: { id, description, name, price, rental_price, photo, image}, quantity, id: cartItemId, type }:CartItemType = item

  const [quantityState, setQuantityState] = useState(quantity)

  useEffect(() => {
    setQuantityState(quantity)
  
    // return () => 
  }, [quantity])
  

  async function updateQuantity(value:number){

    const variables = {
      where: {
        id: cartItemId
      },
      data: {
        quantity: value
      }
    }
    
    try {
      // const { user } = await client.request(query, variables) as { user:User }
      const res = await fetch(`/api/gql/protected`, {
        method: 'POST',
        body: JSON.stringify({query, variables})
      }) 

      const { updateCartItem } = await res.json() as { updateCartItem:UpdateCartItem}
      setQuantityState(updateCartItem.quantity)
    
      
    } catch (error) {
      console.warn('cart item udate error: ', error);
      setError(error)
    } finally {
      getUserCart(sessionId)
    }
  }


  return <>
    <li className={styles.item} >

      <ImageDynamic photoIn={{ url: image, altText: `${name} featured image`, } || photo} />

      <div>
        <h5>
          <Link href={`/shop/products/${id}`}> {name} </Link>
        </h5>

        <input 
          type="number" 
          value={quantityState}
          // defaultValue={quantity}
          onChange={e => updateQuantity(Number(e.target.value))}
          // todo only update once input is unselected
          // onBlur={e => updateQuantity(Number(e.target.value))}
        /> 
      </div>

      <div className="perItemTotal">

        {type === 'RENTAL' 
          ? <>
            <p>{moneyFormatter(rental_price * quantity)} <small>/hour</small> </p>
            <em> {moneyFormatter(rental_price)} /hour each </em>
          </>
          : <>
            <p>{moneyFormatter(price * quantity)}</p>
            <em> {moneyFormatter(price)} each </em>
          </>
        }
      </div>

      <CartRemoveItem id={item.id} />

    </li>

    <ErrorMessage error={error}/>
  </>
  
}

const query = `

  mutation UpdateCartItem($where: CartItemWhereUniqueInput!, $data: CartItemUpdateInput!) {
    updateCartItem(where: $where, data: $data) {
      id
      quantity
    }
  }

`