import { envs } from "@/envs"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")
const stripe = new Stripe(envs.STRIPE_SECRET)

// run in CLI for dev
// stripe listen --forward-to http://localhost:3000/api/checkout/webhook

export const POST = async (request: NextRequest, response: NextResponse) => {
	const { searchParams } = new URL(request.url)
  
  console.log('### stripe webhook checkout session ###');
  console.log('### stripe webhook checkout session ###');
  console.log('### stripe webhook checkout session ###');
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature') as string
  // console.log({payload});
  // console.log({signature});
  // console.log({searchParams});

  console.log('### stripe webhook checkout session ###');
  // let event: Stripe.Event | null = null;
  const event = stripe.webhooks.constructEvent(payload, signature!, envs.STRIPE_WEBHOOK_SECRET as string)
    console.log('💳 STRIPE WEBHOOK: ', event?.type);
      
    switch (event?.type) {
      case "checkout.session.completed":
        console.log('💳 Item type: ', event.data.object.metadata?.type);
        // TODO push all this data when creating new Order
        // console.log('💳 : object ', JSON.stringify(event.data.object, null, 2))
        
        // console.log(event.data.object.amount_subtotal);
        // console.log(event.data.object.amount_total);
        // console.log(event.data.object.customer_details);
        // console.log(event.data.object.payment_status);
        // console.log(event.data.object.status);
        
        const session = event.data.object;  
        // afterSuccessfulCheckout(event.data.object as Charge, event.data.object.metadata?.type)
        handleCheckoutSession(session);  

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
        
        // afterFailure(event.data.object as Charge, event.data.object.metadata?.type)
        break;

      default:
        // other events that we don't handle
        break;
    }

    //? old forget about it 
    //? is there some easier way to do this? where did i get this block?
	// const stripeCheckoutSessionId = searchParams.get("stripeCheckoutSessionId")
	// if (!stripeCheckoutSessionId?.length) return redirect("/shop")
	// const session = await stripe.checkout.sessions.retrieve(
	// 	stripeCheckoutSessionId
	// )
  // console.log({session});

	// if (session.status === "complete") {
	// 	// Go to a success page!

	// 	// TODO if no errors then create Order with KS
	// 	// TODO convert line_items for stripe to KS OrderItems type
	// 	// const order = await keystoneContext.db.Order.createOne({})
  //   console.log('### Stripe COMPLETED ###');
  //   console.log({session});
  //   console.log('### CREATE ORDER AND TICKETS IN KS');
	// 	return redirect(`/checkout/completed`)
	// }

	// if (session.status === "open") {
	// 	// Here you'll likely want to head back to some pre-payment page in your checkout
	// 	// so the user can try again
	// 	return redirect(`/checkout?stripeStatus=open`)
	// }

	return redirect("/shop")
}

async function handleCheckoutSession(session:Stripe.Checkout.Session) {  
  // You need to have stripe imported and initialized with your API key  
  const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {  
    expand: ['line_items'],  
  });  
  if(!checkoutSession.line_items) throw new Error('!!! No Line Items on Stripe Session')
  const lineItems = checkoutSession.line_items.data;  
  console.log({lineItems})
  // TODO add to Database!!! because we were successful
  // will need to account for different item types Ticket,Product,Subscription
  
  // Save the lineItems to your database  
  // Your logic for saving the items to the database goes here  
}  