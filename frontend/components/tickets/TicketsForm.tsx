import { gql, useMutation } from "@apollo/client";
import ErrorMessage from "../ErrorMessage";
import { StyledFormMini } from "../events/TicketListItem";
import { QueryLoading } from "../menus/QueryLoading";
import useForm2 from "../../lib/useForm2";
import { Event, InputObj } from "../../lib/types";
import { FormInput } from "../elements/Forminput";
import { useState } from "react";
import styled from "styled-components";
import { RiAddLine, RiSubtractFill } from "react-icons/ri";
import moneyFormatter from "../../lib/moneyFormatter";
import Link from "next/link";
import { datePrettyLocal } from "../../lib/dateFormatter";

type Props = {
  event:Event,
  holderId:string,
  qrcode?:string,
  status?:string,
  price?:number,
}

export  function TicketsForm({price, event, holderId, qrcode, status}:Props) {

  const [quantityState, setQuantityState] = useState(1)
  const [successMessage, setSuccessMessage] = useState('')

  const inputs:InputObj[] = [
    {
      name: 'event',
      type: 'text',
      placeholder: '', 
      label: 'event',
      errorMessage: 'event name error',
      required: true,
      initial: event.id || '',
      disabled:true,
    },
    {
      name: 'holder',
      type: 'text',
      placeholder: '', 
      label: 'holder',
      errorMessage: 'holder error',
      required: true,
      initial: holderId || '',
      disabled:true,
    },
    {
      name: 'status',
      type: 'text',
      placeholder: '', 
      label: 'status',
      errorMessage: 'status error',
      required: true,
      initial: status|| '',
      disabled:true,
    },
    {
      name: 'quantity',
      type: 'number',
      placeholder: '', 
      label: 'quantity',
      errorMessage: 'quantity error',
      required: true,
      initial: 1 || '',
    },
    
  ]

  const [createTickets, { error, loading, data }] = useMutation(CREATE_TICKETS)
  const {values, setValues, handleFindProps, handleChange, clearForm, resetForm } = useForm2(inputs)

  async function handleSubmit(e:any){
    e.preventDefault()
    // console.log({values});

    const formattedData = Array.from({ length: quantityState }, (_, index) => ({
      event: {
        connect: {
          id: event.id
        }
      },
      holder: {
        connect: {
          id: holderId
        }
      },
      // qrcode: null,
      // status: null
    }));
    
    try{

      const res = await createTickets({
        variables: { data: formattedData }
      })

      // console.log({res});
      setSuccessMessage(`${quantityState} Tickets confirmed`)
      

    } catch(err){
      console.log('ticket form catch, ', err);
      
    }
  }

  // if (loading) return <QueryLoading />
  // if (error) return <ErrorMessage error={error} />

  if(!holderId) return (
    <div>
      <h3> Login</h3>
      <p>Must be logged in to purchase tickets</p>
      <p><Link href={`/auth/login`}> Login </Link></p>
    </div>
  )

  if(successMessage) return(
    <div>
      <h3> Success</h3>
      <p>{successMessage}</p>
      <p><Link href={`/account#tickets`}> My Tickets </Link></p>
      <button onClick={() => {setSuccessMessage(''); setQuantityState(1);}}> Get More Tickets</button>
    </div>
  )

  return (
    <StyledForm method="POST" onSubmit={handleSubmit}>

      <header>
        <h4>{event.summary}</h4>
        <time>{datePrettyLocal(String(event.start), 'full')}</time>
      </header>

      <legend> Get Tickets </legend>

      <div className="hidden">
        <FormInput 
          {...handleFindProps('event')}
          isDisabled={true}
          value={values['event']}
          onChange={handleChange}
        />
        <FormInput 
          {...handleFindProps('holder')}
          isDisabled={true}
          value={values['holder']}
          onChange={handleChange}
        />
        <FormInput 
          {...handleFindProps('quantity')}
          isDisabled={true}
          value={quantityState}
          onChange={setQuantityState}
        />
      </div>

      <h4>
        {price && price > 0 ? (
          <span>{moneyFormatter(price)} per Ticket</span>
        ) : (
          <span> Free </span>
        )}
        </h4>

      <div className="quantity-cont">
        <button 
          type="button"
          aria-label="subtract ticket"
          data-tooltip="subtract"
          disabled={quantityState <= 0 ? true : false}
          onClick={() => setQuantityState(prev => (prev - 1 < 0) ? 0 : prev -1) }
        > 
          <RiSubtractFill/>
        </button>

        <span className="quantity">{quantityState}</span>

        <button 
          type="button" 
          aria-label="add ticket"
          data-tooltip="add"
          onClick={() => setQuantityState(prev => prev + 1) }
        > 
          <RiAddLine />
        </button>
      </div>

      <button type="submit" className="button"> Get Tickets </button>

      <div className="fetch-status">
        {loading && <QueryLoading />}
        {error && <ErrorMessage error={error} />}
      </div>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  position: relative;
  /* .fetch-status{
    position: absolute;
    
  } */

  .hidden{
    visibility: hidden;
    height: 1px;
  }

  header{
    h4{
      margin-bottom: 0;
    }

    margin-bottom: 1rem;
  }

  .quantity-cont{
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-align: center;

    input[type="number"]{
      width: 4rem;

      transform: translateX(5px);
    }

    .quantity{
      color: var(--c-txt);
      font-weight: bold;
      font-size: 2rem;
    }

    button{
      position: relative;
      border-radius: 50%;
      /* width: 68px; */

      border: solid 2px var(--c-3);
      color: var(--c-3);
      background-color: transparent;
      transition: all .1s;
      
      &:active{
        background-color: var(--c-accent);

      }

      svg{
        font-size: 2rem;
      }
    }

  }

  button[type="submit"]{
    margin-top: 3rem;
    width: 100%;
    padding: 1rem 2rem;
    border-radius: var(--br-sharp);
  }
`


const CREATE_TICKETS = gql`
  mutation CreateTickets($data: [TicketCreateInput!]!) {
    createTickets(data: $data) {
      status
      holder{
        id
        name
        email
      }
      event {
        id
        location {
          id
          name
        }
        photo
        price
        start
      }
    }
  }
`