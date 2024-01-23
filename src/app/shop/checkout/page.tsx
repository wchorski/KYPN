import { nextAuthOptions } from "@/session"
import { CartItemsList } from "@components/ecommerce/CartItemsList"
import { CartTotal } from "@components/ecommerce/CartTotal"
import StripeCheckoutButton from "@components/ecommerce/StripeCheckoutButton"
import { PageTHeaderMain, } from "@components/layouts/PageTemplates"
import { getServerSession } from "next-auth"
import { Section } from "@components/layouts/Section"
import styles from '@styles/ecommerce/cart.module.scss'
import { Metadata } from "next"
import { envs } from "@/envs"
import fetchSessionCartItems from "@lib/fetchdata/fetchSessionCartItems"
import { CartItem as CartItemType, Rental } from "@ks/types"
import { CheckoutForm } from "@components/ecommerce/CheckoutForm"
import CartItem from "@components/ecommerce/CartItem"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Checkout | ' +  envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function CheckoutPage ({ params, searchParams }:Props) {

  const session = await getServerSession(nextAuthOptions)
  const {saleItems, rentalItems, rentals, error} = await fetchSessionCartItems(session?.itemId)
  

  return (
    <PageTHeaderMain 
      header={Header()}
      main={Main({
        sessionId: session?.itemId,
        saleItems,
        rentalItems,
        rentals,
      })}

    />
  )
}

function Header(){

  return <>
    <Section layout={'1'} styles={{display: 'none'}}>
      <h1> Checkout </h1>
    </Section>
  </>
}

type Main = {
  sessionId:string,
  saleItems:CartItemType[]|undefined,
  rentalItems:CartItemType[]|undefined,
  rentals:Rental[]|undefined,
}

async function Main({saleItems, rentalItems, rentals, sessionId}:Main){

  if(!sessionId) return  <Section layout={'1'}>
      <p> <Link href={`/auth`}> Login </Link> to view your cart </p>
  </Section>

  return <>
    <Section layout={'1'}>

      {/* <div>
        <CartItemsList />
      </div> */}

      <div>
        {/* <h4> Cart Items </h4>
        {saleItems?.map((item: any) => <CartItem key={item.id} item={item} sessionId={sessionId}/>)}

        <h4> Rental Items </h4>
        {rentalItems?.map((item: any) => <CartItem key={item.id} item={item} sessionId={sessionId}/>)} */}
        
        <CheckoutForm 
          sessionId={sessionId} 
          rentalItems={rentalItems || []}
          rentals={rentals || []}
          saleItems={saleItems || []}
        />
      </div>
     
      
    </Section>
    
    {/* <hr />
    <footer
      className={styles.footer} 
    >

      <p className="total"> 
        <span>Total: </span> 
        <CartTotal />
      </p>
      
      <StripeCheckoutButton />
    </footer> */}
  </>
}