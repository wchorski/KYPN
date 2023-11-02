// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600
// cred - https://www.youtube.com/watch?v=8N2Y414227I
// cred - https://reacthustle.com/blog/how-to-add-stripe-webhook-using-nextjs-13-app-router
import {NextRequest, NextResponse} from "next/server";
import stripe from "@lib/get-stripejs";
import { keystoneContext } from "@ks/context";
import { envs } from "@/envs";
import { Stripe } from "stripe";


export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.text()
  const signature = req.headers.get('stripe-signature') as string
  let event: Stripe.Event | null = null;
  
  try{
    event = stripe.webhooks.constructEvent(payload, signature!, envs.STRIPE_WEBHOOK_SECRET as string)
    console.log('💳 STRIPE WEBHOOK: ', event?.type);
      
    switch (event?.type) {
      case "checkout.session.completed":
        console.log('*** STRIPE WEBHOOK: checkout.session.completed');
        // TODO push all this data when creating new Order
        console.log(event.data.object.id);
        console.log(event.data.object.metadata?.type);
        // console.log(JSON.stringify(event.data, null, 2));
        
        // console.log(event.data.object.amount_subtotal);
        // console.log(event.data.object.amount_total);
        // console.log(event.data.object.customer_details);
        // console.log(event.data.object.payment_status);
        // console.log(event.data.object.status);
        
        afterSuccessfulCheckout(event.data.object as Charge, event.data.object.metadata?.type)

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

type Charge = {
  id:string,
  amount_subtotal:number|null,
  amount_total:number|null,
  customer_details: {
    address: {
      city: string|null,
      country: string|null,
      line1: string|null,
      line2: string|null,
      postal_code:number|null,
      state: string|null,
    }|null,
    email: string|null,
    name: string|null,
    phone: string|null,
    tax_exempt: string|null,
    tax_ids: string[]|null,
  },
  payment_status:string,
  status:string,
  metadata: {
    type?: ChargeType,
    eventId?:string,
    quantity?:number,
  }
}

type ChargeType = 'checkout.tickets'|'checkout.cart'|string|undefined

async function afterSuccessfulCheckout(charge:Charge, type:ChargeType){


  switch (type) {
    case 'checkout.cart':
      checkoutCart(charge.id, charge.customer_details.email)
      break;
    
    case 'checkout.tickets':
      checkoutTickets(charge, charge.customer_details.email)
      break;

    default:
      console.log('!!! NO CHARGE TYPE LISTED');
      
      break;
  }

}

async function checkoutTickets(charge:Charge, customerEmail:string|null|undefined){

  const variables = {
    chargeId: charge.id,
    eventId: charge.metadata.eventId,
    quantity: Number(charge.metadata.quantity),
    amount_total: charge.amount_total,
    customerEmail: customerEmail || 'ANONYMOUS_USER',
  }

  try {

    const data = await keystoneContext.sudo().graphql.run({
      query: queryTickets,
      variables: variables,
    })
    

  } catch (error) {
    console.log('!!! checkoutTickets ERROR: ', error);
    
  }
}

const queryTickets = `
  mutation CheckoutTickets($chargeId: String!, $customerEmail: String!, $eventId: String!, $quantity: Int!, $amount_total: Int!) {
    checkoutTickets(chargeId: $chargeId, customerEmail: $customerEmail, eventId: $eventId, quantity: $quantity, amount_total: $amount_total ) {
      status
    }
  }
`

async function checkoutCart(id:string, customerEmail:string|null|undefined){

  const variables = {
    chargeId: id,
    customerEmail: customerEmail || 'ANONYMOUS_USER',
  }

  try {

    const data = await keystoneContext.sudo().graphql.run({
      query: queryCart,
      variables: variables,
    })
    

  } catch (error) {
    console.log('!!! checkoutCart ERROR: ', error);
    
  }
}

const queryCart = `
  mutation Checkout($chargeId: String!, $customerEmail: String!) {
    checkout(chargeId: $chargeId, customerEmail: $customerEmail) {
      quantity
    }
  }
`