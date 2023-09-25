import { useRouter } from "next/router"
import { BookingSingle } from "../../../components/booking/BookingSingle"
import { BookingFormUpdate } from "../../../components/booking/BookingFormUpdate"
import { BookingUpdate } from "../../../components/booking/BookingUpdate"


export default function BookingUpdateById() {

  const router = useRouter()
  
  return (
    <>
      <section className="pad">
        <BookingUpdate id={String(router.query.id)}/>
      </section>
    </>
  )
}
