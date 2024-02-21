import Link from "next/link"
import { ReactNode } from "react"
import moneyFormatter from "../../lib/moneyFormatter"
import { formatHours } from "../../lib/dateFormatter"
import styles from '@styles/blocs/pricetable.module.scss'
import fetchServicesAndAddons from "@lib/fetchdata/fetchServicesAndAddons"
import { Service } from "@ks/types"

type Props = {
  items: {
    title:string,
    imageSrc:string,
    buttonLink:string,
    buttonLabel:string,
    content:ReactNode,
    price:number,
    service: { id: string},
    // service: { data:{
    //   id:string,
    //   name:string,
    //   price:number,
    //   durationInHours:string,
    // }}
  }[]
}

// any type is a bug workaround
// @ts-ignore
export async function PriceTable({items = []}:Props):ReactElement<any, any> {

  const serviceIds = items?.flatMap(item => item.service?.id) || []
  const { services, addons, error} = await fetchServicesAndAddons(serviceIds, ['no_addons'])
  
  function getService(id:string){
    const service = services?.find(serv => serv.id === id) as Service

    if(service) return service

    return {
      name: 'service not found',
      price: 0,
      durationInHours: '0',
      image: '',
    }
  }
  
  return<>
    <table className={styles.pricetable} >
      <thead>
        <tr>
          {items.map((item, i) => (
            <th key={i}>
              <header className={styles.header} >
                <figure style={{backgroundImage: `url(${item.imageSrc || getService(item.service?.id).image})`}}></figure>
                <h3>{ item.title || getService(item.service?.id).name}</h3>
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
              data-title={getService(item.service?.id).name} 
              data-price={moneyFormatter(getService(item.service?.id).price)} 
              data-button={item.buttonLabel}
            > 
              <header className={['mobile-only', styles.header].join(' ')}>
                <figure style={{backgroundImage: `url(${item.imageSrc || getService(item.service?.id).image})`}}></figure>
                <h3>{item.title || getService(item.service?.id).name}</h3>
                <div className="meta">
                  <h6 className="price"> {moneyFormatter(getService(item.service?.id).price)} </h6> 
                  <span>{formatHours(getService(item.service?.id).durationInHours) } <small>hours</small></span>
                </div>
                <Link href={item.buttonLink || '/bookings'} className="button"> {item.buttonLabel} </Link>
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
                  <span> <strong>{formatHours(getService(item.service?.id).durationInHours)}</strong>  <small>hours</small></span>
                  <h6 className="price"> {moneyFormatter(getService(item.service?.id).price)} </h6> 
                </div>
   
                {/* <Link href={item.buttonLink || '/booking'} className="button"> {item.buttonLabel} </Link> */}
                <Link href={`/bookings?serviceId=${item.service.id}`} className="button"> {item.buttonLabel}  </Link>
              </footer>
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  </>
}

