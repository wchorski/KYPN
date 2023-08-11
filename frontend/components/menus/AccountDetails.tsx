import { useEffect, useRef, useState } from "react"
import { MdAutorenew, MdOutlineAccountBox, MdOutlineDownload, MdShop,  } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi"
import styled from "styled-components"
import { Table } from "../elements/Table"
import { Booking, SubscriptionItem, User } from "../../lib/types"
import TicketsList from "../events/TicketsList"
import { datePrettyLocalDay, datePrettyLocalTime } from "../../lib/dateFormatter"
import Link from "next/link"
import { FiEdit } from "react-icons/fi"
import { PopupModal } from "../elements/PopupModal"
import { UserUpdateForm } from "../user/UserUpdateForm"
import { BsQrCode } from "react-icons/bs"
import { gql, useQuery } from "@apollo/client"
import { QueryLoading } from "./QueryLoading"
import ErrorMessage from "../ErrorMessage"
import moneyFormatter from "../../lib/moneyFormatter"
import { NoData } from "../elements/NoData"


enum DASH_STATE {
  DASHBOARD = 'dashboard',
  ORDERS = 'orders',
  SUBSCRIPTIONS = 'subscriptions',
  DOWNLOADS = 'downloads',
  TICKETS = 'tickets',
}


export function AccountDetails({ id, name, nameLast, email, tickets }: User) {

  const dashRef = useRef<HTMLHeadingElement | null>(null)
  const ordersRef = useRef<HTMLHeadingElement | null>(null)
  const subscriptionsRef = useRef<HTMLHeadingElement | null>(null)
  const downloadsRef = useRef<HTMLHeadingElement | null>(null)
  const ticketsRef = useRef<HTMLHeadingElement | null>(null)
  const [state, setState] = useState<string>(DASH_STATE.DASHBOARD)
  const [userData, setUserData] = useState<User>()
  const [bookingCells, setBookingCells] = useState([])
  const [subscriptionCells, setSubscriptionCells] = useState([])

  const { loading, error, data } = useQuery(
    USER_DASH_QUERY, {
    variables: { where: { id: id } }
  })

  function handleNavClick(state:string, ref:any){

    setState(state)

    if (ref.current) {
      // ref.current.scrollIntoView({ behavior: 'smooth' });
      // const scrollOffset = 50; // Adjust this value as needed
      // window.scrollBy(0, -scrollOffset);

      var headerOffset = 105;
      var elementPosition = ref.current.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
      }); 
    }
  };

  useEffect(() => {
    if(!data?.user) return

    const cellsBook = data.user.bookings.map((book:Booking) => ({
      date: datePrettyLocalDay(book.start || '') + ' ' + datePrettyLocalTime(book.start || ''),
      service: book.service.name,
      price: moneyFormatter(book.price),
      // end: datePrettyLocalDay(book.end || '') + ' ' + datePrettyLocalTime(book.end || ''),
      details: book.id,
    }))
    // console.log(cells);
    setBookingCells(cellsBook)

    const cellsSubs = data.user.subscriptions.map((sub:SubscriptionItem) => ({
      plan: sub.subscriptionPlan.name,
      status: sub.status,
      // end: datePrettyLocalDay(book.end || '') + ' ' + datePrettyLocalTime(book.end || ''),
      details: sub.id,
    }))
    // console.log(cells);
    setSubscriptionCells(cellsSubs)



    
    // return () => 
  }, [data?.user])

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  // console.log(data);
  // const {user}:{user:User} = data

  return (<>
    <PopupModal data={userData} setData={setUserData}>
     <UserUpdateForm user={{ id, name, nameLast, email, tickets }} setUser={setUserData}/>
    </PopupModal>
    
    <StyledAccountCard>
      <StyledAccountNav>
        <ul>
          <li>
            <button 
              onClick={() => handleNavClick(DASH_STATE.DASHBOARD, dashRef)} 
              className={state === DASH_STATE.DASHBOARD ? 'active' : ''}
            >
              Dashboard <MdOutlineAccountBox />
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick(DASH_STATE.ORDERS, ordersRef)} 
              className={state === DASH_STATE.ORDERS ? 'active' : ''}
            >
              Orders <MdShop />
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick(DASH_STATE.SUBSCRIPTIONS, subscriptionsRef)} 
              className={state === DASH_STATE.SUBSCRIPTIONS ? 'active' : ''}
            >
              Subscriptions <MdAutorenew />
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick(DASH_STATE.DOWNLOADS, downloadsRef)} 
              className={state === DASH_STATE.DOWNLOADS ? 'active' : ''}
            >
              Downloads <MdOutlineDownload />
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick(DASH_STATE.TICKETS, ticketsRef)} 
              className={state === DASH_STATE.TICKETS ? 'active' : ''}
            >
              Tickets <HiOutlineTicket />
            </button>
          </li>
        </ul>
      </StyledAccountNav>

      <div className="dash-cont">

        <article ref={dashRef} className={state === DASH_STATE.DASHBOARD ? 'active' : ''}>
          <h3  >Dashboard</h3>
          <table>
            <tbody>
              <tr>
                <td>email: </td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>name: </td>
                <td>{name} {nameLast}</td>
              </tr>
            </tbody>
          </table>
    
          <button data-tooltip={'edit'} onClick={() => setUserData({id: '123', name: 'yo', email: 'yo@bro.lan'})}>
            <FiEdit />
          </button>

        </article>

        <article ref={ordersRef} className={state === DASH_STATE.ORDERS ? 'active' : ''}>

          <h3>Orders / Services</h3>

          <Table 
            caption=""
            headers={[
              'service',
              'date',
              'price', 
              'details',
            ]}
            cells={bookingCells}
            route={`/bookings`}
          />

        </article>

        <article ref={subscriptionsRef} className={state === DASH_STATE.SUBSCRIPTIONS ? 'active' : ''}>
          <h3>Subscriptions</h3>
          <Table 
            caption=""
            headers={[
              'plan',
              'status',
              'details',
            ]}
            cells={subscriptionCells}
            route={`/subscriptions`}
          />

        </article>

        <article ref={downloadsRef} className={state === DASH_STATE.DOWNLOADS ? 'active' : ''}>
          <h3>Downloads</h3>

        </article>

        <article ref={ticketsRef} className={state === DASH_STATE.TICKETS ? 'active' : ''}>
          <h3> Tickets </h3>
          <StyledTicketList>
            
            {tickets && tickets.length <= 0 && <NoData /> }

            {tickets && tickets.map(tick => (
              <li key={tick.id}>
                <div className="meta">
                  <Link href={`/events/e/${tick.event?.id}`}>
                    <strong>{tick.event?.summary}</strong>
                  </Link>
                  <br />
                  <small>{datePrettyLocalDay(tick.event?.start || '')}</small>
                  <br />
                  <Link href={`/locations/${tick.event?.location?.id}`}>
                    <small>{tick.event?.location?.name}</small>
                  </Link>
                  <br />
                </div>

                <Link href={`/tickets/${tick.id}`} data-tooltip="ticket link QR code" className="button qrbutton"> 
                  <BsQrCode />
                </Link>

              </li>
            ))}
          </StyledTicketList>

        </article>
        

      </div>
    </StyledAccountCard>
  </> )
}

const USER_DASH_QUERY = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      bookings {
        id
        price
        start
        service {
          name
        }
        status
      }
      subscriptions{
        id
        subscriptionPlan {
          id
          name
        }
        status
      }
    }
  }
`

const StyledTicketList = styled.ul`
  padding: 0;

  li{
    border: solid 1px var(--c-primary);
    margin-bottom: .2em;
    border-radius: var(--br-dull);
    padding: .5em;

    display: flex;

    .qrbutton{
      margin-left: auto;
    }
  }
`

const StyledAccountCard = styled.div`
  display: flex;
  

  .dash-cont{
    flex-grow: 1;
    /* padding: 0 1em; */
    display: grid;

    h2{
      margin-top: 0;
    }

    article{
      /* height: 30em; */
      overflow-y: scroll;
      opacity: 0;
      transition: all .3s;
      background-color: var(--c-desaturated);
      padding: 0 1em;

      grid-column: 1;
      grid-row: 1;

      h3{
        transform: translateX(20px);
        transition: all .3s;
        text-decoration: underline;
      }
      
    }

    article.active{
      opacity: 1;
      /* pointer-events: all; */
      z-index: 1;

      h3{
        transform: translateX(0px);

      }
    }
  }

  @media screen and (max-width: 600px){
    nav{display: none}

    .dash-cont{
      article{
        opacity: 1;
        grid-column: auto;
        grid-row: auto;
        height: auto;
        overflow-y: visible;
        border-bottom: 1px solid black;
      }
    }
  }
`


const StyledAccountNav = styled.nav`
  /* background-color: #cbcbe2; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;

  > ul {
    position: sticky;
    top: 3rem;
  }
  

  li{
    display: flex;
    width: 100%;
  }
  
  
  button{
    flex-grow: 1;
    width: 100%;
    text-align: left;
    height: auto;
    align-self: stretch;
    padding: 2em 1em;
    text-transform: uppercase;
    font-size: .7rem;
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0;
    border: none;

    &.active{
      background-color: var(--c-primary);
      color: var(--c-txt);
    }

    svg {
      font-size: 1.6rem;
      float: right;
      margin-left: 1em;
    }
  }
`