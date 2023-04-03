import moneyFormatter from "@/lib/moneyFormatter"
import Image from "next/image"
import styled from "styled-components"
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
          url: `/placeholder.jpg`,
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


const StyledCartItem = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid var(--c-1);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img{
    margin-right: 1rem;
    width: 50px;
    height: auto;
    object-fit: contain;
  }

  h3, p{
    margin: 0;
  }

  em{
    font-size: 1rem;
  }
`