// cred - kyle4real - https://stackoverflow.com/questions/70236612/prepopulate-date-input-field-with-date-react
import Calendar from "react-calendar"
import styled from "styled-components"
import useForm from "../../lib/useForm"
import { CalendarJosh } from "./CalendarJosh"
import { FormEvent, ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import { times } from "lodash"
import { gql, useMutation, useQuery } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"
import { QueryLoading } from "../menus/QueryLoading"
import { QueryError } from "../menus/QueryError"
import { useUser } from "../menus/Session"
import { FormInput } from "../elements/Forminput"
import { CalendarTime } from "./Calendar"
import { TimePicker } from "../elements/TimePicker"

// export interface DateType {
//   justDate: Date | undefined,
//   dateTime: Date | null,
// }

enum STAFF_STATE {
  SELECTED = 'selected',
  NOT_SELECTED=  'not_selected',
}

export function BookingForm2({ services }: { services: any }) {
  // console.log(services[0]);
  // console.log(services[0].employees);

  const session = useUser()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [animTrig, setAnimTrig] = useState(0)
  
  const [employeeOptions, setEmployeeOptions] = useState<any>([])
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
  const [values, setValues] = useState({
    service: "",
    staff: "",
    date: '',
    time: '',
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const inputs = [
    {
      id: 1,
      name: 'service',
      type: 'select',
      options: services.map((serv:any) => { return {value: serv.id, label: serv.name} } ),
      errorMessage: 'must select a service',
      label: 'Service',
      // defaultValue: "",
      required: true,
    },
    {
      id: 2,
      name: 'staff',
      type: 'select',
      options: employeeOptions,
      // options: services[0].employees.map((empl:any) => { return {value: empl.id, label: empl.name} } ),
      errorMessage: 'something is wrong in the staff field, please submit again',
      label: 'Staff Member',
      required: false,
    },
    {
      id: 3,
      name: "date",
      type: "date",
      label: "Date",
      errorMessage: 'Must pick a date. It can be an estimate and can be changed later',
      required: true,
    },
    {
      id: 4,
      name: "time",
      type: "time",
      label: "Time",
      errorMessage: 'Must pick a time. It can be an estimate and can be changed later',
      required: true,
    },

    {
      id: 5,
      name: "name",
      type: "text",
      placeholder: "name...",
      errorMessage:
        "name should be 3-16 characters and shouldn't include any special character!",
      label: "name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: false,
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "email...",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 6,
      name: "phone",
      type: "phone",
      placeholder: "123 456 7890",
      errorMessage: 'Please format phone number to "123 456 7890" ',
      // hint: 'format "123 456 7890" ',
      // todo this only validates US numbers
      pattern: "[0-9]{3} [0-9]{3} [0-9]{4}",
      maxLength: "12",
      label: "Phone",
      required: false,
    },
    {
      id: 7,
      name: "notes",
      type: "textarea",
      errorMessage: 'Something when wrong with "notes" field. Please try submitting again',
      label: "Notes",
      required: false,
    },
  ];

  // function handleEmployeeUpdate(e: React.ChangeEvent<HTMLSelectElement>) {
  //   // console.log(e.target.value)
  //   setEmployeeOptions(services.find((x: any) => x.id === e.target.value).employees)
  // }

  

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if(!formRef.current) return console.warn('form is missing');

    console.log({ values })
    const formattedInputs = {
      dateTime: `${values.date}T${values.time}:00.000Z`,
      // notes: inputs.name + ' \n' + inputs.email + ' \n\n' + inputs.notes
      notes: `[${values.name} | ${values.email}] -- ${values.notes}`
    }

    if (values.service !== '' ) {
      Object.assign(formattedInputs, {
        service: {
          connect: {
            id: values.service
          }
        },
      })
    }

    if (values.staff !== '' ) {
      console.log('staff selected, ', values.staff);
      
      Object.assign(formattedInputs, {
        employees: {
          connect: [
            { id: values.staff }
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

    // console.log({ formattedInputs });

    // console.log(formRef.current.reportValidity());
    
    // TODO fill in 'the who' if a customer is already logged in

    const res = await gqlMutation({
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

  const [gqlMutation, { loading: loadingMutation, error: errorMutation, data: dataMutation }] = useMutation(MUTATE_BOOKING_CREATE)

  function handleEmployeeUpdate(e:React.ChangeEvent<HTMLSelectElement>){
    const foundEmpl = services.find((x: any) => x.id === e.target.value)?.employees
    if(!foundEmpl) return []
    const formatted = foundEmpl.map((empl:any) => { return {value: empl.id, label: empl.name} } )
    // console.log({formatted});
    
    setEmployeeOptions(formatted)
  }

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  
  function handleFindProps(name:string){
    const foundObj = inputs.find(obj => {
      return obj.name === name
    })

    return foundObj
  }

  return (
    <div>

      <ErrorMessage error={errorMutation} />
      {isSuccess && <p>Booking Created</p>}

      <StyledBookingForm onSubmit={(e: FormEvent) => handleSubmit(e)} ref={formRef} >
        <fieldset>
          <legend>The What</legend>
          <HeightReveal isShown={true}>
            <FormInput 
              {...handleFindProps('service')}
              value={values['service']}
              onChange={(e:any) => {
                onChange(e) 
                handleEmployeeUpdate(e)
              }}
            />

            {employeeOptions.length > 0 && (

              <FormInput 
                {...handleFindProps('staff')}
                value={values['staff']}
                onChange={onChange}
                key={employeeOptions}
              />
            )}

          </HeightReveal>
        </fieldset>

        <fieldset >
          <legend> The When </legend>
          <HeightReveal isShown={values.service ? true : false}>

            <FormInput 
              {...handleFindProps('date')}
              defaultValue={values['date']}
              // disabled
              onChange={onChange}
              className="hide"
            />

            {/* <CalendarTime 
              values={values} 
              setValues={setValues} 
              times={times} 
              setTimes={setTimes} 
              />
            <br/>  */}

            <FormInput 
              {...handleFindProps('time')}
              defaultValue={values['time']}
              onChange={onChange}
              // disabled
              className="hide"
            />

            {/* <TimePicker 
              values={values} 
              setValues={setValues} 
              times={times} 
              setTimes={setTimes} 
            /> */}
            
          </HeightReveal>
        </fieldset>

        <fieldset>
          <legend>The Who</legend>

          <HeightReveal isShown={values.time ? true : false}>
            <FormInput 
              {...handleFindProps('name')}
              value={values['name']}
              onChange={onChange}
            />

            <FormInput 
              {...handleFindProps('email')}
              value={values['email']}
              onChange={onChange}
            />

            <FormInput 
              {...handleFindProps('phone')}
              value={values['phone']}
              onChange={onChange}
            />

            <FormInput 
              {...handleFindProps('notes')}
              value={values['notes']}
              onChange={onChange}
            />

          </HeightReveal>
        </fieldset>

        <button type="submit"> Submit </button>

      </StyledBookingForm>

    </div>
  )
}


const StyledBookingForm = styled.form`
  background-color: #d0e4dd;
  padding: 1em;
  

  /* fieldset{
    max-height: 0em;
    overflow: hidden;
    transition: all 2s ease-in-out;

    &.open{
      max-height: 99999em;
      background-color: #7fe9ad;
    }
  } */

  .hide{
    /* display: none; */
    opacity: .3;
    /* max-height: 1px;
    overflow: hidden; */

    input, select{
      /* pointer-events: none; */
    }
  }

  label{
    display: flex;
    flex-direction: column;
    max-width: 20rem;
    margin-bottom: .5em;

    .notes{
      height: 10em;
    }
  }
`

export function HeightReveal({children, isShown}:{children:ReactNode[]|ReactNode, isShown: boolean}){
  const scrollContRef = useRef<HTMLParagraphElement>(null)
  // if(!scrollContRef.current) return <p>nope</p>
  // console.log(scrollContRef.current.scrollHeight);
  

  return (
    <StyledHeightReveal 
      scrollHeight={ scrollContRef.current ? scrollContRef.current.scrollHeight + 100 : 100}
      // className={isShown ? 'cont expanded' : 'cont collapsed'} ref={scrollContRef}
    >
      <div 
        className={isShown ? 'cont expanded' : 'cont collapsed'} ref={scrollContRef} 
      >
        {children}
      </div>
    </StyledHeightReveal>
  )
}

const StyledHeightReveal = styled.div<{scrollHeight:number}>`
  /* border: solid black 1px; */
  /* padding: 1em; */
  /* margin: 1em 0; */

  .cont{
    /* border: solid 1px black; */
    /* border-radius: 5px; */

    /* font-size: 16px; */
    /* line-height: 38px; */
    /* padding: 0.3em; */
    overflow-y: hidden;
    transition: all 1s ease-in-out;
  }

  .collapsed{
    max-height: 0;
    /* background-color: #05052d; */
  }

  .expanded{
    /* background-color: white; */
    max-height: ${props => props.scrollHeight}px;
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