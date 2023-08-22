import moneyFormatter from "../../lib/moneyFormatter";
import { StyledPriceTag } from "../../styles/PriceTag.styled";

type Props = {
  price:number,
}

export function PriceTag({price}:Props) {

  const money = moneyFormatter(price)

  function handleFormat(){
    switch (true) {
      case money.includes('$'):
        return (<>
          <small className="currency"> $ </small> 
          <span className="amount"> {money.replace('$', '')} </span>
        </>)
    
      default:
        return <span> ... </span>

    }
  }

  return (
    <StyledPriceTag>
      {handleFormat()}
    </StyledPriceTag>
  )
}
