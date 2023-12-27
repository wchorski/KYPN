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
import StripeSubscriptionButton from "@components/ecommerce/StripeSubscriptionButton"
import ErrorMessage from "@components/ErrorMessage"
import { fetchSubscriptionPlan } from "@lib/fetchdata/fetchSubscriptionPlan"
import { SubscriptionPlan } from "@ks/types"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import { DocumentRenderer } from "@keystone-6/document-renderer"
import { CheckoutSubscriptionPlanForm } from "@components/ecommerce/CheckoutSubscriptionPlanForm"
import { PriceTag } from "@components/ecommerce/PriceTag"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Subscribe | ' +  envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function CheckoutSubscriptionPlan ({ params, searchParams }:Props) {

  const session = await getServerSession(nextAuthOptions)
  const { subscriptionPlan, count, error } = await fetchSubscriptionPlan(params.id, session)
  
  if (error) return <ErrorMessage error={error} />

  if(!subscriptionPlan) return <p> subscription plan not found </p>

  return (
    <PageTHeaderMain 
      header={Header()}
      main={Main(subscriptionPlan)}

    />
  )
}

function Header(){

  return <>
    <Section layout={'1'}>
      <h1> Subscribe </h1>
    </Section>
  </>
}

async function Main(subscriptionPlan:SubscriptionPlan){

  const {id, name, image, addons, description, excerpt, price} = subscriptionPlan

  return <>
    <Section layout={'1_1'}>

        <div>
          <h3>{name}</h3>
          <ImageDynamic photoIn={image}/>

          <p>{excerpt} <Link href={`/shop/subscriptionplans/${id}`}> Read more... </Link></p>

          {/* {description?.document && (
            <DocumentRenderer document={description.document}/>
          )} */}

          <PriceTag price={price}/>

          <CheckoutSubscriptionPlanForm />

          
          <footer
            className={styles.footer} 
          >
            <hr />

            <p className="total"> 
              <span>Total: ???</span> 
              {/* <CartTotal /> */}
            </p>
            
            <StripeSubscriptionButton id={id} />
          </footer>
        </div>

        <div></div>
     
      
    </Section>

   
  </>
}