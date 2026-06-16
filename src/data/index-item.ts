export type IndexItemColor = "blue" | "pink";

export const indexItemColors: IndexItemColor[] = ["blue", "pink"];

export type IndexItem = {
  /** Titre affiché dans l'index */
  title: string;
  /** Une phrase courte, ton éditorial */
  description: string;
  /** URL externe (ouvre dans un nouvel onglet) */
  url: string;
  /** Étiquette courte : type, médium… */
  tag: string;
  /** Année de publication */
  year: string;
  /** Couleur du bandeau au clic */
  color?: IndexItemColor;
};
