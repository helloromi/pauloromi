import type { Categorie } from "@/data/fiches";

export type ReponseBoussole = "oui" | "non";

export type VerdictBoussole = {
  id: string;
  niveau: "stop" | "cadre" | "go";
  titre: string;
  resume: string;
  explication: string;
  categorieSuggeree?: Categorie;
};

export type QuestionBoussole = {
  id: string;
  question: string;
  aide: string;
  reponseBloquante: ReponseBoussole;
  verdict: VerdictBoussole;
};

export const questionsBoussole: QuestionBoussole[] = [
  {
    id: "donnees-personnelles",
    question:
      "La tâche implique des données personnelles d'adhérents ou de bénéficiaires ?",
    aide: "Santé, situation sociale, coordonnées nominatives, récits de vie, dossiers individuels.",
    reponseBloquante: "oui",
    verdict: {
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
    question:
      "La sortie servira à une décision à fort enjeu humain ?",
    aide: "Sélection de bénéficiaires, décision RH, sanction, orientation importante, arbitrage qui affecte directement une personne.",
    reponseBloquante: "oui",
    verdict: {
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
    reponseBloquante: "non",
    verdict: {
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
    reponseBloquante: "oui",
    verdict: {
      id: "sobriete-main",
      niveau: "stop",
      titre: "Fais-le à la main.",
      resume: "Pour une tâche ponctuelle, c'est souvent plus sobre et plus rapide.",
      explication:
        "L'IA devient utile quand le gain est net : temps économisé, qualité améliorée, apprentissage transférable. Sinon, elle ajoute une couche inutile.",
    },
  },
  {
    id: "relation-humaine",
    question: "La relation humaine est le cœur de la tâche ?",
    aide: "Accompagnement, écoute, médiation, lien social, accueil d'une personne fragile.",
    reponseBloquante: "oui",
    verdict: {
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
    reponseBloquante: "oui",
    verdict: {
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

export const verdictGoBase: VerdictBoussole = {
  id: "go",
  niveau: "go",
  titre: "GO, avec garde-fous.",
  resume: "La tâche se prête à un usage IA raisonnable.",
  explication:
    "Utilise l'IA comme brouillon, accélérateur ou sparring partner. Garde une relecture humaine et choisis un prompt adapté au niveau de risque des données.",
};

export function getVerdictForAnswer(
  question: QuestionBoussole,
  reponse: ReponseBoussole,
) {
  return reponse === question.reponseBloquante ? question.verdict : null;
}

export function buildGoVerdict(categorieSuggeree: Categorie): VerdictBoussole {
  return {
    ...verdictGoBase,
    categorieSuggeree,
  };
}
