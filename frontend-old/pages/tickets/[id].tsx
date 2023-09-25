import { useRouter } from "next/router"
import { TicketSingle } from "../../components/tickets/TicketSingle"

export default function TicketById() {

  
  const router = useRouter()
  
  
  return (
    <>
    <section className="pad">
      <TicketSingle id={String(router.query.id)}/>
    </section>
    </>
  )
}
