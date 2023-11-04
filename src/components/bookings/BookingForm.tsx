'use client'
import { Addon, Location, SelectOption, Service, Session } from "@ks/types"
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

type Fields = {
  // event: string,
  service:string,
  location:string,
  staff:string,
  date:string,
  timeStart:string,
  timeEnd:string,
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

type SuccessfullBook = {
  start: string,
  end: string,
  service: string,
  addons: string[],
  location: string,
  staff: string,
  msg: string,
}

const genTimeStrings = generateTimesArray().map((t) => t.value)

export function BookingForm ({ services, addons, session }:Props) {

  function getServicePicked(id:string){
    return services.find((x) => x.id === id) 
  }
  

  const serviceOptions = services.map((serv:any) => { return {value: serv.id, label: serv.name,} }) as SelectOption[]
  const [staffOptions, setStaffOptions] = useState<SelectOption[]>([])
  const [locationOptions, setLocationOptions] = useState<SelectOption[]>([])

  const formRef = useRef<HTMLFormElement>(null)

  const defaultFormData:FormState = {
    message: '',
    errors: undefined,
    fieldValues: {
      service: '',
      location: '',
      staff: '',
      date: '',
      timeStart: '',
      timeEnd: '',
      name: '',
      email: session?.user?.email || '',
      phone: '',
      notes: '',
    }
  } 

  const [formState, formAction] = useFormState<FormState>(onSubmit, defaultFormData)

  async function onSubmit(prevState: FormState, formdata: FormData): Promise<FormState>{
    
    const service   = formdata.get('service') as string
    const location  = formdata.get('location') as string
    const staff     = formdata.get('staff') as string
    const date      = formdata.get('date') as string
    const timeStart = formdata.get('timeStart') as string
    const timeEnd   = formdata.get('timeEnd') as string
    const name      = formdata.get('name') as string
    const email     = formdata.get('email') as string
    const phone     = formdata.get('phone') as string
    const notes     = formdata.get('notes') as string

    const inputValues:Fields = {
      service,
      location,
      staff,
      date,
      timeStart,
      timeEnd,
      name,
      email,
      phone,
      notes,
    } 
    console.log({inputValues});
    


    try {

      if(typeof email !== 'string') throw new Error('email is not string')

      // const formattedData= {
      //   service: (service) ? { connect: { id: service } } : null,
      //   location: (location) ? { connect: { id: location } } : null,
      //   employees: (staff) ? { connect: [{ id: staff }] } : null,
      //   start: new Date(`${date}T${timeStart}`).toISOString(),
      //   summary: name + ' | ' + getServiceName(service),
      //   email: email,
      //   phone: phone,
      //   name: name,
      //   // dateTime: new Date(values.datetime_local).toISOString(),
      //   notes: notes,
      // }

      const data = {
        summary: `${name} | ${getServicePicked(service)?.name}`,
        serviceId: service,
        locationId: location,
        addonIds: ['one', 'two', 'three'],
        employeeId: staff,
        start: new Date(date +'T'+ timeStart).toISOString(),
        // end: calcEndTime(date+'T'+ timeStart, String(getServicePicked(service)?.durationInHours)),
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        notes: notes,
        amountTotal: 123,
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
      console.log({resData});
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
          timeEnd: '',
          name: '',
          email: '',
          phone: '',
          notes: '',
        },
        fieldValues: inputValues
      }
    }
  }

  function handleOptionsUpdate(id:string){
    // console.log("%%% handleOptionsUpdate", id);
    // console.log(formState);
    
    
    const foundLocations = services.find((x) => x.id === id)?.locations || []
    
    const locationOpts = foundLocations.map((obj) => { return {value: obj.id, label: obj.name} } )
    setLocationOptions(locationOpts)

    const foundStaff = services.find((x: any) => x.id === id)?.employees || []
    const staffOpts = foundStaff.map((empl:any) => { return {value: empl.id, label: empl.name} } )
    setStaffOptions(staffOpts)
  }

  useEffect(() => {
    
    const currentServiceId = formState.fieldValues.service

    if(!currentServiceId) return console.log('no service selected');    

    const foundLocations = services.find((x: any) => x.id === currentServiceId)?.locations 
    const locationOpts = foundLocations?.map((obj:any) => { return {value: obj.id, label: obj.name} } )
    setLocationOptions(locationOpts || [])
    
    if(formState.message === 'success'){
      formRef.current?.reset()
    }
  }, [formState])

  return (
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
            name={'service'}
            id={'service'}
            placeholder="-- select service --"
            defaultValue={formState.fieldValues.service}
            required={true}
            onChange={(e) => handleOptionsUpdate(e.target.value)}
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
          >
            <option value={''}> -- select staff member -- </option>

            {staffOptions.map((opt,i) => (
              <option key={i} value={opt.value} > {opt.label} </option>
            ))}
          </select>
          <span className="error"> {formState.errors?.staff} </span>
        </label>


      </fieldset>

      <fieldset>
        <legend> The When </legend>

        <label htmlFor="date">
          <span> Date of Engagment </span>
          <input 
            name={'date'}
            id={'date'}
            type={'date'}
            defaultValue={formState.fieldValues.date}
            readOnly={formState.fieldValues.date}
            required={true}
          />
          <span className="error"> {formState.errors?.date} </span>
        </label>

        <label htmlFor="timeStart">
          <span> Start Time </span>
          <input 
            name={'timeStart'}
            id={'timeStart'}
            type={'time'}
            defaultValue={formState.fieldValues.timeStart}
            readOnly={formState.fieldValues.timeStart}
            required={true}
          />
          <span className="error"> {formState.errors?.timeStart} </span>
        </label>

        <label htmlFor="timeEnd">
          <span> End Time </span>
          <input 
            name={'timeEnd'}
            id={'timeEnd'}
            type={'time'}
            defaultValue={formState.fieldValues.timeEnd}
            readOnly={formState.fieldValues.timeEnd}
            required={false}
          />
          <span className="error"> {formState.errors?.timeEnd} </span>
        </label>

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
            readOnly={formState.fieldValues.name}
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
            readOnly={formState.fieldValues.email}
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
            readOnly={formState.fieldValues.phone}
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
            readOnly={formState.fieldValues.notes}
            required={false}
          />
          <span className="error"> {formState.errors?.notes} </span>
        </label>

      </fieldset>

      <p className={(formState.message === 'success') ? 'success' : 'error'}> 
        {formState.message} 
      </p>

      <SubmitButton />
    </form>
  )
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