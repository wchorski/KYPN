import Stripe from 'stripe';
import 'dotenv/config'
import { envs } from '../../envs';
import { Billing_Interval } from '../keystone/types';

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
  type:'subscription'|'product',
  image:string,
  price:number,
  billing_interval:Billing_Interval,
  url:string,
}

export async function stripeProductCreate({id, name, description, category, status, authorEmail, type, image, price, billing_interval, url}:StripeProduct) {

  if(envs.STRIPE_SECRET){
    const res = await stripeConfig.products.create({
      // id: resolvedData.id, // todo idk if it gets an id 'beforeoperaiton'
      name: name || '',
      active: true,
      description: description ||'no_description',
      metadata: {
        productId: id,
        category: category,
        status: status || '',
        author: authorEmail,
        type: 'subscription'
      },
      images: [
        image || ''
      ],
      // @ts-ignore
      attributes: [
        'Subscriptionattr1',
        'Subscriptionattr2'
      ],
      shippable: false,
      unit_label: 'units',
      default_price_data: {
        currency: 'usd',
        unit_amount: price,
        recurring: { interval: billing_interval},
      },
      url: url
  
    })

    return res

  } else {
    console.log('💳 stripe not configured')
    return null
  }

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

export default stripeConfig;