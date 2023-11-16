import { nextAuthOptions } from "@/session"
import CartItem from "@components/ecommerce/CartItem"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { keystoneContext } from "@ks/context"
import { Order, OrderItem, Product } from "@ks/types"
import { datePrettyLocal } from "@lib/dateFormatter"
import moneyFormatter from "@lib/moneyFormatter"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { PageTHeaderMainAside } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import styles from '@styles/ecommerce/cart.module.scss'

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function OrderByIdPage ({ params, searchParams }:Props) {

  const { id } = params

  const session = await getServerSession(nextAuthOptions)

  const order = await keystoneContext.withSession(session).query.Order.findOne({
    where: {
      id: id
    },
    query: query,
  }) as Order

  if(!order) return <p> no order found </p>

  return ( 
    <PageTHeaderMainAside 
      header={Header()}
      main={Main(order)}
      aside={Aside()}
    />
  )
  
}

function Header(){

  return<>
    <Section layout={'1'}>
      <h1> Order Receipt </h1>
    </Section>
  </>
  
}

function Main(order:Order){

  return <>

      <h2>Order Receipt</h2>
      <table>
        <tbody>
          <tr>
            <td>Customer:</td>
            <td> <Link href={`/users/${order.user.id}`}> {order.user.email}</Link></td>
          </tr>
          <tr>
            <td>Charge:</td>
            <td>{order.charge}</td>
          </tr>
          <tr>
            <td>Item Count:</td>
            <td>{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{datePrettyLocal(order.dateCreated, 'full')}</td>
          </tr>
          <tr>
            <td> Total: </td>
            <td>{moneyFormatter(order.total)}</td>
          </tr>
        </tbody>
      </table>

      <h3> Items: </h3>
      <ul className='orderItems'>
        {order?.items.map((item: OrderItem) => (

          <li key={item.id} className={styles.item}>
            
   
            <ImageDynamic photoIn={item.image} />


            <h5>{item.name}</h5>
            <div className="perItemTotal">
              <p>
                {moneyFormatter(item.price * item.quantity)}
              </p>
              <br />
              <em>{item.quantity} &times; {moneyFormatter(item.price)} each</em>
            </div>

          </li>
        ))}
      </ul>
    
  </>
}

function Aside(){
  return <p> aside </p>
}

function orderTotalCount(countArray:number[]){

}

const query = `
  charge
  dateCreated
  id
  items {
    id
    name
    price
    quantity
    image
  }
  user{
    id
    email
  }
  itemsCount
  label
  total
`