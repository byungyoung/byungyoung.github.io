import Link from "next/link";

import { AnchoredNotes } from "@/components/doc/anchored-notes";
import { MetricWithCaveat } from "@/components/doc/metric-with-caveat";
import { SectionLabel } from "@/components/doc/section-label";
import { Stamp, type StampVariant } from "@/components/doc/stamp";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader, type HeaderNavItem } from "@/components/site/header";
import { Button } from "@/components/ui/button";
import { poLanding } from "@/content/po-landing";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { localizePath } from "@/lib/paths";

const CONTAINER = "max-w-[var(--container)]";

/**
 * Density budget (plan): PO landing carries 1 margin note and 4 sm stamps.
 *
 * - Stamps: all four go to the case index — the 결재 목록 is what they are for.
 *   Experience rows carry their Exit status in `roleTag` text instead.
 * - Notes: only `po-metric-92` renders. `po-metric-85` (anchor
 *   `po.metrics.usability`) is approved but omitted at code level to stay inside
 *   the budget of one; it is never queried below.
 */
const METRIC_NOTE_ANCHOR = "po.metrics.rppg";
const NOTE_ANCHORED_METRIC_VALUE = "92";

function stampVariantFor(slug: string): StampVariant {
  const entry = poLanding.experience.items.find((item) => item.id === slug);
  return entry?.exit ? "exit" : "approved";
}

type PoLandingPageProps = { lang: Lang };

export function PoLandingPage({ lang }: PoLandingPageProps) {
  const { hero, metrics, experience, cases, contact, nav } = poLanding;

  const navItems: readonly HeaderNavItem[] = [
    { id: "metrics", href: "#metrics", label: nav.metrics[lang] },
    { id: "experience", href: "#experience", label: nav.experience[lang] },
    { id: "cases", href: "#cases", label: nav.cases[lang] },
    { id: "contact", href: "#contact", label: nav.contact[lang] },
  ];

  return (
    <>
      <SiteHeader
        lang={lang}
        homeHref="/"
        items={navItems}
        action={{ href: nav.resumeCtaHref, label: nav.resumeCta[lang] }}
      />

      <main id="main" className={`mx-auto ${CONTAINER} px-6 pt-14 pb-4`}>
        <section>
          <p className="inline-flex w-fit items-center rounded-sm border border-border px-2.5 py-1 text-caption text-subtle">
            {hero.badge[lang]}
          </p>
          <h1 className="mt-6 text-display text-foreground">
            <span className="block">{hero.titleLine1[lang]}</span>
            <span className="block">{hero.titleHighlight[lang]}</span>
          </h1>
          <p className="mt-6 text-body text-muted-foreground">
            {hero.sub[lang].join(" ")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href={hero.ctaCasesHref}>{hero.ctaCases[lang]}</a>
            </Button>
            <Button asChild variant="outline" className="dark:bg-transparent">
              <a href={hero.ctaLinkedinHref} rel="noreferrer" target="_blank">
                {hero.ctaLinkedin[lang]}
              </a>
            </Button>
          </div>
        </section>

        <Reveal>
          <section id="metrics" className="mt-24 scroll-mt-20">
            <SectionLabel num="01">{nav.metrics[lang]}</SectionLabel>
            <div className="mt-8 grid gap-x-10 gap-y-10 border-t border-hairline pt-8 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.value + metric.label[lang]}>
                  <MetricWithCaveat
                    value={metric.value}
                    unit={metric.unit}
                    label={metric.label[lang]}
                    caveat={metric.caveat?.[lang]}
                    comparison={metric.comparison?.[lang]}
                  />
                  {metric.value === NOTE_ANCHORED_METRIC_VALUE ? (
                    <AnchoredNotes
                      anchor={METRIC_NOTE_ANCHOR}
                      lang={lang}
                      inline
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="experience" className="mt-24 scroll-mt-20">
            <SectionLabel num="02">{experience.sectionLabel[lang]}</SectionLabel>
            <h2 className="mt-4 text-h2 text-foreground">
              {experience.heading[lang]}
            </h2>
            <ol className="mt-8 divide-y divide-hairline border-t border-hairline">
              {experience.items.map((item) => (
                <li key={item.id} className="py-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-label uppercase tabular-nums text-subtle">
                      {item.period[lang]}
                    </span>
                    <h3 className="text-h3 text-foreground">
                      {item.company[lang]}
                    </h3>
                    <span className="text-caption text-muted-foreground">
                      {item.roleTag[lang]}
                    </span>
                  </div>
                  <p className="mt-2 text-body-sm text-foreground">
                    {item.title[lang]}
                  </p>
                  <p className="mt-2 text-body-sm text-muted-foreground">
                    {item.body[lang]}
                  </p>
                  <p className="mt-3 font-mono text-caption text-faint">
                    {item.tags.join("  /  ")}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal>
          <section id="cases" className="mt-24 scroll-mt-20">
            <SectionLabel num="03">{cases.sectionLabel[lang]}</SectionLabel>
            <h2 className="mt-4 text-h2 text-foreground">
              {cases.heading[lang]}
            </h2>
            <ol className="mt-8 border-t border-hairline">
              {cases.items.map((item) => (
                <li key={item.slug} className="border-b border-hairline">
                  <Link
                    href={localizePath(item.href, lang)}
                    className="group grid gap-x-6 gap-y-3 py-7 transition-colors sm:grid-cols-[minmax(0,1fr)_9rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    <div>
                      <span className="font-mono text-label uppercase tabular-nums text-subtle">
                        {item.num}
                      </span>
                      <h3 className="mt-2 text-h3 text-foreground underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-strong">
                        {item.title[lang]}
                      </h3>
                      <p className="mt-2 text-body-sm text-muted-foreground">
                        {item.body[lang]}
                      </p>
                    </div>
                    <div className="flex items-start gap-4 sm:flex-col sm:items-end sm:text-right">
                      <p className="font-mono text-h2 tabular-nums text-foreground">
                        {item.metric.value}
                        {item.metric.unit ?? ""}
                      </p>
                      <Stamp
                        variant={stampVariantFor(item.slug)}
                        size="sm"
                        lang={lang}
                        seed={item.slug}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-mono text-caption text-subtle">
              {cases.linkLabel[lang]}
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section id="contact" className="mt-24 scroll-mt-20">
            <SectionLabel num="04">{contact.sectionLabel[lang]}</SectionLabel>
            <h2 className="mt-4 text-h2 text-foreground">
              {contact.heading[lang]}
            </h2>
            <p className="mt-4 text-body text-muted-foreground">
              {contact.body[lang]}
            </p>
            <dl className="mt-8 divide-y divide-hairline border-t border-hairline">
              <ContactRow
                term={ui.contact.email[lang]}
                href={`mailto:${contact.email}`}
                value={contact.email}
              />
              <ContactRow
                term={contact.linkedinLabel[lang]}
                href={contact.linkedin}
                value={contact.linkedin}
                external
              />
              <ContactRow
                term={contact.githubLabel[lang]}
                href={contact.github}
                value={contact.github}
                external
              />
            </dl>
          </section>
        </Reveal>
      </main>

      <SiteFooter
        lang={lang}
        corrections="full"
        containerClassName={CONTAINER}
      />
    </>
  );
}

type ContactRowProps = {
  term: string;
  href: string;
  value: string;
  external?: boolean;
};

function ContactRow({ term, href, value, external = false }: ContactRowProps) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
      <dt className="font-mono text-label uppercase text-subtle">{term}</dt>
      <dd className="text-body-sm">
        <a
          href={href}
          rel={external ? "noreferrer" : undefined}
          target={external ? "_blank" : undefined}
          className="text-muted-foreground underline decoration-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {value}
        </a>
      </dd>
    </div>
  );
}
