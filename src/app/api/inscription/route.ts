import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type InscriptionPayload = {
  email?: unknown;
  consent?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return null;

  const email = value.trim().toLowerCase();
  return emailPattern.test(email) ? email : null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InscriptionPayload;
    const email = normalizeEmail(body.email);
    const consent = body.consent === true;

    if (!email) {
      return NextResponse.json(
        { error: "Entre une adresse e-mail valide." },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          error:
            "Coche la case de consentement pour recevoir les nouveaux prompts.",
        },
        { status: 400 },
      );
    }

    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("boussole_ia_ess_signups").upsert(
      {
        email,
        accepts_emails: consent,
        source: "boussole-ia-ess",
      },
      { onConflict: "email" },
    );

    if (error) {
      console.error("Boussole IA ESS signup failed", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return NextResponse.json(
        {
          error:
            "Impossible d'enregistrer ton e-mail pour le moment. Réessaie dans quelques minutes.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "C'est bon, la bibliothèque complète est débloquée.",
    });
  } catch {
    return NextResponse.json(
      { error: "La demande d'inscription est invalide." },
      { status: 400 },
    );
  }
}
