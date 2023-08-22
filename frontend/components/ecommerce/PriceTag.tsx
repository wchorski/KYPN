import moneyFormatter from "../../lib/moneyFormatter";
import { StyledPriceTag } from "../../styles/PriceTag.styled";

type Props = {
  price:number,
}

// todo this is a very short list of currencies but should cover anything relevant to me

export function PriceTag({price}:Props) {

  const money = moneyFormatter(price)
  let currency = '?'

  function handleFormat(){
    switch (true) {
      case money.includes('$'):
        currency = '$'

        return (<>
          <small className="currency"> {currency} </small> 
          <span className="amount"> {money.replace(currency, '')} </span>
        </>)

      case money.includes('¥'):
        currency = '¥'

        return (<>
          <small className="currency"> {currency} </small> 
          <span className="amount"> {money.replace(currency, '')} </span>
        </>)
        
      case money.includes('Kč'):
        currency = 'Kč'

        return (<>
          <span className="amount"> {money.replace(currency, '')} </span>
          <small className="currency"> {currency} </small> 
        </>)

      case money.includes('€'):
        currency = '€'
        return (<>
          <small className="currency"> {currency} </small> 
          <span className="amount"> {money.replace(currency, '')} </span>
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
