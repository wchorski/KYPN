// cred - kyle4real - https://stackoverflow.com/questions/70236612/prepopulate-date-input-field-with-date-react
import Calendar from "react-calendar"
import styled from "styled-components"
import useForm from "../../lib/useForm"
import { CalendarJosh } from "./CalendarJosh"
import { FormEvent, useEffect, useState } from "react"
import { times } from "lodash"
import { gql, useMutation, useQuery } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"
import { QueryLoading } from "../menus/QueryLoading"
import { QueryError } from "../menus/QueryError"
import { useUser } from "../menus/Session"

// export interface DateType {
//   justDate: Date | undefined,
//   dateTime: Date | null,
// }

export function BookingForm({ services }: { services: any }) {
  console.log(services[0]);
  console.log(services[0].employees);

  const session = useUser()

  const [isSuccess, setIsSuccess] = useState(false)
  const [employeesActive, setEmployeesActive] = useState<any>(services[0].employees)

  const [datePicked, setDatePicked] = useState<string | undefined>()
  const [timePicked, setTimePicked] = useState<string | undefined>()
  // todo make this dynamic!!
  const [times, setTimes] = useState<string[] | undefined>([
    '09:00',
    '09:30',
    '10:01',
    '10:50',
    '13:33',
    '17:12',
  ])

  function handleEmployeeUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
    // console.log(e.target.value)
    setEmployeesActive(services.find((x: any) => x.id === e.target.value).employees)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log({ inputs })
    const formattedInputs = {
      service: {
        connect: {
          id: inputs.service
        }
      },
      dateTime: `${inputs.date}T${inputs.time}:00.000Z`,
      // notes: inputs.name + ' \n' + inputs.email + ' \n\n' + inputs.notes
      notes: `[${inputs.name} | ${inputs.email}] -- ${inputs.notes}`
    }

    if (inputs.staff !== 'no_employee_set') {
      console.log(inputs.employee)

      Object.assign(formattedInputs, {
        employees: {
          connect: [
            { id: inputs.staff }
          ]
        },
      })
    }

    if (session) {
      console.log(session.id + ' : ' + session.name);
      Object.assign(formattedInputs, {
        customer: {
          connect: {
            id: session.id
          }
        }
      })
    }


    // delete formattedInputs.date
    // delete formattedInputs.time

    console.log({ formattedInputs });


    // TODO fill in 'the who' if a customer is already logged in

    const res = await gqlMutation({
      // variables: {
      //   data: inputs
      // },
      // refetchQueries: [{ query: GET_ALL_PRODUCTS }]
      variables: {
        data: formattedInputs
      }
    })

    console.log('res', res)
    // if (res.data.createProduct) clearForm(); setIsSuccess(true)

    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })

  }

  // const { loading: loadingQuery, error: errorQuery, data: dataQuery } = useQuery(QUERY_SERVICES_ALL)

  const [gqlMutation, { loading: loadingMutation, error: errorMutation, data: dataMutation }] = useMutation(MUTATE_BOOKING_CREATE)

  // useEffect(() => {
  //   setEmployeesActive(dataQuery.services[0].employees)

  //   // return () => 
  // }, [dataQuery])

  // const { services } = dataQuery
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    service: services[0].id,
    staff: (employeesActive.length > 0) ? employeesActive[0].id : 'no_employee_set',
    date: datePicked,
    time: timePicked,
    name: session ? session.name : '',
    phone: '',
    email: session ? session.email : '',
    notes: ''
  })

  // useEffect(() => {
  //   setEmployeesActive(services[0].employees)

  //   // return () => 
  // }, [services])


  // if (loadingQuery) return <QueryLoading />
  // if (errorQuery) return <QueryError />


  return (
    <div>

      <ErrorMessage error={errorMutation} />
      {isSuccess && <p>Booking Created</p>}

      <StyledBookingForm onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <fieldset>
          <legend>The What</legend>

          <label htmlFor="service">
            service
            <select name="service" id="service" required
              // onChange={handleChange}
              onChange={(e) => { handleChange(e); handleEmployeeUpdate(e) }}
            >
              {services.map((serv: any) => (
                <option key={serv.id} value={serv.id}> {serv.name} </option>
              ))}
            </select>
          </label>
          <br />

          {employeesActive.length > 0 && (
            <label htmlFor="staff">
              staff member
              <select name="staff" id="staff" required
                onChange={(e) => handleChange(e)}
              >
                {employeesActive.map((employee: any) => (
                  <option key={employee.id} value={employee.id} > {employee.name} </option>
                ))}
              </select>
            </label>
          )}

        </fieldset>

        <fieldset>
          <legend> The When </legend>
          <CalendarJosh date={datePicked} setDatePicked={setDatePicked} times={times} setTimePicked={setTimePicked} setTimes={setTimes} timePicked={timePicked} />

          <label htmlFor="datePicked" className="display-none">
            date
            <input name='datePicked' type="date" id="datePicked" required defaultValue={datePicked} onChange={handleChange} />
          </label>
          <br />

          <label htmlFor="time" className="display-none">
            time
            <input name='time' type="time" id="time" required defaultValue={timePicked} onChange={handleChange} />
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
            <textarea name="notes" id="notes" className="notes" onChange={handleChange} />
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

  label{
    display: flex;
    flex-direction: column;
    max-width: 20rem;

    .notes{
      height: 10em;
    }
  }
`

const MUTATE_BOOKING_CREATE = gql`
  mutation Mutation($data: BookingCreateInput!) {
    createBooking(data: $data) {
      id
      dateTime
    }
  }
`

const QUERY_SERVICES_ALL = gql`
  query Query {
    services {
      id
      name
      description
      price
      employees {
        name
        id
      }
    }
  }
`

// graphql query
// - Services provided
// - users that are an "employee"

// - Users blackout dates and times


// need to send email out when new email is confirmed.