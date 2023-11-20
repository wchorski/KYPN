import { envs } from "@/envs"
import { Booking } from "@ks/types"
import { datePrettyLocal } from "@lib/dateFormatter"
import { CSSProperties } from "react"

type Props = {
  id:string,
  operation:'update'|'create'|'delete',
  booking:Booking,
}

export function HtmlBookings ({ id, operation, booking }:Props) {

  const wrap = {
    background: 'whitesmoke',
    borderRadius: '1rem',
    border: 'solid 1px #333333',
    color: '#484848',
    maxWidth: '40ch',
    margin: '0 auto',
    overflow: 'hidden',
    boxShadow: '#00000091 2px 2px 8px',
  } as CSSProperties

  const p = {
    color: '#484848',
  } as CSSProperties

  const title = { 
    marginBottom: '0',
  } as CSSProperties

  const header = { 
    background: '#f1d6d6',
    padding: '1rem',
    display: 'flex',
    gap: '1rem',
  } as CSSProperties

  const content = { 
    padding: '1rem',
  } as CSSProperties

  const footer = { 
    background: '#323232',
    padding: '1rem',
  } as CSSProperties

  const logo = {
    width: '60px',
    height: 'auto',
  } as CSSProperties

  const status = {
    borderLeft: 'solid 10px cyan',
    background: '#fff',
    paddingInline: '10px',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderLeftWidth: '10px',
  } as CSSProperties

  const BLUE = 'rgb(0, 132, 255)'
  const YELLOW = 'rgb(224, 224, 47)'
  const RED = 'rgb(148, 3, 7)'
  const GREY = 'rgb(107, 130, 141)'
  const GREEN = 'rgb(89, 201, 110)'

  const statusState = {
    ACTIVE: {
      borderColor: BLUE,
    },
    TRIAL: {
      borderColor: BLUE,
    },
    DOWNPAYMENT: {
      borderColor: BLUE,
    },
    CONFIRMED: {
      borderColor: BLUE,
    },
    SUSPENDED: {
      borderColor: YELLOW,
    },
    PAUSED: {
      borderColor: YELLOW,
    },
    POSTPONED: {
      borderColor: YELLOW,
    },
    HOLD: {
      borderColor: YELLOW,
    },
    YELLOW: {
      borderColor: YELLOW,
    },
    EXPIRED: {
      borderColor: RED,
    },
    DELINQUENT: {
      borderColor: RED,
    },
    REJECTED: {
      borderColor: RED,
    },
    CANCELED: {
      borderColor: GREY,
    },
    LEAD: {
      borderColor: GREY,
    },
    PAST: {
      borderColor: GREY,
    },
    PAID: {
      borderColor: GREEN,
    },
  }

  // const getOperation = (operation:Props['operation']) => {
  //   switch (operation) {
  //     case 'create':
  //       return 'created'
  //     case 'update':
  //       return 'updated'
  //     case 'delete':
  //       return 'deleted'
    
  //     default:
  //       return ''
  //   }
  // }

  const btn = {
    border: 'solid 1px #004b8d',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    background: '#004b8d',
    padding: '10px',
    margin: '10px 0',
    display: 'inline-block',
  } as CSSProperties

  return (
    <div style={wrap}>
      <header style={header}>
        <img 
          src={envs.FRONTEND_URL + '/assets/logo.png'} 
          alt={envs.SITE_TITLE + ' logo'} 
          width={100}
          height={100}
          style={logo}
        />
        <div>
          <h2 style={title}> Booking </h2>
          <span> {operation} </span>
        </div>
      </header>

      <div style={content}>
        {/* <p style={p}> here is content</p> */}

        <p>
          <a 
            href={envs.FRONTEND_URL + `/bookings/${id}`}
            style={btn}
          > 
            View Booking 
          </a>
        </p>

        <table>
        <tbody>
          <tr>
            <td> Status: </td>
            <td><span style={{...status, ...statusState[booking.status]}}> {booking.status} </span></td>
          </tr>
          <tr>
            <td> Client: </td>
            <td>{booking.name}</td>
          </tr>
          <tr>
            <td> Email: </td>
            <td>{booking.email}</td>
          </tr>
          <tr>
            <td> Phone: </td>
            <td>{booking.phone}</td>
          </tr>
          <tr>
            <td> Service: </td>
            <td>{booking?.service?.name}</td>
          </tr>
          <tr>
            <td> Event Start: </td>
            <td>{datePrettyLocal(booking.start, 'full')}</td>
          </tr>
        </tbody>
      </table>

      <h4> Notes: </h4>
      <p style={p}> {booking.notes || 'no notes'} </p>

      </div>

      <footer style={footer}> 
        - <a href={envs.FRONTEND_URL}> {envs.SITE_TITLE} </a>
      </footer>
    </div>
  )
}