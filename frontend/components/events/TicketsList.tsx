import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { Ticket } from '../../lib/types'
import { gql, useMutation } from "@apollo/client";
import useForm from '../../lib/useForm';
import ErrorMessage from '../ErrorMessage';
import { QueryLoading } from '../menus/QueryLoading';
import { CgMenuRound } from "react-icons/cg";
import { TicketListItem } from './TicketListItem';
import { tTicketPopup } from './TicketPopup';

type Props ={ 
  tickets:Ticket[],
  setPopupData: Dispatch<SetStateAction<tTicketPopup>>,
}

export default function TicketsList({tickets = [], setPopupData}:Props) {
  
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    id: '',
    status: '',
  })
  
  if(tickets.length === 0) return (
    <p> no tickets have been purchased for this event </p>
  )

  return (
    <StyledTicketList>
      {tickets.map(ticket => (
        <TicketListItem ticket={ticket} key={ticket.id} setPopupData={setPopupData}/>
      ))}
    </StyledTicketList>
  )
}

const StyledTicketList = styled.ul`
  
  list-style: none;
  padding: 0;

  li{
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: normal;

    /* label span{
      text-transform: lowercase;  
      display: inline-block;
    }
    label span:first-letter {
      text-transform: uppercase;
    } */
  }

  /* button.edit{
    position: relative;
    border-radius: 50px;
    padding: .1em;
    border: none;
    margin-right: -2rem;
    margin-left: 1rem;
    background-color: var(--c-3);
    transition: all .3s;


    &:hover, &:focus{
      color: var(--c-txt-rev);
      box-shadow: black 1px 1px 1px;
      transform: translateY(-2px);
    }

    svg{
      font-size: 3rem;
    }

    &::before{
      --scale: 0;
      content: attr(data-tooltip);
      position: absolute;
      top: -.25rem;
      left: 50%;
      height: 25px;
      background-color: var(--c-txt);
      color: var(--c-txt-rev);
      transform: translate(-50%, -100%) scale(var(--scale));
      padding: .5rem;
      width: max-content;
      max-width: 100%;
      border-radius: .3rem;
      text-align: center;
      transition: transform ease-in .1s 1s;
    }

    &:hover::before, &:focus::before{
      --scale: 1;
      transform: translate(-50%, -100%) scale(var(--scale));
    }
  } */
`