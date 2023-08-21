import { StyledOrderItem } from '../../styles/OrderItem.styled'
import { StyledOrderReceipt } from '../../styles/OrderReceipt.styled'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from "next/image"
import React from 'react'
import ErrorMessage from '../ErrorMessage'
import { QueryLoading } from '../menus/QueryLoading'
import CartItem from './CartItem'
import { handlePhoto } from '../../lib/handleProductPhoto'
import moneyFormatter from '../../lib/moneyFormatter'

import { StyledCartItem } from '../../styles/CartItem.styled'
import { ImageDynamic } from '../elements/ImageDynamic'
import { Order, OrderItem } from '../../lib/types'
import Link from 'next/link'
import { datePrettyLocal } from '../../lib/dateFormatter'

export default function OrderReceipt() {

  const router = useRouter()

  const { loading, error, data } = useQuery(QUERY_ORDER_ID, {
    variables: {
      where: {
        id: router.query.id
      }
    }
  })
  // console.log(data)

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  // console.log(data);

  const { order }:{order:Order} = data

  // console.log(order.items);


  return (
    <StyledOrderReceipt>
      <h2>Order Receipt</h2>
      <table>
        <tbody>
          <tr>
            <td>Customer:</td>
            <td> <Link href={`/users/${order.user.id}`}>{order.user.email}</Link></td>
          </tr>
          <tr>
            <td>Charge:</td>
            <td>{order.charge}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{datePrettyLocal(order.createdAt, 'full')}</td>
          </tr>
          {/* <tr>
            <td>Qty: </td>
            <td>{order.itemsCount}</td>
          </tr> */}
          <tr>
            <td> Total: </td>
            <td>{moneyFormatter(order.total)}</td>
          </tr>
        </tbody>
      </table>

      <h3> Items: </h3>
      <ul className='orderItems'>
        {order?.items.map((item: OrderItem) => (
          // <OrderItem key={item.id} item={item} />
          <StyledCartItem key={item.id}>
   
              <ImageDynamic photoIn={item.image} />


            <h5>{item.name}</h5>
            <span className="perItemTotal">
              <strong>
                {moneyFormatter(item.price * item.quantity)}
              </strong>
              <br />
              <em>{item.quantity} &times; {moneyFormatter(item.price)} each</em>
            </span>

          </StyledCartItem>
        ))}
      </ul>
    </StyledOrderReceipt>
  )
}


const QUERY_ORDER_ID = gql`
  query Order($where: OrderWhereUniqueInput!) {
    order(where: $where) {
      charge
      createdAt
      id
      items {
        name
        id
        price
        quantity
        image
        photo {
          altText
          id
          image {
            publicUrlTransformed
          }
        }
      }
      user{
        id
        email
      }
      itemsCount
      label
      total
    }
  }
`
// ? if using local storage
// const QUERY_ORDER_ID = gql`
//   query Order($where: OrderWhereUniqueInput!) {
//     order(where: $where) {
//       charge
//       createdAt
//       id
//       items {
//         name
//         id
//         price
//         quantity
//         photo {
//           altText
//           id
//           image {
//             height
//             url
//             width
//           }
//         }
//       }
//       itemsCount
//       label
//       total
//     }
//   }
// `