import type { Metadata } from "next";

import { site } from "@/content/site";
import type { Lang } from "@/content/types";
import { localizePath } from "@/lib/paths";

export const METADATA_BASE = new URL(site.urls.canonical);

const OG_LOCALE: Record<Lang, string> = { en: "en_US", ko: "ko_KR" };

/**
 * The metadata both root layouts inherit. Per-page `title`/`description` flow
 * into `og:title`/`og:description` automatically, and the `opengraph-image`
 * file convention supplies `og:image` per surface — so this only has to carry
 * what is constant for a language.
 */
export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: METADATA_BASE,
    openGraph: {
      type: "website",
      siteName: lang === "ko" ? site.name : site.nameEn,
      locale: OG_LOCALE[lang],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

/**
 * Canonical + hreflang set for a route.
 * `path` is always the bare (English) route — the Korean URL is derived from it,
 * so the two surfaces can never drift apart.
 */
export function localizedAlternates(
  path: string,
  lang: Lang,
): Metadata["alternates"] {
  const en = path;
  const ko = localizePath(path, "ko");

  return {
    canonical: lang === "ko" ? ko : en,
    languages: { en, ko, "x-default": en },
  };
}
