import Stripe from 'stripe';

const STRIPE_SECRET = process.env.STRIPE_SECRET || 'NO STRIPE KEY'


const stripeConfig = new Stripe(STRIPE_SECRET, {
  apiVersion: '2022-11-15',
});

export default stripeConfig;