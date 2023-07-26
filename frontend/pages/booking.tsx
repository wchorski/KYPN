import { Section } from "../components/blocks/Section"
import { BookingCreate } from "../components/booking/BookingCreate"

export default function BookingPage() {

  return (
    <>
      <Section>
        <h1>Book a Service</h1>
        <BookingCreate />

      </Section>
    </>
  )
}