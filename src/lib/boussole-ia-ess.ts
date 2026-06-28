import type { Categorie } from "@/data/fiches";

export type ReponseBoussole = "oui" | "non" | "je-ne-sais-pas";

export type NiveauBoussole = "stop" | "cadre" | "go";

export type Drapeau = {
  id: string;
  niveau: "stop" | "cadre";
  titre: string;
  resume: string;
  explication: string;
};

export type QuestionBoussole = {
  id: string;
  question: string;
  aide: string;
  // Sujet du doute, réutilisé pour formuler le drapeau "Je ne sais pas".
  sujet: string;
  reponseBloquante: "oui" | "non";
  drapeau: Drapeau;
};

export type ProfilBoussole = {
  niveau: NiveauBoussole;
  drapeaux: Drapeau[];
  categorieSuggeree?: Categorie;
};

export const reponsesPossibles: { valeur: ReponseBoussole; label: string }[] = [
  { valeur: "oui", label: "Oui" },
  { valeur: "non", label: "Non" },
  { valeur: "je-ne-sais-pas", label: "Je ne sais pas" },
];

export const questionsBoussole: QuestionBoussole[] = [
  {
    id: "donnees-personnelles",
    question:
      "La tâche implique des données personnelles d'adhérents ou de bénéficiaires ?",
    aide: "Santé, situation sociale, coordonnées nominatives, récits de vie, dossiers individuels.",
    sujet: "la présence de données personnelles",
    reponseBloquante: "oui",
    drapeau: {
      id: "rouge-donnees-personnelles",
      niveau: "stop",
      titre: "ROUGE : pas en clair.",
      resume:
        "N'envoie pas ces données dans un outil IA généraliste telles quelles.",
      explication:
        "Anonymise d'abord, ou passe par une IA souveraine/hébergée UE avec un cadre clair. Le sujet n'est pas seulement juridique : c'est aussi la confiance des personnes accompagnées.",
    },
  },
  {
    id: "decision-fort-enjeu",
    question: "La sortie servira à une décision à fort enjeu humain ?",
    aide: "Sélection de bénéficiaires, décision RH, sanction, orientation importante, arbitrage qui affecte directement une personne.",
    sujet: "l'enjeu humain de la décision",
    reponseBloquante: "oui",
    drapeau: {
      id: "humain-decide",
      niveau: "cadre",
      titre: "L'IA assiste, elle ne tranche pas.",
      resume:
        "Tu peux t'en servir pour préparer, reformuler ou vérifier des angles morts. Pas pour décider.",
      explication:
        "Un humain doit comprendre les critères, assumer la décision et pouvoir l'expliquer. L'IA ne porte ni responsabilité, ni contexte social suffisant.",
    },
  },
  {
    id: "verification-possible",
    question: "Peux-tu vérifier la justesse de la sortie ?",
    aide: "Par exemple si le sujet touche au juridique, au comptable réglementaire, au médical ou à une règle financeur précise.",
    sujet: "ta capacité à vérifier la sortie",
    reponseBloquante: "non",
    drapeau: {
      id: "abstention-verification",
      niveau: "stop",
      titre: "Abstiens-toi pour cette tâche.",
      resume:
        "Si tu ne peux pas contrôler la sortie, tu ne repéreras pas l'hallucination.",
      explication:
        "L'IA peut produire un texte très convaincant et faux. Sur un sujet que personne ne sait vérifier, le risque dépasse le gain.",
    },
  },
  {
    id: "cout-superieur-gain",
    question:
      "C'est une tâche rare où le coût de vérification, d'abonnement et d'empreinte dépasse le gain ?",
    aide: "Pense au temps de préparation, de relecture, de correction et au fait qu'il faudra peut-être former quelqu'un.",
    sujet: "le rapport coût / gain de la tâche",
    reponseBloquante: "oui",
    drapeau: {
      id: "sobriete-main",
      niveau: "stop",
      titre: "Fais-le à la main.",
      resume:
        "Pour une tâche ponctuelle, c'est souvent plus sobre et plus rapide.",
      explication:
        "L'IA devient utile quand le gain est net : temps économisé, qualité améliorée, apprentissage transférable. Sinon, elle ajoute une couche inutile.",
    },
  },
  {
    id: "relation-humaine",
    question: "La relation humaine est le cœur de la tâche ?",
    aide: "Accompagnement, écoute, médiation, lien social, accueil d'une personne fragile.",
    sujet: "la place de la relation humaine dans la tâche",
    reponseBloquante: "oui",
    drapeau: {
      id: "relation-non-automatisee",
      niveau: "stop",
      titre: "N'automatise pas le cœur de la relation.",
      resume: "Tu risquerais de retirer précisément ce qui crée la valeur.",
      explication:
        "L'IA peut aider en amont ou après coup : préparer une trame, clarifier des notes, alléger l'administratif. Mais le lien humain ne doit pas devenir une étape automatisée.",
    },
  },
  {
    id: "dependance-equipe",
    question:
      "Y a-t-il un risque de déqualifier l'équipe ou de créer une dépendance non maîtrisée ?",
    aide: "Par exemple si l'outil remplace un savoir-faire clé, ou si personne ne sait expliquer, vérifier ou arrêter l'usage.",
    sujet: "le risque de dépendance ou de déqualification",
    reponseBloquante: "oui",
    drapeau: {
      id: "cadrer-usage",
      niveau: "cadre",
      titre: "Cadre l'usage avant de foncer.",
      resume:
        "Commence par une charte simple, une formation courte et des limites explicites.",
      explication:
        "Le bon sujet n'est pas seulement l'outil. C'est ce que l'équipe garde comme compétence, ce qu'elle délègue et ce qu'elle sait reprendre en main.",
    },
  },
];

export const entetesProfil: Record<
  NiveauBoussole,
  { titre: string; resume: string; explication: string }
> = {
  stop: {
    titre: "STOP : ne sors pas l'IA pour ça.",
    resume: "Au moins un point bloquant a été repéré.",
    explication:
      "Traite les points marqués « Bloquant » avant d'envisager le moindre usage de l'IA pour cette tâche.",
  },
  cadre: {
    titre: "À cadrer avant d'y aller.",
    resume: "Rien de bloquant, mais des points demandent un cadre clair.",
    explication:
      "Tu peux utiliser l'IA si tu poses d'abord les garde-fous listés ci-dessous.",
  },
  go: {
    titre: "GO, avec garde-fous.",
    resume: "Aucun drapeau levé : la tâche se prête à un usage IA raisonnable.",
    explication:
      "Utilise l'IA comme brouillon, accélérateur ou sparring partner. Garde une relecture humaine et choisis un prompt adapté au niveau de risque des données.",
  },
};

function construireDrapeauIncertitude(question: QuestionBoussole): Drapeau {
  return {
    id: `incertitude-${question.id}`,
    niveau: "cadre",
    titre: "À clarifier avant d'avancer.",
    resume: `Tu n'es pas sûr·e concernant ${question.sujet}.`,
    explication:
      "Tant que ce point n'est pas tranché, traite la tâche comme à risque : pose la question à l'équipe ou à une personne référente avant d'utiliser l'IA.",
  };
}

export function evaluerProfil(reponses: ReponseBoussole[]): ProfilBoussole {
  const drapeaux: Drapeau[] = [];

  questionsBoussole.forEach((question, index) => {
    const reponse = reponses[index];
    if (reponse === question.reponseBloquante) {
      drapeaux.push(question.drapeau);
    } else if (reponse === "je-ne-sais-pas") {
      drapeaux.push(construireDrapeauIncertitude(question));
    }
  });

  const niveau: NiveauBoussole = drapeaux.some(
    (drapeau) => drapeau.niveau === "stop",
  )
    ? "stop"
    : drapeaux.length > 0
      ? "cadre"
      : "go";

  return { niveau, drapeaux };
}
