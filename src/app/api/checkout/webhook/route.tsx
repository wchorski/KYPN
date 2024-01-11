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
        // TODO push all this data when creating new Order
        console.log('💳 type: ', event.data.object.metadata?.type);
        // console.log('💳 : object ', JSON.stringify(event.data.object, null, 2))
        
        // console.log(event.data.object.amount_subtotal);
        // console.log(event.data.object.amount_total);
        // console.log(event.data.object.customer_details);
        // console.log(event.data.object.payment_status);
        // console.log(event.data.object.status);
        
        // @ts-ignore
        afterSuccessfulCheckout(event.data.object as Charge, event.data.object.metadata?.type)

      case 'payment_intent.canceled':
        // handle other type of stripe events
        break;

      case 'product.updated':
        // handle other type of stripe events
        break;

      case 'invoice.paid':
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        break;

      case 'invoice.payment_failed':
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        // console.log(JSON.stringify(event.data.object, null, 2))
        // @ts-ignore
        afterFailure(event.data.object as Charge, event.data.object.metadata?.type)
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
    subscriptionplanId?:string,
    quantity?:number,
    addonIds?:string,
    couponName:string,
  }
  subscription?:string,
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

    case 'checkout.subscriptionplan':
      checkoutSubscription(charge, charge.customer_details.email)
      break;

    default:
      console.log('!!! NO CHARGE TYPE LISTED');
      
      break;
  }

}

async function afterFailure(charge:Charge, type:ChargeType){


  switch (type) {
    // todo handle failure of cart. might not need to do since payment will imidiatly fail
    // case 'checkout.cart':
    //   checkoutCart(charge.id, charge.customer_details.email)
    //   break;
    
    // todo handle failure of tickets
    // case 'checkout.tickets':
    //   checkoutTickets(charge, charge.customer_details.email)
    //   break;

    case 'checkout.subscriptionplan':
      checkoutSubscriptionFail(charge)
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

async function checkoutSubscriptionFail(charge:Charge){

  const updatedSubItem = await keystoneContext.sudo().query.SubscriptionItem.updateOne({
    where: {
      id: charge.metadata.subscriptionplanId 
    },
    data: {
      status: 'DELINQUENT',
    }
  })

  console.log('!!! checkoutSubscriptionFail: ', updatedSubItem)
  
}

async function checkoutSubscription(charge:Charge, customerEmail:string|null|undefined, ){
  
  const vars = {
    customPrice: charge.amount_total,
    amountTotal: charge.amount_total,
    planId: charge.metadata.subscriptionplanId,
    chargeId: charge.id,
    customerEmail: customerEmail,
    stripeSubscriptionId: charge.subscription,
    addonIds: charge.metadata.addonIds ? charge.metadata.addonIds.split(',') : [],
    couponNames: charge.metadata.couponName ? [charge.metadata.couponName] : null,
  }
  

  try {

    const data = await keystoneContext.sudo().graphql.run({
      query: `
        mutation CheckoutSubscription($amountTotal: Int!, $planId: String!, $chargeId: String!, $stripeSubscriptionId: String!, $customerEmail: String!, $addonIds: [String], $couponNames: [String]) {
          checkoutSubscription(amount_total: $amountTotal, planId: $planId, chargeId: $chargeId, stripeSubscriptionId: $stripeSubscriptionId, customerEmail: $customerEmail, addonIds: $addonIds, couponNames: $couponNames) {
            status
          }
        }
      `,
      variables: vars,
    })
    

  } catch (error) {
    console.log('!!! checkoutSubscription ERROR: ', error);
    
  }
}

async function checkoutCart(id:string, customerEmail:string|null|undefined){

  try {

    const data = await keystoneContext.sudo().graphql.run({
      query: `
        mutation Checkout($customerEmail: String!, $chargeId: String, $start: String, $end: String, $durationInHours: String, $location: String, $delivery: Boolean) {
          checkout(customerEmail: $customerEmail, chargeId: $chargeId, start: $start, end: $end, durationInHours: $durationInHours, location: $location, delivery: $delivery) {
            id
          }
        }
      `,
      variables:{ 
        chargeId: id,
        customerEmail: customerEmail || 'ANONYMOUS_USER',
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
        // durationInHours: String(timeCalcHours(state.start, state.end)),
        location,
        delivery: delivery ? true : false,
    })
    

  } catch (error) {
    console.log('!!! checkoutCart ERROR: ', error);
    
  }
}