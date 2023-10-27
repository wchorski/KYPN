import Stripe from 'stripe';
import 'dotenv/config'
import { envs } from '../../envs';

const stripeConfig = new Stripe(envs.STRIPE_SECRET as string, {
  apiVersion: '2023-10-16',
});

export default stripeConfig;