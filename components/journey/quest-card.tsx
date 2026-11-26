"use client";

import Link from "next/link";
import type { ReactNode, RefObject } from "react";

import { journey } from "@/content/journey";
import type { Lang } from "@/content/types";
import type { MetricView, PlaceView } from "@/lib/journey";

export type PageId = "record" | "briefing" | "objectives" | "paths" | "rewards" | "checkpoint";

export function pagesFor(place: PlaceView): PageId[] {
  if (place.kind === "checkpoint") return ["checkpoint"];
  if (!place.caseStudy) return ["record"];
  return ["record", "briefing", "objectives", ...(place.caseStudy.rejected.length > 0 ? (["paths"] as const) : []), "rewards"];
}

type QuestCardProps = {
  lang: Lang;
  place: PlaceView;
  total: number;
  page: number;
  cleared: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onPage: (page: number) => void;
  onComplete: () => void;
  onClose: () => void;
};

function Metric({ metric, label }: { metric: MetricView; label: string }) {
  return (
    <div className="j-metric">
      <p className="j-metric__label">{label}</p>
      <p className="j-metric__value">
        {metric.value}
        {metric.unit ? <span>{metric.unit}</span> : null}
      </p>
      <p className="j-metric__caption">{[metric.label, metric.caveat, metric.comparison].filter(Boolean).join(", ")}</p>
    </div>
  );
}

function PageBody({ id, place, lang }: { id: PageId; place: PlaceView; lang: Lang }) {
  const copy = journey.quest;
  const study = place.caseStudy;

  const content: Record<PageId, () => ReactNode> = {
    checkpoint: () => <p className="j-prose">{copy.checkpointNote[lang]}</p>,
    record: () => (
      <>
        {place.summary ? <p className="j-lead">{place.summary}</p> : null}
        <ul className="j-list">
          {place.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </>
    ),
    briefing: () => (
      <>
        <p className="j-lead">{study?.heroSub}</p>
        {study?.context.map((paragraph) => (
          <p key={paragraph} className="j-prose">
            {paragraph}
          </p>
        ))}
      </>
    ),
    objectives: () => (
      <ol className="j-objectives">
        {study?.process.map((step, index) => (
          <li key={step.title} className="j-objective" style={{ animationDelay: `${140 + index * 160}ms` }}>
            <span aria-hidden className="j-objective__check" style={{ animationDelay: `${260 + index * 160}ms` }}>
              ✓
            </span>
            <div>
              <p className="j-objective__title">{step.title}</p>
              <p className="j-objective__body">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    ),
    paths: () => (
      <>
        <p className="j-muted">{copy.pathsNote[lang]}</p>
        <ul className="j-paths">
          {study?.rejected.map((option) => (
            <li key={option.option}>
              <p className="j-paths__option">
                <s>{option.option}</s>
              </p>
              <p className="j-prose">{option.reason}</p>
            </li>
          ))}
        </ul>
      </>
    ),
    rewards: () => (
      <>
        <div className="j-metrics">
          {study?.metrics.map((metric) => (
            <Metric key={metric.label} metric={metric} label={copy.metricLabel[lang]} />
          ))}
        </div>
        <ul className="j-list">
          {study?.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
        <ol className="j-lessons">
          {study?.learned.map((item) => (
            <li key={item.title}>
              <p className="j-objective__title">{item.title}</p>
              <p className="j-objective__body">{item.body}</p>
            </li>
          ))}
        </ol>
      </>
    ),
  };

  return <>{content[id]()}</>;
}

/**
 * The quest at the current place: accept, page through it (each page is one
 * step of progress), then complete it. A bottom sheet on phones, a side panel
 * on wide screens. Long pages scroll inside the card, never the page.
 */
export function QuestCard({ lang, place, total, page, cleared, headingRef, onPage, onComplete, onClose }: QuestCardProps) {
  const copy = journey.quest;
  const pages = pagesFor(place);
  const pageId = pages[Math.min(page, pages.length - 1)];
  const isLast = page >= pages.length - 1;
  const label = place.kind === "checkpoint" ? journey.places.checkpoint[lang] : `${journey.places.stage[lang]} ${place.index + 1} / ${total}`;
  const status = cleared ? copy.cleared[lang] : place.current ? copy.nowPlaying[lang] : copy.accepted[lang];
  const titleId = `quest-title-${place.id}`;

  return (
    <section className="j-card" aria-labelledby={titleId} data-place={place.id} key={place.id}>
      <header className="j-card__head">
        <p className="j-card__chips">
          <span className="j-chip">{label}</span>
          <span className="j-chip j-chip--status" data-cleared={cleared || undefined}>
            {status}
          </span>
          {place.acquired ? <span className="j-chip j-chip--accent">{copy.acquired[lang]}</span> : null}
        </p>
        <button type="button" className="j-icon-btn j-card__close" onClick={onClose} aria-label={copy.close[lang]}>
          ×
        </button>
        <h2 id={titleId} ref={headingRef} tabIndex={-1} className="j-card__title">
          {place.company}
        </h2>
        <p className="j-card__role">{place.role}</p>
        <p className="j-card__meta">
          {place.period}
          {place.duration ? (
            <>
              <span aria-hidden> / </span>
              {copy.time[lang]} {place.duration}
            </>
          ) : null}
        </p>
        <div className="j-steps" role="progressbar" aria-label={copy.progress[lang]} aria-valuemin={1} aria-valuemax={pages.length} aria-valuenow={page + 1}>
          {pages.map((id, index) => (
            <span key={id} className="j-steps__seg" data-done={index <= page || undefined} />
          ))}
        </div>
      </header>

      <div className="j-card__body" key={pageId} tabIndex={0}>
        <h3 className="j-card__page">{copy.pages[pageId][lang]}</h3>
        <PageBody id={pageId} place={place} lang={lang} />
      </div>

      <footer className="j-card__foot">
        <div className="j-card__links">
          <Link href={place.pageHref} className="j-link">
            {copy.readPage[lang]}
          </Link>
          {!cleared && !isLast ? (
            <button type="button" className="j-link j-link--button" onClick={onComplete}>
              {copy.skip[lang]} ▸▸
            </button>
          ) : null}
        </div>
        <div className="j-card__nav">
          <button type="button" className="j-btn" onClick={() => onPage(page - 1)} disabled={page === 0}>
            {copy.back[lang]}
          </button>
          {isLast ? (
            <button type="button" className="j-btn j-btn--primary" onClick={onComplete}>
              {cleared ? copy.close[lang] : copy.complete[lang]}
            </button>
          ) : (
            <button type="button" className="j-btn j-btn--primary" onClick={() => onPage(page + 1)}>
              {copy.next[lang]}
            </button>
          )}
        </div>
      </footer>
    </section>
  );
}
