// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {CartItem, Order} from '@ks/types';
import stripe from "@lib/get-stripejs";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { fetchGqlProtected } from "@lib/fetchdata/fetchGqlProtected";


export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const {cartItems} = await req.json();
    const cartDetailsArray: CartItem[] = Object.values(cartItems) as CartItem[];

    const lineItems = cartDetailsArray.map((item: CartItem) => {
        return {
          price_data: {
            // TODO make this part of CartItem schema item.currency, not hard coded
            currency: 'usd',
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price,
          },
          quantity: item.quantity,
        };
    });

    try {
      
      const userSession = await getServerSession(nextAuthOptions)

      const session = await stripe.checkout.sessions.create({
        customer_email: userSession?.user?.email || '',
        // customer: userSession?.user?.stripeCustomerId || '',
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        // TODO send to ordr complete receipt
        success_url: `${headersList.get("origin")}/orders`,
        cancel_url: `${headersList.get("origin")}/shop/checkout`,
      });

      //? backend update
      const variables = {
        chargeId: session.id
      }
      const { data: order, error } = await fetchGqlProtected(query, variables) as {data:Order, error:unknown}
      if(!error) console.log('stripe checkout gql prot error: ', error);
      
      
      console.log(order);
      

      return NextResponse.json({sessionId: session.id});

    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Error creating checkout session"});
    }
}

const query = `
  mutation Checkout($chargeId: String!) {
    checkout(chargeId: $chargeId) {
      id
    }
  }
`