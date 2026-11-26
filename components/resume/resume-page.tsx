import Link from "next/link";
import type { ReactNode } from "react";

import { AnchoredNotes } from "@/components/doc/anchored-notes";
import { MetricWithCaveat } from "@/components/doc/metric-with-caveat";
import { SiteFooter } from "@/components/site/footer";
import { LangToggle } from "@/components/site/lang-toggle";
import { resume } from "@/content/resume";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { formatDurationParts, formatMonthRange, totalMonths } from "@/lib/duration";
import { cases } from "@/content/cases";
import { journey } from "@/content/journey";
import { PDF_FILES, questPath, SITE_PATHS } from "@/lib/journey";
import { localizePath } from "@/lib/paths";

const CONTAINER = "max-w-[var(--container)]";
const TOOLBAR_LINK =
  "inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-md border border-border px-2.5 text-caption text-ink transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Density budget (plan): the résumé is the most restrained surface —
 * zero stamps, zero margin notes. `resume-duration-computed` is approved but
 * renders in development only so the owner can see it in situ.
 */
const TOTAL_NOTE_ANCHOR = "resume.metrics.total";

type ResumePageProps = { lang: Lang };

export function ResumePage({ lang }: ResumePageProps) {
  const { toolbar, header, metrics, totalExperienceMetric, presentLabel, left } =
    resume;
  const sections = ui.resume.sections;

  const months = totalMonths(resume.experience.map((entry) => entry.dateRange));
  const total = formatDurationParts(months, lang);

  return (
    <>
      <header
        data-print-hide
        className="sticky top-0 z-40 border-b border-hairline bg-background/88 backdrop-blur-md print:hidden"
      >
        <div className={`mx-auto flex h-14 ${CONTAINER} items-center gap-2 px-4 sm:gap-4 sm:px-6`}>
          <Link
            href={localizePath(toolbar.backHref, lang)}
            className="inline-flex min-h-9 items-center whitespace-nowrap font-mono text-caption text-subtle underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <span aria-hidden>←</span>
            <span className="max-sm:sr-only">&nbsp;{toolbar.backLabel[lang]}</span>
          </Link>
          <LangToggle lang={lang} className="ms-auto" />
          <Link href={localizePath(SITE_PATHS.pdf, lang)} className={TOOLBAR_LINK}>
            {toolbar.pdfViewLabel[lang]}
          </Link>
          <a
            href={PDF_FILES[lang]}
            download={`${toolbar.pdfFileName[lang]}.pdf`}
            className={TOOLBAR_LINK}
          >
            {toolbar.pdfLabel[lang]}
          </a>
        </div>
      </header>

      <main
        id="main"
        className={`mx-auto ${CONTAINER} px-6 pt-12 pb-4 print:max-w-none print:px-0 print:pt-0`}
      >
        <header className="print-avoid-break">
          <h1 className="text-h1 text-foreground">{header.name}</h1>
          <p className="mt-1 font-mono text-label uppercase text-subtle">
            {header.title[lang]}, {header.headline[lang]}
          </p>
          <div className="mt-4 max-w-[var(--measure)] space-y-3">
            {header.summary[lang].map((paragraph) => (
              <p key={paragraph} className="text-body-sm text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1 font-mono text-caption text-muted-foreground">
            <li>{header.location[lang]}</li>
            <li>{header.email}</li>
            <li>{header.linkedin}</li>
            <li>{header.github}</li>
          </ul>
        </header>

        <section className="mt-10 grid gap-x-8 gap-y-8 border-y border-hairline py-8 sm:grid-cols-2 print-avoid-break">
          <div>
            <MetricWithCaveat
              value={total.value}
              unit={total.unit}
              label={totalExperienceMetric.label[lang]}
              caveat={totalExperienceMetric.caveat?.[lang]}
            />
            <AnchoredNotes
              anchor={TOTAL_NOTE_ANCHOR}
              lang={lang}
              devOnly
              inline
            />
          </div>
          {metrics.map((metric) => (
            <MetricWithCaveat
              key={metric.value + metric.label[lang]}
              value={metric.value}
              unit={metric.unit}
              label={metric.label[lang]}
              caveat={metric.caveat?.[lang]}
              comparison={metric.comparison?.[lang]}
            />
          ))}
        </section>

        <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-[210px_minmax(0,1fr)] print:grid-cols-[170px_minmax(0,1fr)] print:gap-x-8 print:gap-y-0 print:mt-8">
          <aside className="space-y-9">
            <RailSection title={sections.education[lang]}>
              <p className="text-body-sm text-foreground">
                {left.education.school[lang]}
              </p>
              <p className="mt-1 text-caption text-muted-foreground">
                {left.education.degree[lang]}
              </p>
              <p className="mt-1 font-mono text-caption tabular-nums text-subtle">
                {left.education.period[lang]}
              </p>
              <p className="mt-1 text-caption text-muted-foreground">
                {left.education.status[lang]}
              </p>
            </RailSection>

            <RailSection title={sections.skills[lang]}>
              <dl className="space-y-3">
                {left.skillGroups[lang].map((group) => (
                  <div key={group.title}>
                    <dt className="font-mono text-caption text-subtle">
                      {group.title}
                    </dt>
                    <dd className="mt-1 text-caption text-muted-foreground">
                      {group.tags.join("  /  ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </RailSection>

            <RailSection title={sections.certifications[lang]}>
              <ul className="space-y-2">
                {left.certifications.map((item) => (
                  <li key={item.name[lang]}>
                    <p className="text-caption text-foreground">
                      {item.name[lang]}
                    </p>
                    <p className="text-caption text-muted-foreground">
                      {item.sub[lang]}
                    </p>
                  </li>
                ))}
              </ul>
            </RailSection>

            <RailSection title={sections.languages[lang]}>
              <ul className="space-y-1">
                {left.languages.items.map((item) => (
                  <li key={item[lang]} className="text-caption text-foreground">
                    {item[lang]}
                  </li>
                ))}
              </ul>
              <p className="mt-1 font-mono text-caption text-subtle">
                {left.languages.sub[lang]}
              </p>
            </RailSection>

            <RailSection title={sections.awards[lang]}>
              <ul className="space-y-2">
                {left.awards.map((item) => (
                  <li key={item.name[lang]}>
                    <p className="text-caption text-foreground">
                      {item.name[lang]}
                    </p>
                    <p className="text-caption text-muted-foreground">
                      {item.sub[lang]}
                    </p>
                  </li>
                ))}
              </ul>
            </RailSection>

            <RailSection title={sections.military[lang]}>
              <p className="text-caption text-foreground">
                {left.military.status[lang]}
              </p>
              <p className="mt-1 font-mono text-caption tabular-nums text-subtle">
                {left.military.period[lang]}
              </p>
            </RailSection>

            <RailSection title={sections.activities[lang]}>
              <ul className="space-y-2">
                {left.activities.map((item) => (
                  <li key={item.name[lang]}>
                    <p className="text-caption text-foreground">
                      {item.name[lang]}
                    </p>
                    <p className="mt-1 font-mono text-caption tabular-nums text-subtle">
                      {item.period[lang]}
                    </p>
                  </li>
                ))}
              </ul>
            </RailSection>
          </aside>

          <section>
            <h2 className="font-mono text-label uppercase text-subtle">
              {sections.experience[lang]}
            </h2>
            <ol className="mt-5 divide-y divide-hairline border-t border-hairline">
              {resume.experience.map((entry) => (
                <li key={entry.id} className="py-6 print-avoid-break print:py-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-h3 text-foreground">
                      {entry.company[lang]}
                    </h3>
                    <span className="text-body-sm text-muted-foreground">
                      {entry.role[lang]}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-caption tabular-nums text-subtle">
                    {formatMonthRange(entry.dateRange, lang, presentLabel[lang])}
                  </p>
                  <p className="mt-2 text-body-sm text-muted-foreground">{entry.summary[lang]}</p>
                  <ul className="mt-3 space-y-2">
                    {entry.bullets[lang].map((bullet) => (
                      <li
                        key={bullet}
                        className="relative ps-4 text-body-sm text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="absolute start-0 top-[0.7em] size-[4px] bg-faint"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 font-mono text-label uppercase text-subtle" data-print-hide>
              {journey.resumeCases[lang]}
            </h2>
            <ul className="mt-4 divide-y divide-hairline border-t border-hairline" data-print-hide>
              {cases.map((caseStudy) => (
                <li key={caseStudy.slug} className="py-3">
                  <Link
                    href={localizePath(questPath(caseStudy.slug), lang)}
                    className="text-body-sm text-foreground underline decoration-strong underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {caseStudy.name}: {caseStudy.title[lang].join(" ")}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter
        lang={lang}
        corrections="none"
        containerClassName={CONTAINER}
      />
    </>
  );
}

type RailSectionProps = {
  title: string;
  children: ReactNode;
};

function RailSection({ title, children }: RailSectionProps) {
  return (
    <section className="print-avoid-break">
      <h2 className="font-mono text-label uppercase text-subtle">{title}</h2>
      <div className="mt-3 border-t border-hairline pt-3">{children}</div>
    </section>
  );
}
