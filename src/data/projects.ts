export type Project = {
  /** Titre affiché dans l'index */
  title: string;
  /** Une phrase courte, ton éditorial */
  description: string;
  /** URL externe du projet (ouvre dans un nouvel onglet) */
  url: string;
  /** Étiquette courte : type de projet, médium… */
  tag: string;
  /** Année de mise en ligne */
  year: string;
};

/**
 * Pour ajouter un projet, ajouter une entrée ici.
 * L'ordre du tableau est l'ordre d'affichage.
 */
export const projects: Project[] = [
  {
    title: "Premier projet de démo",
    description: "Une petite expérience web qui ne sert à rien, mais bien.",
    url: "https://example.com",
    tag: "Expérience",
    year: "2026",
  },
  {
    title: "Second projet de démo",
    description: "Un outil minuscule, fabriqué un dimanche pluvieux.",
    url: "https://example.org",
    tag: "Outil",
    year: "2026",
  },
];
