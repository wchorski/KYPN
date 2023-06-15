import { BookingCreate } from "../components/booking/BookingCreate"

export default function BookingPage() {

  return (
    <>
      <section className="pad marg">
        <h1>Booking Page</h1>
        <BookingCreate />

      </section>
      {/* <BookingForm /> */}
    </>
  )
}