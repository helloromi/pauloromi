export type RisqueDonnees = "vert" | "orange" | "rouge";

export type Categorie =
  | "collecte-aap"
  | "adherents-communaute"
  | "impact-reporting"
  | "com-contenu"
  | "ops-interne";

export type Fiche = {
  id: string;
  titre: string;
  categorie: Categorie;
  risque: RisqueDonnees;
  casUsage: string;
  prompt: string;
  quandNePas: string;
  gratuit: boolean;
};

export const categories: Record<Categorie, string> = {
  "collecte-aap": "Collecte & appels à projets",
  "adherents-communaute": "Adhérents & communauté",
  "impact-reporting": "Impact & reporting",
  "com-contenu": "Communication & contenu",
  "ops-interne": "Ops interne",
};

export const risquesDonnees: Record<
  RisqueDonnees,
  { label: string; description: string }
> = {
  vert: {
    label: "Vert",
    description: "Pas de données sensibles.",
  },
  orange: {
    label: "Orange",
    description: "Données de structure, sans données personnelles.",
  },
  rouge: {
    label: "Rouge",
    description:
      "Données personnelles adhérents ou bénéficiaires : jamais en clair sans cadre adapté.",
  },
};

export const fiches: Fiche[] = [
  {
    id: "trame-reponse-aap",
    titre: "Bâtir la trame d'une réponse à un appel à projets",
    categorie: "collecte-aap",
    risque: "orange",
    casUsage:
      "Pour une association qui veut structurer une première version de réponse en partant des critères du financeur et de la réalité de sa structure.",
    prompt: `Tu es un consultant spécialisé dans les réponses à appels à projets pour des structures de l'économie sociale et solidaire.

À partir des éléments ci-dessous, construis une trame de réponse claire, directement exploitable par l'équipe.

[CRITÈRES DE L'AAP]

[DESCRIPTION DE LA STRUCTURE]

Je veux :
- une proposition de plan ;
- les arguments à documenter pour chaque partie ;
- les zones où il manque probablement des preuves, chiffres ou pièces justificatives ;
- les risques de promesses trop vagues ou trop ambitieuses.

N'invente aucun chiffre, aucune date et aucun engagement. Quand une information manque, écris : "à compléter".`,
    quandNePas:
      "Ne soumets jamais la sortie telle quelle : vérifie chaque chiffre, date et engagement, l'IA en invente.",
    gratuit: true,
  },
  {
    id: "synthese-enquete-benevoles",
    titre: "Synthétiser les retours d'une enquête bénévoles en thèmes",
    categorie: "adherents-communaute",
    risque: "rouge",
    casUsage:
      "Pour une structure qui a collecté des retours qualitatifs de bénévoles et veut faire émerger les thèmes récurrents sans perdre les nuances.",
    prompt: `Tu aides une association à analyser des retours de bénévoles.

Voici des verbatims anonymisés :

[VERBATIMS]

Produis une synthèse en français avec :
- 5 à 8 thèmes récurrents ;
- pour chaque thème, une reformulation courte et neutre ;
- les signaux faibles à ne pas ignorer ;
- les tensions ou désaccords éventuels ;
- 3 pistes d'action concrètes à discuter avec l'équipe.

N'ajoute pas d'information qui n'apparaît pas dans les verbatims.`,
    quandNePas:
      "Anonymise les verbatims avant de les coller : pas de noms, pas de situations identifiantes.",
    gratuit: true,
  },
  {
    id: "recit-impact-financeur",
    titre: "Transformer des indicateurs agrégés en récit d'impact",
    categorie: "impact-reporting",
    risque: "orange",
    casUsage:
      "Pour préparer un reporting financeur plus lisible à partir d'indicateurs d'activité déjà consolidés.",
    prompt: `Tu aides une structure de l'ESS à transformer des indicateurs d'activité agrégés en récit d'impact sobre et crédible.

Données disponibles :

[DONNÉES CHIFFRÉES AGRÉGÉES]

Rédige :
- un résumé en 5 lignes ;
- les résultats observables, sans extrapolation ;
- les limites de lecture des données ;
- 3 formulations adaptées à un financeur ;
- les informations complémentaires à collecter pour renforcer le reporting.

Ne crée aucun résultat non mesuré et distingue clairement activité, résultat et impact.`,
    quandNePas:
      "Données agrégées uniquement. Ne laisse pas l'IA extrapoler des résultats que tu n'as pas mesurés.",
    gratuit: true,
  },
  {
    id: "declinaison-message-publics",
    titre: "Décliner un message pour financeurs, bénévoles et grand public",
    categorie: "com-contenu",
    risque: "vert",
    casUsage:
      "Pour adapter un même message de campagne, d'événement ou de projet à trois publics sans repartir de zéro.",
    prompt: `Tu aides une association à adapter son message sans perdre sa voix.

Message de base :

[MESSAGE DE BASE]

Décline ce message en 3 versions :
- une version pour des financeurs ;
- une version pour des bénévoles ;
- une version pour le grand public.

Pour chaque version, donne :
- un titre court ;
- un paragraphe de 600 caractères maximum ;
- un appel à l'action ;
- une note sur le ton employé.

Reste simple, concret et évite le jargon.`,
    quandNePas:
      "Relis le ton : l'IA lisse et peut effacer ce qui fait votre voix.",
    gratuit: true,
  },
  {
    id: "compte-rendu-reunion",
    titre: "Compte-rendu structuré à partir de notes de réunion brutes",
    categorie: "ops-interne",
    risque: "orange",
    casUsage:
      "Pour transformer des notes prises à la volée en compte-rendu clair, avec décisions, points ouverts et prochaines actions.",
    prompt: `Tu aides une équipe associative à structurer un compte-rendu de réunion.

Notes brutes :

[NOTES BRUTES]

Produis un compte-rendu avec :
- les sujets discutés ;
- les décisions prises ;
- les actions à faire, avec responsable et échéance si ces informations sont présentes ;
- les points à clarifier ;
- une synthèse de 5 lignes pour les absents.

N'invente ni responsable ni échéance. Si l'information manque, indique "non précisé".`,
    quandNePas:
      "Si les notes contiennent des propos nominatifs sensibles, retire-les avant.",
    gratuit: false,
  },
];
