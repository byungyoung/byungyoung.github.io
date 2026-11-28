import { ImageResponse } from "next/og";

import { resume } from "@/content/resume";
import { site } from "@/content/site";
import type { Lang } from "@/content/types";
import { OG_FONT_FAMILY, loadOgFonts } from "@/lib/og-fonts";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/** Journey dawn tokens (app/journey/scene.css), hardcoded because satori cannot resolve CSS variables. */
const PAPER = "#F4DCC0";
const PAPER_LOW = "#DFE3E6";
const INK = "#26241F";
const SUBTLE = "#6E685E";
const HAIRLINE = "#CBBFAE";
const ACCENT = "#8F5C12";

const EYEBROW = "A CAREER JOURNEY";
const DOMAIN = "info.calixlab.dev";

/** The card headline is the résumé headline verbatim, so the two can never drift. */
export function ogHeadline(lang: Lang): string {
  return resume.header.headline[lang];
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
          backgroundImage: `linear-gradient(180deg, ${PAPER}, ${PAPER_LOW})`,
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
              color: ACCENT,
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
