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
import { CgExternal } from 'react-icons/cg'
import DialogPopup from '@components/menus/Dialog'
import { BookingFormUpdate } from '@components/bookings/BookingFormUpdate'
import { StatusBadge } from '@components/StatusBadge'
import styles from "@styles/booking/booking.module.scss";
import { Metadata, ResolvingMetadata } from 'next'
import { envs } from '@/envs'
import { keystoneContext } from '@ks/context'
import { NoDataOrPermissionPage } from '@components/elements/NoDataOrPermissionPage'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/session'
import { BlockRender } from '@components/blocks/BlockRender'

// export const metadata: Metadata = {
//   title: 'Booking | ' + envs.SITE_TITLE,
//   description: envs.SITE_DESC,
// }

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const session = await getServerSession(nextAuthOptions)
  const { booking, error } = await fetchBooking(String(params?.id))

  if(!booking) return {
    title: 'Booking | ' + envs.SITE_TITLE,
    description: envs.SITE_DESC,
  }

  return {
    title: booking.summary,
  }

}


type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function BookingSinglePage ({ params, searchParams }:Props) {

  const {id} = params

  const { booking, error } = await fetchBooking(id)


  if(error) return <ErrorMessage error={error}/>
  if(!booking) return <NoDataOrPermissionPage />


  return (
    <PageTHeaderMain
      header={Header()}
      main={Main(booking)}
    />
  )
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1 style={{visibility: 'hidden'}}> Booking </h1>
    </Section>
  </>
}

function Main(booking:Booking|undefined){

  const { id, summary, details, status, email, phone, name, location, service, price, notes, addons, employees, customer, dateModified, start, end } = booking as Booking
  
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
          <StatusBadge type={'booking'} status={status}/>
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
                <span>{customer?.email} {customer?.email ? ',' : ''}  {email}</span>
                <br />
                <span>{customer?.phone} {customer?.phone ? ',' : ''} {phone}</span>
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

        {addons.length > 0 && <>
          <h2>Add-Ons</h2>
          <ul className="addons">
            {addons.map(ad => (
              <li key={ad.id} title={ad.excerpt}>
                {ad.name}
                <Link href={`/addons/${ad.id}`} target={'_blank'}> <CgExternal /> </Link>
              </li>
            ))}
          </ul>
          <p className="align-right"> 
            <Link href={`/addons`} > View more addons</Link>
          </p>
        </>}
        
        {employees.length > 0 && <>
          <h2> Employees Assigned </h2>
          <ul className="employees">
            {employees.map(emp => (
              <li key={emp.id}>
                <UserBadge user={emp}/>
              </li>
            ))}
          </ul>
        </>}

        {details && (
          <div className={styles.description_wrap}>
            <BlockRender document={details.document} />
          </div>
        )}

        <h2> Notes </h2>
        <p>{notes}</p>
      </div>
    </Section>
  </>
}

