import { useRouter } from "next/router"
import { TicketSingle } from "../../components/tickets/TicketSingle"

export default function TicketById() {

  
  const router = useRouter()
  
  
  return (
    <>
      <TicketSingle id={String(router.query.id)}/>
    </>
  )
}
