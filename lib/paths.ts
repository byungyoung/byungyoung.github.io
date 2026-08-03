import type { Lang } from "@/content/types";

/** English is the default surface and carries no prefix; Korean lives under /ko. */
export const KO_PREFIX = "/ko";

function isInternal(path: string): boolean {
  return path.startsWith("/");
}

function isKoPath(path: string): boolean {
  return path === KO_PREFIX || path.startsWith(`${KO_PREFIX}/`);
}

/**
 * Prefixes an internal path with /ko on the Korean surface.
 * Anchors (#about), mailto:, and absolute URLs pass through untouched.
 * Idempotent — a path that already carries the prefix is returned as-is.
 */
export function localizePath(path: string, lang: Lang): string {
  if (lang !== "ko" || !isInternal(path) || isKoPath(path)) return path;
  return path === "/" ? `${KO_PREFIX}/` : `${KO_PREFIX}${path}`;
}

/** Drops the /ko prefix, yielding the English counterpart of a path. */
export function stripLangPrefix(path: string): string {
  if (!isKoPath(path)) return path;
  return path.slice(KO_PREFIX.length) || "/";
}

/** Maps a path from whichever surface it is on to the same page in `lang`. */
export function pathForLang(path: string, lang: Lang): string {
  return localizePath(stripLangPrefix(path), lang);
}
