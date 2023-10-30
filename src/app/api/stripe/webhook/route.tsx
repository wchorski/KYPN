// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600
// cred - https://www.youtube.com/watch?v=8N2Y414227I
// cred - https://reacthustle.com/blog/how-to-add-stripe-webhook-using-nextjs-13-app-router
import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {CartItem, Order} from '@ks/types';
import stripe from "@lib/get-stripejs";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { fetchGqlProtected } from "@lib/fetchdata/fetchGqlProtected";
import { keystoneContext } from "@ks/context";
import { envs } from "@/envs";
import { Stripe } from "stripe";
import { calcTotalPrice } from "@lib/calcTotalPrice";


export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.text()
  const signature = req.headers.get('stripe-signature') as string
  let event: Stripe.Event | null = null;
  
  try{
    event = stripe.webhooks.constructEvent(payload, signature!, envs.STRIPE_WEBHOOK_SECRET as string)
    console.log('+++ STRIPE WEBHOOK: ', event?.type);
      
    switch (event?.type) {
      case "checkout.session.completed":
        console.log('*** STRIPE WEBHOOK: checkout.session.completed');
        // TODO push all this data when creating new Order
        console.log(event.data.object.id);
        // console.log(event.data.object.amount_subtotal);
        // console.log(event.data.object.amount_total);
        // console.log(event.data.object.customer_details);
        // console.log(event.data.object.payment_status);
        // console.log(event.data.object.status);
        
        afterSuccessfulCheckout(event.data.object.id, event.data.object.customer_details?.email)

      case 'payment_intent.canceled':
        // handle other type of stripe events
        break;

      case 'product.updated':
        // handle other type of stripe events
        break;
      default:
        // other events that we don't handle
        break;
    }

      
    } catch (error) {
      console.log('!!! stripe webhook ERROR: ', error)

      return NextResponse.json({
        error, 
        message: "Error stripe webhook"
      }, {
        status: 444
      });
    }

    // if all good, then tell stripe we got it
    return NextResponse.json({ received: true });
}

async function afterSuccessfulCheckout(id:string, customerEmail:string|null|undefined){

  const variables = {
    chargeId: id,
    customerEmail: customerEmail || 'ANONYMOUS_USER',
  }

  try {

    const data = await keystoneContext.sudo().graphql.run({
      query: query,
      variables: variables,
    })
    

  } catch (error) {
    console.log('!!! afterSuccessfulCheckout ERROR: ', error);
    
  }
}

const query = `
  mutation Checkout($chargeId: String!, $customerEmail: String!) {
    checkout(chargeId: $chargeId, customerEmail: $customerEmail) {
      quantity
    }
  }
`