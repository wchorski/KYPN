import styled from "styled-components"
import { Table } from "../elements/Table"
import moneyFormatter from "../../lib/moneyFormatter"
import { datePrettyLocalDay, datePrettyLocalTime, timePrettyTo12HourFormat } from "../../lib/dateFormatter"

type Props = {
  serviceName?:string,
  locationName?:string,
  staffName?:string,
  date?:string,
  start?:string,
  end?:string,
  price?:string,
  addons?: {
    name:string,
    price:number,
  }[],

}


export function BookingFormStatus({
  serviceName = '', 
  locationName = '', 
  staffName = '', 
  date = '',
  start = '',
  end = '',
  price = '',
  addons = []
}:Props) {

  return (
    <StyledReciept>
      <h3>{serviceName}</h3>

      <table>
        <tbody>
        <tr>
          <td> Service: </td>
          <td> {serviceName} </td>
        </tr>
        <tr>
          <td> Location: </td>
          <td> {locationName}</td>
        </tr>
        <tr>
          <td> Staff: </td>
          <td> {staffName}</td>
        </tr>

        <tr>
          <td>Addons:</td>
          <td>
            <ul>
              {addons.map((ad,i) => (
                <li key={i}>{moneyFormatter(ad.price)} {ad.name}</li>
              ))}
            </ul>
          </td>
        </tr>

        <tr>
          <td>Date: </td>
          {(timePrettyTo12HourFormat(start) === 'Invalid Date') 
            ? (<td className="disabled"> n/a </td>)
            : (<td>{datePrettyLocalDay(date)}</td>)
          } 
        </tr>
        <tr>
          <td>Start: </td>
          {(timePrettyTo12HourFormat(start) === 'Invalid Date') 
            ? (<td className="disabled"> n/a </td>)
            : (<td>{timePrettyTo12HourFormat(start)}</td>)
          } 
        </tr>
        <tr>
          <td>End: </td>
          {(timePrettyTo12HourFormat(start) === 'Invalid Date') 
            ? (<td className="disabled"> n/a </td>)
            : (<td>{timePrettyTo12HourFormat(end)}</td>)
          } 
        </tr>

        <tr>
          <td>Price:</td>
          <td>{price}</td>
        </tr>
        </tbody>
      </table>

    </StyledReciept>
  )
}

const StyledReciept = styled.div`
  table{
    td{
      vertical-align: initial;
    }

    ul{
      padding: 0 1rem;
    }
  }

  .disabled{
    color: var(--c-disabled)
  }
`