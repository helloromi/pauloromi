"use client";

import { categories, fiches, risquesDonnees } from "@/data/fiches";
import type { Categorie, Fiche, RisqueDonnees } from "@/data/fiches";
import {
  buildGoVerdict,
  getVerdictForAnswer,
  questionsBoussole,
} from "@/lib/boussole-ia-ess";
import type { ReponseBoussole, VerdictBoussole } from "@/lib/boussole-ia-ess";
import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const unlockStorageKey = "boussole-ia-ess-unlocked";

const categoryEntries = Object.entries(categories) as [Categorie, string][];
const riskEntries = Object.entries(risquesDonnees) as [
  RisqueDonnees,
  (typeof risquesDonnees)[RisqueDonnees],
][];

function riskBadgeClass(risque: RisqueDonnees) {
  switch (risque) {
    case "vert":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "orange":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "rouge":
      return "border-rose-200 bg-rose-50 text-rose-800";
  }
}

function verdictClass(niveau: VerdictBoussole["niveau"]) {
  switch (niveau) {
    case "go":
      return "border-emerald-200 bg-emerald-50";
    case "cadre":
      return "border-amber-200 bg-amber-50";
    case "stop":
      return "border-rose-200 bg-rose-50";
  }
}

function filterButtonClass(isActive: boolean) {
  return isActive
    ? "border-ink bg-ink text-cream"
    : "border-line bg-cream text-ink-soft hover:border-ink hover:text-ink";
}

function PromptCard({
  fiche,
  isLocked,
  copied,
  onCopy,
  onUnlockClick,
}: {
  fiche: Fiche;
  isLocked: boolean;
  copied: boolean;
  onCopy: (fiche: Fiche) => void;
  onUnlockClick: () => void;
}) {
  const [isOpen, setIsOpen] = useState(!isLocked && fiche.gratuit);

  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-line bg-cream p-5 shadow-sm sm:p-6">
      <div className={isLocked ? "blur-[2px]" : ""}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="label text-blue">{categories[fiche.categorie]}</span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${riskBadgeClass(
              fiche.risque,
            )}`}
          >
            Risque {risquesDonnees[fiche.risque].label}
          </span>
        </div>

        <h3 className="mt-5 font-serif text-2xl leading-tight text-ink sm:text-3xl">
          {fiche.titre}
        </h3>
        <p className="mt-4 text-sm leading-7 text-ink-soft">{fiche.casUsage}</p>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="label text-amber-800">Quand ne pas l’utiliser</p>
          <p className="mt-2 text-sm leading-6 text-amber-950">
            {fiche.quandNePas}
          </p>
        </div>

        <button
          type="button"
          className="tap-expand mt-5 text-sm font-semibold text-blue transition-colors hover:text-ink"
          onClick={() => setIsOpen((current) => !current)}
          disabled={isLocked}
        >
          {isOpen ? "Replier le prompt" : "Voir le prompt"}
        </button>

        {isOpen ? (
          <div className="mt-5">
            <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-2xl border border-line bg-cream-deep p-4 text-sm leading-7 text-ink">
              {fiche.prompt}
            </pre>
            <button
              type="button"
              className="mt-4 rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
              onClick={() => onCopy(fiche)}
            >
              {copied ? "Prompt copié" : "Copier le prompt"}
            </button>
          </div>
        ) : null}
      </div>

      {isLocked ? (
        <div className="absolute inset-0 flex items-center justify-center bg-cream/82 p-6 backdrop-blur-[1px]">
          <div className="max-w-xs rounded-3xl border border-line bg-cream p-5 text-center shadow-lg">
            <p className="label text-blue">Bibliothèque complète</p>
            <p className="mt-3 font-serif text-2xl leading-tight text-ink">
              Débloque cette fiche.
            </p>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Laisse ton e-mail pour accéder aux prompts avancés.
            </p>
            <button
              type="button"
              className="mt-5 rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-cream"
              onClick={onUnlockClick}
            >
              Débloquer
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function BoussoleIaEss() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [verdict, setVerdict] = useState<VerdictBoussole | null>(null);
  const [isChoosingCategory, setIsChoosingCategory] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<Categorie | "tous">(
    "tous",
  );
  const [riskFilter, setRiskFilter] = useState<RisqueDonnees | "tous">("tous");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const unlockFormRef = useRef<HTMLFormElement>(null);

  const currentQuestion = questionsBoussole[questionIndex];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsUnlocked(localStorage.getItem(unlockStorageKey) === "true");
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const filteredFiches = useMemo(() => {
    return fiches.filter((fiche) => {
      const matchesCategory =
        categoryFilter === "tous" || fiche.categorie === categoryFilter;
      const matchesRisk = riskFilter === "tous" || fiche.risque === riskFilter;

      return matchesCategory && matchesRisk;
    });
  }, [categoryFilter, riskFilter]);

  function handleAnswer(reponse: ReponseBoussole) {
    if (!currentQuestion) return;

    const blockingVerdict = getVerdictForAnswer(currentQuestion, reponse);
    if (blockingVerdict) {
      setVerdict(blockingVerdict);
      setIsChoosingCategory(false);
      return;
    }

    const nextIndex = questionIndex + 1;
    if (nextIndex >= questionsBoussole.length) {
      setIsChoosingCategory(true);
      return;
    }

    setQuestionIndex(nextIndex);
  }

  function chooseGoCategory(categorie: Categorie) {
    setCategoryFilter(categorie);
    setVerdict(buildGoVerdict(categorie));
    setIsChoosingCategory(false);
  }

  function resetBoussole() {
    setQuestionIndex(0);
    setVerdict(null);
    setIsChoosingCategory(false);
  }

  async function copyPrompt(fiche: Fiche) {
    await navigator.clipboard.writeText(fiche.prompt);
    setCopiedId(fiche.id);
    window.setTimeout(() => setCopiedId(null), 1800);
  }

  function focusUnlockForm() {
    unlockFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    unlockFormRef.current?.querySelector("input")?.focus();
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setFormStatus("error");
      setFormMessage("Entre une adresse e-mail valide.");
      return;
    }

    if (!consent) {
      setFormStatus("error");
      setFormMessage(
        "Coche la case de consentement pour recevoir les nouveaux prompts.",
      );
      return;
    }

    setFormStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          consent,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Inscription impossible.");
      }

      localStorage.setItem(unlockStorageKey, "true");
      setIsUnlocked(true);
      setFormStatus("success");
      setFormMessage(data.message ?? "La bibliothèque complète est débloquée.");
    } catch (error) {
      setFormStatus("error");
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'enregistrer ton e-mail.",
      );
    }
  }

  return (
    <div className="space-y-16">
      <section
        id="boussole"
        className="rounded-[2rem] border border-line bg-cream p-5 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="label text-blue">Le décideur</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Dois-je sortir l’IA pour ça ?
            </h2>
          </div>
          <button
            type="button"
            className="w-fit rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
            onClick={resetBoussole}
          >
            Recommencer
          </button>
        </div>

        <div className="mt-8">
          {verdict ? (
            <div
              className={`rounded-[1.5rem] border p-5 sm:p-6 ${verdictClass(
                verdict.niveau,
              )}`}
            >
              <p className="label text-ink-soft">Verdict</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">
                {verdict.titre}
              </h3>
              <p className="mt-4 text-base leading-7 text-ink">
                {verdict.resume}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {verdict.explication}
              </p>

              {verdict.categorieSuggeree ? (
                <a
                  href="#bibliotheque"
                  className="mt-6 inline-flex rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-cream"
                >
                  Voir les prompts utiles :{" "}
                  {categories[verdict.categorieSuggeree]}
                </a>
              ) : null}
            </div>
          ) : isChoosingCategory ? (
            <div className="rounded-[1.5rem] border border-line bg-cream-deep p-5 sm:p-6">
              <p className="label text-blue">Dernier choix</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">
                Quel type de tâche veux-tu traiter ?
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                Aucune règle ne bloque. Choisis la famille la plus proche pour
                ouvrir les prompts utiles.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {categoryEntries.map(([categorie, label]) => (
                  <button
                    key={categorie}
                    type="button"
                    className="rounded-full border border-line bg-cream px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
                    onClick={() => chooseGoCategory(categorie)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-line bg-cream-deep p-5 sm:p-6">
              <p className="label text-blue">
                Question {questionIndex + 1} / {questionsBoussole.length}
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">
                {currentQuestion.question}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {currentQuestion.aide}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-full border border-ink bg-ink px-6 py-3 text-sm font-semibold text-cream"
                  onClick={() => handleAnswer("oui")}
                >
                  Oui
                </button>
                <button
                  type="button"
                  className="rounded-full border border-line bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
                  onClick={() => handleAnswer("non")}
                >
                  Non
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        id="bibliotheque"
        className="rounded-[2rem] border border-line bg-cream p-5 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label text-pink">Bibliothèque de prompts</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Des fiches, pas des recettes magiques.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">
              Chaque prompt vient avec son cas d’usage, son niveau de risque
              données et le moment où il vaut mieux ne pas l’utiliser.
            </p>
          </div>

          {!isUnlocked ? (
            <form
              ref={unlockFormRef}
              className="rounded-[1.5rem] border border-line bg-cream-deep p-4"
              onSubmit={submitEmail}
            >
              <p className="label text-blue">Déblocage gratuit</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="boussole-email">
                  Adresse e-mail
                </label>
                <input
                  id="boussole-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="ton@email.fr"
                  className="min-w-0 flex-1 rounded-full border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-blue"
                />
                <button
                  type="submit"
                  className="rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" ? "Envoi..." : "Débloquer"}
                </button>
              </div>
              <label className="mt-3 flex gap-3 text-xs leading-5 text-ink-soft">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-line accent-blue"
                />
                <span>
                  J’accepte de recevoir les nouveaux prompts et ressources ESS.
                  Désinscription possible à tout moment.{" "}
                  <Link
                    href="/mentions-legales"
                    className="link-underline text-blue"
                  >
                    Mentions légales
                  </Link>
                </span>
              </label>
              {formMessage ? (
                <p
                  className={`mt-3 text-sm leading-6 ${
                    formStatus === "success" ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {formMessage}
                </p>
              ) : null}
            </form>
          ) : (
            <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4">
              <p className="label text-emerald-800">Accès débloqué</p>
              <p className="mt-2 text-sm leading-6 text-emerald-950">
                Toutes les fiches sont disponibles sur ce navigateur.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <p className="label text-ink-soft">Catégorie</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filterButtonClass(
                  categoryFilter === "tous",
                )}`}
                onClick={() => setCategoryFilter("tous")}
              >
                Toutes
              </button>
              {categoryEntries.map(([categorie, label]) => (
                <button
                  key={categorie}
                  type="button"
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filterButtonClass(
                    categoryFilter === categorie,
                  )}`}
                  onClick={() => setCategoryFilter(categorie)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label text-ink-soft">Risque données</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filterButtonClass(
                  riskFilter === "tous",
                )}`}
                onClick={() => setRiskFilter("tous")}
              >
                Tous
              </button>
              {riskEntries.map(([risque, meta]) => (
                <button
                  key={risque}
                  type="button"
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    riskFilter === risque
                      ? "border-ink bg-ink text-cream"
                      : riskBadgeClass(risque)
                  }`}
                  title={meta.description}
                  onClick={() => setRiskFilter(risque)}
                >
                  {meta.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {filteredFiches.length > 0 ? (
            filteredFiches.map((fiche) => (
              <PromptCard
                key={fiche.id}
                fiche={fiche}
                isLocked={!isUnlocked && !fiche.gratuit}
                copied={copiedId === fiche.id}
                onCopy={copyPrompt}
                onUnlockClick={focusUnlockForm}
              />
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-line bg-cream-deep p-6 text-sm leading-7 text-ink-soft">
              Aucune fiche ne correspond à ces filtres pour le moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
