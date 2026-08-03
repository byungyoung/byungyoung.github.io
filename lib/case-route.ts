import type { Metadata } from "next";

import { cases, casesBySlug } from "@/content/cases";
import { site } from "@/content/site";
import type { CaseSlug, CaseStudy } from "@/content/cases/types";
import type { Lang } from "@/content/types";
import { localizedAlternates } from "@/lib/metadata";

export type CaseParams = { slug: string };

/** Shared by both root layouts' [slug] routes so the exported set stays identical. */
export function caseParams(): CaseParams[] {
  return cases.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export function findCase(slug: string): CaseStudy | undefined {
  return casesBySlug[slug as CaseSlug];
}

export function casePath(slug: string): string {
  return `/po/cases/${slug}/`;
}

export function caseMetadata(slug: string, lang: Lang): Metadata {
  const caseStudy = findCase(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title[lang].join(" ")} ${site.titleSeparator} ${caseStudy.name}`,
    description: caseStudy.meta.description[lang],
    alternates: localizedAlternates(casePath(caseStudy.slug), lang),
  };
}
