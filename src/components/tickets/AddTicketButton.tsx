import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import moneyFormatter from "@lib/moneyFormatter"
import Link from "next/link"

type Props = {
  date:string|undefined,
}

const now = new Date()

export function AddTicketButton ({  date }:Props) {
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
      <span>Get Tickets</span>
    </Link>
  )
}