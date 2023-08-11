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
import { Availability, Booking, DayTimes, Service, User, Addon, SelectOpt } from "../../lib/types"
import { findOverlapTimes, isSameCalendarDay } from "../../lib/dateCheckCal"
import { generateTimesArray } from "../../lib/generateTimesArray"
import { calcEndTime, filterBuisnessTimes, findBlackoutDates, findUniqueDays, isDateRangeAvailable } from "../../lib/filterTimeAvail"
import { findEmployeeBusyRanges } from "../../lib/userUtils"
import { useRouter } from "next/router"
import moneyFormatter from "../../lib/moneyFormatter"
import Link from "next/link"
import { BookingFormStatus } from "./BookingFormStatus"
// import { QUERY_EMPLOYEE_AVAIL } from "./BookingCreate"

// export interface DateType {
//   justDate: Date | undefined,
//   dateTime: Date | null,
// }

type iProps = {
  services: Service[],
  addons: Addon[],
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

export function BookingForm2({ services, addons }:iProps) {
  // console.log(services[0]);
  // console.log(services[0].employees);
  const {query} = useRouter()
  
  const session = useUser()
  const formRef = useRef<HTMLFormElement>(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [successfullBook, setSuccessfullBook] = useState<SuccessfullBook>()
  
  const [serviceIdState, setServiceIdState] = useState(query.serviceId)
  const [pickedService, setPickedService] = useState<Service|undefined>(services.find(serv => serv.id === query.serviceId))
  const [pickedStaff, setPickedStaff] = useState<User>()
  const [serviceId, setServiceId] = useState('')
  const [employeeOptions, setEmployeeOptions] = useState<any>([])
  const [locationOptions, setLocationOptions] = useState<any>([])
  const [addonsOptions, setAddonsOptions] = useState([])
  const [blackoutDates, setBlackoutDates] = useState<Date[]>([])
  const [partialDates, setPartialDates] = useState<DayTimes[]>([])
  const [priceSubTotal, setPriceSubTotal] = useState(0)

  // console.log(pickedService);
  

  const [times, setTimes] = useState<string[]>(generateTimesArray().map(t => t.value))
  const [values, setValues] = useState<any>({
    service: query?.serviceId ? query.serviceId : "",
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
    addonIds: [],
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
    // console.log(values);
    
    if(!formRef.current) return console.warn('form is missing');
    
    // console.log({values});
    
    const formattedInputs = {
      start: new Date(`${values.date}T${values.timeStart}`).toISOString(),
      summary: values?.name + ' | ' + pickedService?.name,
      email: values?.email,
      phone: values?.phone,
      name: values?.name,
      // dateTime: new Date(values.datetime_local).toISOString(),
      notes: values.notes,
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
      

      

      if(values.service === '') 
        successObj = {...successObj, msg: "A Service was not selected. We'll reach out to get more details about your event date" }
      // if(values.location === '') 
      //   successObj = {...successObj, msg: "A Location was not selected. We'll reach out to get more details about your event date" }
      if(values.staff === '') 
        successObj = {...successObj, msg: "A staff member was not selected. We'll check and see if an employee is available for this booking"}
      if(values.staff === '' && values.service === '') 
        successObj = {...successObj, msg: "A Staff Member and Service were not selected. We'll reach out to get more details about your event date"}
      // todo may cause problems idk
        // @ts-ignore
      setSuccessfullBook(successObj)
    }
    // Router.push({
    //   pathname: `/shop/product/${res.data.createProduct.id}`,
    // })

  }

  const [gqlMutation, { loading: loadingMutation, error: errorMutation, data: dataMutation }] = useMutation(MUTATE_BOOKING_CREATE)

  useEffect(() => {
    if(!query?.serviceId) return console.log('no  service id');
    
    handleServicePicked(String(query.serviceId))
  
    // return () => 
  }, [])
  

  function handleServicePicked(id:string){
    const foundService = services.find((x: any) => x.id === id)
    if(!foundService) return console.warn('SERVICE NOT FOUND');
    
    // todo check back later
    setPickedService(foundService)
    setPriceSubTotal(foundService.price)

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

  const handleCheckboxChange = (event:any) => {
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
    // TODO broken, prob because 'setValue' and then immediately tring to set another State
    // handleCalcSubTotal()
  };

  function handleCalcSubTotal(){
    if(!pickedService) return console.log('no service picked');
    
    // const pickedAddons = addons.filter(addon => pickedService?.addons.flatMap(addon => addon.id).includes(addon.id)).map((addon:Addon) => addon)
    // TODO somethign is wrong here where it leaves off on one before. 
    const pickedAddons = pickedService?.addons.filter(ad => values.addonIds.includes(ad.id)) || []
    // console.log({pickedAddons});
    const addonsPrice = pickedAddons.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    // console.log({addonsPrice});
    
    setPriceSubTotal(pickedService?.price + addonsPrice)
  }

  useEffect(() => {
    handleCalcSubTotal()
  
    // return () => 
  }, [pickedService, values])
  

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

        <Link href={`/booking`} onClick={() => {setSuccessfullBook(undefined); setIsSuccess(false)}}> Book another service </Link> 
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

      {!isSuccess && (<StyledSideBySide>

        
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
                  setValues((prev:any) => ({...prev, date: '', timeStart: '', timeEnd: '', staff: '', location: '', addonIds: []}))
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
                {addons.filter(addon => pickedService?.addons.flatMap(addon => addon.id).includes(addon.id)).map((addon:Addon) => { 
                 
                  return(
                  <li key={addon.name}>
                    <FormInput 
                    // ? remove anything that aint a letter or number
                      {...{
                        name: addon.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''), 
                        value: addon.id, 
                        label: moneyFormatter(addon.price) + ' ' + addon.name, 
                        type: 'checkbox',
                        checked: values.addonIds.includes(addon.id),
                      }}
                      onChange={handleCheckboxChange}
                    />
                  </li>
                )})}

                {addons.length <= 0 && (
                  <p> no addons available </p>
                )}
              </ul>
             
            </div>
          </fieldset>

          <fieldset >
            <legend> The When </legend>
            <HeightReveal className='datetime-cont' isShown={values.staff ? true : false} >

              <div>            
                <FormInput 
                  {...handleFindProps('date')}
                  defaultValue={values['date']}
                  isDisabled={true}
                  onChange={onChange}
                  className='hidden'
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
                    isDisabled={true}
                    className='hidden'
                  />
                  <FormInput 
                    {...handleFindProps('timeEnd')}
                    defaultValue={values['timeEnd']}
                    onChange={onChange}
                    isDisabled={true}
                    className='hidden'
                  />
                </div>

                <h6 className="duration-stamp">{ calcDurationHuman(pickedService?.durationInHours || '')} Service</h6>

                <TimePicker 
                  values={values} 
                  setValues={setValues} 
                  times={times} 
                  partialDates={partialDates}
                  key={values.date}
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

              <ErrorMessage error={errorMutation} />
              
              <button type="submit" disabled={values.email ? false : true}> Submit </button>
            </HeightReveal>
            
          </fieldset>


        </StyledBookingForm>

        <aside>
          <BookingFormStatus 
            serviceName={services.find(serv => serv.id === values.service)?.name}
            locationName={locationOptions.find((loc:SelectOpt) => loc.value === values.location)?.label || ''}
            staffName={pickedStaff?.name}
            addons={addons.filter(ad => values.addonIds.includes(ad.id)).map( (ad:Addon) => ({name: ad.name, price: ad.price}))}
            date={values.date}
            start={values.timeStart}
            end={values.timeEnd}
            price={moneyFormatter(priceSubTotal)}
          />
        </aside>

      </StyledSideBySide>)}

    </div>
  )
}


const StyledBookingForm = styled.form`
  background-color: var(--c-desaturated);
  
  max-width: 40em;
  border-radius: var(--br-sharp);

  fieldset{
    margin: 1.5rem 0;
    border: none;
    border-top: solid 1px var(--c-dark);
  }
  
  button[type=submit]{
    color: var(--c-primary);
    padding: 1em 2em;
    border-radius: 3px;
    transition: all .3s;
    
    &:hover:not([disabled]){
      background-color: var(--c-primary);
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

const StyledSideBySide = styled.div`

  display: flex;
  gap: 1rem;

  aside > div {
    position: sticky;
    top: 2rem;
  }

  @media screen and (width < 600px){
    flex-direction: column;
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
