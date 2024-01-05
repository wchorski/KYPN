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
import { CartItem } from "@ks/types"
import { RentalCheckoutForm } from "@components/ecommerce/RentalCheckoutForm"

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
  const {saleItems, rentalItems, error} = await fetchSessionCartItems(session?.itemId)
  

  return (
    <PageTHeaderMain 
      header={Header()}
      main={Main({
        sessionId: session?.itemId,
        saleItems,
        rentalItems,
      })}

    />
  )
}

function Header(){

  return <>
    <Section layout={'1'}>
      <h1> Checkout </h1>
    </Section>
  </>
}

type Main = {
  sessionId:string,
  saleItems:CartItem[]|undefined,
  rentalItems:CartItem[]|undefined,
}

async function Main({saleItems, rentalItems, sessionId}:Main){

  return <>
    <Section layout={'1_1'}>

        <div>
          <CartItemsList />
          
          <footer
            className={styles.footer} 
          >
            <hr />

            <p className="total"> 
              <span>Total: </span> 
              <CartTotal />
            </p>
            {/* <CheckoutForm /> */}
            <StripeCheckoutButton />
          </footer>
        </div>

        <div>
          <h2> Rental Items </h2>

          <RentalCheckoutForm sessionId={sessionId} rentalItems={rentalItems || []}/>
        </div>
     
      
    </Section>

   
  </>
}