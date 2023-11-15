import ErrorMessage from '@components/ErrorMessage'
import { DayMonthTime } from '@components/blocks/DayMonthTime'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import { UserBadge } from '@components/menus/UserBadge'
import { Booking } from '@ks/types'
import { dateInputFormat, datePrettyLocal, timeInputFormat } from '@lib/dateFormatter'
import fetchBooking from '@lib/fetchdata/fetchBooking'
import moneyFormatter from '@lib/moneyFormatter'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'
import styles from "@styles/booking/booking.module.scss";
import { CgExternal } from 'react-icons/cg'
import DialogPopup from '@components/menus/Dialog'
import { BookingFormUpdate } from '@components/bookings/BookingFormUpdate'
import { StatusBadge } from '@components/StatusBadge'

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function BookingSinglePage ({ params, searchParams }:Props) {

  const {id} = params

  const { booking, error } = await fetchBooking(id)

  if(error) return <ErrorMessage error={error}/>
  if(!booking) <p> booking not found </p>

  return (
    <PageTHeaderMain
      header={Header(booking?.status)}
      main={Main(booking)}
    />
  )
}

function Header(status?:Booking['status']){

  return<header>
    <Section layout={'1'}>
      <h1> Booking Status </h1>
      <StatusBadge type={'booking'} status={status}/>
    </Section>
  </header>
}

function Main(booking:Booking|undefined){

  const { id, email, phone, name, location, service, price, notes, addons, employees, customer, dateModified, start, end } = booking as Booking
  
  return<>
    <DialogPopup 
      title={`Feature Not Yet Ready`}
      // onClose={() => null}
      // onOk={() => null}
      buttonLabel="Ok"
    >
      <p> Updating a booking is almost ready. For now, create a new booking and we will cancel the previous booking</p>
      <Link href={`/bookings`}> Create new booking </Link>
      {/* <BookingFormUpdate /> */}
    </DialogPopup>
    
    <Section layout={'1'}>
      <div className={styles.booking_single} >

        <div className="edit-buttons">
          {/* //TODO add a way to update form */}
          {/* <Link 
            className="edit button" 
            href={`/bookings?${
              new URLSearchParams({
                bookingId: id,
                serviceId: service.id,
                date: dateInputFormat(start),
                time: timeInputFormat(start),
              })
            }`} 
            // onClick={() => setBookingState(data?.booking)}
          > 
            <FiEdit /> Edit 
          </Link> */}

          <Link 
            className='edit button'
            href={`?${new URLSearchParams({ popup: 'modal'})}`}
          >
            <FiEdit /> Edit
          </Link>
        </div>

        <header>
          <h2> { service?.name } </h2>
          <small>last updated: {datePrettyLocal(dateModified, 'full')}</small>
        </header>


        <table>
          <tbody>
            <tr>
              <td> <label>Client: </label> </td>
              <td>
                {customer ? (
                  <Link href={`/users/${customer.id}`}>
                    {customer?.name}
                  </Link>
                ) : (
                  <span> {name} (Unregistered User) </span>
                )}
                <br />
                <span>{customer?.email}, {email}</span>
                <br />
                <span>{customer?.phone}, {phone}</span>
              </td>
            </tr>
            <tr>
              <td><label>Location: </label> </td>
              <td>{location?.name || 'n/a'}</td>
            </tr>
            <tr>
              <td><label>Start: </label> </td>
              <td><DayMonthTime dateString={start}/></td>
            </tr>
            <tr>
              <td><label>End: </label> </td>
              <td><DayMonthTime dateString={end}/></td>
            </tr>
            <tr>
              <td><label>Price: </label> </td>
              <td> <span className="price">{moneyFormatter(price)}</span></td>
            </tr>
          </tbody>
        </table>

        <h2>Add-Ons</h2>
        <ul className="addons">
          {addons.map(ad => (
            <li key={ad.id} title={ad.excerpt}>
              {ad.name}
              <Link href={`/addons/${ad.id}`} target={'_blank'}> <CgExternal /> </Link>
            </li>
          ))}
          {addons.length <= 0 && (
            <p> No addons. </p>
          )}
        </ul>
        <p className="align-right"> 
          <Link href={`/addons`} > View more addons</Link>
        </p>

        <h2> Employees Assigned </h2>
        <ul className="employees">
          {employees.map(emp => (
            <li key={emp.id}>
              <UserBadge user={emp}/>
            </li>
          ))}
        </ul>

        <h2> Notes </h2>
        <p>{notes}</p>
      </div>
    </Section>
  </>
}

