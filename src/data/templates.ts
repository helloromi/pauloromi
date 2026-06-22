export type TemplateStatus = "available" | "soon" | "premium";

export type TemplateOffer = {
  key: string;
  title: string;
  shortTitle: string;
  category: "Template" | "Conseil premium";
  format: string;
  priceLabel: string;
  description: string;
  status: TemplateStatus;
};

export const geoEnrichmentTemplate = {
  key: "hubspot_geo_enrichment",
  title: "Géo-enrichissement HubSpot",
  shortTitle: "Géo-enrichissement",
  category: "Template",
  format: "Blueprint Make + Loom + README",
  priceLabel: "9 €",
  launchPriceLabel: "Offre de lancement",
  stripePaymentLink: "https://buy.stripe.com/eVq8wO93scjk0x4d2laVa00",
  storagePathEnv: "TEMPLATE_GEO_ENRICHMENT_STORAGE_PATH",
  defaultStoragePath: "hubspot-geo-enrichment/geo-enrichissement-hubspot.zip",
  description:
    "Ajoute automatiquement la région et le département sur tes contacts HubSpot pour segmenter, router et prioriser sans saisie manuelle.",
  status: "available",
} as const satisfies TemplateOffer & {
  launchPriceLabel: string;
  stripePaymentLink: string;
  storagePathEnv: string;
  defaultStoragePath: string;
};

export const upcomingTemplateOffers: TemplateOffer[] = [
  {
    key: "invoice_numbering",
    title: "Numérotation auto de factures",
    shortTitle: "Factures auto",
    category: "Template",
    format: "Blueprint Make + README",
    priceLabel: "9-19 €",
    description:
      "Un scénario pour générer une numérotation propre, continue et exploitable dans tes outils de facturation.",
    status: "soon",
  },
  {
    key: "membership_pipeline",
    title: "Kit pipeline adhésion / inscription enrichi",
    shortTitle: "Pipeline adhésion",
    category: "Template",
    format: "Base Airtable + blueprint + templates Brevo + Loom",
    priceLabel: "49-149 €",
    description:
      "Le socle opérationnel pour transformer des inscriptions en suivi clair, relances et segments activables.",
    status: "soon",
  },
  {
    key: "event_ops",
    title: "Kit événementiel",
    shortTitle: "Événementiel",
    category: "Template",
    format: "Base Airtable + blueprint + Loom",
    priceLabel: "39-99 €",
    description:
      "Du billet à l'ops terrain : une base pour garder les participants, tâches et contenus au même endroit.",
    status: "soon",
  },
  {
    key: "asso_ops_bundle",
    title: "Pack Ops Asso",
    shortTitle: "Pack Ops Asso",
    category: "Template",
    format: "Bundle des templates",
    priceLabel: "99-149 €",
    description:
      "Le bundle des briques Make, Airtable et Brevo pour structurer les opérations d'une petite association.",
    status: "soon",
  },
  {
    key: "ai_ticket_classifier",
    title: "Classifieur de tickets IA",
    shortTitle: "Tickets IA",
    category: "Conseil premium",
    format: "Framework + installation",
    priceLabel: "Template 199 € ou forfait install 800-1 500 €",
    description:
      "Un cadrage plus accompagné pour trier, prioriser et router des demandes avec un modèle IA.",
    status: "premium",
  },
  {
    key: "support_agent",
    title: "Agent de support complet",
    shortTitle: "Agent support",
    category: "Conseil premium",
    format: "Projet sur mesure + récurrent",
    priceLabel: "Sur devis",
    description:
      "Un agent connecté à ta base de connaissance, conçu pour répondre aux demandes récurrentes avec garde-fous.",
    status: "premium",
  },
];

export const templateOffers = [geoEnrichmentTemplate, ...upcomingTemplateOffers];
