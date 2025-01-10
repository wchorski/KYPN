// cred - https://blog.stackademic.com/integrating-stripe-checkout-mode-with-next-js-13-7fbf1680c600
import { envs } from '../../envs';
import Stripe from 'stripe';

if (!envs.STRIPE_SECRET) {
    throw new Error('!!! STRIPE_TEST_SECRET_KEY is missing. Please set the environment variable.');
}

const stripe = new Stripe(envs.STRIPE_SECRET, {
    apiVersion: "2023-10-16",
});

export default stripe;