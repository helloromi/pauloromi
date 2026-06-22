"use client";

import { geoEnrichmentTemplate } from "@/data/templates";
import { useEffect, useState } from "react";

type VerificationState =
  | { status: "checking" }
  | { status: "ready"; customerEmail: string }
  | { status: "error"; message: string };

type DownloadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string };

type TemplateDeliveryPanelProps = {
  sessionId: string | null;
};

export function TemplateDeliveryPanel({
  sessionId,
}: TemplateDeliveryPanelProps) {
  const [verification, setVerification] = useState<VerificationState>({
    status: "checking",
  });
  const [download, setDownload] = useState<DownloadState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    async function verifyPurchase() {
      if (!sessionId) {
        setVerification({
          status: "error",
          message:
            "La session Stripe est absente. Reviens depuis la page de paiement ou écris-moi pour que je retrouve ton achat.",
        });
        return;
      }

      try {
        const response = await fetch("/api/purchases/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            templateKey: geoEnrichmentTemplate.key,
          }),
        });

        const payload = (await response.json()) as {
          purchase?: { customerEmail?: string };
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Paiement non vérifié.");
        }

        if (!cancelled) {
          setVerification({
            status: "ready",
            customerEmail: payload.purchase?.customerEmail ?? "ton adresse",
          });
        }
      } catch (error) {
        if (!cancelled) {
          setVerification({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Impossible de vérifier le paiement.",
          });
        }
      }
    }

    verifyPurchase();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  async function handleDownload() {
    if (!sessionId || verification.status !== "ready") return;

    setDownload({ status: "loading" });

    try {
      const response = await fetch("/api/downloads/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          templateKey: geoEnrichmentTemplate.key,
        }),
      });

      const payload = (await response.json()) as {
        signedUrl?: string;
        error?: string;
      };

      if (!response.ok || !payload.signedUrl) {
        throw new Error(payload.error ?? "Lien de téléchargement indisponible.");
      }

      window.location.href = payload.signedUrl;
      setDownload({ status: "idle" });
    } catch (error) {
      setDownload({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible de préparer le téléchargement.",
      });
    }
  }

  if (verification.status === "checking") {
    return (
      <div className="rounded-[2rem] border border-line bg-cream-deep p-8">
        <p className="label text-blue">Vérification</p>
        <p className="mt-4 font-serif text-3xl leading-tight text-ink">
          Je vérifie ton paiement Stripe.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Cette étape confirme le paiement côté serveur avant de générer un lien
          Supabase Storage temporaire.
        </p>
      </div>
    );
  }

  if (verification.status === "error") {
    return (
      <div className="rounded-[2rem] border border-pink/60 bg-cream p-8 shadow-[0_18px_50px_rgba(255,147,152,0.18)]">
        <p className="label text-pink">À vérifier</p>
        <p className="mt-4 font-serif text-3xl leading-tight text-ink">
          Je n&apos;arrive pas encore à valider l&apos;accès.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          {verification.message}
        </p>
        <a
          href="mailto:hello@pauloromi.com"
          className="link-underline mt-6 inline-flex text-sm font-semibold text-blue"
        >
          Me contacter
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-line bg-cream p-8 shadow-[0_18px_60px_rgba(26,46,59,0.08)]">
      <p className="label text-blue">Accès confirmé</p>
      <p className="mt-4 font-serif text-3xl leading-tight text-ink">
        Ton template est prêt.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        Paiement validé pour {verification.customerEmail}. Le bouton génère un
        lien signé valable quelques minutes.
      </p>

      <button
        type="button"
        onClick={handleDownload}
        disabled={download.status === "loading"}
        className="mt-8 inline-flex items-center justify-center rounded-full border border-ink bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition duration-300 hover:-translate-y-0.5 hover:border-pink hover:bg-pink hover:text-ink disabled:cursor-wait disabled:opacity-60"
      >
        {download.status === "loading" ? "Préparation..." : "Télécharger le kit"}
        <span className="ml-3 text-lg leading-none" aria-hidden>
          &rarr;
        </span>
      </button>

      {download.status === "error" ? (
        <p className="mt-4 text-sm leading-relaxed text-pink">
          {download.message}
        </p>
      ) : null}
    </div>
  );
}
