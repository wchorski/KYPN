import { useRouter } from "next/router"
import { BookingSingle } from "../../components/booking/BookingSingle"


export default function BookingById() {

  const router = useRouter()
  
  return (
    <>
      <section className="pad">
        <BookingSingle id={String(router.query.id)}/>
      </section>
    </>
  )
}
