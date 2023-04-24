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
import OrderItem from './OrderItem'
import { StyledCartItem } from '../../styles/CartItem.styled'
import { ImageDynamic } from '../elements/ImageDynamic'

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

  const { order, charge } = data

  // console.log(order.items);


  return (
    <StyledOrderReceipt>
      <h2>Order Receipt</h2>
      <table>
        <tbody>
          <tr>
            <td>Order ID:</td>
            <td>{order.id}</td>
          </tr>
          <tr>
            <td>Charge:</td>
            <td>{order.charge}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{order.createdAt}</td>
          </tr>
          <tr>
            <td>Qty: </td>
            <td>{order.itemsCount}</td>
          </tr>
          <tr>
            <td>Sub Total: </td>
            <td>{moneyFormatter(order.total)}</td>
          </tr>
        </tbody>
      </table>

      <ul>
        {order?.items.map((item: any) => (
          // <OrderItem key={item.id} item={item} />
          <StyledCartItem key={item.id}>

            <ImageDynamic photoIn={item.photo} />

            <h5>{item.name}</h5>
            <span className="perItemTotal">
              {moneyFormatter(item.price * item.quantity)}
              -
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
        photo {
          altText
          id
          image {
            publicUrlTransformed
          }
        }
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