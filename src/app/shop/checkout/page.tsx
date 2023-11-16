import { nextAuthOptions } from "@/session"
import { CartItemsList } from "@components/ecommerce/CartItemsList"
import { CartTotal } from "@components/ecommerce/CartTotal"
import StripeCheckoutButton from "@components/ecommerce/StripeCheckoutButton"
import { PageTHeaderMain, } from "@components/layouts/PageTemplates"
import { getServerSession } from "next-auth"
import styles from '@styles/ecommerce/cart.module.scss'
import { Section } from "@components/layouts/Section"

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function CheckoutPage ({ params, searchParams }:Props) {

  const session = await getServerSession(nextAuthOptions)

  return (
    <PageTHeaderMain 
      header={Header()}
      main={Main(session?.itemId)}

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

async function Main(sessionId:string){

  return <>
    <Section layout={'1'}>

  
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
     
      
    </Section>

   
  </>
}