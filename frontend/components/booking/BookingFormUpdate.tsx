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
import { Availability, Booking, DayTimes, Service, User, Addon } from "../../lib/types"
import { findOverlapTimes, isSameCalendarDay } from "../../lib/dateCheckCal"
import { generateTimesArray } from "../../lib/generateTimesArray"
import { calcEndTime, filterBuisnessTimes, findBlackoutDates, findUniqueDays, isDateRangeAvailable } from "../../lib/filterTimeAvail"
import { findEmployeeBusyRanges } from "../../lib/userUtils"
import { useRouter } from "next/router"
import moneyFormatter from "../../lib/moneyFormatter"
import Link from "next/link"
// import { QUERY_EMPLOYEE_AVAIL } from "./BookingCreate"

// export interface DateType {
//   justDate: Date | undefined,
//   dateTime: Date | null,
// }

type iProps = {
  services: Service[],
  addons: Addon[],
  booking: Booking,
  // employee: any,
  // setEmployeeId: any,
}

type SuccessfullBook = {
  start: string,
  end: string,
  service: string,
  addons: string[],
  location: string,
  staff: string,
  msg: string,
}

// type Slot = {
//   start: string,
//   end: string,
// }

const genTimeStrings = generateTimesArray().map((t) => t.value)

export function BookingFormUpdate({ services, addons, booking }:iProps) {
  // console.log(services[0]);
  // console.log(services[0].employees);
  const {query, push:routerPush} = useRouter()

  const bookingAddonIds = booking?.addons.flatMap(ad => ad.id)
  const bookingEmployeeIds = booking?.employees.flatMap(emp => emp.id)
  // console.log({bookingAddonIds});
  
  const errorRef = useRef<HTMLDivElement|null>(null)
  const session = useUser()
  const formRef = useRef<HTMLFormElement>(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [successfullBook, setSuccessfullBook] = useState<SuccessfullBook>()
  
  const [serviceIdState, setServiceIdState] = useState(query?.serviceId ? query.serviceId : "")
  const [pickedService, setPickedService] = useState<Service|undefined>(services.find(serv => serv.id === booking.service.id))
  const [pickedStaff, setPickedStaff] = useState<User>()
  const [serviceId, setServiceId] = useState('')
  const [employeeOptions, setEmployeeOptions] = useState<any>([])
  const [locationOptions, setLocationOptions] = useState<any>([])
  const [addonsOptions, setAddonsOptions] = useState([])
  const [blackoutDates, setBlackoutDates] = useState<Date[]>([])
  const [partialDates, setPartialDates] = useState<DayTimes[]>([])

  // console.log(booking?.addons.flatMap(ad => ad.id));
  

  const [times, setTimes] = useState<string[]>(generateTimesArray().map(t => t.value))
  const [values, setValues] = useState<any>({
    service: booking.service.id || "",
    location: booking?.location.id || '',
    staff: booking?.employees[0].id || '',
    // datetime_local: '',
    date: new Date(booking?.start).toLocaleDateString('en-CA'),
    timeStart: new Date(booking?.start).toLocaleTimeString('en-US', { hour12: false }),
    timeEnd: '',
    name: booking?.name || '',
    // email: booking?.customer?.email || '',
    email: booking?.email || '',
    phone: booking?.phone || '',
    notes: booking?.notes || '',
    addonIds: booking?.addons.flatMap(ad => ad.id),
  });
  
  const serviceOptions = services.map((serv:any) => { return {value: serv.id, label: serv.name,} })

  // console.log(values.service);
  
  const inputs = [
    {
      id: 1,
      name: 'service',
      type: 'select',
      options: serviceOptions,
      errorMessage: 'must select a service',
      label: 'Service',
      value: values.service,
      // defaultValue: "",
      required: true,
    },
    {
      id: 2,
      name: 'location',
      type: 'select',
      options: locationOptions,
      value: values.location,
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
      value: values.staff,
      // options: services[0].employees.map((empl:any) => { return {value: empl.id, label: empl.name} } ),
      errorMessage: 'something is wrong in the staff field, please submit again',
      label: 'Staff Member',
      required: false,
    },
    // {
    //   id: 11,
    //   name: 'addons',
    //   type: 'checkboxes',
    //   options: [{value: '111', label: 'ONE', name: 'one'}, {value: '222', label: 'two'}],
    //   errorMessage: 'something is wrong in the addons field, please submit again',
    //   label: 'Add-Ons',
    //   required: false,
    // },
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
      value: values.date,
      errorMessage: 'Must pick a date. It can be an estimate and can be changed later',
      required: true,
    },
    {
      id: 5,
      name: "timeStart",
      type: "time",
      value: values.timeStart,
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
      // defaultValue: values.name + ' ' + (values.nameLast ? values.nameLast : ''),
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
      // defaultValue: values.email,
      required: true,
    },
    {
      id: 9,
      name: "phone",
      type: "phone",
      // defaultValue: values?.phone || '',
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
      value: values.notes,
      required: false,
    },
  ];

  

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // console.log(values);
    
    if(!formRef.current) return console.warn('form is missing');
    
    const formattedInputs = {
      start: new Date(`${values.date}T${values.timeStart}`).toISOString(),
      summary: `${values.name ? values.name : values.email}`,
      // dateTime: new Date(values.datetime_local).toISOString(),
      notes: `[name: ${values.name}, email: ${values.email}] -- ${values.notes}`
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
    // console.log('values.addonIds, ', values.addonIds);
    
    if (values.addonIds.length > 0 ) {
      // console.log(values.addonIds);
      
      Object.assign(formattedInputs, {
        addons: {
          connect: values.addonIds.map((addonId:string) => ({id: addonId}))
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

    // if (values.staff !== '' ) {

    //   Object.assign(formattedInputs, {
    //     employees: {
    //       connect: [
    //         { id: values.staff }
    //       ]
    //     },
    //   })
    // } 

    if (session) {
      Object.assign(formattedInputs, {
        customer: {
          connect: {
            id: session.id
          }
        }
      })
    }
    // todo if employee changed, remove [0] and replace with new
   
    const employeeDisconnectIds = booking.employees[0].id !== values.staff ? [booking.employees[0].id] : []
    const employeeConnectIds = booking.employees[0].id !== values.staff ? bookingEmployeeIds.filter(empId => !booking.employees[0].id).map(empId => ({id: empId})) : bookingEmployeeIds.map(empId => ({id: empId}))
    Object.assign(formattedInputs, {
      employees: {
        disconnect: employeeDisconnectIds.map(dis => ({id: dis})),
        connect:[{id: values.staff}, ...employeeConnectIds] //employeeConnectIds.map((con:string) => ({id: con}))
      }
    })
    const addonDisconnectIds = bookingAddonIds.filter(aId => !values.addonIds.includes(aId)).map(aId => aId)
    const addonConnectIds = values.addonIds.filter((valId:string) => !bookingAddonIds.includes(valId)).map((valId:string) => valId)
    Object.assign(formattedInputs, {
      addons: {
        disconnect: addonDisconnectIds.map(dis => ({id: dis})),
        connect: addonConnectIds.map((con:string) => ({id: con}))
      }
    })
    
    
    const res = await updateBooking({
      variables: {
        where: {
          id: booking.id
        },
        data: formattedInputs
      }
    }).catch(err => errorRef?.current?.scrollIntoView({ behavior: 'smooth' }))
    

    // console.log('res', res)
    // todo show booking success message
    if (res?.data.updateBooking) {
      setIsSuccess(true)

      const location = services.find((x: any) => x.id === serviceId)?.locations.find((x:any) => x.id === values.location)

      const addonsFlat = addons.flatMap(ad => ad.id)
      let successObj = {
        start: values.date + 'T' + values.timeStart,
        end: calcEndTime(values.date+'T'+ values.timeStart, Number(pickedService?.durationInHours)),
        service: pickedService?.name || 'n/a',
        addons: addons.filter(ad => values.addonIds.includes(ad.id)).map( (ad:Addon) => ad.name),
        location: location ? location.name : 'n/a' || '',
        staff: pickedStaff?.name || 'n/a',
        msg: "We'll reach out to confirm your booking via email"
      }

      // console.log({successObj});
      

      

      // if(values.service === '') 
      //   successObj = {...successObj, msg: "A Service was not selected. We'll reach out to get more details about your event date" }
      // // if(values.location === '') 
      // //   successObj = {...successObj, msg: "A Location was not selected. We'll reach out to get more details about your event date" }
      // if(values.staff === '') 
      //   successObj = {...successObj, msg: "A staff member was not selected. We'll check and see if an employee is available for this booking"}
      // if(values.staff === '' && values.service === '') 
      //   successObj = {...successObj, msg: "A Staff Member and Service were not selected. We'll reach out to get more details about your event date"}
      // // todo may cause problems idk
        // @ts-ignore
      routerPush(`/bookings/${booking.id}`)
      // setSuccessfullBook(successObj)
    } 
    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })

  }
  // const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER)
  const [updateBooking, { loading: loadingMutation, error: errorMutation, data: dataMutation }] = useMutation(UPDATE_BOOKING)

  useEffect(() => {
    handleServicePicked(booking.service.id)
  
    // return () => 
  }, [booking.service])
  

  function handleServicePicked(id:string){
    const foundService = services.find((x: any) => x.id === id)
    // todo check back later
    // @ts-ignore
    setPickedService(foundService)

    handleEmployeeUpdate(id)
    handleLocationUpdate(id)
    handleAddonsUpdate(id)
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

  function handleAddonsUpdate(id:string){
    const foundAddons = services.find((x: any) => x.id === id)?.addons
    if(!foundAddons) return []
    
    
    const formatted = foundAddons.map((addon:any) => { return {value: addon.id, label: addon.name, name: addon.name.toLowerCase().replace(/\s/g, "")} } )
    // console.log(formatted);
    // todo check back later
    // @ts-ignore
    setAddonsOptions(formatted)
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
        const filteredTimeStarts = findOverlapTimes({start: gig.start, end: gig.end}, currentTimes, date, Number(pickedService?.durationInHours))
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
        const filteredTimeStarts = findOverlapTimes({start: avail.start, end: avail.end}, currentTimes, date, Number(pickedService?.durationInHours))
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
      start: pickedService?.buisnessHourOpen || '',
      end: pickedService?.buisnessHourClosed || '',
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
        testEnd.setMinutes(testEnd.getMinutes() + Number(pickedService?.durationInHours) * 60)

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

  const handleCheckboxChangeGroup = (event:any) => {
    const { value, checked }:{value:string[], checked:boolean} = event.target;
    // console.table({value, checked});
    
    // Update the selected checkboxes based on the checkbox change
    if (checked) {
      setValues((prev:any) => ({
        ...prev,
        addonIds: [...prev.addonIds, value],

      }))
    } else {
      setValues((prev:any) => ({
        ...prev,
        addonIds: prev.addonIds.filter((addId:any) => addId !== value)

      }))
      
    }
  };

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

      <div ref={errorRef}>
        <ErrorMessage error={errorMutation} />
      </div>

      {isSuccess && successfullBook && (
      <div className="card">
        <h2 className="msg success">Booking Created: </h2>

        <ul>
          <li>start: {datePrettyLocal(successfullBook.start, DATE_OPTION.FULL)}</li>
          <li>end: {datePrettyLocal(calcEndTime(successfullBook.start, Number(pickedService?.durationInHours)), DATE_OPTION.FULL)}</li>
          <li>service: {successfullBook.service}</li>
          <li>
            Addons:
            <ul>
              {successfullBook.addons.map((name:string,i) => (
                <li key={i}> {name} </li>
              ))}
            </ul>
          </li>
          <li>location: {successfullBook.location}</li>
          <li>staff: {successfullBook.staff}</li>
          <li>message: {successfullBook.msg}</li>
        </ul>

        <Link href={`/booking`}> Book another aervice </Link> 
        <br />
        {session ? (
          <Link href={`/account`}> View your account</Link> 
        ) : (
          <Link href={`/auth/login`}> Login </Link> 
        )}
        <br />
        <Link href={`/home`}> ↼ Back Home </Link>
      </div>
      )}

      {!isSuccess && (

      
        <StyledBookingForm onSubmit={(e: FormEvent) => handleSubmit(e)} ref={formRef} >
          <fieldset>

            <legend>The What</legend>

            {/* <HeightReveal className="service-staff-cont" isShown={true}> */}
            <div className="service-staff-cont">
              <FormInput 
                {...handleFindProps('service')}
                value={values['service']}
                onChange={(e:any) => {
                  onChange(e) 
                  setValues((prev:any) => ({...prev, date: '', timeStart: '', timeEnd: '', staff: '', location: ''}))
                  handleServicePicked(e.target.value)
                }}
              />

              <FormInput 
                {...handleFindProps('location')}
                value={values['location']}
                isDisabled={values.service === '' ? true : false}
                onChange={(e:any) => {
                  onChange(e)
                  setValues((prev:any) => ({...prev, date: '', timeStart: '', timeEnd: ''}))
                  findPartialDays(e.target.value)
                }}
                // key={pickedService}
              />

              <FormInput 
                {...handleFindProps('staff')}
                value={values['staff']}
                isDisabled={values.location === '' ? true : false}
                onChange={(e:any) => {
                  onChange(e)
                  setValues((prev:any) => ({...prev, date: '', timeStart: '', timeEnd: ''}))
                  findPartialDays(e.target.value)
                }}
                // key={employeeOptions}
              />

              <h3> Add-Ons </h3>
              <ul className="addons">
                {addons.filter((addon) => pickedService?.addons.flatMap(addon => addon.id).includes(addon.id)).map((addon:Addon, i) => { 
                 
                  return(
                  <li key={addon.name}>
                    <FormInput 
                    // ? remove anything that aint a letter or number
                      {...{name: addon.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),  label: moneyFormatter(addon.price) + ' ' + addon.name, value: addon.id, type: 'checkbox', defaultChecked: bookingAddonIds.includes(addon.id)}}
                      // todo how to fill in values that weren't added on yet
                      // value={values.addonIds.find(aId => aId === addon.id)}
                      // value={addon.id}
                      onChange={handleCheckboxChangeGroup}
                    />
                  </li>
                )})}

              </ul>
             
            </div>
          </fieldset>

          <fieldset >
            <legend> The When </legend>
            <HeightReveal className='datetime-cont' isShown={values.staff ? true : false} >

              <div>            
                <FormInput 
                  {...handleFindProps('date')}
                  value={values['date']}
                  isDisabled={true}
                  onChange={onChange}
                />

                <CalendarDatePicker 
                  // value={values.date}
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
                    value={values['timeStart']}
                    onChange={onChange}
                    isDisabled={true}
                  />
                  <FormInput 
                    {...handleFindProps('timeEnd')}
                    // defaultValue={values['timeEnd']}
                    onChange={onChange}
                    isDisabled={true}
                  />
                </div>

                <h6 className="duration-stamp">{ calcDurationHuman(String(pickedService?.durationInHours))} Service</h6>

                <TimePicker 
                  values={values} 
                  setValues={setValues} 
                  times={times} 
                  partialDates={partialDates}
                  // todo setting 'service' to empty string causes error here
                  buisnessHours={{start: pickedService?.buisnessHourOpen || '', end: pickedService?.buisnessHourClosed || ''}}
                  serviceDuration={Number(pickedService?.durationInHours)}
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
  max-width: 40em;
  border-radius: var(--br-sharp);
  
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

  ul.addons{
    padding: 0;
    list-style: none;
    
    li label {
      color: var(--c-txt-rev);
      display: flex;
      flex-direction: row;
      
    }
  }

  .time-input-cont{
    display: flex;
    gap: 1em;
  }

  .duration-stamp{
    padding: 0;
    margin: 0;
    color: var(--c-txt-rev);
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


const UPDATE_BOOKING = gql`
  mutation UpdateBooking($where: BookingWhereUniqueInput!, $data: BookingUpdateInput!) {
    updateBooking(where: $where, data: $data) {
      id
      summary
      name
      email
      phone
      status
      start
      end
      dateCreated
      dateModified
      durationInHours
      addons {
        id
        name
        price
      }
      customer {
        id
        name
        email
        phone
      }
      employees {
        email
        id
        image
        name
      }
      location {
        id
        name
      }
      notes
      price
      service {
        name
        id
      }
    }
  }
`