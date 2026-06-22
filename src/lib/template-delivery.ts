import { geoEnrichmentTemplate } from "@/data/templates";

export type DeliveryTemplate = {
  key: typeof geoEnrichmentTemplate.key;
  storagePath: string;
  expectedPriceId?: string;
  expectedPaymentLinkId?: string;
};

export const deliveryTemplates: Record<string, DeliveryTemplate> = {
  [geoEnrichmentTemplate.key]: {
    key: geoEnrichmentTemplate.key,
    storagePath:
      process.env[geoEnrichmentTemplate.storagePathEnv] ??
      geoEnrichmentTemplate.defaultStoragePath,
    expectedPriceId:
      process.env.STRIPE_GEO_ENRICHMENT_PRICE_ID ?? process.env.STRIPE_GEO_ID,
    expectedPaymentLinkId: process.env.STRIPE_GEO_ENRICHMENT_PAYMENT_LINK_ID,
  },
};

export const deliveryBucket =
  process.env.SUPABASE_TEMPLATE_BUCKET ?? "template-deliveries";

export const signedDownloadTtlSeconds = 5 * 60;

export function getDeliveryTemplate(templateKey: string) {
  return deliveryTemplates[templateKey] ?? null;
}
