import { StyledOrderItem } from '@/styles/OrderItem.styled'
import { StyledOrderReceipt } from '@/styles/OrderReceipt.styled'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from "next/image"
import React from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import { QueryLoading } from '@/components/menus/QueryLoading'
import CartItem from '@/components/ecommerce/CartItem'
import { handlePhoto } from '@/lib/handleProductPhoto'
import moneyFormatter from '@/lib/moneyFormatter'
import OrderItem from '@/components/ecommerce/OrderItem'
import { StyledCartItem } from '@/styles/CartItem.styled'
import styled from 'styled-components'
import Head from 'next/head'

export default function AdminAllOrders() {

  const router = useRouter()
  
  const {loading, error, data} = useQuery(QUERY_ORDERS_ALL)

  if(loading) return <QueryLoading />
  if(error) return <ErrorMessage error={error}/>

  // console.log(data);
  
  const { orders } = data

  return (<>
    <Head>
      <title>Your Orders ({orders.length})</title>
    </Head>

    <StyledOrderReceipt>
      <h2>All Orders</h2>
      <OrdersList>
        {orders?.map((order:any) => (
          // <OrderItem key={item.id} item={item} />
          <OrderItem order={order} key={order.id}/>
        ))}
      </OrdersList>
    </StyledOrderReceipt>
  </>)
}


const QUERY_ORDERS_ALL = gql`
  query Orders {
    orders {
      id
      createdAt
      charge
      total
      user {
        name
        email
      }
      items {
        id
        name
        photo {
          image {
            url
            height
            width
          }
          altText
        }
      }
      itemsCount
    }
  }
`

const OrdersList = styled.ul`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); */
  grid-gap: 4rem;
`;