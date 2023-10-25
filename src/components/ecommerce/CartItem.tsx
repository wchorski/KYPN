'use client'
import moneyFormatter from "@lib/moneyFormatter"
import styles from '@styles/ecommerce/cart.module.scss'
import Image from "next/image"
import CartRemoveItem from "./CartRemoveItem"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { useState } from "react"
import { CartItem as CartItemType } from "@ks/types"
import ErrorMessage from "../ErrorMessage"
import { client } from "@lib/request"

export default function CartItem({ item }: any) {

  const [error, setError] = useState<any>(undefined)

  if (!item?.product) return (
    <li className={styles.item} >
      <p>This cart item is no longer supplied by our store</p>
    </li>
  )


  const { product: { id, description, name, price, photo, image}, quantity, id: cartItemId }:CartItemType = item

  async function updateQuantity(value:number){
    
    
    try {

      const variables = {
        where: {
          id: cartItemId
        },
        data: {
          quantity: value
        }
      }

     const res = await client.request(mutation, variables)

    //  console.log(res);
     

    } catch (error) {
      console.warn('cart item udate error: ', error);
      setError(error)
    }
  }


  return (
    <li className={styles.item}>
      {/* <Image
        priority
        src={handlePhoto(photo).image?.url}
        alt={handlePhoto(item.photo).image?.altText ? handlePhoto(item.photo).image?.altText : 'no product photo'}
        width={handlePhoto(photo).image?.width}
        height={handlePhoto(photo).image?.height}
      /> */}

      <ImageDynamic photoIn={{ url: image, altText: `${name} featured image`, } || photo} />

      <h5>{name}</h5>

      <div className="perItemTotal">
        <p>{moneyFormatter(price * quantity)}</p>

        <input 
          type="number" 
          value={quantity}
          onChange={e => updateQuantity(Number(e.target.value))}
          // todo only update once input is unselected
          // onBlur={e => updateQuantity(Number(e.target.value))}
        /> 
        <em> &times; {moneyFormatter(price)} each </em>
      </div>

      <CartRemoveItem id={item.id} />

      <ErrorMessage error={error}/>
    </li>
  )
}

const mutation = `

  mutation UpdateCartItem($where: CartItemWhereUniqueInput!, $data: CartItemUpdateInput!) {
    updateCartItem(where: $where, data: $data) {
      id
      quantity
    }
  }

`