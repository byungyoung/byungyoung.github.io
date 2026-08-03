import Link from "next/link";
import type { CSSProperties } from "react";

import { AnchoredNotes } from "@/components/doc/anchored-notes";
import { DocGrid, DocRow } from "@/components/doc/doc-grid";
import { DraftGate, isVisible } from "@/components/doc/draft-gate";
import { MetricWithCaveat } from "@/components/doc/metric-with-caveat";
import { RejectedOption } from "@/components/doc/rejected-option";
import { SectionLabel } from "@/components/doc/section-label";
import { Stamp, type StampVariant } from "@/components/doc/stamp";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { poLanding } from "@/content/po-landing";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { CaseStudy } from "@/content/cases/types";
import type { Lang } from "@/content/types";

const ROW_GAP = "64px";

function stampVariantFor(slug: string): StampVariant {
  const entry = poLanding.experience.items.find((item) => item.id === slug);
  return entry?.exit ? "exit" : "approved";
}

function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

type SectionHeadingProps = { children: string };

function SectionHeading({ children }: SectionHeadingProps) {
  return <h2 className="text-h2 text-foreground">{children}</h2>;
}

type CaseStudyPageProps = {
  caseStudy: CaseStudy;
  lang: Lang;
};

export function CaseStudyPage({ caseStudy, lang }: CaseStudyPageProps) {
  const sections = ui.caseStudy.sections;
  const process = caseStudy.process[lang];
  const rejected = caseStudy.rejectedOptions.filter((option) =>
    isVisible(option.status),
  );

  return (
    <>
      <ScrollProgress />
      <SiteHeader
        lang={lang}
        homeHref="/"
        action={{ href: site.urls.poHome, label: poLanding.nav.cases[lang] }}
      />

      <main
        id="main"
        className="mx-auto max-w-[var(--container-doc)] px-6 pt-10 pb-4 lg:px-10"
      >
        <Link
          href={ui.caseStudy.backHref}
          className="font-mono text-caption text-subtle underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {ui.caseStudy.backLabel[lang]}
        </Link>

        <DocGrid
          className="mt-10"
          style={{ "--doc-row-gap": ROW_GAP } as CSSProperties}
        >
          <DocRow
            main={
              <header>
                <SectionLabel
                  num={`${ui.caseStudy.label[lang]} ${caseStudy.num}`}
                >
                  {caseStudy.name}
                </SectionLabel>

                <div className="mt-4 flex flex-wrap items-start justify-between gap-x-8 gap-y-5">
                  <h1 className="text-display text-foreground">
                    {caseStudy.title[lang].map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>
                  <Stamp
                    variant={stampVariantFor(caseStudy.slug)}
                    size="md"
                    lang={lang}
                    seed={caseStudy.slug}
                    className="mt-2"
                  />
                </div>

                <p className="mt-5 text-body text-muted-foreground">
                  {caseStudy.heroSub[lang]}
                </p>

                <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-2">
                  {caseStudy.metrics.map((metric) => (
                    <MetricWithCaveat
                      key={metric.value + metric.label[lang]}
                      value={metric.value}
                      unit={metric.unit}
                      label={metric.label[lang]}
                      caveat={metric.caveat?.[lang]}
                      comparison={metric.comparison?.[lang]}
                    />
                  ))}
                </div>
              </header>
            }
          />

          <DocRow
            main={
              <Reveal>
                <section>
                  <SectionHeading>{sections.context[lang]}</SectionHeading>
                  <div className="mt-5 space-y-5">
                    {caseStudy.context[lang].map((paragraph) => (
                      <p key={paragraph} className="text-body text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            }
            note={
              <AnchoredNotes
                anchor={`case.${caseStudy.slug}.context`}
                lang={lang}
                offset={0}
              />
            }
          />

          <DocRow
            main={
              <Reveal>
                <section>
                  <SectionHeading>{sections.process[lang]}</SectionHeading>
                  <ol className="mt-5 divide-y divide-hairline border-t border-hairline">
                    {process.map((step, index) => (
                      <li
                        key={step.title}
                        className="grid gap-y-1 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-4"
                      >
                        <span className="font-mono text-label tabular-nums text-subtle">
                          {ordinal(index)}
                        </span>
                        <div>
                          <h3 className="text-h3 text-foreground">{step.title}</h3>
                          <p className="mt-2 text-body-sm text-muted-foreground">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            }
            note={
              <AnchoredNotes
                anchor={`case.${caseStudy.slug}.process`}
                lang={lang}
                offset={1}
              />
            }
          />

          {rejected.length > 0 ? (
            <DocRow
              main={
                <Reveal>
                  <section>
                    <SectionHeading>{sections.rejected[lang]}</SectionHeading>
                    <div className="mt-5">
                      {rejected.map((option) => (
                        <DraftGate
                          key={option.option[lang]}
                          lang={lang}
                          status={option.status}
                        >
                          <RejectedOption
                            lang={lang}
                            option={option.option[lang]}
                            reason={option.reason[lang]}
                          />
                        </DraftGate>
                      ))}
                    </div>
                  </section>
                </Reveal>
              }
            />
          ) : null}

          <DocRow
            main={
              <Reveal>
                <section>
                  <SectionHeading>{sections.result[lang]}</SectionHeading>
                  <ul className="mt-5 space-y-4">
                    {caseStudy.results[lang].map((result) => (
                      <li
                        key={result}
                        className="relative ps-5 text-body text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="absolute start-0 top-[0.72em] size-[5px] bg-faint"
                        />
                        {result}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            }
            note={
              <AnchoredNotes
                anchor={`case.${caseStudy.slug}.result`}
                lang={lang}
                offset={2}
              />
            }
          />

          <DocRow
            main={
              <Reveal>
                <section>
                  <SectionHeading>{sections.learned[lang]}</SectionHeading>
                  <ol className="mt-5 space-y-7">
                    {caseStudy.learned.map((item, index) => (
                      <li
                        key={item.title[lang]}
                        className="grid gap-y-1 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-4"
                      >
                        <span className="font-mono text-label tabular-nums text-subtle">
                          {ordinal(index)}
                        </span>
                        <div>
                          <p className="text-body font-bold text-foreground">
                            {item.title[lang]}
                          </p>
                          <p className="mt-1.5 text-body-sm text-muted-foreground">
                            {item.body[lang]}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            }
          />
        </DocGrid>
      </main>

      <SiteFooter lang={lang} corrections="teaser" />
    </>
  );
}
