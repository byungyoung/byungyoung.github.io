import { ImageResponse } from "next/og";

import { home } from "@/content/home";
import { site } from "@/content/site";
import type { Lang } from "@/content/types";
import { OG_FONT_FAMILY, loadOgFonts } from "@/lib/og-fonts";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/** Paper/ink tokens, hardcoded because satori cannot resolve CSS variables. */
const PAPER = "#FCFBF9";
const INK = "#1D1B18";
const SUBTLE = "#757169";
const HAIRLINE = "#D8D5CF";

const EYEBROW = "DECISION LOG";
const DOMAIN = "byungyoung.github.io";

/** The card headline is the hero H1 verbatim, so the two can never drift. */
export function ogHeadline(lang: Lang): string {
  return home.hero.h1[lang].join(" ");
}

export function ogNameLine(lang: Lang): string {
  const name = lang === "ko" ? site.name : site.nameEn;
  return `${name} ${site.titleSeparator} ${site.positioningTitle[lang]}`;
}

export function ogAlt(lang: Lang): string {
  return `${ogNameLine(lang)} ${site.titleSeparator} ${ogHeadline(lang)}`;
}

export async function renderOgImage(lang: Lang): Promise<ImageResponse> {
  const fonts = await loadOgFonts(400, 600, 700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "64px 80px",
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 7,
              color: SUBTLE,
            }}
          >
            {EYEBROW}
          </div>
          <div
            style={{
              display: "flex",
              height: 1,
              marginTop: 26,
              backgroundColor: HAIRLINE,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: -1.5,
              color: INK,
            }}
          >
            {ogHeadline(lang)}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 30,
              fontWeight: 400,
              color: SUBTLE,
            }}
          >
            {ogNameLine(lang)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 1,
              marginBottom: 22,
              backgroundColor: HAIRLINE,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: 1,
              color: SUBTLE,
            }}
          >
            {DOMAIN}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
