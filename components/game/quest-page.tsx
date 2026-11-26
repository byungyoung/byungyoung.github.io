import Link from "next/link";
import type { ReactNode } from "react";

import { notesFor } from "@/components/doc/anchored-notes";
import { DraftGate, isVisible } from "@/components/doc/draft-gate";
import { GameShell } from "@/components/game/game-shell";
import { QuestVisit } from "@/components/game/quest-visit";
import { cases } from "@/content/cases";
import type { CaseStudy } from "@/content/cases/types";
import { game } from "@/content/game";
import type { Lang } from "@/content/types";
import { buildQuests, mapPathForStage } from "@/lib/game";

type QuestPageProps = {
  caseStudy: CaseStudy;
  lang: Lang;
};

function pad(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function FieldNotes({ anchor, lang }: { anchor: string; lang: Lang }) {
  const notes = notesFor(anchor);
  if (notes.length === 0) return null;

  return (
    <>
      {notes.map((note) => (
        <DraftGate key={note.id} lang={lang} status={note.status}>
          <aside className="g-fieldnote">
            <p className="g-pixel g-fieldnote__label">{game.quests.fieldNote[lang]}</p>
            <p>{note.text[lang]}</p>
          </aside>
        </DraftGate>
      ))}
    </>
  );
}

function QuestSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="g-qsection">
      <h2 className="g-qsection__title">{title}</h2>
      {children}
    </section>
  );
}

export function QuestPage({ caseStudy, lang }: QuestPageProps) {
  const copy = game.quests;
  const sections = copy.sections;
  const quest = buildQuests(lang).find((item) => item.slug === caseStudy.slug);
  const order = cases.findIndex((item) => item.slug === caseStudy.slug);
  const prev = order > 0 ? buildQuests(lang)[order - 1] : null;
  const next = order < cases.length - 1 ? buildQuests(lang)[order + 1] : null;
  const rejected = caseStudy.rejectedOptions.filter((option) => isVisible(option.status));
  const anchor = (part: string) => `case.${caseStudy.slug}.${part}`;

  return (
    <GameShell lang={lang}>
      <QuestVisit slug={caseStudy.slug} message={`${game.progress.questEntered[lang]}: ${caseStudy.name}`} />

      <article className="g-questpage">
        <Link href={mapPathForStage(caseStudy.slug, lang)} className="g-back">
          ◀ {copy.backToMap[lang]}
        </Link>

        <header className="g-questpage__header">
          <p className="g-questpage__chips">
            <span className="g-pixel g-eyebrow">
              {copy.quest} {caseStudy.num} — {caseStudy.name.toUpperCase()}
            </span>
            <span className="g-chip g-chip--plain">{copy.completed[lang]}</span>
            {quest?.acquired ? <span className="g-chip g-chip--accent">{game.map.status.acquired[lang]}</span> : null}
          </p>
          <h1 className="g-questpage__title">
            {caseStudy.title[lang].map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="g-questpage__sub">{caseStudy.heroSub[lang]}</p>

          <div className="g-rewards">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.value + metric.label.en} className="g-reward g-frame">
                <p className="g-pixel g-reward__label">{copy.reward[lang]}</p>
                <p className="g-reward__value">
                  <span className="g-pixel">{metric.value}</span>
                  {metric.unit ? <span className="g-reward__unit">{metric.unit}</span> : null}
                </p>
                <p className="g-reward__caption">{metric.label[lang]}</p>
                {metric.caveat ? <p className="g-reward__caption">{metric.caveat[lang]}</p> : null}
                {metric.comparison ? <p className="g-reward__caption">{metric.comparison[lang]}</p> : null}
              </div>
            ))}
          </div>
        </header>

        <QuestSection title={sections.briefing[lang]}>
          {caseStudy.context[lang].map((paragraph) => (
            <p key={paragraph} className="g-prose">
              {paragraph}
            </p>
          ))}
          <FieldNotes anchor={anchor("context")} lang={lang} />
        </QuestSection>

        <QuestSection title={sections.objectives[lang]}>
          <ol className="g-objectives">
            {caseStudy.process[lang].map((step, index) => (
              <li key={step.title} className="g-objective">
                <span aria-hidden className="g-objective__box">
                  ✓
                </span>
                <div>
                  <h3 className="g-objective__title">
                    <span className="g-pixel g-objective__num">{pad(index)}</span> {step.title}
                  </h3>
                  <p className="g-objective__body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <FieldNotes anchor={anchor("process")} lang={lang} />
        </QuestSection>

        {rejected.length > 0 ? (
          <QuestSection title={sections.paths[lang]}>
            <p className="g-prose g-prose--muted">{copy.pathsNote[lang]}</p>
            <ul className="g-paths">
              {rejected.map((option) => (
                <DraftGate key={option.option.en} lang={lang} status={option.status}>
                  <li className="g-path">
                    <p className="g-path__option">
                      <s>{option.option[lang]}</s>
                    </p>
                    <p className="g-path__reason">{option.reason[lang]}</p>
                  </li>
                </DraftGate>
              ))}
            </ul>
          </QuestSection>
        ) : null}

        <QuestSection title={sections.rewards[lang]}>
          <ul className="g-list g-list--loose">
            {caseStudy.results[lang].map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
          <FieldNotes anchor={anchor("result")} lang={lang} />
        </QuestSection>

        <QuestSection title={sections.lessons[lang]}>
          <ol className="g-lessons">
            {caseStudy.learned.map((item, index) => (
              <li key={item.title.en} className="g-lesson g-frame">
                <p className="g-pixel g-lesson__num">{pad(index)}</p>
                <p className="g-lesson__title">{item.title[lang]}</p>
                <p className="g-lesson__body">{item.body[lang]}</p>
              </li>
            ))}
          </ol>
        </QuestSection>

        <nav aria-label={copy.quest} className="g-questnav">
          {prev ? (
            <Link href={prev.href} className="g-btn">
              ◀ {copy.prevQuest[lang]}: {prev.name}
            </Link>
          ) : (
            <span />
          )}
          <Link href={mapPathForStage(caseStudy.slug, lang)} className="g-btn">
            {copy.backToMap[lang]}
          </Link>
          {next ? (
            <Link href={next.href} className="g-btn g-btn--primary">
              {copy.nextQuest[lang]}: {next.name} ▶
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </GameShell>
  );
}
