import { geoEnrichmentTemplate } from "@/data/templates";
import { getDeliveryTemplate } from "@/lib/template-delivery";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const runtime = "nodejs";

type VerifyPayload = {
  sessionId?: string;
  templateKey?: string;
};

function getPaymentLinkId(paymentLink: Stripe.Checkout.Session["payment_link"]) {
  if (!paymentLink) return null;
  return typeof paymentLink === "string" ? paymentLink : paymentLink.id;
}

function getLineItemPriceId(session: Stripe.Checkout.Session) {
  const price = session.line_items?.data[0]?.price;
  if (!price) return null;
  return typeof price === "string" ? price : price.id;
}

function isExpectedTemplate(
  session: Stripe.Checkout.Session,
  templateKey: string,
) {
  const template = getDeliveryTemplate(templateKey);
  if (!template) return false;

  const priceId = getLineItemPriceId(session);
  const paymentLinkId = getPaymentLinkId(session.payment_link);
  const metadataTemplateKey = session.metadata?.template_key;

  return (
    (template.expectedPriceId && priceId === template.expectedPriceId) ||
    (template.expectedPaymentLinkId &&
      paymentLinkId === template.expectedPaymentLinkId) ||
    metadataTemplateKey === template.key
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerifyPayload;
    const sessionId = body.sessionId?.trim();
    const templateKey = body.templateKey ?? geoEnrichmentTemplate.key;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session Stripe manquante." },
        { status: 400 },
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price", "payment_link"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Le paiement n'est pas encore confirmé." },
        { status: 402 },
      );
    }

    if (!isExpectedTemplate(session, templateKey)) {
      return NextResponse.json(
        {
          error:
            "La session Stripe ne correspond pas au template demandé. Vérifie le price_id, le Payment Link ou la métadonnée template_key.",
        },
        { status: 403 },
      );
    }

    const customerEmail =
      session.customer_details?.email ?? session.customer_email;

    if (!customerEmail) {
      return NextResponse.json(
        { error: "Aucun e-mail client n'est attaché à ce paiement." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("template_purchases")
      .upsert(
        {
          template_key: templateKey,
          stripe_session_id: session.id,
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
          stripe_customer_email: customerEmail,
          stripe_customer_id:
            typeof session.customer === "string"
              ? session.customer
              : session.customer?.id ?? null,
          stripe_price_id: getLineItemPriceId(session),
          stripe_payment_link_id: getPaymentLinkId(session.payment_link),
          amount_total: session.amount_total,
          currency: session.currency,
          paid_at: new Date(session.created * 1000).toISOString(),
        },
        { onConflict: "stripe_session_id" },
      )
      .select("template_key, stripe_customer_email, paid_at")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Impossible d'enregistrer l'achat." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      purchase: {
        templateKey: data.template_key,
        customerEmail: data.stripe_customer_email,
        paidAt: data.paid_at,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Impossible de vérifier le paiement.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
