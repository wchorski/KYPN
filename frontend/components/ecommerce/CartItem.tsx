import moneyFormatter from "../../lib/moneyFormatter"
import { StyledCartItem } from "../../styles/CartItem.styled"
import Image from "next/image"
import CartRemoveItem from "./CartRemoveItem"
import { handlePhoto } from "../../lib/handleProductPhoto"
import { ImageDynamic } from "../elements/ImageDynamic"
import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { CartItem as CartItemType } from "../../lib/types"
import ErrorMessage from "../ErrorMessage"

export default function CartItem({ item }: any) {

  if (!item?.product) return (
    <StyledCartItem>
      <p>This cart item is no longer supplied by our store</p>
    </StyledCartItem>
  )


  const { product: { id, description, name, price, photo, image}, quantity, id: cartItemId }:CartItemType = item

  const [quantityState, setQuantityState] = useState(quantity)

  const [ updateCartItem, {data, loading, error}] = useMutation(UPDATE_CARTITEM)

  async function updateQuantity(value:number){
    
    console.log(value);
    
    try {
     const res = await updateCartItem({
      variables: {
        where: {
          id: cartItemId
        },
        data: {
          quantity: value
        }
      }
     })

    //  console.log(res);
     

    } catch (error) {
      console.warn('cart item udate error: ', error);
      
    }
  }


  return (
    <StyledCartItem>
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
          defaultValue={quantity}
          onChange={e => updateQuantity(Number(e.target.value))}
        /> 
        <em> &times; {moneyFormatter(price)} each </em>
      </div>

      <CartRemoveItem id={item.id} />

      <ErrorMessage error={error}/>
    </StyledCartItem>
  )
}

const UPDATE_CARTITEM = gql`

  mutation UpdateCartItem($where: CartItemWhereUniqueInput!, $data: CartItemUpdateInput!) {
    updateCartItem(where: $where, data: $data) {
      id
      quantity
    }
  }

`