import { envs } from "@/envs";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if(!envs.STRIPE_SECRET) throw new Error('!!! ❌ envs.STRIPE_SECRET not set' )
const stripe = new Stripe(envs.STRIPE_SECRET);

export const GET = async (request: NextRequest, response: NextResponse) => {
  const { searchParams } = new URL(request.url);

  const stripeCheckoutSessionId = searchParams.get("stripeCheckoutSessionId");


  if (!stripeCheckoutSessionId?.length)
    return redirect("/shop");

  const session = await stripe.checkout.sessions.retrieve(stripeCheckoutSessionId);

  if (session.status === "complete") {
    // Go to a success page!
    return redirect(
      `/checkout/completed`,
    );
  }

  if (session.status === "open") {
    // Here you'll likely want to head back to some pre-payment page in your checkout 
    // so the user can try again
    return redirect(
      `/checkout`,
    );
  }

  return redirect("/shop");
};