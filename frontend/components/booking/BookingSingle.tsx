import { gql, useQuery } from "@apollo/client"
import ErrorMessage from "../../components/ErrorMessage"
import { QueryLoading } from "../../components/menus/QueryLoading"
import styled from "styled-components"
import { Booking, User } from "../../lib/types"
import moneyFormatter from "../../lib/moneyFormatter"
import Link from "next/link"
import { datePrettyLocal } from "../../lib/dateFormatter"
import { RiAddLine } from "react-icons/ri"
import { FiEdit } from "react-icons/fi"
import { ImageDynamic } from "../elements/ImageDynamic"
import { PopupModal } from "../elements/PopupModal"
import { BookingFormUpdate } from "./BookingFormUpdate"
import { useState } from "react"
import { UserBadge } from "../elements/UserBadge"

type Props = {
  id:string
}

// todo only show to 'canManageBookings', customer, & employees
export  function BookingSingle({id}:Props) {

  const [bookingState, setBookingState] = useState<Booking>()

  const { loading, error, data } = useQuery(
    QUERY_BOOKING_SINGLE, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const { email, phone, name, location, service, price, addons, employees, customer, dateModified, start, end }:Booking = data?.booking
  
  return (<>
    <PopupModal data={bookingState} setData={setBookingState}>
      {/* <BookingFormUpdate /> */}
      {/* <UserUpdateForm user={{ id, name, nameLast, email, tickets }} setUser={setUserData}/> */}
    </PopupModal>
    <StyledBookingSingle>

      <div className="edit-buttons">
        <Link href={`/bookings/update/${id}`} className="edit button"
          onClick={() => setBookingState(data?.booking)}
        > 
        <FiEdit /> Edit 
        </Link>
      </div>

      <h2>Package: { service?.name } </h2>
      <small>last updated: {datePrettyLocal(dateModified, 'full')}</small>
      <br />
      
      <table>
        <tbody>
          <tr>
            <td> <label>Client: </label> </td>
            <td>
              {customer ? (
                <Link href={`/user/${customer.id}`}>
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
            <td>{location.name}</td>
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
          <li key={ad.id}>
            <div className="card">
              {/* <RiAddLine /> */}
              {ad.name}
            </div>
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
    </StyledBookingSingle>
  </>)
}

function DayMonthTime({dateString}:{dateString:string}){

  const date = new Date(dateString);
  const calDate = date.toLocaleDateString('en-CA')
  const month = date.toLocaleString('default', { month: 'short' }).toLocaleUpperCase();
  const day = date.toLocaleString('default', { day: '2-digit' }).toLocaleUpperCase();
  const time = date.toLocaleString('default', { hour: '2-digit', minute: '2-digit',  }).replace('AM', '').replace('PM', '');
  const time24 = date.toLocaleString('default', { hour: '2-digit', minute: '2-digit', hour12: false }).replace('AM', '').replace('PM', '');
  const ampm = date.toLocaleString('en-US', { hour12: true, hour: '2-digit' }).slice(-2).toLocaleLowerCase();



  return(
    <StyledDayMonthTime>
      <time dateTime={calDate} className="date">
        <span className="day"> {day} </span>
        <span className="month"> {month} </span>
      </time>
      <time dateTime={time24} className="time">
        <span> {time} </span>
        <small> {ampm} </small>
      </time>
    </StyledDayMonthTime>
  )
}

const StyledDayMonthTime = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 2px var(--c-txt);
  border-radius: var(--br-sharp);
  max-width: 12rem;

  time{
    padding: .3rem;
    font-size: 1.5rem;
    white-space: collapse;
  }

  time.date{
    display: flex;
    flex-direction: column;
    background-color: var(--c-txt);
    color: var(--c-txt-rev);

    .day{
      /* transform: translateY(10px); */
      margin-bottom: -10px;
    }
    .month{
      font-size: 1.1rem;
      margin-top: -10px;
      /* transform: translateY(-10px); */
    }
  }

  time.time{
    padding-right: 1.5rem;
  }
`

const StyledBookingSingle = styled.div`
  /* background-color: gainsboro; */
  color: var(--c-txt);

  .align-right{
    text-align: right;
  }

  table{
    width: 100%;
    border-bottom: solid 10px var(--c-txt);
    border-collapse: collapse;

    label{
      color: var(--c-disabled);
    }

    /* td{
      border-bottom: solid 1px var(--c-txt);
    } */
  }

  .price{
    font-size: 3rem;
  }

  .edit-buttons{
    position: fixed;
    bottom: .5rem;
    right: .5rem;
    z-index: 1;

    .button{
      padding: 2rem;
      margin: 0;
      color: var(--c-txt-primary);
      font-size: 1rem;
      border: solid 2px var(--c-accent);

      svg{
        font-size: 1rem;
      }

      &:hover, &:focus{
        background-color: var(--c-accent);
      }
    }
  }

  > h2 {
    margin-bottom: .1rem;
    margin-top: 2rem;
  }

  ul{
    overflow-x: hidden;
    text-overflow:ellipsis;
    white-space: pre-wrap;
  }

  ul.addons, ul.employees{
    padding: 0;
    list-style: none;
    display: grid;
    gap: .2rem;
    
  }

  ul.addons{
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    /* grid-auto-rows: 1fr; */
    /* flex-wrap: wrap; */

    li{
      .card{
        height: 100%;
      }
    }

  }
`


export const QUERY_BOOKING_SINGLE = gql`
  query Booking($where: BookingWhereUniqueInput!) {
    booking(where: $where) {
      addons {
        id
        description
        name
        price
      }
      email
      phone
      name
      customer {
        id
        email
        phone
        name
        nameLast
      }
      employees {
        id
        name
        email
        image
      }
      dateCreated
      dateModified
      addonsCount
      end
      google
      id
      location {
        id
        name
        address
      }
      notes
      price
      service {
        id
        name
      }
      start
      status
      summary
    }
  }
`