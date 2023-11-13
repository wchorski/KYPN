import moneyFormatter from "../../lib/moneyFormatter";
import styles from '@styles/ecommerce/pricetag.module.scss'

type Props = {
  price:number,
  subtext?:string,
}

// todo this is a very short list of currencies but should cover anything relevant to me

export function PriceTag({price, subtext}:Props) {

  const money = moneyFormatter(price)
  let currency = '$'
  const dollars = money.replace(currency, '').split('.')[0]
  const cents = money.replace(currency, '').split('.')[1]

  function handleFormat(){
    switch (true) {
      case money.includes('$'):
        currency = '$'

        return (<>
          <span className="amount"> 
            <sup className="currency">{currency}</sup> 
            {dollars} 
            <span className="cents">.{cents}</span> 
            <small className="subtext">{subtext}</small> 
          </span>
        </>)

      case money.includes('¥'):
        currency = '¥'

        return (<>
          <small className="currency"> {currency} </small> 
          <span className="amount"> {money.replace(currency, '')} </span>
          <small className="subtext">{subtext}</small> 
        </>)
        
      case money.includes('Kč'):
        currency = 'Kč'

        return (<>
          <span className="amount"> {money.replace(currency, '')}</span>
          <small className="currency"> {currency} </small> 
          <small className="subtext">{subtext}</small> 
        </>)

      case money.includes('€'):
        currency = '€'
        return (<>
          <small className="currency"> {currency} </small> 
          <span className="amount"> {money.replace(currency, '')} </span>
          <small className="subtext">{subtext}</small> 
        </>)
    
      default:
        return <span> ... </span>

    }
  }

  return (
    <span className={styles.pricetag} >
      {handleFormat()}
    </span>
  )
}
