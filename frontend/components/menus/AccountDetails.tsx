import { useState } from "react"
import { MdAutorenew, MdOutlineAccountBox, MdOutlineDownload, MdShop,  } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi"
import styled from "styled-components"
import { Table } from "../elements/Table"
import { User } from "../../lib/types"
import TicketsList from "../events/TicketsList"
import { datePrettyLocalDay } from "../../lib/dateFormatter"
import Link from "next/link"
import { FiEdit } from "react-icons/fi"
import { PopupModal } from "../elements/PopupModal"
import { UserUpdateForm } from "../user/UserUpdateForm"
import { BsQrCode } from "react-icons/bs"


enum DASH_STATE {
  DASHBOARD = 'dashboard',
  ORDERS = 'orders',
  SUBSCRIPTIONS = 'subscriptions',
  DOWNLOADS = 'downloads',
  TICKETS = 'tickets',
}


export function AccountDetails({ id, name, nameLast, email, tickets }: User) {

  const [state, setState] = useState<string>(DASH_STATE.DASHBOARD)
  const [userData, setUserData] = useState<User>()

  return (<>
    <PopupModal data={userData} setData={setUserData}>
     <UserUpdateForm user={{ id, name, nameLast, email, tickets }} setUser={setUserData}/>
    </PopupModal>
    
    <StyledAccountCard>
      <StyledAccountNav>
 
          <li>
            <button onClick={() => setState(DASH_STATE.DASHBOARD)} className={state === DASH_STATE.DASHBOARD ? 'active' : ''}>
              Dashboard <MdOutlineAccountBox />
            </button>
          </li>
          <li>
            <button onClick={() => setState(DASH_STATE.ORDERS)} className={state === DASH_STATE.ORDERS ? 'active' : ''}>
              Orders <MdShop />
            </button>
          </li>
          <li>
            <button onClick={() => setState(DASH_STATE.SUBSCRIPTIONS)} className={state === DASH_STATE.SUBSCRIPTIONS ? 'active' : ''}>
              Subscriptions <MdAutorenew />
            </button>
          </li>
          <li>
            <button onClick={() => setState(DASH_STATE.DOWNLOADS)} className={state === DASH_STATE.DOWNLOADS ? 'active' : ''}>
              Downloads <MdOutlineDownload />
            </button>
          </li>
          <li>
            <button onClick={() => setState(DASH_STATE.TICKETS)} className={state === DASH_STATE.TICKETS ? 'active' : ''}>
              Tickets <HiOutlineTicket />
            </button>
          </li>
      
      </StyledAccountNav>

      <div className="dash-cont">

        <article className={state === DASH_STATE.DASHBOARD ? 'active' : ''}>
          <h3>Dashboard</h3>
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

        <article className={state === DASH_STATE.ORDERS ? 'active' : ''}>
          <h3>Orders</h3>


        </article>

        <article className={state === DASH_STATE.SUBSCRIPTIONS ? 'active' : ''}>
          <h3>Subscriptions</h3>

        </article>

        <article className={state === DASH_STATE.DOWNLOADS ? 'active' : ''}>
          <h3>Downloads</h3>

        </article>

        <article className={state === DASH_STATE.TICKETS ? 'active' : ''}>
          <h3> Tickets </h3>
          <StyledTicketList>
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

const StyledTicketList = styled.ul`
  padding: 0;

  li{
    border: solid 1px var(--c-3);
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
      height: 30em;
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
`


const StyledAccountNav = styled.nav`
  /* background-color: #cbcbe2; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  

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
    font-size: 1.2rem;
    transition: all .3s;

    &.active{
      background-color: var(--c-3);
      color: var(--c-txt-rev);
    }

    svg {
      font-size: 1.6rem;
      float: right;
      margin-left: 1em;
    }
  }
`