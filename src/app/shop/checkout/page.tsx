import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { useCart } from "@components/hooks/CartStateContext"
import CartItem from "@components/ecommerce/CartItem"
import { CartItemsList } from "@components/ecommerce/CartItemsList"
import { CartTotal } from "@components/ecommerce/CartTotal"
import { CheckoutForm } from "@components/ecommerce/CheckoutForm"
import { CheckoutTest } from "@components/ecommerce/CheckoutTest"
import StripeCheckoutButton from "@components/ecommerce/StripeCheckoutButton"
import { PageTHeaderMainAside } from "@components/layouts/PageTemplates"
import { calcTotalPrice } from "@lib/calcTotalPrice"
import fetchSessionCart from "@lib/fetchdata/fetchSessionCart"
import moneyFormatter from "@lib/moneyFormatter"
import { getServerSession } from "next-auth"
import Link from "next/link"

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function CheckoutPage ({ params, searchParams }:Props) {

  const session = await getServerSession(nextAuthOptions)

  return (
    <PageTHeaderMainAside 
      header={Header()}
      main={Main(session?.itemId)}
      aside={Aside()}
    />
  )
}

function Header(){

  return <header>
    <h1> Checkout </h1>
  </header >
}

async function Main(sessionId:string){

  return <>

    <CartItemsList />
    
    <footer>
      <hr />

      <p className="total"> 
        <strong>Total: </strong> 
        <CartTotal />
      </p>
      {/* <CheckoutForm /> */}
      <StripeCheckoutButton />
    </footer>

   
  </>
}

function Aside(){

  return <>
    aside
  </>
}