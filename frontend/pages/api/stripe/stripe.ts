// todo what am i doing here? lol
// // cred - https://maxkarlsson.dev/blog/verify-stripe-webhook-signature-in-next-js-api-routes
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { buffer } from 'micro';
// import Stripe from '@stripe/stripe-js';
// // @ts-ignore
// import { prisma } from '../../../prisma/shared-client';

// const endpointSecret = // YOUR ENDPOINT SECRET copied from the Stripe CLI start-up earlier, should look like 'whsec_xyz123...'

// // @ts-ignore
// export const config = {
//   api: {
//     bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
//   },
// };

// export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
//   try {
//     const requestBuffer = await buffer(req);
//     const sig = req.headers['stripe-signature'] as string;
//     // @ts-ignore
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//       apiVersion: '2020-08-27',
//     });

//     let event;

//     try {
//       // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
//       event = stripe.webhooks.constructEvent(
//         requestBuffer.toString(), // Stringify the request for the Stripe library
//         sig,
//         endpointSecret
//       );
//     } catch (err: any) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return res.status(400).send(`Webhook signature verification failed.`);
//     }

//     // Handle the event
//     switch (event.type) {
//       // Handle successful subscription creation
//       case 'customer.subscription.created': {
//         // @ts-ignore
//         const subscription = event.data.object as Stripe.Subscription;
//         await prisma.user.update({
//           // Find the customer in our database with the Stripe customer ID linked to this purchase
//           where: {
//             stripeCustomerId: subscription.customer as string
//           },
//           // Update that customer so their status is now active
//           data: {
//             isActive: true
//           }
//         })
//         break;
//       }
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     res.status(200).json({ received: true });
//   } catch (err) {
//     // Return a 500 error
//     console.log(err);
//     res.status(500).end();
//   }
// };