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

type Props = {
  id:string,
}

export function SubscriptionItemSingle({id}:Props) {

  const [subscriptionItemState, setSubscriptionItemState] = useState<SubscriptionItem>()

  const { loading, error, data } = useQuery(
    QUERY_SUBSCRIPTIONITEM, {
    variables: { where: { id: id } }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const { user, subscriptionPlan, custom_price, dateCreated, dateModified }:SubscriptionItem = data?.booking
  
  return (
    <StyledSubscriptionItemSingle>

      <div className="edit-buttons">
        <Link href={`/bookings/update/${id}`} className="edit button"
          onClick={() => setSubscriptionItemState(data?.booking)}
        > 
        <FiEdit /> Edit 
        </Link>
      </div>

      <h2>Package: { subscriptionPlan?.name } </h2>
      <small>last updated: {datePrettyLocal(dateModified, 'full')}</small>
      <br />
      
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
                <span> {user?.name} (Unregistered User) </span>
              )}
              <br />
              <span>{user?.email} </span>
              <br />
              <span>{user?.phone}</span>
            </td>
          </tr>

          {/* <tr>
            <td><label>Start: </label> </td>
            <td><DayMonthTime dateString={start}/></td>
          </tr>
          <tr>
            <td><label>End: </label> </td>
            <td><DayMonthTime dateString={end}/></td>
          </tr> */}
          <tr>
            <td><label>Price: </label> </td>
            <td> <span className="price">{moneyFormatter(custom_price)}</span></td>
          </tr>
        </tbody>
      </table>
    </StyledSubscriptionItemSingle>
  )
}

const StyledSubscriptionItemSingle = styled.div`
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

const QUERY_SUBSCRIPTIONITEM = gql`
  query SubscriptionItem($where: SubscriptionItemWhereUniqueInput!) {
  subscriptionItem(where: $where) {
    custom_price
    dateCreated
    dateModified
    id
    status
    subscriptionPlan {
      id
      image
      name
      description
    }
    user {
      email
      id
      name
    }
  }
}
`