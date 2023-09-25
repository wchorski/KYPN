import { gql, useQuery } from "@apollo/client"
import { SubscriptionItem } from "../../lib/types"
import ErrorMessage from "../ErrorMessage"
import { QueryLoading } from "../menus/QueryLoading"
import styled from "styled-components"
import moneyFormatter from "../../lib/moneyFormatter"
import { datePrettyLocal } from "../../lib/dateFormatter"
import Link from "next/link"
import { FiEdit } from "react-icons/fi"
import { useState } from "react"
import { PopupAnim } from "../menus/PopupAnim"
import { SubItemUpdateForm } from "./SubItemUpdateForm"
import StatusMessage from "../elements/StatusMessage"

type Props = {
  id:string,
}

export function SubscriptionItemSingle({id}:Props) {

  const [subscriptionItemState, setSubscriptionItemState] = useState<SubscriptionItem>()
  const [isPopup, setIsPopup] = useState(false)
  
  const { loading, error, data } = useQuery(
    QUERY_SUBSCRIPTIONITEM, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const { user, subscriptionPlan, addons, custom_price, dateCreated, dateModified, billing_interval, status }:SubscriptionItem = data?.subscriptionItem
  
  return (<>
    <StyledSubscriptionItemSingle>

      <h2>Package: { subscriptionPlan?.name } </h2>
      <p className="description">{subscriptionPlan.description}</p>
      <br />

      {status === 'CANCELED' ? (
        <StatusMessage status={'canceled'}>
          <h3> Canceled </h3>
          <p>This subscription is canceled. To start a new subscription head to the <Link href={`/shop`}>shop</Link></p>
        </StatusMessage>
      ) : (
        <div className="edit-buttons">
          <button 
            className="edit button"
            onClick={() => setIsPopup(!isPopup)}
          > 
            <FiEdit /> Edit 
          </button>
        </div>
      )}
      
      <table>
        <tbody>
          <tr>
            <td> <label>Client: </label> </td>
            <td>
              {user ? (
                <Link href={`/user/${user.id}`}>
                  {user?.name}
                </Link>
              ) : (
                // @ts-ignore
                <span> {user.name ? user.name : 'Unregistered User'} </span>
              )}
              <br />
              <span>{user?.email} </span>
              <br />
              <span>{user?.phone}</span>
            </td>
          </tr>

          <tr>
            <td><label>started: </label> </td>
            <td>{datePrettyLocal(dateCreated, 'full')} </td>
          </tr>
          <tr>
            <td><label>updated: </label> </td>
            <td> {datePrettyLocal(dateModified, 'full')} </td>
          </tr>
          <tr>
            <td><label>Status: </label> </td>
            <td> <span className="status"> {status} </span></td>
          </tr>

          <tr>
            <td><label>Price: </label> </td>
            <td> <span className="price">{moneyFormatter(custom_price)} <small>{billing_interval} </small> </span></td>
          </tr>
        </tbody>
      </table>

      <h2> Add-ons </h2>
      {addons.length <= 0 && (
        <p> no addons </p>
      )}

    </StyledSubscriptionItemSingle>

    <PopupAnim isPopup={isPopup} setIsPopup={setIsPopup}>
      <SubItemUpdateForm 
        id={id}
        subPlanId={subscriptionPlan.id}
        userId={user.id}
        status={status}
      />
    </PopupAnim>
  </>)
}

const StyledSubscriptionItemSingle = styled.div`
  /* background-color: gainsboro; */
  color: var(--c-txt);

  .align-right{
    text-align: right;
  }

  .description{
    background-color: black;
    padding: 1rem;
  }

  table{
    width: 100%;
    border-bottom: solid 10px var(--c-txt);
    border-collapse: collapse;
    background-color: var(--c-dark);
    
    td{
      padding: 1rem;
    }

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
    /* position: fixed; */
    bottom: .5rem;
    right: .5rem;
    margin-bottom: 1rem;
    z-index: 1;

    .button{
      padding: 1rem 2rem;
      margin: 0;
      width: 6em;
      /* color: var(--c-txt-primary); */
      font-size: 1rem;
      border: solid 2px var(--c-accent);

      svg{
        font-size: 1rem;
      }

      &:hover, &:focus{
        background-color: var(--c-accent);
        color: var(--c-txt);
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

const QUERY_SUBSCRIPTIONITEM = gql`
  query SubscriptionItem($where: SubscriptionItemWhereUniqueInput!) {
  subscriptionItem(where: $where) {
    custom_price
    dateCreated
    dateModified
    billing_interval
    id
    status
    subscriptionPlan {
      id
      image
      name
      description
    }
    addons{
      id
      name
    }
    user {
      email
      id
      name
    }
  }
}
`