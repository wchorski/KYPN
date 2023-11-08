'use client'
import { Addon, Availability, Booking, DayTimes, Location, SelectOption, Service, Session, User } from "@ks/types"
import { generateTimesArray } from "@lib/generateTimesArray"
import { useEffect, useRef, useState } from "react"
import { 
  // @ts-ignore
  experimental_useFormState as useFormState, 
  // @ts-ignore
  experimental_useFormStatus as useFormStatus 
} from "react-dom"
import formStyles from '@styles/menus/form.module.scss'
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { calcEndTime } from "@lib/dateCheck"
import moneyFormatter from "@lib/moneyFormatter"
import gridStyles from '@styles/elements/section.module.scss'
import { datePrettyLocal, timePrettyTo12HourFormat } from "@lib/dateFormatter"
import { CalendarDatePicker } from "./Calendar"
import { filterBuisnessTimes, findUniqueDays, isDateRangeAvailable } from "@lib/filterTimeAVail"
import { findEmployeeBusyRanges } from "@lib/userUtils"
import { TimePicker } from "./TimePicker"
import { findOverlapTimes } from "@lib/dateCheckCal"

type Fields = {
  // event: string,
  service:string,
  location:string,
  staff:string,
  addonIds:string[],
  date:string,
  timeStart:string,
  // timeEnd:string,
  name:string,
  email: string,
  phone: string,
  notes: string,
}

type FormState = {
  message: string,
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

type Props = {
  services:Service[],
  addons:Addon[],
  session:Session,
}

type FormAside = {
  service: Service|undefined,
  location: string,
  staff: {
    id:string,
    name:string,
  },
  addons: Addon[],
  date: string,
  timeStart: string,
  total:number,
}

type AddonCheckboxOptions = {
  name:string,
  label:string,
  id:string,
  isChecked:boolean,
  price:number,
}
const genTimeStrings = generateTimesArray().map((t) => t.value)

export function BookingForm ({ services, addons, session }:Props) {

  const serviceRef = useRef<HTMLSelectElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLInputElement>(null)

  const serviceOptions = services.map((serv:any) => { return {value: serv.id, label: serv.name,} }) as SelectOption[]
  const [staffOptions, setStaffOptions] = useState<SelectOption[]>([])
  const [locationOptions, setLocationOptions] = useState<SelectOption[]>([])
  const [addonOptions, setAddonOptions] = useState<AddonCheckboxOptions[]>([])
  const [blackoutDates, setBlackoutDates] = useState<Date[]>([])
  const [partialDates, setPartialDates] = useState<DayTimes[]>([])
  const [formAside, setFormAside] = useState<FormAside>({
    service: undefined,
    location: '',
    // @ts-ignore
    staff: {},
    addons: [],
    date: '',
    timeStart: '',
    total: 0,
  })

  function getServicePicked(id:string){
    // if(!id) return {price: 0}
    
    return services.find((x) => x.id === id) as Service
  }

  const defaultFormState:FormState = {
    message: '',
    errors: undefined,
    fieldValues: {
      service: '',
      location: '',
      staff: '',
      addonIds: [],
      date: '',
      timeStart: '',
      // timeEnd: '',
      name: '',
      email: session?.user?.email || '',
      phone: '',
      notes: '',
    }
  } 

  const [formState, formAction] = useFormState<FormState>(onSubmit, defaultFormState)

  function calcTotalPrice(addonIds:string[], serviceId:string|undefined,){
    if(!serviceId) return 0
    const pickedAddons = addons.filter(ad => addonIds.includes(ad.id))
    const addonsPrice = pickedAddons.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    return addonsPrice + getServicePicked(serviceId).price
  }

  async function onSubmit(prevState: FormState, formdata: FormData): Promise<FormState> {
    
    const service   = formdata.get('service') as string
    const location  = formdata.get('location') as string
    const staff     = formdata.get('staff') as string
    const date      = formdata.get('date') as string
    const timeStart = formdata.get('timeStart') as string
    // const timeEnd   = formdata.get('timeEnd') as string
    const name      = formdata.get('name') as string
    const email     = formdata.get('email') as string
    const phone     = formdata.get('phone') as string
    const notes     = formdata.get('notes') as string
    // const addonIds = addons.map(addon => formdata.get(addon.name) ).filter(item => item !== null) as string[]
    const addonIds = addonOptions.filter(addon => addon.isChecked).flatMap(addon => addon.id ) as string[]
    

    const inputValues:Fields = {
      service,
      location,
      staff,
      addonIds,
      date,
      timeStart,
      // timeEnd,
      name,
      email,
      phone,
      notes,
    } 
    console.log({inputValues});
    


    try {

      if(typeof email !== 'string') throw new Error('email is not string')

      const data = {
        summary: `${name} | ${getServicePicked(service)?.name}`,
        serviceId: service,
        locationId: location,
        addonIds,
        employeeId: staff,
        start: new Date(date +'T'+ timeStart).toISOString(),
        // end: calcEndTime(date+'T'+ timeStart, String(getServicePicked(service)?.durationInHours)),
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        notes: notes,
        amountTotal: calcTotalPrice(addonIds, service),
      }
      

      const res = await fetch(`/api/gql/noauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation BookAService($serviceId: String!, $start: String!, $locationId: String, $addonIds: [String], $employeeId: String, $customerName: String, $customerEmail: String!, $customerPhone: String, $notes: String, $amountTotal: Int) {
              bookAService(serviceId: $serviceId, start: $start, locationId: $locationId, addonIds: $addonIds, employeeId: $employeeId, customerName: $customerName, customerEmail: $customerEmail, customerPhone: $customerPhone, notes: $notes, amount_total: $amountTotal) {
                id
              }
            }
          `,
          variables:{ ...data },
        }),
      })

      const resData = await res.json()
      if(resData.error) throw new Error(resData.error.message)
      
      // // return check to see if employee is avail
      

      return {
        ...formState,
        message: 'success',
      }
      
    } catch (error:any) {
      console.log(error);
      
      return {
        message: error?.message,
        // TODO validate each field
        errors: {
          service: '',
          location: '',
          staff: '',
          date: '',
          timeStart: '',
          // timeEnd: '',
          name: '',
          email: '',
          phone: '',
          notes: '',
          addonIds: '',
        },
        fieldValues: inputValues
      }
    }
  }

  function handleServiceUpdate(id:string){

    // formRef.current?.reset()
    // const serviceInputRef =  formRef.current?.querySelector('input[name="service"]');
    // if(serviceInputRef) serviceInputRef.value = id

    const pickedService = services.find((x: any) => x.id === id)
    

    const foundLocations = pickedService?.locations || []
    
    const locationOpts = foundLocations.map((obj) => { return {value: obj.id, label: obj.name} } )
    setLocationOptions(locationOpts)

    const foundStaff = pickedService?.employees || []
    const staffOpts = foundStaff.map((empl:any) => { return {value: empl.id, label: empl.name} } )
    setStaffOptions(staffOpts)

    const serviceAddons = addons.filter(addon => addon.services.flatMap(serv => serv.id).includes(id))
    const addonOptions:AddonCheckboxOptions[] = serviceAddons.map(ad => ({
      name: ad.name,
      label: ad.name,
      id: ad.id,
      isChecked:false,
      price: ad.price,
    }))
    console.log({addonOptions});

    
    setAddonOptions(addonOptions)
    setFormAside(prev => ({...prev, addons: [], total: pickedService?.price || 0 }))
    // todo def hacky, could make seperaate <Checkbox /> component and handle state there
    // @ts-ignore
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
  }

  useEffect(() => {
    
    const currentServiceId = formState.fieldValues.service

    if(!currentServiceId) return console.log('no service selected');    

    const foundLocations = services.find((x: any) => x.id === currentServiceId)?.locations 
    const locationOpts = foundLocations?.map((obj:any) => { return {value: obj.id, label: obj.name} } )
    setLocationOptions(locationOpts || [])

    // const serviceAddons = addons.filter(addon => getServicePicked(currentServiceId)?.addons.flatMap(addon => addon.id).includes(addon.id))
    // setAddonOptions(serviceAddons)
    
    if(formState.message === 'success'){
      formRef.current?.reset()
    }
  }, [formState])
  

  function updateFormAside(type:'service'|'location'|'staff'|'addon'|'date'|'time', id:string, isChecked?:boolean){

    let label = ''

    switch (type) {
      case 'service':
        const foundService = services.find(serv => serv.id === id )
        setFormAside(prev => ({
            ...prev, 
            service: foundService,
            total: calcTotalPrice(addonOptions.filter(opt => opt.isChecked).flatMap(ad => ad.id), foundService?.id)
          }))
        break;

      case 'location':
        label = locationOptions.find(opt => opt.value === id )?.label || ''
        setFormAside(prev => ({...prev, location: label }))
        break;

      case 'staff':
        label = staffOptions.find(opt => opt.value === id )?.label || ''
        setFormAside(prev => ({...prev, staff: {name: label, id: id} }))
        break;

      case 'addon':
        if(isChecked) {
          const currAddons = [...formAside.addons, addons.find(ad => ad.id === id)]
          const updatedCheckboxes = handleCheckboxChange(id)
          setAddonOptions(updatedCheckboxes)
          // @ts-ignore
          setFormAside(prev => ({
            ...prev, 
            addons: currAddons,
            // @ts-ignore
            total: calcTotalPrice(updatedCheckboxes.filter(opt => opt.isChecked).flatMap(ad => ad.id), prev.service?.id) 
          }))

        }  else if(!isChecked){
          const filtAddons = formAside.addons.filter(ad => ad.id !== id)
          const updatedCheckboxes = handleCheckboxChange(id)
          setAddonOptions(updatedCheckboxes)
          setFormAside(prev => ({
            ...prev, 
            addons: filtAddons,
            total: calcTotalPrice(updatedCheckboxes.filter(opt => opt.isChecked).flatMap(ad => ad.id), prev.service?.id) 
          }))
        }
        break;

      case 'date':
        setFormAside(prev => ({...prev, date: id }))
        break;

      case 'time':
        setFormAside(prev => ({...prev, timeStart: id }))
        break;
    
      default:
        break;
    }

    // price
  }

  function handleCheckboxChange(id:string) {
    const updatedCheckboxes = addonOptions.map((checkbox) => {
      if (checkbox.id === id) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      }
      return checkbox;
    });
    return updatedCheckboxes
  };

  function findPartialDays(id:string) {

    const pickedService = services.find((x: any) => x.id === formAside.service?.id)

    const selectedEmpl = pickedService?.employees.find((x:any) => x.id === id)
    if(!selectedEmpl) return setBlackoutDates([])

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

  function handleBlackoutTimes(date:string|undefined){
    // console.log('----- handleBlackoutTimes ----');
    // console.log({date})
    if(!date) return []
    if(!formAside.staff.id || !formAside.service?.id) return []
    let currentTimes:string[] = generateTimesArray().map(t => t.value)
    const pickedService = services.find(serv => serv.id === formAside.service?.id)
    const pickedStaff = services[0].employees.find(emp => emp.id === formAside.staff.id)
    // console.log({date});
    
    // * gigs / bookings
    const staffGigsLocal = pickedStaff?.gigs?.flatMap((gig:Booking) => {
      
      const start = new Date(gig.start).toLocaleDateString('en-CA')
      const end   = new Date(gig.end).toLocaleDateString('en-CA')
      return [start, end]
    })
    
    
    if(staffGigsLocal?.includes(date)){
      const gigs = pickedStaff?.gigs?.filter((obj:Booking) => {
        return new Date(obj.start).toLocaleDateString('en-CA') == date || new Date(obj.end).toLocaleDateString('en-CA') == date
      })
      
      gigs?.map(gig => {
        const filteredTimeStarts = findOverlapTimes({start: gig.start, end: gig.end}, currentTimes, date, Number(pickedService?.durationInHours))
        currentTimes = filteredTimeStarts || [] 
      })
    }
    
    
    // * availability
    const staffAvailLocal = pickedStaff?.availability?.flatMap((avail:Availability) => {
      const start = new Date(avail.start).toLocaleDateString('en-CA')
      const end   = new Date(avail.end).toLocaleDateString('en-CA')
      
      return [start, end]
    })


    if(staffAvailLocal?.includes(date)){
       // find the gig
       const avails = pickedStaff?.availability?.filter((obj:Availability) => {
        return new Date(obj.start).toLocaleDateString('en-CA') == date || new Date(obj.end).toLocaleDateString('en-CA') == date
      })
      
      avails?.map(avail => {
        const filteredTimeStarts = findOverlapTimes({start: avail.start, end: avail.end}, currentTimes, date, Number(pickedService?.durationInHours))
        currentTimes = filteredTimeStarts || []  
      })

    }

    if(!staffGigsLocal?.includes(date) && !staffAvailLocal?.includes(date)){
      const defaultTimes = generateTimesArray().map(t => t.value)
      return defaultTimes
    }

    return currentTimes

  }
  

  return <div className={formStyles.grid_wrap} >
    <form
      action={formAction}
      ref={formRef}
      className={formStyles.form} 
    >
      <fieldset>
        <legend> The What </legend>

        <label htmlFor={'service'}>
          <span> Service </span>
          <select
            ref={serviceRef}
            name={'service'}
            id={'service'}
            placeholder="-- select service --"
            defaultValue={formState.fieldValues.service}
            required={true}
            onChange={(e) => {
              handleServiceUpdate(e.target.value)
              updateFormAside('service', e.target.value)
            }}
          >
            <option value={''}> -- select service -- </option>

            {serviceOptions.map((opt,i) => (
              <option key={i} value={opt.value} > {opt.label} </option>
            ))}
          </select>
          <span className="error"> {formState.errors?.service} </span>
        </label>

        <label htmlFor={'location'}>
          <span> Location </span>
          <select
            name={'location'}
            id={'location'}
            placeholder="-- select location --"
            defaultValue={formState.fieldValues.location}
            required={false}
            onChange={(e) => updateFormAside('location', e.target.value) }
          >
            <option value={''}> -- select location -- </option>

            {locationOptions.map((opt,i) => (
              <option key={i} value={opt.value} > {opt.label} </option>
            ))}
          </select>
          <span className="error"> {formState.errors?.location} </span>
        </label>

        <label htmlFor={'staff'}>
          <span> Staff </span>
          <select
            name={'staff'}
            id={'staff'}
            placeholder="-- select staff member --"
            defaultValue={formState.fieldValues.staff}
            required={false}
            onChange={(e) => {
              updateFormAside('staff', e.target.value)
              findPartialDays(e.target.value)
            } }
          >
            <option value={''}> -- select staff member -- </option>

            {staffOptions.map((opt,i) => (
              <option key={i} value={opt.value} > {opt.label} </option>
            ))}
          </select>
          <span className="error"> {formState.errors?.staff} </span>
        </label>
        

        {addons.length > 0 && <>

          <h5> Add-Ons</h5>
          <div className={formStyles.addons_wrap} >
            {addonOptions.map(addon => (
                <label 
                  key={addon.name}
                  htmlFor={addon.name}
                  className={'checkbox'}
                >
                  <input 
                    name={addon.name}
                    value={addon.id} 
                    type={'checkbox'}
                    readOnly={false}
                    defaultChecked={addon.isChecked}
                    onChange={(e) => {
                      updateFormAside('addon', e.target.value, e.target.checked)
                    }}
                  />
                  <span> 
                    <strong> {moneyFormatter(addon.price)} </strong>  
                    {addon.name}
                  </span>
                </label>
              ))}
          </div>
        </>}
        


      </fieldset>

      <fieldset>
        <legend> The When </legend>

        <label htmlFor="date">
          <span> Date of Engagment </span>
          <input 
            ref={dateRef}
            name={'date'}
            id={'date'}
            type={'date'}
            defaultValue={formState.fieldValues.date}
            // readOnly={formState.fieldValues.date}
            required={true}
            onChange={(e) => {updateFormAside('date', e.target.value); console.log(e.target.value)} }
          />
          <span className="error"> {formState.errors?.date} </span>
        </label>
        <CalendarDatePicker 
          // key={Number(formAside.staff)}
          blackoutDays={blackoutDates}
          buisnessDays={getServicePicked(serviceRef.current?.value || '')?.buisnessDays || []}
          dateRef={dateRef}
          timeRef={timeRef}
        />


        <label htmlFor="timeStart">
          <span> Start Time </span>
          <input 
            ref={timeRef}
            name={'timeStart'}
            id={'timeStart'}
            type={'time'}
            defaultValue={formState.fieldValues.timeStart}
            onChange={(e) => {
              updateFormAside('time', e.target.value)
              handleBlackoutTimes(e.target.value)
            }}
            // readOnly={formState.fieldValues.timeStart}
            required={true}
          />
          <span className="error"> {formState.errors?.timeStart} </span>
        </label>

        <TimePicker 
          key={dateRef.current?.value}
          timeRef={timeRef}
          times={handleBlackoutTimes(dateRef.current?.value)} 
          partialDates={partialDates}
          // todo setting 'service' to empty string causes error here
          buisnessHours={{start: getServicePicked(formAside.service?.id || '')?.buisnessHourOpen || '', end: getServicePicked(formAside.service?.id || '')?.buisnessHourClosed || ''}}
          serviceDuration={Number(getServicePicked(formAside.service?.id || '')?.durationInHours)}
        />

      </fieldset>
      

      <fieldset>
        <legend> The Who </legend>

        <label htmlFor="name">
          <span> Name </span>
          <input 
            name={'name'}
            id={'name'}
            type={'text'}
            defaultValue={formState.fieldValues.name}
            // readOnly={formState.fieldValues.name}
            required={false}
          />
          <span className="error"> {formState.errors?.name} </span>
        </label>

        <label htmlFor="email">
          <span> Email </span>
          <input 
            name={'email'}
            id={'email'}
            placeholder="yanny@mail.lan"
            type={'text'}
            defaultValue={formState.fieldValues.email}
            // readOnly={formState.fieldValues.email}
            required={true}
          />
          <span className="error"> {formState.errors?.email} </span>
        </label>

        <label htmlFor="phone">
          <span> Phone Number </span>
          <input 
            name={'phone'}
            id={'phone'}
            placeholder="312 312 1234"
            type={'phone'}
            defaultValue={formState.fieldValues.phone}
            // readOnly={formState.fieldValues.phone}
            required={false}
          />
          <span className="error"> {formState.errors?.phone} </span>
        </label>

        <label htmlFor="notes">
          <span> Notes </span>
          <textarea 
            name={'email'}
            id={'email'}
            placeholder="..."
            defaultValue={formState.fieldValues.notes}
            // readOnly={formState.fieldValues.notes}
            required={false}
          />
          <span className="error"> {formState.errors?.notes} </span>
        </label>

      </fieldset>

      <p>Total: </p>

      <p className={(formState.message === 'success') ? 'success' : 'error'}> 
        {formState.message} 
      </p>

      <SubmitButton />
    </form>

    <aside key={formAside.addons.length}>
      <table>
        <tbody>
          <tr>
            <td> Service: </td>
            <td> {formAside.service?.name} </td>
          </tr>
          <tr>
            <td> Location: </td>
            <td> {formAside.location || <span className="subtext" > n/a </span>} </td>
          </tr>
          <tr>
            <td> Staff: </td>
            <td> {formAside.staff.name || <span className="subtext" > n/a </span>} </td>
          </tr>
          <tr>
            <td> Start Date: </td>
            <td> 
              {formAside.date ? datePrettyLocal(formAside.date, 'day') : <span className="subtext" > n/a </span>} 
              {formAside.timeStart ? ' @ ' + timePrettyTo12HourFormat(formAside.timeStart) : ''} 
            </td>
          </tr>
          <tr>
            <td> Addons: </td>
            <td> 
              <ul>
                {addonOptions.filter(opt => opt.isChecked).map((ad, i) => (
                  <li key={i}>
                    {ad.name}
                  </li>
                ))} 
              </ul>
            </td>
          </tr>
          <tr>
            <td>Total: </td>
            <td>{moneyFormatter(getServicePicked(formAside.service?.id || '')?.price + addonOptions.filter(addon => addon.isChecked).reduce((accumulator, addon) =>  accumulator + addon.price, 0))}</td>
          </tr>
        </tbody>
      </table>
    </aside>

  </div>
}

function SubmitButton(){

  const { pending, } = useFormStatus()

  return(
    <button
      disabled={pending}
      type={'submit'}
    >
      {pending ? <LoadingAnim /> : 'Submit Booking'}
    </button>
  )
}