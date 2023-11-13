import moneyFormatter from "@lib/moneyFormatter"
import Link from "next/link"

type Props = {
  price:number|undefined,
  date:string|undefined,
}

const now = new Date()

export function AddTicketButton ({ price, date }:Props) {
  const startDate = new Date(String(date))


  if(now > startDate) return (
    <button 
      className={'button large'} 
      disabled={true}
      style={{
        marginLeft: 'auto',
      }}
    >
      Past Event
    </button>
  )

  return (
    <Link
      href={`?${new URLSearchParams({ popup: 'modal'})}`}
      className={'button large'} 
      style={{
        marginLeft: 'auto'
      }}
      // onClick={() => setIsPopup(true)}
    > 
      {price && price > 0 ? (
        <span>{moneyFormatter(price)} per Ticket</span>
      ) : (
        <span> Free </span>
      )}
    </Link>
  )
}