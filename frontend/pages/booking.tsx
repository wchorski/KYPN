import { BookingCreate } from "../components/booking/BookingCreate"

export default function BookingPage() {

  return (
    <>
      <section className="pad marg">
        <h1>Book a Service</h1>
        <BookingCreate />

      </section>
      {/* <BookingForm /> */}
    </>
  )
}