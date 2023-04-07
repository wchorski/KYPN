import Stripe from 'stripe';

const STRIPE_SECRET = process.env.STRIPE_SECRET || 'NO_STRIPE_KEY_SET'
// const STRIPE_SECRET = process.env.WILLIAM_C || 'NO_STRIPE_KEY_SET'
console.log('STRIPE_SECRET ======', STRIPE_SECRET);



const stripeConfig = new Stripe(STRIPE_SECRET, {
  apiVersion: '2022-11-15',
});

export default stripeConfig;