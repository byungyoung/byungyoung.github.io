import { cases } from "@/content/cases";
import type { CaseSlug } from "@/content/cases/types";
import { game, type TrophyIcon } from "@/content/game";
import { poLanding } from "@/content/po-landing";
import { resume } from "@/content/resume";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import {
  formatDuration,
  formatMonthRange,
  monthsBetween,
  totalMonths,
} from "@/lib/duration";
import { localizePath } from "@/lib/paths";

/**
 * Everything the game renders is derived here from the existing content
 * modules, on the server, at build time. Client components receive plain
 * strings so a duration computed at build time can never drift during
 * hydration.
 */

export const GAME_PATHS = {
  home: "/",
  map: "/#map",
  character: "/#character",
  quests: "/#quests",
  trophies: "/#trophies",
  resume: "/resume/",
  pdf: "/resume/pdf/",
} as const;

export const PDF_FILES: Record<Lang, string> = {
  en: "/resume/byungyoung-park-resume-en.pdf",
  ko: "/resume/byungyoung-park-resume-ko.pdf",
};

export function questPath(slug: CaseSlug): string {
  return `/quests/${slug}/`;
}

export function mapPathForStage(stageId: string, lang: Lang): string {
  return localizePath(`/?stage=${stageId}#map`, lang);
}

export type StageKind = "stage" | "checkpoint";

/** Serializable, already-localized view of one map node. */
export interface StageView {
  id: string;
  kind: StageKind;
  /** 1-based position on the trail. */
  position: number;
  year: string;
  mapLabel: string;
  company: string;
  role: string;
  title: string | null;
  period: string;
  duration: string | null;
  bullets: string[];
  tags: string[];
  acquired: boolean;
  current: boolean;
  questHref: string | null;
}

const MILITARY_ID = "military";

function questSlugFor(stageId: string): CaseSlug | null {
  return cases.find((caseStudy) => caseStudy.slug === stageId)?.slug ?? null;
}

function experienceStage(
  entry: (typeof resume.experience)[number],
  lang: Lang,
): Omit<StageView, "position"> {
  const landing = poLanding.experience.items.find((item) => item.id === entry.id);
  const slug = questSlugFor(entry.id);

  return {
    id: entry.id,
    kind: "stage",
    year: entry.dateRange.start.slice(0, 4),
    mapLabel: landing?.company.en ?? entry.company.en,
    company: entry.company[lang],
    role: entry.role[lang],
    title: landing?.title[lang] ?? null,
    period: formatMonthRange(entry.dateRange, lang, resume.presentLabel[lang]),
    duration: formatDuration(monthsBetween(entry.dateRange), lang),
    bullets: entry.bullets[lang],
    tags: landing?.tags ?? [],
    acquired: entry.exit,
    current: entry.dateRange.end === null,
    questHref: slug ? localizePath(questPath(slug), lang) : null,
  };
}

/** "2021.02 — 2022.07 (18개월)" → "2021-02". The period string stays the single source. */
function militaryStart(): string {
  const match = resume.left.military.period.ko.match(/(\d{4})\.(\d{2})/);
  return match ? `${match[1]}-${match[2]}` : "";
}

function militaryStage(lang: Lang): Omit<StageView, "position"> {
  const { status, period } = resume.left.military;
  const year = militaryStart().slice(0, 4);

  return {
    id: MILITARY_ID,
    kind: "checkpoint",
    year,
    mapLabel: ui.resume.sections.military[lang],
    company: ui.resume.sections.military[lang],
    role: status[lang],
    title: null,
    period: period[lang],
    duration: null,
    bullets: [],
    tags: [],
    acquired: false,
    current: false,
    questHref: null,
  };
}

/** Oldest first: the run starts in 2016 and walks forward to the current stage. */
export function buildStages(lang: Lang): StageView[] {
  const nodes = [
    ...resume.experience.map((entry) => experienceStage(entry, lang)),
    militaryStage(lang),
  ];

  return [...nodes]
    .sort((a, b) => startOf(a.id).localeCompare(startOf(b.id)))
    .map((node, index) => ({ ...node, position: index + 1 }));
}

function startOf(stageId: string): string {
  if (stageId === MILITARY_ID) return militaryStart();
  return resume.experience.find((entry) => entry.id === stageId)?.dateRange.start ?? "";
}

export function currentStage(lang: Lang): StageView | undefined {
  return buildStages(lang).find((stage) => stage.current);
}

export interface StatView {
  id: keyof typeof game.character.stats;
  value: string;
  unit: string | null;
  label: string;
  note: string;
  detail: string | null;
}

/** Counts of content items and computed durations only, never a score. */
export function buildStats(lang: Lang): StatView[] {
  const copy = game.character.stats;
  const months = totalMonths(resume.experience.map((entry) => entry.dateRange));
  const acquired = resume.experience.filter((entry) => entry.exit);

  const stat = (
    id: StatView["id"],
    value: number,
    unit: string | null = null,
    detail: string | null = null,
  ): StatView => ({
    id,
    value: String(value),
    unit,
    label: copy[id].label[lang],
    note: copy[id].note[lang],
    detail,
  });

  return [
    stat("xp", months, game.character.xpUnit, formatDuration(months, lang)),
    stat("stages", resume.experience.length),
    stat("quests", cases.length),
    stat(
      "acquired",
      acquired.length,
      null,
      acquired.map((entry) => entry.company.en).join(", "),
    ),
    stat("certs", resume.left.certifications.length),
    stat("awards", resume.left.awards.length),
  ];
}

export interface TrophyView {
  id: string;
  icon: TrophyIcon;
  title: string;
  sub: string;
}

export function buildTrophies(lang: Lang): TrophyView[] {
  const { left } = resume;
  const copy = game.trophies;
  const english = left.languages.items.find((item) => item.en.startsWith("English"));

  return [
    ...copy.items.map((item): TrophyView => ({
      id: item.id,
      icon: item.icon,
      title: item.title[lang],
      sub: item.sub[lang],
    })),
    ...left.awards.map((award, index): TrophyView => ({
      id: `award-${index}`,
      icon: copy.awardIcon,
      title: award.name[lang],
      sub: award.sub[lang],
    })),
    ...left.certifications.map((cert, index): TrophyView => ({
      id: `cert-${index}`,
      icon: copy.certIcon,
      title: cert.name[lang],
      sub: cert.sub[lang],
    })),
    {
      id: "military",
      icon: copy.militaryIcon,
      title: `${ui.resume.sections.military[lang]}: ${left.military.status[lang]}`,
      sub: left.military.period[lang],
    },
    ...(english
      ? [
          {
            id: "language-english",
            icon: copy.languageIcon,
            title: english[lang],
            sub: left.languages.sub[lang],
          },
        ]
      : []),
  ];
}

export interface QuestView {
  slug: CaseSlug;
  num: string;
  name: string;
  title: string;
  body: string;
  metric: {
    value: string;
    unit: string | null;
    label: string;
    caveat: string | null;
    comparison: string | null;
  };
  href: string;
  acquired: boolean;
}

export function buildQuests(lang: Lang): QuestView[] {
  return cases.map((caseStudy) => {
    const card = poLanding.cases.items.find((item) => item.slug === caseStudy.slug);
    const metric = card?.metric ?? caseStudy.metrics[0];
    const stage = resume.experience.find((entry) => entry.id === caseStudy.slug);

    return {
      slug: caseStudy.slug,
      num: caseStudy.num,
      name: caseStudy.name,
      title: card?.title[lang] ?? caseStudy.title[lang].join(" "),
      body: card?.body[lang] ?? caseStudy.heroSub[lang],
      metric: {
        value: metric.value,
        unit: metric.unit ?? null,
        label: metric.label[lang],
        caveat: metric.caveat?.[lang] ?? null,
        comparison: metric.comparison?.[lang] ?? null,
      },
      href: localizePath(questPath(caseStudy.slug), lang),
      acquired: stage?.exit ?? false,
    };
  });
}

export function displayName(lang: Lang): string {
  return lang === "ko" ? site.name : site.nameEn;
}
