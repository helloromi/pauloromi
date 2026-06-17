import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Métadonnées de l'image — reprises automatiquement dans les balises <head>.
export const alt =
  "Petites choses — un index de mini-projets web, par Paul Oromi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette du site (cf. globals.css) — satori ne lit pas les variables CSS,
// on duplique donc les valeurs ici.
const CREAM = "#ffffff";
const CREAM_DEEP = "#f5f8fa";
const INK = "#1a2e3b";
const INK_SOFT = "#5a7180";
const BLUE = "#2779a7";
const PINK = "#ff9398";

export default async function Image() {
  const [fraunces, instrument] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Fraunces-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/InstrumentSans-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px 90px",
          background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM_DEEP} 100%)`,
          position: "relative",
          fontFamily: "Instrument Sans",
        }}
      >
        {/* Halo bleu — l'orbe « respirant » du hero */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background: `radial-gradient(circle at center, rgba(39,121,167,0.30) 0%, rgba(39,121,167,0.10) 42%, rgba(39,121,167,0) 68%)`,
          }}
        />
        {/* Lueur rose — clin d'œil au bandeau contact */}
        <div
          style={{
            position: "absolute",
            left: -200,
            bottom: -320,
            width: 760,
            height: 760,
            borderRadius: "50%",
            background: `radial-gradient(circle at center, rgba(255,147,152,0.30) 0%, rgba(255,147,152,0.10) 42%, rgba(255,147,152,0) 68%)`,
          }}
        />

        {/* Haut — étiquettes */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              color: BLUE,
              fontSize: 25,
              letterSpacing: 6,
              fontWeight: 500,
            }}
          >
            PAUL OROMI
          </div>
          <div
            style={{
              display: "flex",
              color: INK_SOFT,
              fontSize: 23,
              letterSpacing: 6,
              fontWeight: 500,
            }}
          >
            INDEX
          </div>
        </div>

        {/* Milieu — titre */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 138,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: INK,
            }}
          >
            Petites choses
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 780,
              marginTop: 30,
              fontSize: 33,
              lineHeight: 1.4,
              color: INK_SOFT,
            }}
          >
            Un cabinet de curiosités numérique : petits projets web,
            expériences et outils minuscules.
          </div>
        </div>

        {/* Bas — domaine + accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 27,
              fontWeight: 500,
              color: INK,
            }}
          >
            pauloromi.com
          </div>
          <div
            style={{
              display: "flex",
              width: 132,
              height: 6,
              borderRadius: 3,
              background: PINK,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 600 },
        {
          name: "Instrument Sans",
          data: instrument,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
