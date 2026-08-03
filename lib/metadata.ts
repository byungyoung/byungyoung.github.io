import type { Metadata } from "next";

import { site } from "@/content/site";
import type { Lang } from "@/content/types";
import { localizePath } from "@/lib/paths";

export const METADATA_BASE = new URL(site.urls.canonical);

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
