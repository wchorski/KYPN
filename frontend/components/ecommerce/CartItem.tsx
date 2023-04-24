import moneyFormatter from "../../lib/moneyFormatter"
import { StyledCartItem } from "../../styles/CartItem.styled"
import Image from "next/image"
import CartRemoveItem from "./CartRemoveItem"
import { handlePhoto } from "../../lib/handleProductPhoto"
import { ImageDynamic } from "../elements/ImageDynamic"

export default function CartItem({ item }: any) {


  if (!item?.product) return (
    <StyledCartItem>
      <p>This cart item is no longer supplied by our store</p>
    </StyledCartItem>
  )


  const { product: { id, description, name, price, photo, }, quantity } = item


  return (
    <StyledCartItem>
      {/* <Image
        priority
        src={handlePhoto(photo).image?.url}
        alt={handlePhoto(item.photo).image?.altText ? handlePhoto(item.photo).image?.altText : 'no product photo'}
        width={handlePhoto(photo).image?.width}
        height={handlePhoto(photo).image?.height}
      /> */}

      <ImageDynamic photoIn={photo} />

      <h5>{name}</h5>

      <div className="perItemTotal">
        <p>{moneyFormatter(price * quantity)}</p>

        <em>{quantity} &times; {moneyFormatter(price)} each </em>
      </div>

      <CartRemoveItem id={item.id} />
    </StyledCartItem>
  )
}