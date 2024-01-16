// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {CartItem, Order, Session} from '@ks/types';
import stripe from "@lib/get-stripejs";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { keystoneContext } from "@ks/context";
import { envs } from "@/envs";
import { datePrettyLocal } from "@lib/dateFormatter";
import Stripe from "stripe";

type Request = {
  cartItems:CartItem[],
  rental?:{
    hours:number,
    start:string,
    end:string,
    location:string,
    delivery:boolean,
  },
}

export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const { cartItems, rental }:Request = await req.json();
    const cartDetailsArray: CartItem[] = Object.values(cartItems) as CartItem[];

    const lineItems = cartDetailsArray.map((item: CartItem) => {

      if(item.type === 'RENTAL') return {
        price_data: {
          // TODO make this part of CartItem schema item.currency, not hard coded
          currency: 'usd',
          product_data: {
            name: `${item.product.name} x${rental?.hours} hours`,
            images: item.product.image ? [item.product.image] : [envs.FRONTEND_URL + '/assets/placeholder.png'],
            metadata: {
              type: 'checkout.cart',
              cartItemId: item.id,
              productId: item.product.id,
            }
          },
          unit_amount: item.product.rental_price * (rental?.hours ? rental.hours : 1),
        },
        quantity: item.quantity,
      }

      return {
        price_data: {
          // TODO make this part of CartItem schema item.currency, not hard coded
          currency: 'usd',
          product_data: {
            name: item.product.name,
            images: item.product.image ? [item.product.image] : [envs.FRONTEND_URL + '/assets/placeholder.png'],
            metadata: {
              type: 'checkout.cart',
              cartItemId: item.id,
              productId: item.product.id,
            }
          },
          unit_amount: item.product.price,
        },
        quantity: item.quantity,
      }
    })

    try {
      
      const userSession = await getServerSession(nextAuthOptions)
      if(!userSession) throw new Error('!!! /api/checkout/cart Must loggin to check out')
      const { isStockAvailable, message } = await checkStockCount(userSession)

      if(!isStockAvailable) {
        console.log('/api/checkout/cart isStockavail check ERROR: ', message)
      }

      let checkoutSession:Stripe.Checkout.Session = {
        customer_email: userSession?.user?.email || '',
        // todo try connect existing stripe customer first
        // customer: userSession.stripeCustomerId || null,
        payment_method_types: ["card", ],
        // @ts-ignore
        line_items: lineItems,
        mode: "payment",
        success_url: `${headersList.get("origin")}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${headersList.get("origin")}/shop/checkout`,
        metadata: {
          type: 'checkout.cart',
          start: rental?.start || '',
          end: rental?.end || '',
          location: rental?.location || '',
          delivery: rental?.delivery ? 'true' : 'false',
        },
      }
      
      if(rental?.end) {
        // @ts-ignore
        checkoutSession.custom_text = {
          submit:  { message: cartDetailsArray.filter(i => i.type === 'RENTAL').length > 0 
            ? `RENTAL: 
              \nstart: ${datePrettyLocal(rental?.start || '', 'full')}, 
              \nend: ${datePrettyLocal(rental?.end || '', 'full')},
              \nlocation: ${rental?.location},
              \n${rental?.delivery ? 'DELIVERY' : 'PICKUP'},
            ` 
            : ''
          }
        }
      }
      // @ts-ignore
      const session = await stripe.checkout.sessions.create(checkoutSession)

      return NextResponse.json({sessionId: session.id, isStockAvailable, message});

    } catch (error) {
      console.log('!!! api/checkout/cart ERROR: ', error)
      return NextResponse.json({error, message: "!!! Error creating stripe checkout session"});
    }
}

async function checkStockCount(session:any){

  const user = await keystoneContext.withSession(session).query.User.findOne({
    where: { id: session.itemId },
    query:
      `
        id
        name
        email
        orders {
          id
        }
        cart {
          id
          quantity
          product {
            id
            name
            price
            stockCount
            image
          }
        }
      `,
  })

  let message = ''

  const isStockAvailable = await Promise.all(user.cart.map( async (item:CartItem) => {

    if(item.quantity > item.product.stockCount){
      message = `Insufficent Stock for ${item.product.name}. Only ${item.product.stockCount} available`
      return false
    } 
    
    message = `All items are in stock`
    return true
  }))

  return { 
    isStockAvailable: isStockAvailable[0], 
    message 
  }
    
}