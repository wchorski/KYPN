import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { useCart } from "@components/context/CartStateContext"
import CartItem from "@components/ecommerce/CartItem"
import { CheckoutForm } from "@components/ecommerce/CheckoutForm"
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

  const { cart, error } = await fetchSessionCart()

  if(error) return <ErrorMessage error={error}/>

  return <>
    {cart && cart?.length <= 0 
    ? <p> Cart is empty. <Link href={`/shop`}> Go to shop </Link> </p>
    : (<>
    
      <ul className="items">
        {cart?.map((item: any) => <CartItem key={item.id} item={item} sessionId={sessionId} />)}
      </ul>

      
      <footer>
        <hr />

        <p className="total"> <strong>Total: </strong> {moneyFormatter(calcTotalPrice(cart))}</p>
        {/* <CheckoutForm /> */}
      </footer>

      <StripeCheckoutButton />
    </>)}
  </>
}

function Aside(){

  return <>
    aside
  </>
}