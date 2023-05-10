// cred - kyle4real - https://stackoverflow.com/questions/70236612/prepopulate-date-input-field-with-date-react
import Calendar from "react-calendar"
import styled from "styled-components"
import useForm from "../../lib/useForm"
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"

import { useUser } from "../menus/Session"
import { FormInput } from "../elements/Forminput"
import { CalendarDatePicker } from "./Calendar"
import { TimePicker } from "../elements/TimePicker"
import { filterEmployeeTimes, filterServiceTime } from "../../lib/timesArrayCreator"
import { datePretty, timePretty } from "../../lib/dateFormatter"
import { Availability, User } from "../../lib/types"
import { calcDateTimeRange, calcTimeOverlap, filterTimeAvail } from "../../lib/dateCheckCal"
// import { QUERY_EMPLOYEE_AVAIL } from "./BookingCreate"

// export interface DateType {
//   justDate: Date | undefined,
//   dateTime: Date | null,
// }

type iProps = {
  services: any,
  // employee: any,
  // setEmployeeId: any,
}

enum STAFF_STATE {
  SELECTED = 'selected',
  NOT_SELECTED=  'not_selected',
}

type SuccessfullBook = {
  date: string,
  time: string,
  service: string,
  staff: string,
  msg: string,
  
}

export function BookingForm2({ services }:iProps) {
  // console.log(services[0]);
  // console.log(services[0].employees);

  const session = useUser()
  const formRef = useRef<HTMLFormElement>(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [successfullBook, setSuccessfullBook] = useState<SuccessfullBook>()
  const [animTrig, setAnimTrig] = useState(0)
  
  const [pickedService, setPickedService] = useState<any>()
  const [pickedStaff, setPickedStaff] = useState<User>()
  const [serviceId, setServiceId] = useState('')
  const [employeeOptions, setEmployeeOptions] = useState<any>([])
  const [blackoutDates, setBlackoutDates] = useState<string[]>([])


  const [times, setTimes] = useState<string[]>([])
  const [values, setValues] = useState({
    service: "",
    staff: "",
    // datetime_local: '',
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
    // {
    //   id: 3,
    //   name: 'datetime_local',
    //   type: 'datetime-local',
    //   label: 'Date & Start Time',
    //   errorMessage: 'Must pick a date. It can be an estimate and can be changed later',
    //   required: true,
    // },
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
      placeholder: "John Wick...",
      errorMessage:
        "3-30 characters. A-Z, 0-9, or '-' allowed",
      label: "name",
      pattern: "^[a-zA-Z0-9 -]+",
      minLength: '3',
      maxLength: '30',
      required: false,
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "John@Wick.com...",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 6,
      name: "phone",
      type: "phone",
      placeholder: "123 456 7890...",
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

  

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if(!formRef.current) return console.warn('form is missing');

    // console.log({ values })
    const formattedInputs = {
      start: new Date(`${values.date}T${values.time}`).toISOString(),
      summary: `[NEW] ${values.name ? values.name : values.email}`,
      // dateTime: new Date(values.datetime_local).toISOString(),
      notes: `[${values.name} | ${values.email}] -- ${values.notes}`
    }
    console.log({formattedInputs});
    

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

      Object.assign(formattedInputs, {
        employees: {
          connect: [
            { id: values.staff }
          ]
        },
      })
    } 

    if (session) {
      Object.assign(formattedInputs, {
        customer: {
          connect: {
            id: session.id
          }
        }
      })
    }
    
    // console.log({ formattedInputs })
    const res = await gqlMutation({
      variables: {
        data: formattedInputs
      }
    })

    // console.log('res', res)
    // todo show booking success message
    if (res.data.createBooking) {
      setIsSuccess(true)

      let successObj = {
        date: datePretty(values.date),
        time: timePretty(values.time),
        service: values.service,
        staff: values.staff,
        msg: ''
      }

      if(values.service === '') 
        successObj = {...successObj, msg: "A Service was not selected. We'll reach out to get more details about your event date" }
      if(values.staff === '') 
        successObj = {...successObj, msg: "A staff member was not selected. We'll check and see if an employee is available for this booking"}
      if(values.staff === '' && values.service === '') 
        successObj = {...successObj, msg: "A Staff Member and Service were not selected. We'll reach out to get more details about your event date"}

      setSuccessfullBook(successObj)
    }
    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })

  }

  const [gqlMutation, { loading: loadingMutation, error: errorMutation, data: dataMutation }] = useMutation(MUTATE_BOOKING_CREATE)

  function handleServicePicked(id:string){
    const foundService = services.find((x: any) => x.id === id)
    setPickedService(foundService)

    setTimes(filterServiceTime(
      foundService.buisnessHourOpen,
      foundService.buisnessHourClosed,
      foundService.durationInHours,
    ))

    handleEmployeeUpdate(id)
  }

  function handleEmployeeUpdate(id:string){
    setServiceId(id)
    const foundEmpls = services.find((x: any) => x.id === id)?.employees
    if(!foundEmpls) return []
    
    const formatted = foundEmpls.map((empl:any) => { return {value: empl.id, label: empl.name} } )
    setEmployeeOptions(formatted)
  }

  function handleBlackoutTimes(date:string){
    console.log('----- handleBlackoutTimes ----');
    
    // console.log({date})
    
    if(!pickedStaff) return console.warn('no staff picked, ', pickedStaff);
    
    pickedStaff.availability.map((avail:Availability) => {
      if(avail.type === 'AVAILABLE') return console.log('date is of type AVAILABLE')
      
      // console.log({filteredTimes})
      
      const rangeStart = new Date(avail.start)
      const rangeEnd = new Date(avail.end) 
      
      
      
      if(date !== rangeStart.toLocaleDateString('en-CA')
      && date !== rangeEnd.toLocaleDateString('en-CA')){
        
        resetServiceSlotTimes()
      }  else {
        console.log('these do overlap');
        const filteredTimes = filterTimeAvail(date, times, {start: avail.start, end: avail.end}, pickedService.durationInHours)
        setTimes(filteredTimes)
      }
      // if(filteredTimes === times) return resetServiceSlotTimes()
    })
  }


  function resetServiceSlotTimes(){
    setTimes(filterServiceTime(
      pickedService.buisnessHourOpen,
      pickedService.buisnessHourClosed,
      pickedService.durationInHours,
    ))
  }

  // todo refactor this into a lib file. skip any dates that are in the past!
  function handleBlackoutDates(
    id:string, 
    // serviceRange:{start:string, end:string}
  ){

    resetServiceSlotTimes()
    
    const selectedEmpl = services.find((x: any) => x.id === serviceId)?.employees.find((x:any) => x.id === id)
    if(!selectedEmpl) return setBlackoutDates([])
    setPickedStaff(selectedEmpl)

    const blackoutArray:string[] = []
    
    // TODO assumes that any service spans less than a day. cannot book multiple gigs on one day
    selectedEmpl.gigs.map((gig:any) => {blackoutArray.push(gig.start)})
  

    // TODO this assumes that vacation is per day. Cannot do partial day vacations 
    selectedEmpl.availability.map((avail:Availability) => {
      if(avail.type === 'AVAILABLE') return console.log('date is of type AVAILABLE')

      // console.log('avail.start, ', avail.start);
      
      const startDate = new Date(avail.start);
      const endDate = new Date(avail.end);

      // console.log({serviceRange});
      
      // console.table({
      //   start: avail.start,
      //   end: avail.end,
      // })
      const localOffset = new Date().getTimezoneOffset() * 60000
      const startLocal = new Date(startDate.getTime())
      const startLocalMin = (startLocal.getHours() * 60) + startLocal.getMinutes()
      const endLocal = new Date(endDate.getTime())
      const endLocalMin = (endLocal.getHours() * 60) + endLocal.getMinutes()
      
      // const startTimeUTC  =  startUTC.getUTCHours() * 3600000 + startUTC.getUTCMinutes() * 60000 
      // // const endTimeUTC    =  endUTC.getUTCHours() * 3600000 + endUTC.getUTCMinutes() * 60000 + startUTC.getUTCSeconds() * 1000 + endUTC.getUTCMilliseconds();
      // const endTimeUTC    =  endUTC.getUTCHours() * 3600000 + endUTC.getUTCMinutes() * 60000


      if(startLocalMin > 0){
        startDate.setDate(startDate.getDate() + 1) // do not include partial vacation day, move to next day, zero time
        startDate.setHours(0); startDate.setMinutes(0); startDate.setSeconds(0); startDate.setMilliseconds(0);
      } 

      if(endLocalMin < 1439){
        endDate.setDate(endDate.getDate() - 1) // do not include partial vacation day, move to previous day, zero time
        endDate.setHours(0); endDate.setMinutes(0); endDate.setSeconds(0); endDate.setMilliseconds(0);
      }

      let currentDate = startDate;
      while (currentDate <= endDate) {
        // todo carries start time with it to the other dates
        blackoutArray.push(new Date(currentDate).toString());
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // blackoutArray.push(avail.start)
    })

    // console.log({blackoutArray});
    
    setBlackoutDates(blackoutArray)

    // // @ts-ignore
    // setTimes(prev => filterEmployeeTimes(prev, selectedEmpl.buisnessHourOpen, selectedEmpl.buisnessHourClosed))
  }

  const onChange = (e: any) => {    
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  
  function handleFindProps(name:string){
    const foundObj = inputs.find(obj => {
      return obj.name === name
    })

    return foundObj
  }

  useEffect( () => {
  
    handleBlackoutTimes(values.date)
  
    // return () => 
  }, [values])
  

  return (
    <div>

      <ErrorMessage error={errorMutation} />
      {isSuccess && (<>
        <h2 className="msg success">Booking Created: </h2>

        <ul>
          <li>date: {successfullBook?.date}</li>
          <li>time: {successfullBook?.time}</li>
          <li>service: {successfullBook?.service}</li>
          <li>staff: {successfullBook?.staff}</li>
          <li>message: {successfullBook?.msg}</li>
        </ul>
      </>)}

      {!isSuccess && (

      
        <StyledBookingForm onSubmit={(e: FormEvent) => handleSubmit(e)} ref={formRef} >
          <fieldset>
            <legend>The What</legend>
            <HeightReveal className="service-staff-cont" isShown={true}>
              <FormInput 
                {...handleFindProps('service')}
                value={values['service']}
                onChange={(e:any) => {
                  onChange(e) 
                  handleServicePicked(e.target.value)
                  
                  // handleEmployeeUpdate(e.target.value)
                }}
              />

              {employeeOptions.length > 0 && (

                <FormInput 
                  {...handleFindProps('staff')}
                  value={values['staff']}
                  onChange={(e:any) => {
                    onChange(e)
                    // setEmployeeId(e.target.value)
                    // setTimes(filterServiceTime(
                    //   pickedService.buisnessHourOpen,
                    //   pickedService.buisnessHourClosed,
                    //   pickedService.durationInHours,
                    // ))
                    handleBlackoutDates(
                      e.target.value 
                      // calcDateTimeRange(values.date, values.time, pickedService.durationInHours), 
                    )
                  }}
                  key={employeeOptions}
                />
              )}

            </HeightReveal>
          </fieldset>

          <fieldset >
            <legend> The When </legend>
            <HeightReveal className='datetime-cont' isShown={values.service ? true : false}>

              {/* <FormInput 
                {...handleFindProps('datetime_local')}
                defaultValue={values['datetime_local']}
                disabled
                onChange={onChange}
                // className="hide"
              /> */}
              <div>            
                <FormInput 
                  {...handleFindProps('date')}
                  defaultValue={values['date']}
                  disabled
                  onChange={onChange}
                  // className="hide"
                />

                <CalendarDatePicker 
                  setValues={setValues} 
                  blackoutStrings={blackoutDates}
                  buisnessDays={pickedService?.buisnessDays || []}
                  handleBlackoutTimes={handleBlackoutTimes}
                />
                <br/> 
              </div>

              <div>
                <FormInput 
                  {...handleFindProps('time')}
                  defaultValue={values['time']}
                  onChange={onChange}
                  disabled
                  // className="hide"
                />

                <p>{pickedService?.durationInHours} hour duration</p>

                <TimePicker 
                  values={values} 
                  setValues={setValues} 
                  times={times} 
                  // setTimes={setTimes} 
                />
              </div>
              
            </HeightReveal>
          </fieldset>

          <fieldset>
            <legend>The Who</legend>

            <HeightReveal 
              className="contact-cont"
              isShown={values.time ? true : false}
            >
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

              <button type="submit" disabled={values.email ? false : true}> Submit </button>
            </HeightReveal>
            
          </fieldset>


        </StyledBookingForm>
      )}

    </div>
  )
}


const StyledBookingForm = styled.form`
  background-color: #d0e4dd;
  padding: 1em;
  
  button[type=submit]{
    color: var(--c-3);
    padding: 1em 2em;
    border-radius: 3px;
    transition: all .3s;
    
    &:hover:not([disabled]){
      background-color: var(--c-3);
      color: var(--c-txt-rev);
    }
  }

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
    /* max-width: 20rem; */
    margin-bottom: .5em;

    .notes{
      height: 10em;
    }
  }
`

export function HeightReveal({children, isShown, className}:{children:ReactNode[]|ReactNode, isShown: boolean, className:string}){
  const scrollContRef = useRef<HTMLParagraphElement>(null)
  // if(!scrollContRef.current) return <p>nope</p>
  // console.log(scrollContRef.current.scrollHeight);
  

  return (
    <StyledHeightReveal 
      className={className}
      scrollHeight={ scrollContRef.current ? scrollContRef.current.scrollHeight + 100 : 100}
      // className={isShown ? 'cont expanded' : 'cont collapsed'} ref={scrollContRef}
    >
      <div 
        className={isShown ? `cont  expanded ${className}` : `cont collapsed ${className}`} ref={scrollContRef} 
      >
        {children}
      </div>
    </StyledHeightReveal>
  )
}

const StyledHeightReveal = styled.div<{scrollHeight:number, className:string}>`
  /* border: solid black 1px; */
  /* padding: 1em; */
  /* margin: 1em 0; */

  .datetime-cont{
    display: flex;
  }

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
    padding-top: 5px;
    max-height: ${props => props.scrollHeight}px;
  }
`

const MUTATE_BOOKING_CREATE = gql`
  mutation Mutation($data: BookingCreateInput!) {
    createBooking(data: $data) {
      id
      start
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

function calcDateTimeUTC(date:string, time:string){
  // Create a Date object from the local date-time string

  const localDateTimeString = `${date}T${time}`;
  console.log({localDateTimeString});
  
  return new Date(localDateTimeString).toISOString()
  // const localDate = new Date(localDateTimeString);

  // // Get the local timezone offset in minutes
  // const localOffset = localDate.getTimezoneOffset();

  // // Convert the local time to UTC by subtracting the offset in minutes
  // const utcTime = localDate.getTime() - (localOffset * 60 * 1000);

  // // Create a new Date object from the UTC time
  // const startUTC = new Date(utcTime);

  // return startUTC;
}

// graphql query
// - Services provided
// - users that are an "employee"

// - Users blackout dates and times


// need to send email out when new email is confirmed.