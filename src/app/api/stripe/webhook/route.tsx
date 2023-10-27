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
    console.log('+++ STRIPE WEBHOOK HIT');
    const payload = await req.text()
    const signature = req.headers.get('stripe-signature') as string
    let event: Stripe.Event | null = null;
    
    try{
      event = stripe.webhooks.constructEvent(payload, signature!, envs.STRIPE_WEBHOOK_SECRET as string)
      
      switch (event?.type) {
      case "checkout.session.completed":
        console.log('*** STRIPE WEBHOOK: checkout.session.completed');
        // TODO push all this data when creating new Order
        console.log(event.data.object.id);
        console.log(event.data.object.amount_subtotal);
        console.log(event.data.object.amount_total);
        console.log(event.data.object.customer_details);
        console.log(event.data.object.payment_status);
        console.log(event.data.object.status);
        
        afterSuccessfulCheckout(event.data.object.id)

      case 'payment_intent.canceled':
        // handle other type of stripe events
        break;
      default:
        // other events that we don't handle
        break;
      }
      // if(event.type === 'checkout.session.completed') {
        // console.log('*** STRIPE WEBHOOK: checkout.session.completed');
      //   const session = event.data.object

      //   const line_items = await stripe.checkout.sessions.listLineItems(event.data.object.id)

      //   console.log(line_items);
      //   // const order = keystoneContext.withSession(userSession).query.Order.createOne({
      //   //   data: {
      //   //     // @ts-ignore schema goofed
      //   //     status: session.status,
      //   //     payment_status: session.payment_status,
      //   //     stripeSessionId: session.id,
      //   //   },
      //   //   query: `
      //   //     id
      //   //   `
      //   // })
      //   // console.log({order});
      
      // }
      
    } catch (error) {
      console.log('# stripe webhook ERROR');
      console.log(error)
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

async function afterSuccessfulCheckout(id:string){

  const variables = {
    chargeId: id,
  }

  try {
    const session = await getServerSession(nextAuthOptions)

    // ! GET THIS TO F WORK
    // const response = await keystoneContext.withSession(session).graphql.run({
    //   query: query,
    //   variables: variables,
    // })
    // console.log({response});
    const user = await keystoneContext.withSession(session).query.User.findOne({
      where: { id: session?.itemId },
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
    console.log(user.id);
    

    const orderItems = user.cart.map((cartItem: CartItem) => {

      return {
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
        image: cartItem.product.image,
        product: { connect: { id: cartItem.product.id }}
        // productId: cartItem.product.id,
        // photo: { connect: { id: cartItem.product.photo.id } },
      }

    })
    
    const now = new Date
    const order = await keystoneContext.withSession(session).query.Order.createOne({
      data: {
        total: calcTotalPrice(user.cart),
        items: { create: orderItems },
        user: { connect: { id: user.id } },
        charge: id,

        createdAt: now.toISOString(),
      },
    })
    console.log({order});
    

    //Clean up! Delete all cart items
    await keystoneContext.withSession(session).query.CartItem.deleteMany({
      where: user.cart.map((cartItem: CartItem) => { return { id: cartItem.id } })
    })

    console.log('---- CART ITEMS DELETED');
    

  } catch (error) {
    
  }
}

const query = `
  mutation Checkout($chargeId: String!) {
    checkout(chargeId: $chargeId) {
      id
    }
  }
`