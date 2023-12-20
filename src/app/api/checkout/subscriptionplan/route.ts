// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {CartItem, Coupon, Order, Session} from '@ks/types';
import stripe from "@lib/get-stripejs";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { fetchGqlProtected } from "@lib/fetchdata/fetchGqlProtected";
import { keystoneContext } from "@ks/context";
import { SubscriptionPlan } from "@ks/types";


export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const { id, couponName } = await req.json();

    const contextSudo = keystoneContext.sudo()
    
    const subscriptionPlan = await contextSudo.query.SubscriptionPlan.findOne({
      where: { id },
      query: `
        id
        name
        price
        stripeProductId
        stripePriceId
        billing_interval
        stockMax
        status
        items {
          id
        }
      `
    }) as SubscriptionPlan

    try {
      
      const userSession = await getServerSession(nextAuthOptions)
      if(!userSession) throw new Error('!!! /api/checkout/subscriptionplan Must logged in to start Subscription')
      const { isStockAvailable, message } = await checkStockCount(subscriptionPlan)

      if(!isStockAvailable) {
        console.log('/api/checkout/subscriptionplan isStockavail check ERROR: ', message)
      }

      const coupon = await contextSudo.query.Coupon.findOne({
        where: { name: couponName },
        query: `
          stripeId
          amount_off
          percent_off
        `
      }) as Coupon|undefined

      // const priceDiscount = (coupon?.percent_off) ? subscriptionPlan.price * (coupon.percent_off/100) : subscriptionPlan.price - coupon?.amount_off 

      const session = await stripe.checkout.sessions.create({
        // customer_email: userSession?.user?.email || '',
        customer: userSession.stripeCustomerId || null,
        payment_method_types: ["card", ],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              product: subscriptionPlan.stripeProductId,
              recurring: {
                interval: subscriptionPlan.billing_interval,
    
              },
              unit_amount: calcPrice(coupon, subscriptionPlan.price),
            }
          }
        ],
        mode: 'subscription',
        success_url: `${headersList.get("origin")}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${headersList.get("origin")}/shop/subscriptionplans/${id}`,
        metadata: {
          type: 'checkout.subscriptionplan',
          couponName,
          subscriptionplanId: id,
        }
      })

      return NextResponse.json({sessionId: session.id, isStockAvailable, message});

    } catch (error) {
      console.log('!!! api/checkout/subscriptionplan ERROR: ', error)
      return NextResponse.json({error, message: "!!! Error creating stripe checkout session"});
    }
}

async function checkStockCount(subplan:SubscriptionPlan){

  if(subplan.items.length + 1 > subplan.stockMax){
    return {
      message: `Insufficent Stock for ${subplan.name}. Only ${subplan.stockMax - subplan.items.length} available`,
      isStockAvailable: false
    }
  } 

  return { 
    isStockAvailable: true, 
    message: `All items are in stock`
  } 
}

function calcPrice(coupon:Coupon|undefined, planPrice:number){

  if(!coupon) return planPrice

  switch (true) {

    case coupon.percent_off !== undefined:
      return planPrice * (coupon.percent_off/100)

    case coupon.amount_off !== undefined:
      return planPrice - coupon.amount_off
  
    default:
      return planPrice
  }
}

