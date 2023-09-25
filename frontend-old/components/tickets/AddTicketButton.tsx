import styled from "styled-components"
import moneyFormatter from "../../lib/moneyFormatter"

type Props = {
  price:number|undefined,
  date:string|undefined,
  setIsPopup: Function,
}

const now = new Date()

export function AddTicketButton({price, date, setIsPopup}:Props) {

  const startDate = new Date(String(date))
  // console.table({
  //   startDate,
  //   now
  // })

  if(now > startDate) return (
    <StyledAddTicketButton disabled={true}>
      Past Event
    </StyledAddTicketButton>
  )

  return (
    <StyledAddTicketButton
      onClick={() => setIsPopup(true)}
    > 
      {price && price > 0 ? (
        <span>{moneyFormatter(price)} per Ticket</span>
      ) : (
        <span> Free </span>
      )}
    </StyledAddTicketButton>
  )
}

const StyledAddTicketButton = styled.button`
  
`