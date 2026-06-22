import { geoEnrichmentTemplate } from "@/data/templates";
import {
  deliveryBucket,
  getDeliveryTemplate,
  signedDownloadTtlSeconds,
} from "@/lib/template-delivery";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type DownloadPayload = {
  sessionId?: string;
  templateKey?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DownloadPayload;
    const sessionId = body.sessionId?.trim();
    const templateKey = body.templateKey ?? geoEnrichmentTemplate.key;
    const template = getDeliveryTemplate(templateKey);

    if (!sessionId || !template) {
      return NextResponse.json(
        { error: "Demande de téléchargement invalide." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseAdmin();
    const { data: purchase, error: purchaseError } = await supabase
      .from("template_purchases")
      .select("id, download_count, stripe_customer_email")
      .eq("stripe_session_id", sessionId)
      .eq("template_key", template.key)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json(
        { error: "Aucun achat confirmé n'a été trouvé pour cette session." },
        { status: 403 },
      );
    }

    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from(deliveryBucket)
        .createSignedUrl(template.storagePath, signedDownloadTtlSeconds, {
          download: "geo-enrichissement-hubspot.zip",
        });

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error("Supabase template signed URL failed", {
        bucket: deliveryBucket,
        path: template.storagePath,
        message: signedUrlError?.message,
        name: signedUrlError?.name,
      });

      return NextResponse.json(
        {
          error: `Impossible de générer le lien de téléchargement. Vérifie que le bucket privé "${deliveryBucket}" existe et que le fichier "${template.storagePath}" y est bien présent.`,
        },
        { status: 500 },
      );
    }

    await supabase
      .from("template_purchases")
      .update({
        download_count: (purchase.download_count ?? 0) + 1,
        last_download_at: new Date().toISOString(),
      })
      .eq("id", purchase.id);

    return NextResponse.json({
      signedUrl: signedUrlData.signedUrl,
      expiresInSeconds: signedDownloadTtlSeconds,
      customerEmail: purchase.stripe_customer_email,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Impossible de préparer le téléchargement.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
