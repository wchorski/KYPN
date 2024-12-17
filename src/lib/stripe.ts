import Stripe from 'stripe';
import 'dotenv/config'
import { envs } from '../../envs';
import { Billing_Interval, Duration, SubscriptionItem } from '../keystone/types';

const stripeConfig = new Stripe(envs.STRIPE_SECRET as string, {
  apiVersion: '2023-10-16',
});

type StripeProduct = {
  id:string,
  name:string,
  description:string,
  category:string,
  status:string,
  authorEmail:string,
  type:'subscription'|'product'|'addon',
  image:string,
  price:number,
  billing_interval?:Billing_Interval,
  url:string,
}

export async function stripeProductCreate({id, name, description, category, status, authorEmail, type, image, price, billing_interval, url}:StripeProduct) {

  if(!envs.STRIPE_SECRET) return 

  let stripeCreateParams: Stripe.ProductCreateParams = {
    name: name || '',
    active: true,
    description: description ||'no_description',
    metadata: {
      productId: id,
      category: category,
      status: status || '',
      author: authorEmail,
      type,
    },
    // attributes: [
    //   'Subscriptionattr1',
    //   'Subscriptionattr2'
    // ],
    shippable: false,
    unit_label: 'units',
    default_price_data: {
      currency: 'usd',
      unit_amount: price,
    },
    url: url
  }

  if(image){
    stripeCreateParams = {...stripeCreateParams, images: [
      image 
    ],}
  }
  if(billing_interval){
    const default_price_data = {
      currency: 'usd',
      unit_amount: price,
      recurring: { interval: billing_interval},
    }
    stripeCreateParams = {...stripeCreateParams, default_price_data }
  }

  const res = await stripeConfig.products.create(stripeCreateParams)

  return res

}

type Customer = {
  email:string,
  name:string,
  nameLast?:string,
  isActive:boolean,
}

export async function stripeCustomerCreate({email, name, nameLast, isActive}:Customer){

  if(!envs.STRIPE_SECRET) return
    

  const customer = await stripeConfig.customers.create({
    email: email,
    name: name + ' ' + nameLast,
    metadata: {
      isActive: String(isActive),
    }
  })

  if (!customer) return Promise.reject(new Error('Customer creation failed'));
  

  return customer

  
}

export async function stripeCustomerDelete(id:string){
  const deleted = await stripeConfig.customers.del(
    id
  );

  return deleted
}

type Price = {
  currency:'usd'|string,
  productId:string,
  stripeProductId:string,
  stripePriceId:string,
  price:number,
  image:string,
  name:string,
  status:string,
  category:string,
  excerpt:string,
  authorEmail:string,
  billing_interval:Billing_Interval,
}

export async function stripeProductUpdate({currency, productId, image, status, authorEmail, category, name, excerpt, price, stripeProductId, stripePriceId, billing_interval}:Price){

  if(!envs.STRIPE_SECRET || !stripeProductId || stripeProductId !== undefined) return 

  const currPrice = await stripeConfig.prices.retrieve(stripePriceId)

  let stripeUpdateParams: Stripe.ProductUpdateParams = {
    name,
    description: excerpt,
    // default_price: newPrice.id,
    images: [
      image
    ],
    metadata: {
      category,
      status,
      author: authorEmail,
      productId
    }
  }

  if (price && currPrice.unit_amount !== price) {

    const newPrice = await stripeConfig.prices.create({
      unit_amount: price,
      currency,
      product: stripeProductId,
      recurring: { 
        interval: billing_interval 
      },
    })

    // resolvedData.stripePriceId = newPrice.id
    stripeUpdateParams = { ...stripeUpdateParams, default_price: newPrice.id }
  } 

  const product = await stripeConfig.products.update(
    stripeProductId,
    stripeUpdateParams,
  )

  return product
}

type Coupon = {
  name:string,
  couponId:string,
  percent_off?:number,
  amount_off?:number,
  duration:Duration,
  duration_in_months:number,
}

export async function stripeCouponCreate({name, amount_off, percent_off, duration, duration_in_months, couponId}:Coupon){

  let couponParams: Stripe.CouponCreateParams = {
    name,
    duration,
    metadata: {
      couponId
    }
  }

  if(duration === 'repeating') {
    couponParams = {...couponParams, duration_in_months }
  }
  if(amount_off) couponParams = {...couponParams, amount_off }
  if(percent_off) couponParams = {...couponParams, percent_off }
  

  const coupon = await stripeConfig.coupons.create(couponParams)
  return coupon
}

//? handeled by /api/checkout/subscriptionplan/route.ts
// type SubscriptionCreate = {
//   stripeCustomerId:string,
//   stripeProductId:string,
//   billing_interval:Billing_Interval,
//   // stripePriceId:string,
// }

// export async function stripeSubscriptionCreate({stripeCustomerId, stripeProductId, billing_interval}:SubscriptionCreate){

//   if(!envs.STRIPE_SECRET) return 

//   const subscription = await stripeConfig.subscriptions.create({
//     customer: 'cus_Na6dX7aXxi11N4',
//     items: [
//       {
//         // price: 'price_1MowQULkdIwHu7ixraBm864M',
//         price_data: {
//           currency: 'usd',
//           product: stripeProductId,
//           recurring: {
//             interval: billing_interval,

//           },
//           unit_amount: price,
//         }
//       },
//     ],
//     metadata: {
//       subscriptionId: id,
//     }
//   });
// }

type SubscriptionUpdate = {
  status: SubscriptionItem['status'],
  stripeSubscriptionId:string,
  subItemId:string,
}

export async function stripeSubscriptionUpdate({status, stripeSubscriptionId, subItemId}:SubscriptionUpdate){

  if(!envs.STRIPE_SECRET) return 

  try {
    switch (status) {
      case 'PAUSED':
        const resPause = await stripeConfig.subscriptions.update(
          stripeSubscriptionId,
          {
            pause_collection: {
              behavior: 'void'
            },
            metadata: {
              subscriptionItemId: subItemId
            }
          }
        )
        break;
  
      case 'ACTIVE':
        const resActive = await stripeConfig.subscriptions.update(
          stripeSubscriptionId,
          {
            pause_collection: '',
          }
        )
        break;
      
      case 'CANCELED':
        const resCancle = await stripeConfig.subscriptions.cancel(stripeSubscriptionId);
    
      default:
        console.log('### SubscriptionItem Schema. status not supported')
        break;
    }  
  } catch (error) {
    console.log("sub item update error: ", error);
    // @ts-ignore
    throw new Error("Sub Item Status Change Error: ", error.message);
  }
  
}

export default stripeConfig;