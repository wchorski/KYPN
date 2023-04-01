import moneyFormatter from "@/lib/moneyFormatter"
import Image from "next/image"
import styled from "styled-components"

export default function CartItem({item}:any) {

  const {product:{id, description, name, price, photo, }, quantity} = item
  

  return (
    <StyledCartItem>
      <Image 
        src={photo.image.url} 
        alt={photo.image.altText ? photo.image.altText : 'no alt text'}
        width={photo.image.width}
        height={photo.image.height}
      />
      <h5>{name}</h5>
      <span className="perItemTotal">
        {moneyFormatter(price * quantity)}
        -
        <em>{quantity} &times; {moneyFormatter(price)} each</em>
      </span>
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