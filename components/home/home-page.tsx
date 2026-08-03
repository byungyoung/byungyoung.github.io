import Link from "next/link";
import type { CSSProperties } from "react";

import { AnchoredNotes } from "@/components/doc/anchored-notes";
import { ChangelogTimeline, type ChangelogEntry } from "@/components/doc/changelog-timeline";
import { DocGrid, DocRow } from "@/components/doc/doc-grid";
import { SectionLabel } from "@/components/doc/section-label";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader, type HeaderNavItem } from "@/components/site/header";
import { Button } from "@/components/ui/button";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { localizePath } from "@/lib/paths";

/**
 * Density budget (plan): main page carries 1 margin note and 2 sm EXIT stamps.
 *
 * - The single note is `about-gate`, in the rail beside About.
 * - `exp-xitst-92`, `exp-refactorworks`, `exp-osof-duration` are approved but
 *   over budget, so they render in development only (see EXPERIENCE_NOTE_ANCHORS)
 *   for the owner to pick from. Production drops them.
 * - The two EXIT stamps land on Paik and OSOF via the timeline's `exit` flag.
 */
const ABOUT_NOTE_ANCHOR = "home.about";
const EXPERIENCE_NOTE_ANCHORS = [
  "home.experience.xitst",
  "home.experience.refactorworks",
  "home.experience.osof",
] as const;

const LAST_COMMIT_DATE = process.env.NEXT_PUBLIC_LAST_COMMIT_DATE ?? "";
const ROW_GAP = "72px";

function timelineEntries(lang: Lang): ChangelogEntry[] {
  const items = home.experience.items;
  return items.map((item, index) => ({
    id: item.id,
    version: `v${items.length - index}`,
    period: item.period[lang],
    title: item.role[lang],
    stamp: item.exit ? ("exit" as const) : undefined,
    body: (
      <>
        <p>{item.desc[lang]}</p>
        <p className="mt-2 font-mono text-caption text-faint">
          {item.tags.join("  /  ")}
        </p>
      </>
    ),
  }));
}

type HomePageProps = { lang: Lang };

export function HomePage({ lang }: HomePageProps) {
  const { hero, about, experience, skills, credentials, projects, contact, nav } =
    home;

  const navItems: readonly HeaderNavItem[] = [
    { id: "about", href: "#about", label: nav.about[lang] },
    { id: "experience", href: "#experience", label: nav.experience[lang] },
    { id: "skills", href: "#skills", label: nav.skills[lang] },
    { id: "projects", href: "#projects", label: nav.projects[lang] },
    { id: "contact", href: "#contact", label: nav.contact[lang] },
  ];

  const metaLine = [
    lang === "ko" ? site.name : site.nameEn,
    ui.meta.decisionLog[lang],
    LAST_COMMIT_DATE
      ? `${ui.meta.lastModified[lang]} ${LAST_COMMIT_DATE}`
      : null,
  ]
    .filter(Boolean)
    .join(` ${site.titleSeparator} `);

  return (
    <>
      <SiteHeader
        lang={lang}
        homeHref="/"
        items={navItems}
        action={{ href: nav.poHref, label: nav.po[lang] }}
      />

      <main
        id="main"
        className="mx-auto max-w-[var(--container-doc)] px-6 pt-14 pb-4 lg:px-10"
      >
        <section className="max-w-[var(--measure)]">
          <p className="font-mono text-label uppercase tabular-nums text-subtle">
            {metaLine}
          </p>
          <h1 className="mt-6 text-display text-foreground">
            {hero.h1[lang].map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 inline-flex w-fit items-center rounded-sm border border-border px-2.5 py-1 text-caption text-subtle">
            {hero.badge[lang]}
          </p>
          <p className="mt-6 text-body text-muted-foreground">
            {hero.subtitle[lang]}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href={localizePath(hero.ctaPoHref, lang)}>
                {hero.ctaPo[lang]}
              </Link>
            </Button>
            <Button asChild variant="outline" className="dark:bg-transparent">
              <Link href={localizePath(hero.ctaResumeHref, lang)}>
                {hero.ctaResume[lang]}
              </Link>
            </Button>
            <Button asChild variant="outline" className="dark:bg-transparent">
              <a href={hero.ctaGithubHref} rel="noreferrer" target="_blank">
                {hero.ctaGithub[lang]}
              </a>
            </Button>
          </div>
        </section>

        <DocGrid
          className="mt-24"
          style={{ "--doc-row-gap": ROW_GAP } as CSSProperties}
        >
          <DocRow
            main={
              <Reveal>
                <section id="about" className="scroll-mt-20">
                  <SectionLabel num="01">{nav.about[lang]}</SectionLabel>
                  <h2 className="mt-4 text-h2 text-foreground">
                    {about.heading[lang]}
                  </h2>
                  <p className="mt-5 text-body text-muted-foreground">
                    {about.body1[lang]}
                  </p>
                  <p className="mt-4 text-body text-muted-foreground">
                    {about.body2[lang]}
                  </p>
                </section>
              </Reveal>
            }
            note={<AnchoredNotes anchor={ABOUT_NOTE_ANCHOR} lang={lang} />}
          />

          <DocRow
            main={
              <Reveal>
                <section id="experience" className="scroll-mt-20">
                  <SectionLabel num="02">{nav.experience[lang]}</SectionLabel>
                  <h2 className="mt-4 text-h2 text-foreground">
                    {experience.heading[lang]}
                  </h2>
                  <div className="mt-8">
                    <ChangelogTimeline
                      lang={lang}
                      entries={timelineEntries(lang)}
                    />
                  </div>
                </section>
              </Reveal>
            }
            note={
              <>
                {EXPERIENCE_NOTE_ANCHORS.map((anchor, index) => (
                  <AnchoredNotes
                    key={anchor}
                    anchor={anchor}
                    lang={lang}
                    offset={index}
                    devOnly
                  />
                ))}
              </>
            }
          />

          <DocRow
            main={
              <Reveal>
                <section id="skills" className="scroll-mt-20">
                  <SectionLabel num="03">{nav.skills[lang]}</SectionLabel>
                  <h2 className="mt-4 text-h2 text-foreground">
                    {skills.heading[lang]}
                  </h2>
                  <dl className="mt-8 divide-y divide-hairline border-t border-hairline">
                    {skills.groups.map((group) => (
                      <div
                        key={group.title[lang]}
                        className="grid gap-2 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4"
                      >
                        <dt className="font-mono text-label uppercase text-subtle">
                          {group.title[lang]}
                        </dt>
                        <dd className="text-body-sm text-muted-foreground">
                          {group.tags.join("  /  ")}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </Reveal>
            }
          />

          <DocRow
            main={
              <Reveal>
                <section>
                  <SectionLabel num="04">
                    {ui.home.credentialsHeading[lang]}
                  </SectionLabel>
                  <dl className="mt-8 divide-y divide-hairline border-t border-hairline">
                    {credentials.map((item) => (
                      <div
                        key={item.label[lang]}
                        className="grid gap-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4"
                      >
                        <dt className="font-mono text-label uppercase text-subtle">
                          {item.label[lang]}
                        </dt>
                        <dd className="text-body-sm text-muted-foreground">
                          {item.value[lang]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </Reveal>
            }
          />

          <DocRow
            main={
              <Reveal>
                <section id="projects" className="scroll-mt-20">
                  <SectionLabel num="05">{nav.projects[lang]}</SectionLabel>
                  <h2 className="mt-4 text-h2 text-foreground">
                    {projects.heading[lang]}
                  </h2>
                  <ul className="mt-8 border-t border-hairline">
                    {projects.items.map((project) => (
                      <li key={project.id} className="border-b border-hairline">
                        <Link
                          href={localizePath(project.href, lang)}
                          className="group grid gap-x-6 gap-y-2 py-6 sm:grid-cols-[minmax(0,1fr)_7rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                          <div>
                            <h3 className="text-h3 text-foreground underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-strong">
                              {project.name[lang]}
                            </h3>
                            <p className="mt-2 text-body-sm text-muted-foreground">
                              {project.desc[lang]}
                            </p>
                          </div>
                          <span className="font-mono text-caption text-subtle sm:text-right">
                            {project.link[lang]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            }
          />

          <DocRow
            main={
              <Reveal>
                <section id="contact" className="scroll-mt-20">
                  <SectionLabel num="06">{nav.contact[lang]}</SectionLabel>
                  <h2 className="mt-4 text-h2 text-foreground">
                    {contact.heading[lang]}
                  </h2>
                  <dl className="mt-8 divide-y divide-hairline border-t border-hairline">
                    <ContactRow
                      term={ui.contact.email[lang]}
                      href={`mailto:${contact.email}`}
                      value={contact.email}
                    />
                    <ContactRow
                      term={ui.contact.linkedin[lang]}
                      href={contact.linkedin}
                      value={contact.linkedin}
                      external
                    />
                    <ContactRow
                      term={ui.contact.github[lang]}
                      href={contact.github}
                      value={contact.github}
                      external
                    />
                  </dl>
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
