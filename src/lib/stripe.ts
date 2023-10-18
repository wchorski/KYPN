import Stripe from 'stripe';
import 'dotenv/config'
import { envs } from '../../envs';

const STRIPE_SECRET = envs.STRIPE_SECRET
// const STRIPE_SECRET = process.env.WILLIAM_C || 'NO_STRIPE_KEY_SET'
// console.log('STRIPE_SECRET ======', STRIPE_SECRET);



const stripeConfig = new Stripe(STRIPE_SECRET, {
  apiVersion: '2023-10-16',
});

export default stripeConfig;