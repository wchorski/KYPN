// cred - kyle4real - https://stackoverflow.com/questions/70236612/prepopulate-date-input-field-with-date-react
import styled from "styled-components"
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"
import { gql, useMutation } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"

import { useUser } from "../menus/Session"
import { FormInput } from "../elements/Forminput"
import { CalendarDatePicker } from "./Calendar"
import { TimePicker } from "../elements/TimePicker"
import { DATE_OPTION, calcDurationHuman, datePrettyLocal, datePrettyLocalDay, timePretty } from "../../lib/dateFormatter"
import { Availability, Booking, DayTimes, Service, User } from "../../lib/types"
import { findOverlapTimes, isSameCalendarDay } from "../../lib/dateCheckCal"
import { generateTimesArray } from "../../lib/generateTimesArray"
import { calcEndTime, filterBuisnessTimes, findBlackoutDates, findUniqueDays, isDateRangeAvailable } from "../../lib/filterTimeAvail"
import { findEmployeeBusyRanges } from "../../lib/userUtils"
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

type SuccessfullBook = {
  start: string,
  end: string,
  service: string,
  location: string,
  staff: string,
  msg: string,
}

// type Slot = {
//   start: string,
//   end: string,
// }

const genTimeStrings = generateTimesArray().map((t) => t.value)

export function BookingForm2({ services }:iProps) {
  // console.log(services[0]);
  // console.log(services[0].employees);

  const session = useUser()
  const formRef = useRef<HTMLFormElement>(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [successfullBook, setSuccessfullBook] = useState<SuccessfullBook>()
  
  const [pickedService, setPickedService] = useState<Service>(services[0])
  const [pickedStaff, setPickedStaff] = useState<User>()
  const [serviceId, setServiceId] = useState('')
  const [employeeOptions, setEmployeeOptions] = useState<any>([])
  const [locationOptions, setLocationOptions] = useState<any>([])
  const [blackoutDates, setBlackoutDates] = useState<Date[]>([])
  const [partialDates, setPartialDates] = useState<DayTimes[]>([])


  const [times, setTimes] = useState<string[]>(generateTimesArray().map(t => t.value))
  const [values, setValues] = useState({
    service: "",
    location: '',
    staff: "",
    // datetime_local: '',
    date: '',
    timeStart: '',
    timeEnd: '',
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
      name: 'location',
      type: 'select',
      options: locationOptions,
      // options: services[0].employees.map((empl:any) => { return {value: empl.id, label: empl.name} } ),
      errorMessage: 'something is wrong in the location field, please submit again',
      label: 'Location',
      required: false,
    },
    {
      id: 3,
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
      id: 4,
      name: "date",
      type: "date",
      label: "Date",
      errorMessage: 'Must pick a date. It can be an estimate and can be changed later',
      required: true,
    },
    {
      id: 5,
      name: "timeStart",
      type: "time",
      label: "Start Time",
      errorMessage: 'Must pick a time. It can be an estimate and can be changed later',
      required: true,
    },
    {
      id: 6,
      name: "timeEnd",
      type: "time",
      label: "End Time",
      errorMessage: 'Must pick a time. It can be an estimate and can be changed later',
      required: true,
    },

    {
      id: 7,
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
      id: 8,
      name: "email",
      type: "email",
      placeholder: "John@Wick.com...",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 9,
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
      id: 10,
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
    
    const formattedInputs = {
      start: new Date(`${values.date}T${values.timeStart}`).toISOString(),
      summary: `[NEW] ${values.name ? values.name : values.email}`,
      // dateTime: new Date(values.datetime_local).toISOString(),
      notes: `[${values.name} | ${values.email}] -- ${values.notes}`
    }
    // console.log({formattedInputs});
    

    if (values.service !== '' ) {
      Object.assign(formattedInputs, {
        service: {
          connect: {
            id: values.service
          }
        },
      })
    }

    if (values.location !== '' ) {
      Object.assign(formattedInputs, {
        location: {
          connect: {
            id: values.location
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

      const location = services.find((x: any) => x.id === serviceId)?.locations.find((x:any) => x.id === values.location)

      let successObj = {
        start: values.date + 'T' + values.timeStart,
        end: calcEndTime(values.date+'T'+ values.timeStart, Number(pickedService.durationInHours)),
        service: pickedService.name || 'n/a',
        location: location ? location.name : 'n/a' || '',
        staff: pickedStaff?.name || 'n/a',
        msg: "We'll reach out to confirm your booking via email"
      }

      

      if(values.service === '') 
        successObj = {...successObj, msg: "A Service was not selected. We'll reach out to get more details about your event date" }
      // if(values.location === '') 
      //   successObj = {...successObj, msg: "A Location was not selected. We'll reach out to get more details about your event date" }
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

    handleEmployeeUpdate(id)
    handleLocationUpdate(id)
  }

  function handleLocationUpdate(id:string){
    setServiceId(id)
    const foundLocations = services.find((x: any) => x.id === id)?.locations 
    if(!foundLocations) return []
    
    const formatted = foundLocations.map((obj:any) => { return {value: obj.id, label: obj.name} } )
    setLocationOptions(formatted)
  }

  function handleEmployeeUpdate(id:string){
    setServiceId(id)
    const foundEmpls = services.find((x: any) => x.id === id)?.employees
    if(!foundEmpls) return []
    
    const formatted = foundEmpls.map((empl:any) => { return {value: empl.id, label: empl.name} } )
    setEmployeeOptions(formatted)
  }

  function handleBlackoutTimes(date:string){
    // console.log('----- handleBlackoutTimes ----');
    
    // console.log({date})
    
    if(!pickedStaff) return console.log('no staff picked, ', pickedStaff);

    let currentTimes:string[] = generateTimesArray().map(t => t.value)

    // console.log({date});
    
    // * gigs / bookings
    const staffGigsLocal = pickedStaff.gigs?.flatMap((gig:Booking) => {
      
      const start = new Date(gig.start).toLocaleDateString('en-CA')
      const end   = new Date(gig.end).toLocaleDateString('en-CA')
      return [start, end]
    })
    
    
    if(staffGigsLocal?.includes(date)){
      const gigs = pickedStaff.gigs?.filter((obj:Booking) => {
        return new Date(obj.start).toLocaleDateString('en-CA') == date || new Date(obj.end).toLocaleDateString('en-CA') == date
      })
      
      gigs?.map(gig => {
        const filteredTimeStarts = findOverlapTimes({start: gig.start, end: gig.end}, currentTimes, date, Number(pickedService.durationInHours))
        currentTimes = filteredTimeStarts || [] 
      })
    }
    
    
    // * availability
    const staffAvailLocal = pickedStaff.availability?.flatMap((avail:Availability) => {
      const start = new Date(avail.start).toLocaleDateString('en-CA')
      const end   = new Date(avail.end).toLocaleDateString('en-CA')
      
      return [start, end]
    })


    if(staffAvailLocal?.includes(date)){
       // find the gig
       const avails = pickedStaff.availability?.filter((obj:Availability) => {
        return new Date(obj.start).toLocaleDateString('en-CA') == date || new Date(obj.end).toLocaleDateString('en-CA') == date
      })
      
      avails?.map(avail => {
        const filteredTimeStarts = findOverlapTimes({start: avail.start, end: avail.end}, currentTimes, date, Number(pickedService.durationInHours))
        currentTimes = filteredTimeStarts || []  
      })

    }

    if(!staffGigsLocal?.includes(date) && !staffAvailLocal?.includes(date)){
      resetServiceSlotTimes()

    } else {
      
      setTimes(currentTimes)
    }

  }


  function resetServiceSlotTimes(){
    
    const defaultTimes = generateTimesArray().map(t => t.value)
    setTimes(defaultTimes)

  }

  function findPartialDays(id:string) {

    const selectedEmpl = services.find((x: any) => x.id === serviceId)?.employees.find((x:any) => x.id === id)
    if(!selectedEmpl) return setBlackoutDates([])
    setPickedStaff(selectedEmpl)

    const buisnessHours = {
      start: pickedService.buisnessHourOpen,
      end: pickedService.buisnessHourClosed,
    }
    const employeeBusyRanges = findEmployeeBusyRanges(selectedEmpl)
    
    const buisnessTimeStrings = filterBuisnessTimes(genTimeStrings, buisnessHours)
    const uniqueBusyDays = findUniqueDays(employeeBusyRanges)

    const partialDays:DayTimes[] = []
    const busyDays = uniqueBusyDays.filter((day) => {
      const openTimes = buisnessTimeStrings.filter((time) => {
        const [hours, minutes, seconds] = time.split(":").map(Number)
        const testStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours, minutes, seconds)
        const testEnd = new Date(testStart)
        testEnd.setMinutes(testEnd.getMinutes() + Number(pickedService.durationInHours) * 60)

        // ? this caused problems with reseting a Date's time to 00:00:00
        // const testRange = {
        //   start: testStart,
        //   end: testEnd
        // }
        
        // todo filter busyRangeDates that start or end on this 'day'
        // const sameDayBusyRanges = busyRangeDates.filter(busy => {
        //   return isSameCalendarDay(busy.start, testRange.start,) || isSameCalendarDay(busy.end, testRange.end) || isSameCalendarDay(busy.start, testRange.end) || isSameCalendarDay(busy.end, testRange.start)
        // })


        return isDateRangeAvailable(testStart, testEnd, employeeBusyRanges)
      })

      // console.log({openTimes})
      partialDays.push({
        day,
        times: openTimes
      })


      return openTimes.length > 0 ? true : false
    })


    const blackoutDays = partialDays.filter(d => {
      return (d.times.length <= 0)
    })
    const blackoutDts = blackoutDays.map(d => d.day)
    
    setBlackoutDates(blackoutDts)
    setPartialDates(partialDays)
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
  }, [values.date, values.service, values.staff])
  

  return (
    <div>

      <ErrorMessage error={errorMutation} />
      {isSuccess && successfullBook && (<>
        <h2 className="msg success">Booking Created: </h2>

        <ul>
          <li>start: {datePrettyLocal(successfullBook.start, DATE_OPTION.FULL)}</li>
          <li>end: {datePrettyLocal(calcEndTime(successfullBook.start, Number(pickedService.durationInHours)), DATE_OPTION.FULL)}</li>
          <li>service: {successfullBook.service}</li>
          <li>location: {successfullBook.location}</li>
          <li>staff: {successfullBook.staff}</li>
          <li>message: {successfullBook.msg}</li>
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
                  setValues(prev => ({...prev, date: '', timeStart: '', timeEnd: '', staff: '', }))
                  handleServicePicked(e.target.value)
                }}
              />

              {locationOptions.length > 0 && (

                <FormInput 
                  {...handleFindProps('location')}
                  value={values['location']}
                  onChange={(e:any) => {
                    onChange(e)
                    setValues(prev => ({...prev, date: '', timeStart: '', timeEnd: ''}))
                    findPartialDays(e.target.value)
                  }}
                  key={locationOptions}
                />
              )}

              {employeeOptions.length > 0 && (

                <FormInput 
                  {...handleFindProps('staff')}
                  value={values['staff']}
                  onChange={(e:any) => {
                    onChange(e)
                    setValues(prev => ({...prev, date: '', timeStart: '', timeEnd: ''}))
                    findPartialDays(e.target.value)
                  }}
                  key={employeeOptions}
                />
              )}

            </HeightReveal>
          </fieldset>

          <fieldset >
            <legend> The When </legend>
            <HeightReveal className='datetime-cont' isShown={values.staff ? true : false} key={values.service}>

              <div>            
                <FormInput 
                  {...handleFindProps('date')}
                  defaultValue={values['date']}
                  disabled
                  onChange={onChange}
                />

                <CalendarDatePicker 
                  key={values.staff}
                  setValues={setValues} 
                  blackoutDays={blackoutDates}
                  buisnessDays={pickedService?.buisnessDays || []}
                  handleBlackoutTimes={handleBlackoutTimes}
                />
                <br/> 
              </div>

              <div>
                <div className="time-input-cont">
                  <FormInput 
                    {...handleFindProps('timeStart')}
                    defaultValue={values['timeStart']}
                    onChange={onChange}
                    disabled
                  />
                  <FormInput 
                    {...handleFindProps('timeEnd')}
                    defaultValue={values['timeEnd']}
                    onChange={onChange}
                    disabled
                  />
                </div>

                <p className="duration-stamp">{ calcDurationHuman(pickedService?.durationInHours)}</p>

                <TimePicker 
                  values={values} 
                  setValues={setValues} 
                  times={times} 
                  partialDates={partialDates}
                  buisnessHours={{start: pickedService?.buisnessHourOpen, end: pickedService?.buisnessHourClosed}}
                  serviceDuration={Number(pickedService.durationInHours)}
                />
              </div>
              
            </HeightReveal>
          </fieldset>

          <fieldset>
            <legend>The Who</legend>

            <HeightReveal 
              className="contact-cont"
              isShown={values.timeStart ? true : false}
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

  label{
    display: flex;
    flex-direction: column;
    /* max-width: 20rem; */
    margin-bottom: .5em;

    .notes{
      height: 10em;
    }
  }

  .time-input-cont{
    display: flex;
    gap: 1em;
  }

  .duration-stamp{
    padding: 0;
    margin: 0;
  }
`

export function HeightReveal({children, isShown, className}:{children:ReactNode[]|ReactNode, isShown: boolean, className:string}){
  const scrollContRef = useRef<HTMLParagraphElement>(null)

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


  .datetime-cont{
    display: flex;
    flex-wrap: wrap;

    > * {
      padding: .2em;
    }
  }

  .cont{
    overflow-y: hidden;
    transition: all 1s ease-in-out;
  }

  .collapsed{
    max-height: 0;
  }

  .expanded{
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
