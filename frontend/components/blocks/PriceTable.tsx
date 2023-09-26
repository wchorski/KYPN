import Link from "next/link"
import { ReactNode } from "react"
import styles from './styles/pricetable.module.scss'
import moneyFormatter from "../../lib/moneyFormatter"
import { formatHours } from "../../lib/dateFormatter"

type Props = {
  items: {
    title:string,
    imageSrc:string,
    buttonLink:string,
    buttonLabel:string,
    content:ReactNode,
    price:number,
    service: { data:{
      id:string,
      name:string,
      price:number,
      durationInHours:string,
    }}
  }[]
}

export function PriceTable({items = []}:Props) {
  console.log(items[0].service.data.name);
  
  return (<>
    <table className={styles.pricetable} >
      <thead>
        <tr>
          {items.map((item, i) => (
            <th key={i}>
              <header className={styles.header} >
                <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure>
                <h3>{ item.title || item.service.data.name}</h3>
              </header>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr>
          {items.map((item,i) => (
            <td 
              key={i}
              data-title={item.service.data.name} 
              data-price={moneyFormatter(item.service.data.price)} 
              data-button={item.buttonLabel}
            > 
              <header className={['mobile-only', styles.header].join(' ')}>
                <figure style={{backgroundImage: `url(${item.imageSrc})`}}></figure>
                <h3>{item.title || item.service.data.name}</h3>
                <div className="meta">
                  <h6 className="price"> {moneyFormatter(item.service.data.price)} </h6> 
                  <span>{formatHours(item.service.data.durationInHours) } <small>hours</small></span>
                </div>
                <Link href={item.buttonLink || '/booking'} className="button"> {item.buttonLabel} </Link>
              </header>

              <div className={styles.content} >
                {item.content}
              </div>
            </td>
          ))}
        </tr>
      </tbody>

      <tfoot>
        <tr>
          {items.map((item,i) => (
            <td key={i}>
              <footer className={styles.footer} >
                <div className="meta">
                  <span> <strong>{formatHours(item.service.data.durationInHours)}</strong>  <small>hours</small></span>
                  <h6 className="price"> {moneyFormatter(item.service.data.price)} </h6> 
                </div>
   
                {/* <Link href={item.buttonLink || '/booking'} className="button"> {item.buttonLabel} </Link> */}
                <Link href={`/booking?serviceId=${item.service.data.id}`} className="button"> {item.buttonLabel}  </Link>
              </footer>
            </td>
          ))}
        </tr>
      </tfoot>
    </table>

    {/* <StyledPriceList>
      {items.map(item => (
        <StyledPriceItem imageSrc={item.imageSrc}>
          <header>
            <figure></figure>
            <h3>{item.title}</h3>
          </header>

          <div className="content">
            {item.content}
          </div>
          
          <footer>
            <h6 className="price"> {moneyFormatter(2034000)} </h6>
            <Link href={item.buttonLink || '/booking'} className="button"> {item.buttonLabel} </Link>
          </footer>
        </StyledPriceItem>
      ))}
    </StyledPriceList> */}
  </>)
}

