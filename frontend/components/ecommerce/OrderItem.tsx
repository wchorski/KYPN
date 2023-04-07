import { datePretty } from "../lib/dateFormatter"
import { handlePhoto } from "../lib/handleProductPhoto"
import moneyFormatter from "../lib/moneyFormatter"
import { StyledOrderItem } from "../styles/OrderItem.styled"
import Image from "next/image"
import Link from "next/link"

export default function OrderItem({ order }: any) {

  const { charge, createdAt, id, items, itemsCount, total, user } = order

  function handlePlural(name: string, count: number) {
    if (count > 1) return name + 's'
    return name
  }

  return (
    <StyledOrderItem>

      <p>{datePretty(createdAt)}</p>
      <Link href={`/shop/orders/${id}`}>

        <div className="order-meta">

          <p>{moneyFormatter(order.total)}</p>

          <p>
            {itemsCount} {handlePlural('Product', itemsCount)}
          </p>


          {/* <p>{createdAt}</p> */}
        </div>

        <div className="images">
          {items.map((item: any) => (
            <Image
              priority
              src={handlePhoto(item.photo).image?.url}
              alt={handlePhoto(item.photo).image?.altText ? handlePhoto(item.photo).image?.altText : 'no alt text'}
              width={handlePhoto(item.photo).image?.width}
              height={handlePhoto(item.photo).image?.height}
            />
          ))}
        </div>

      </Link>

    </StyledOrderItem>
  )
}
