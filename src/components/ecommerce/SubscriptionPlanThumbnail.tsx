
import React, { ReactElement } from 'react'
import Link from 'next/link';
import styles from '@styles/ecommerce/product.module.scss'
import { ImageDynamic } from '../elements/ImageDynamic';
import { OutOfStockLabel } from '../elements/OutOfStockLabel';
import { SubscriptionPlan, Session } from '@ks/types';
import { PriceTag } from '@components/ecommerce/PriceTag';
import { envs } from '@/envs';

type Props = {
  SubscriptionPlan:SubscriptionPlan,
  session:any,
}

// @ts-ignore
export async function SubscriptionPlanThumbnail({SubscriptionPlan, session}: Props):ReactElement<any, any>  {

  // const sesh:Session = {}

  if(!SubscriptionPlan) return  <p> no subscription plan </p>

  const { id, name, excerpt, price, image, status, billing_interval } = SubscriptionPlan


  return (
    <article className={styles.SubscriptionPlan} >
      
      {status === 'DRAFT' && <p> DRAFT SubscriptionPlan </p> }

      {status === 'OUT_OF_STOCK' && <OutOfStockLabel /> }
      <Link href={`/shop/subscriptionplans/${id}`} className='featured_image'>
        <ImageDynamic photoIn={image} />
      </Link>


      <div className="container">
        <Link href={`/shop/subscriptionplans/${id}`} className='title'>
          <h3>{name}</h3>
        </Link>

        <p className='desc'>{excerpt}</p>

        <div className="menu">
          
          <PriceTag price={price} subtext={`/${billing_interval}`}/>

          {status !== 'OUT_OF_STOCK' 
            ? <Link href={`/shop/subscriptionplans/${SubscriptionPlan.id}`} className='button'> view </Link>
            : <button disabled={true}> out of stock </button>
          }
            
        </div>
      </div>

      {session?.data?.role?.canManageSubscriptionPlans && (
        <div className="menu admin">
          <Link href={envs.BACKEND_URL + `/subscription-plans/${id}`} target={'_blank'}> Edit ✏️ </Link>
          {/* <SubscriptionPlanDelete id={id}> Delete </SubscriptionPlanDelete> */}
          {/* <button> delete </button> */}
        </div>
      )}
    </article>
  )
}