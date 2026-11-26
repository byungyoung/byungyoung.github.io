import Link from "next/link";
import type { ReactNode } from "react";

import { AnchoredNotes } from "@/components/doc/anchored-notes";
import { DraftGate, isVisible } from "@/components/doc/draft-gate";
import { MetricWithCaveat } from "@/components/doc/metric-with-caveat";
import { SiteFooter } from "@/components/site/footer";
import { LangToggle } from "@/components/site/lang-toggle";
import type { CaseStudy } from "@/content/cases/types";
import { ShotGallery } from "@/components/doc/shot-gallery";
import { shotsByPlace } from "@/content/shots";
import { journey } from "@/content/journey";
import type { Lang } from "@/content/types";
import { SITE_PATHS } from "@/lib/journey";
import { localizePath } from "@/lib/paths";

const CONTAINER = "max-w-[var(--container)]";
const NAV_LINK =
  "inline-flex min-h-9 items-center whitespace-nowrap font-mono text-caption text-subtle underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-h2 text-foreground">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

type CaseStudyPageProps = { caseStudy: CaseStudy; lang: Lang };

/** Plain, scrollable reading of a case study: the same text the journey shows in its quest card. */
export function CaseStudyPage({ caseStudy, lang }: CaseStudyPageProps) {
  const copy = journey.questPage;
  const rejected = caseStudy.rejectedOptions.filter((option) => isVisible(option.status));
  const anchor = (part: string) => `case.${caseStudy.slug}.${part}`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/88 backdrop-blur-md">
        <div className={`mx-auto flex h-14 ${CONTAINER} items-center gap-4 px-4 sm:px-6`}>
          <Link href={localizePath(SITE_PATHS.home, lang)} className={NAV_LINK}>
            <span aria-hidden>←</span>
            <span className="max-sm:sr-only">&nbsp;{copy.back[lang]}</span>
          </Link>
          <Link href={localizePath(SITE_PATHS.resume, lang)} className={`${NAV_LINK} ms-auto`}>
            {copy.resume[lang]}
          </Link>
          <LangToggle lang={lang} />
        </div>
      </header>

      <main id="main" className={`mx-auto ${CONTAINER} px-6 pt-12 pb-4`}>
        <p className="font-mono text-label uppercase text-subtle">
          {copy.caseLabel[lang]} {caseStudy.num}, {caseStudy.name}
        </p>
        <h1 className="mt-4 text-display text-foreground">
          {caseStudy.title[lang].map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-5 text-body text-muted-foreground">{caseStudy.heroSub[lang]}</p>

        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-2">
          {caseStudy.metrics.map((metric) => (
            <MetricWithCaveat
              key={metric.value + metric.label.en}
              value={metric.value}
              unit={metric.unit}
              label={metric.label[lang]}
              caveat={metric.caveat?.[lang]}
              comparison={metric.comparison?.[lang]}
            />
          ))}
        </div>
        <ShotGallery shots={shotsByPlace[caseStudy.slug] ?? []} lang={lang} className="mt-6" />

        <Section title={copy.sections.context[lang]}>
          <div className="space-y-5">
            {caseStudy.context[lang].map((paragraph) => (
              <p key={paragraph} className="text-body text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <AnchoredNotes anchor={anchor("context")} lang={lang} inline />
        </Section>

        <Section title={copy.sections.process[lang]}>
          <ol className="divide-y divide-hairline border-t border-hairline">
            {caseStudy.process[lang].map((step, index) => (
              <li key={step.title} className="grid gap-y-1 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-4">
                <span className="font-mono text-label tabular-nums text-subtle">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-h3 text-foreground">{step.title}</h3>
                  <p className="mt-2 text-body-sm text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <AnchoredNotes anchor={anchor("process")} lang={lang} inline />
        </Section>

        {rejected.length > 0 ? (
          <Section title={copy.sections.rejected[lang]}>
            <ul className="space-y-6">
              {rejected.map((option) => (
                <DraftGate key={option.option.en} lang={lang} status={option.status}>
                  <li className="border-s-2 border-stamp ps-4">
                    <p className="text-h3 text-foreground">
                      <s className="decoration-stamp decoration-2">{option.option[lang]}</s>
                    </p>
                    <p className="mt-2 text-body-sm text-muted-foreground">{option.reason[lang]}</p>
                  </li>
                </DraftGate>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section title={copy.sections.result[lang]}>
          <ul className="space-y-3">
            {caseStudy.results[lang].map((result) => (
              <li key={result} className="relative ps-5 text-body text-muted-foreground">
                <span aria-hidden className="absolute start-0 top-[0.72em] size-[5px] bg-faint" />
                {result}
              </li>
            ))}
          </ul>
          <AnchoredNotes anchor={anchor("result")} lang={lang} inline />
        </Section>

        <Section title={copy.sections.learned[lang]}>
          <ol className="space-y-6">
            {caseStudy.learned.map((item) => (
              <li key={item.title.en}>
                <p className="text-body font-bold text-foreground">{item.title[lang]}</p>
                <p className="mt-1.5 text-body-sm text-muted-foreground">{item.body[lang]}</p>
              </li>
            ))}
          </ol>
        </Section>
      </main>

      <SiteFooter lang={lang} corrections="none" containerClassName={CONTAINER} />
    </>
  );
}
