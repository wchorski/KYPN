// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600

import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {CartItem, Event, Order, Session} from '@ks/types';
import stripe from "@lib/get-stripejs";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { fetchGqlProtected } from "@lib/fetchdata/fetchGqlProtected";
import { keystoneContext } from "@ks/context";


export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const { 
      email,
      event: eventId,
      quantity,
    } = await req.json();

    console.log(email, eventId, quantity);
    

    try {

      const event = await keystoneContext.query.Event.findOne({
        where: { id: eventId },
        query:`
          id
          summary
          image
          seats
          price
        `,
      })

      const { isSeatsAvailable, message } = await checkSeatCount(event, quantity)

      if(!isSeatsAvailable) {
        console.log('!!! NO isSeatsAvailable: ', message)
        throw new Error(message)
      }

      // const cartDetailsArray: CartItem[] = Object.values(cartItems) as CartItem[];

      const lineItems = Array.from({length: quantity}, (item:Event, i) => {
          return {
            price_data: {
              // TODO make this part of CartItem schema item.currency, not hard coded
              currency: 'usd',
              product_data: {
                name: `Ticket to ${event.summary} (${i+1} of ${quantity})`,
                images: [event.image],
                metadata: {
                  eventId: eventId,
                  ticketIndex: `${i+1} of ${quantity}`
                }
              },
              unit_amount: event.price,
            },
            quantity: 1,
          };
      });
      // console.log('+++ ticket', {lineItems});
      
      const session = await stripe.checkout.sessions.create({
        customer_email: email || 'anonymous',
        // customer: userSession?.stripeCustomerId || userSession?.itemId,
        payment_method_types: ["card", ],
        line_items: lineItems,
        mode: "payment",
        success_url: `${headersList.get("origin")}/account?dashState=tickets#tickets`,
        cancel_url: `${headersList.get("origin")}/events/${eventId}`,
        metadata: {
          type: 'checkout.tickets',
          eventId: eventId,
          quantity: quantity,
        }
      })

      return NextResponse.json({sessionId: session.id, isSeatsAvailable, message});

    } catch (error: any) {
      console.log('!!! api/checkout/tickets ERROR: ', error)
      return NextResponse.json({error, message: error?.message});
    }
}

async function checkSeatCount(event:Event, quantity:number){
  
  let message = ''
  let isSeatsAvailable = true

  const seatsTaken = await keystoneContext.query.Ticket.count({
    where: { 
      event: {
        id: {
          equals: event.id
        }
      }
    },
  }) as number

  if(quantity + seatsTaken > event.seats){
    isSeatsAvailable = false
    message = `not enough seats available, only ${event.seats - seatsTaken} seats left.`
  }

  return { 
    isSeatsAvailable, 
    message 
  }
    
}
