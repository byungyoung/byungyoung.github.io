import { isVisible } from "@/components/doc/draft-gate";
import { cases } from "@/content/cases";
import type { CaseSlug } from "@/content/cases/types";
import { journey, MILITARY_PLACE_ID, placeStaging, type LandmarkKind } from "@/content/journey";
import { resume, type ResumeExperienceEntry } from "@/content/resume";
import { site } from "@/content/site";
import type { Lang } from "@/content/types";
import { formatDuration, formatMonthRange, monthsBetween, totalMonths } from "@/lib/duration";
import { localizePath } from "@/lib/paths";

/**
 * Builds everything the journey renders from the final PO résumé
 * (content/resume.ts) and the case studies, on the server at build time.
 * Client components receive plain localized strings, so a duration computed
 * at build time cannot drift during hydration.
 */

export const SITE_PATHS = {
  home: "/",
  resume: "/resume/",
  pdf: "/resume/pdf/",
} as const;

/** Drop-in files: replace these two PDFs to update every viewer and download. */
export const PDF_FILES: Record<Lang, string> = {
  en: "/resume/cv-en.pdf",
  ko: "/resume/cv-ko.pdf",
};

export function questPath(slug: CaseSlug): string {
  return `/quests/${slug}/`;
}

export const MONTHS_PER_LEVEL = 12;

export interface MetricView {
  value: string;
  unit: string | null;
  label: string;
  caveat: string | null;
  comparison: string | null;
}

export interface CaseView {
  slug: CaseSlug;
  num: string;
  title: string[];
  heroSub: string;
  context: string[];
  process: { title: string; body: string }[];
  rejected: { option: string; reason: string }[];
  results: string[];
  learned: { title: string; body: string }[];
  metrics: MetricView[];
}

export type PlaceKind = "stage" | "checkpoint";

export interface PlaceView {
  id: string;
  kind: PlaceKind;
  /** 0-based order on the path, oldest first. */
  index: number;
  year: string;
  company: string;
  role: string;
  summary: string;
  period: string;
  duration: string | null;
  /** XP this place awards: months in the role (0 for a checkpoint). */
  months: number;
  bullets: string[];
  acquired: boolean;
  current: boolean;
  landmark: LandmarkKind;
  landmarkName: string;
  sky: [string, string];
  trophies: { title: string; sub: string }[];
  caseStudy: CaseView | null;
  pageHref: string;
}

function caseView(slug: string, lang: Lang): CaseView | null {
  const found = cases.find((item) => item.slug === slug);
  if (!found) return null;

  return {
    slug: found.slug,
    num: found.num,
    title: found.title[lang],
    heroSub: found.heroSub[lang],
    context: found.context[lang],
    process: found.process[lang],
    rejected: found.rejectedOptions
      .filter((option) => isVisible(option.status))
      .map((option) => ({ option: option.option[lang], reason: option.reason[lang] })),
    results: found.results[lang],
    learned: found.learned.map((item) => ({ title: item.title[lang], body: item.body[lang] })),
    metrics: found.metrics.map((metric) => ({
      value: metric.value,
      unit: metric.unit ?? null,
      label: metric.label[lang],
      caveat: metric.caveat?.[lang] ?? null,
      comparison: metric.comparison?.[lang] ?? null,
    })),
  };
}

function staging(id: string, lang: Lang) {
  const stage = placeStaging[id];
  return {
    landmark: stage.landmark,
    landmarkName: stage.landmarkName[lang],
    sky: stage.sky,
    trophies: stage.trophies.map((trophy) => ({ title: trophy.title[lang], sub: trophy.sub[lang] })),
  };
}

function experiencePlace(entry: ResumeExperienceEntry, lang: Lang): Omit<PlaceView, "index"> {
  const months = monthsBetween(entry.dateRange);
  const caseStudy = caseView(entry.id, lang);

  return {
    id: entry.id,
    kind: "stage",
    year: entry.dateRange.start.slice(0, 4),
    company: entry.company[lang],
    role: entry.role[lang],
    summary: entry.summary[lang],
    period: formatMonthRange(entry.dateRange, lang, resume.presentLabel[lang]),
    duration: formatDuration(months, lang),
    months,
    bullets: entry.bullets[lang],
    acquired: entry.exit,
    current: entry.dateRange.end === null,
    ...staging(entry.id, lang),
    caseStudy,
    pageHref: localizePath(caseStudy ? questPath(caseStudy.slug) : SITE_PATHS.resume, lang),
  };
}

/** "2021.02 — 2022.07 (18개월)" → "2021-02"; the period string stays the single source. */
function militaryStart(): string {
  const match = resume.left.military.period.ko.match(/(\d{4})\.(\d{2})/);
  return match ? `${match[1]}-${match[2]}` : "";
}

function militaryPlace(lang: Lang): Omit<PlaceView, "index"> {
  const { status, period } = resume.left.military;

  return {
    id: MILITARY_PLACE_ID,
    kind: "checkpoint",
    year: militaryStart().slice(0, 4),
    company: journey.character.sections.military[lang],
    role: status[lang],
    summary: "",
    period: period[lang],
    duration: null,
    months: 0,
    bullets: [],
    acquired: false,
    current: false,
    ...staging(MILITARY_PLACE_ID, lang),
    caseStudy: null,
    pageHref: localizePath(SITE_PATHS.resume, lang),
  };
}

function startOf(id: string): string {
  if (id === MILITARY_PLACE_ID) return militaryStart();
  return resume.experience.find((entry) => entry.id === id)?.dateRange.start ?? "";
}

/** Oldest first: the journey starts at dawn in 2016 and arrives at the current role. */
export function buildPlaces(lang: Lang): PlaceView[] {
  const nodes = [...resume.experience.map((entry) => experiencePlace(entry, lang)), militaryPlace(lang)];
  return [...nodes]
    .sort((a, b) => startOf(a.id).localeCompare(startOf(b.id)))
    .map((node, index) => ({ ...node, index }));
}

export function totalCareerMonths(): number {
  return totalMonths(resume.experience.map((entry) => entry.dateRange));
}

export function displayName(lang: Lang): string {
  return lang === "ko" ? site.name : site.nameEn;
}
