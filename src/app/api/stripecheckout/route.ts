// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {CartItem, Order, Session} from '@ks/types';
import stripe from "@lib/get-stripejs";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { fetchGqlProtected } from "@lib/fetchdata/fetchGqlProtected";
import { keystoneContext } from "@ks/context";


export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const { cartItems } = await req.json();
    const cartDetailsArray: CartItem[] = Object.values(cartItems) as CartItem[];

    const lineItems = cartDetailsArray.map((item: CartItem) => {
        return {
          price_data: {
            // TODO make this part of CartItem schema item.currency, not hard coded
            currency: 'usd',
            product_data: {
              name: item.product.name,
              images: [item.product.image],
              metadata: {
                cartItemId: item.id,
                productId: item.product.id,
              }
            },
            unit_amount: item.product.price,
          },
          quantity: item.quantity,

        };
    });

    try {
      
      const userSession = await getServerSession(nextAuthOptions)

      const isStockAvailable = await checkStockCount(userSession)

      if(!isStockAvailable) throw new Error('not enought stock is not available')

      const session = await stripe.checkout.sessions.create({
        customer_email: userSession?.user?.email || '',
        // customer: userSession?.stripeCustomerId || userSession?.itemId,
        payment_method_types: ["card", ],
        line_items: lineItems,
        mode: "payment",
        success_url: `${headersList.get("origin")}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${headersList.get("origin")}/shop/checkout`,
      })

      return NextResponse.json({sessionId: session.id});

    } catch (error) {
      console.log('!!! api/stripecheckout ERROR');
      console.log(error)
      return NextResponse.json({error, message: "Error creating stripe checkout session"});
    }
}

async function checkStockCount(session:any){

  if(!session) return false

  console.log({session});
  

  //Query the current user
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

  const isStockAvailable = await Promise.all(user.cart.map( async (item:CartItem) => {

    if(item.quantity > item.product.stockCount){
      console.log(`Insufficent Stock for ${item.product.name}. Only ${item.product.stockCount} available`);
      return false
    } 
    
    return true
  }))

  return isStockAvailable
}

const query = `
  mutation Checkout($chargeId: String!) {
    checkout(chargeId: $chargeId) {
      id
    }
  }
`