import Calendar from "react-calendar"
import { Section } from "../components/blocks/Section"
import { BookingCreate } from "../components/booking/BookingCreate"
import { CalendarDatePicker } from "../components/booking/Calendar"
import { StyledCalendar } from "../styles/elements/Calendar.styled"

export default function BookingPage() {

  return (
    <>
      <Section>
        <StyledCalendar>
          <Calendar />
        </StyledCalendar>
        
        <h1>Book a Service</h1>
        <BookingCreate />

      </Section>
    </>
  )
}