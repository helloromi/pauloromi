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
  format: "Blueprint Make + Vidéo d'explication",
  priceLabel: "10 €",
  launchPriceLabel: "Offre de lancement",
  stripePaymentLink: "https://buy.stripe.com/eVq8wO93scjk0x4d2laVa00",
  storagePathEnv: "TEMPLATE_GEO_ENRICHMENT_STORAGE_PATH",
  defaultStoragePath: "hubspot-geo-enrichment/geo-enrichissement-hubspot.zip",
  description:
    "Ajoute automatiquement la région et le département sur tes contacts HubSpot, sans copier-coller ni tableur à côté.",
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
      "Un petit automatisme pour numéroter tes factures proprement, sans y penser à chaque fois.",
    status: "soon",
  },
  {
    key: "membership_pipeline",
    title: "Kit suivi des adhésions / inscriptions",
    shortTitle: "Suivi adhésions",
    category: "Template",
    format: "Base Airtable + blueprint + templates Brevo + Loom",
    priceLabel: "49-149 €",
    description:
      "Une base simple pour suivre les inscriptions, relancer les personnes et garder les infos au bon endroit.",
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
      "Une base pour préparer un événement sans disperser les participants, les tâches et les infos pratiques.",
    status: "soon",
  },
  {
    key: "asso_ops_bundle",
    title: "Pack outils asso",
    shortTitle: "Pack outils asso",
    category: "Template",
    format: "Bundle des templates",
    priceLabel: "99-149 €",
    description:
      "Un ensemble de modèles pour aider une petite association à mieux suivre ses actions du quotidien.",
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
      "Une aide plus accompagnée pour classer les demandes reçues et savoir lesquelles traiter en premier.",
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
      "Un assistant connecté à tes documents pour répondre aux questions qui reviennent souvent.",
    status: "premium",
  },
];

export const templateOffers = [geoEnrichmentTemplate, ...upcomingTemplateOffers];
