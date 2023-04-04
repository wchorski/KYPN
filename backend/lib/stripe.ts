import Stripe from 'stripe';

const STRIPE_SECRET = process.env.STRIPE_SECRET || 'NO STRIPE API KEY'
// console.log(STRIPE_SECRET)


const stripeConfig = new Stripe(STRIPE_SECRET, {
  apiVersion: '2022-11-15',
});

export default stripeConfig;