// cred - kyle4real - https://stackoverflow.com/questions/70236612/prepopulate-date-input-field-with-date-react
import Calendar from "react-calendar"
import styled from "styled-components"
import useForm from "../../lib/useForm"
import { CalendarJosh } from "../../components/booking/CalendarJosh"
import { FormEvent, useState } from "react"

// export interface DateType {
//   justDate: Date | undefined,
//   dateTime: Date | null,
// }

export function BookingForm() {

  const [datePicked, setDatePicked] = useState<string | undefined>()
  const [timePicked, setTimePicked] = useState<string | undefined>()
  const [times, setTimes] = useState<string[] | undefined>()

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    service: 'any',
    staff: 'any',
    date: datePicked,
    time: timePicked,
    name: '',
    email: undefined,
    notes: ''
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log({ inputs });

  }

  return (
    <div>

      <StyledBookingForm onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <fieldset>
          <legend>The What</legend>

          <label htmlFor="service">
            service
            <select name="service" id="service" onChange={handleChange}>
              <option value="consult"> Consult </option>
              <option value="dj"> DJ Service </option>
              <option value="rental"> Rental Service </option>
            </select>
          </label>
          <br />

          <label htmlFor="staff">
            staff member
            <select name="staff" id="staff" onChange={handleChange}>
              <option value="any"> A Staff Member </option>
              <option value="will"> William </option>
              <option value="bill"> Bill </option>
              <option value="suzy"> Suzy </option>
            </select>
          </label>

        </fieldset>

        <fieldset>
          <legend> The When </legend>
          <CalendarJosh date={datePicked} setDatePicked={setDatePicked} times={times} setTimePicked={setTimePicked} setTimes={setTimes} />

          <label htmlFor="datePicked" className="display-none">
            date
            <input name='datePicked' type="date" id="datePicked" value={datePicked} onChange={handleChange} />
          </label>
          <br />

          <label htmlFor="time" className="display-none">
            time
            <input name='time' type="time" id="time" value={timePicked} onChange={handleChange} />
          </label>
        </fieldset>

        <fieldset>
          <legend>The Who</legend>

          <label htmlFor="name">
            name
            <input name='name' type="text" id="name" onChange={handleChange} />
          </label>
          <br />

          <label htmlFor="email">
            email
            <input name='email' type="text" id="email" required onChange={handleChange} />
          </label>
          <br />

          <label htmlFor="phone">
            phone #
            <input name='phone' type="phone" id="phone" onChange={handleChange} />
          </label>
          <br />

          <label htmlFor="notes">
            notes
            <textarea name="notes" id="notes" onChange={handleChange} />
          </label>
        </fieldset>

        <button type="submit"> Submit </button>

      </StyledBookingForm>

    </div>
  )
}


const StyledBookingForm = styled.form`
  background-color: #d0e4dd;
  padding: 1em;

  .display-none{
    display: none;
  }
`