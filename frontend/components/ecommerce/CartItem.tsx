import moneyFormatter from "@/lib/moneyFormatter"
import { StyledCartItem } from "@/styles/CartItem.styled"
import Image from "next/image"
import CartRemoveItem from "./CartRemoveItem"

export default function CartItem({item}:any) {
  

  if(!item?.product) return(
    <StyledCartItem>
      <p>This cart item is no longer supplied by our store</p>
    </StyledCartItem>
  )
  

  const {product:{id, description, name, price, photo, }, quantity} = item

  // TODO use the external handleProductPhoto.ts file
  function handlePhoto(){
    if(!photo){
      return {
        image: {
          url: `/cf-default.png`,
          altText: 'no product image',
          width: 300,
          height: 300,
        }
      }
    }
      
    return photo
  }
  
  return (
    <StyledCartItem>
      <Image 
        priority
        src={handlePhoto().image?.url} 
        alt={handlePhoto().image?.altText ? handlePhoto().image?.altText : 'no alt text'}
        width={handlePhoto().image?.width}
        height={handlePhoto().image?.height}
      />
      <h5>{name}</h5>
      <span className="perItemTotal">
        {moneyFormatter(price * quantity)}
        -
        <em>{quantity} &times; {moneyFormatter(price)} each</em>
      </span>
      <CartRemoveItem id={item.id}/>
    </StyledCartItem>
  )
}