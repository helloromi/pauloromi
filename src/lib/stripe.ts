import Stripe from "stripe";

let stripe: Stripe | null = null;

function requireStripeSecretKey() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing required environment variable: STRIPE_SECRET_KEY");
  }
  return secretKey;
}

export function getStripe() {
  stripe ??= new Stripe(requireStripeSecretKey());
  return stripe;
}
