// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {CartItem, Order, Session} from '@ks/types';
import stripe from "@lib/get-stripejs";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { fetchGqlProtected } from "@lib/fetchdata/fetchGqlProtected";
import { keystoneContext } from "@ks/context";
import { SubscriptionPlan } from "@ks/types";


export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const { id } = await req.json();
    
    const subscriptionPlan = await keystoneContext.sudo().query.SubscriptionPlan.findOne({
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

    // const subplanDetailsArray: SubscriptionPlan[] = Object.values([subscriptionPlan]) as [];
    // console.log({subplanDetailsArray})

    // const lineItems = subplanDetailsArray.map((item) => {
    //     return {
    //       price_data: {
    //         // TODO make this part of CartItem schema item.currency, not hard coded
    //         currency: 'usd',
    //         product_data: {
    //           name: item.name,
    //           images: [item.image],
    //           metadata: {
    //             type: 'checkout.subscriptionplan',
    //             subscriptionPlanId: item.id,
    //           }
    //         },
    //         unit_amount: item.price,
    //       },
    //       quantity: 1,
    //     };
    // });

    try {
      
      const userSession = await getServerSession(nextAuthOptions)
      if(!userSession) throw new Error('!!! /api/checkout/subscriptionplan Must logged in to start Subscription')
      const { isStockAvailable, message } = await checkStockCount(subscriptionPlan)

      if(!isStockAvailable) {
        console.log('/api/checkout/subscriptionplan isStockavail check ERROR: ', message)
      }

      const session = await stripe.checkout.sessions.create({
        // customer_email: userSession?.user?.email || '',
        customer: userSession.stripeCustomerId || null,
        payment_method_types: ["card", ],
        line_items: [
          {
            price: subscriptionPlan.stripePriceId,
            quantity: 1,
            // price_data: {
            //   product_data: {
            //     name: 'hey',
            //     metadata: {
            //       id: 'hey'
            //     }
            //   }
            // }
          }
        ],
        mode: 'subscription',
        success_url: `${headersList.get("origin")}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${headersList.get("origin")}/shop/subscriptionplans/${id}`,
        metadata: {
          type: 'checkout.subscriptionplan',
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