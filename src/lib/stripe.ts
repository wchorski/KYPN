import Stripe from 'stripe';
import 'dotenv/config'
import { envs } from '../../envs';

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
  billing_interval:'day'|'month'|'year',
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

export async function stripeCustomerDelete(id:string){
  const deleted = await stripeConfig.customers.del(
    id
  );

  return deleted
}

export default stripeConfig;