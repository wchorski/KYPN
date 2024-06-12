import { envs } from "@/envs";
import { Button } from "@components/elements/Button";
import { ButtonText } from "@components/elements/ButtonText";
import { PageTHeaderMain } from "@components/layouts/PageTemplates";
import { Section } from "@components/layouts/Section";
import stripe from "@lib/get-stripejs";
import moneyFormatter from "@lib/moneyFormatter";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Success | ' + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

type Props = {
  searchParams:{ session_id?:string}
  params:{id:string}
}

type Customer = {
  address:any,
  email:string,
  name:string,
  phone:string,
}

type StripeSession = {
  amount_total:number,
  payment_status:'paid'|'unpaid'|string
  status:'open'|'complete'|string,
  customer_details:Customer
}

export default async function OrderSuccessPage ({ params, searchParams }:Props) {

  const { session_id } = searchParams
  if(!session_id) return (
    <PageTHeaderMain 
      header={Header('')}
      main={MainNoDetails()}
    />
  )

  const stripeSession = await stripe.checkout.sessions.retrieve(session_id) as StripeSession

  
  const { customer_details, amount_total, payment_status, status } = stripeSession
  
  // const customer = await stripe.customers.retrieve(session.customer_details);

  if(status === 'complete'){

  }
  

  return (
    <PageTHeaderMain 
      header={Header(status)}
      main={Main(customer_details, amount_total, status)}
    />
  )
}

function Header(status:'complete'|string,){

  return <>
    <Section layout={'1'}>
      <h1> Order Details </h1>
      {status !== 'complete' && <span className="error"> error </span>}
      {status === 'complete' && <span className="success"> Order Complete </span>}
    </Section>
  </>
}

function Main(customer_details:Customer, amount_total:number, status:'complete'|string, ){

  const { address, email, name, phone } = customer_details

  if(status !== 'complete') return <>
    <Section layout={'1'}>
      <p> Order failed </p>

      <Link href={`/checkout`}> return to checkout </Link>
    </Section>
  </>

  return <>
    <Section layout={'1'}>
      <ul>
        <li>{name}</li>
        <li>{email}</li>
        {phone && (
          <li>{phone}</li>
        )}
      </ul>

      <p>total: {moneyFormatter(amount_total)}</p>

      <Link href={`/account`}> view orders ⇢ </Link>

      {/* <Button /> */}

    </Section>
  </>
}

function MainNoDetails( ){


  return <>
    <Section layout={'1'}>
      <p> Order failed </p>

      <Link href={`/shop/checkout`}> return to checkout </Link>

      {/* <Button /> */}
    </Section>
  </>
}