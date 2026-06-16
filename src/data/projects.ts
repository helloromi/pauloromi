import {
  indexItemColors,
  type IndexItem,
  type IndexItemColor,
} from "./index-item";

export type ProjectColor = IndexItemColor;
export type Project = IndexItem;

export const projectColors = indexItemColors;

/**
 * Pour ajouter un projet, ajouter une entrée ici.
 * L'ordre du tableau est l'ordre d'affichage.
 */
export const projects: Project[] = [
  {
    title: "Côté-Cour",
    description: "Une petite web app pour apprendre ses textes de théâtre.",
    url: "https://www.cote-cour.studio/landing",
    tag: "Expérience",
    year: "2026",
    color: "blue",
  },
];
