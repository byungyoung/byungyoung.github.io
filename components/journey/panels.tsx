"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

import { LangToggle } from "@/components/site/lang-toggle";
import { journey } from "@/content/journey";
import { resume } from "@/content/resume";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { displayName, MONTHS_PER_LEVEL, PDF_FILES, SITE_PATHS } from "@/lib/journey";
import { localizePath } from "@/lib/paths";

export function levelOf(xp: number): number {
  return Math.floor(xp / MONTHS_PER_LEVEL);
}

type HudProps = {
  lang: Lang;
  xp: number;
  total: number;
  onHome: () => void;
  onCharacter: () => void;
};

export function JourneyHud({ lang, xp, total, onHome, onCharacter }: HudProps) {
  const copy = journey.hud;
  const fill = total > 0 ? (xp / total) * 100 : 0;

  return (
    <header className="j-hud">
      <button type="button" className="j-hud__home" onClick={onHome} aria-label={copy.home[lang]}>
        <span className="j-hud__logo">{ui.header.logo}</span>
        <span className="j-hud__name">{displayName(lang)}</span>
      </button>
      <div className="j-hud__xp" title={copy.xpLabel[lang]}>
        <span className="j-hud__lv">
          {copy.level} {levelOf(xp)}
        </span>
        <span className="j-xpbar j-xpbar--hud" aria-hidden>
          <span className="j-xpbar__fill" style={{ width: `${fill}%` }} />
        </span>
        <span className="j-hud__xpnum">
          <span className="sr-only">{copy.xpLabel[lang]}: </span>
          {xp}/{total}
        </span>
      </div>
      <nav aria-label={copy.nav[lang]} className="j-hud__nav">
        <button type="button" className="j-pill" onClick={onCharacter} aria-label={copy.character[lang]}>
          <svg aria-hidden className="j-hud__char-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="8" cy="5" r="3" />
            <path d="M2.5 14.5c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" strokeLinecap="round" />
          </svg>
          <span className="j-hud__char-label">{copy.character[lang]}</span>
        </button>
        <Link href={localizePath(SITE_PATHS.pdf, lang)} className="j-pill">
          {copy.pdf[lang]}
        </Link>
        <Link href={localizePath(SITE_PATHS.resume, lang)} className="j-pill">
          {copy.plain[lang]}
        </Link>
        <LangToggle lang={lang} className="j-pill j-pill--toggle" />
      </nav>
    </header>
  );
}

type TitleProps = {
  lang: Lang;
  hasProgress: boolean;
  onBegin: () => void;
  onRestart: () => void;
};

export function TitleOverlay({ lang, hasProgress, onBegin, onRestart }: TitleProps) {
  const copy = journey.title;

  return (
    <section className="j-title" aria-labelledby="journey-title">
      <p className="j-title__eyebrow">{copy.eyebrow[lang]}</p>
      <h1 id="journey-title" className="j-title__name">
        {displayName(lang)}
      </h1>
      <p className="j-title__role">
        {site.positioningTitle[lang]}
        <span aria-hidden> — </span>
        {resume.header.headline[lang]}
      </p>
      <div className="j-title__actions">
        <button type="button" className="j-btn j-btn--primary j-btn--lg" onClick={onBegin}>
          {hasProgress ? copy.resume[lang] : copy.begin[lang]}
        </button>
        {hasProgress ? (
          <button type="button" className="j-btn" onClick={onRestart}>
            {copy.restart[lang]}
          </button>
        ) : null}
        <Link href={localizePath(SITE_PATHS.resume, lang)} className="j-btn">
          {journey.skip.plain[lang]}
        </Link>
      </div>
      <p className="j-title__hint">{copy.hint[lang]}</p>
    </section>
  );
}

type DialogProps = {
  labelledBy: string;
  onClose: () => void;
  closeLabel: string;
  children: ReactNode;
  className?: string;
};

function Dialog({ labelledBy, onClose, closeLabel, children, className }: DialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="j-overlay" role="dialog" aria-modal="true" aria-labelledby={labelledBy} onClick={onClose}>
      <div className={`j-sheet ${className ?? ""}`} onClick={(event) => event.stopPropagation()}>
        <button ref={closeRef} type="button" className="j-icon-btn j-sheet__close" onClick={onClose} aria-label={closeLabel}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

type CharacterProps = {
  lang: Lang;
  xp: number;
  total: number;
  patchNotes: ReactNode;
  onClose: () => void;
};

export function CharacterOverlay({ lang, xp, total, patchNotes, onClose }: CharacterProps) {
  const copy = journey.character;
  const sections = copy.sections;
  const { left, header } = resume;

  const rows: { title: string; lines: string[] }[] = [
    { title: sections.education[lang], lines: [left.education.school[lang], left.education.degree[lang], `${left.education.period[lang]}, ${left.education.status[lang]}`] },
    { title: sections.military[lang], lines: [`${left.military.status[lang]}, ${left.military.period[lang]}`] },
    { title: sections.certifications[lang], lines: left.certifications.map((item) => `${item.name[lang]}, ${item.sub[lang]}`) },
    { title: sections.languages[lang], lines: [...left.languages.items.map((item) => item[lang]), left.languages.sub[lang]] },
    { title: sections.awards[lang], lines: left.awards.map((item) => `${item.name[lang]}, ${item.sub[lang]}`) },
    { title: sections.activities[lang], lines: left.activities.map((item) => `${item.period[lang]}  ${item.name[lang]}`) },
  ];

  return (
    <Dialog labelledBy="character-title" onClose={onClose} closeLabel={journey.quest.close[lang]} className="j-sheet--character">
      <p className="j-title__eyebrow">{copy.title[lang]}</p>
      <h2 id="character-title" className="j-sheet__title">
        {displayName(lang)}
      </h2>
      <p className="j-card__role">
        {header.title[lang]}, {header.headline[lang]}
      </p>

      <div className="j-sheet__xp">
        <div>
          <p className="j-metric__label">{copy.collected[lang]}</p>
          <p className="j-metric__value">
            {journey.hud.level} {levelOf(xp)} <span>{xp} XP</span>
          </p>
        </div>
        <div>
          <p className="j-metric__label">{copy.full[lang]}</p>
          <p className="j-metric__value">
            {journey.hud.level} {levelOf(total)} <span>{total} XP</span>
          </p>
        </div>
        <p className="j-muted j-sheet__explain">{copy.xpExplain[lang]}</p>
      </div>

      <h3 className="j-card__page">{sections.summary[lang]}</h3>
      {header.summary[lang].map((paragraph) => (
        <p key={paragraph} className="j-prose">
          {paragraph}
        </p>
      ))}

      <h3 className="j-card__page">{sections.skills[lang]}</h3>
      <div className="j-skills">
        {left.skillGroups[lang].map((group) => (
          <div key={group.title}>
            <p className="j-objective__title">{group.title}</p>
            <ul className="j-tags">
              {group.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <dl className="j-rows">
        {rows.map((row) => (
          <div key={row.title}>
            <dt>{row.title}</dt>
            {row.lines.map((line) => (
              <dd key={line}>{line}</dd>
            ))}
          </div>
        ))}
        <div>
          <dt>{sections.contact[lang]}</dt>
          <dd>
            <a className="j-link" href={`mailto:${header.email}`}>
              {header.email}
            </a>
          </dd>
          <dd>
            <a className="j-link" href={header.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span aria-hidden>  </span>
            <a className="j-link" href={header.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </dd>
        </div>
      </dl>

      <div className="j-patch">{patchNotes}</div>
    </Dialog>
  );
}

type EndingProps = {
  lang: Lang;
  xp: number;
  cleared: number;
  onReplay: () => void;
  onClose: () => void;
};

export function EndingOverlay({ lang, xp, cleared, onReplay, onClose }: EndingProps) {
  const copy = journey.ending;
  const { header } = resume;

  return (
    <Dialog labelledBy="ending-title" onClose={onClose} closeLabel={journey.quest.close[lang]} className="j-sheet--ending">
      <p className="j-title__eyebrow">{copy.eyebrow[lang]}</p>
      <h2 id="ending-title" className="j-sheet__title">
        {copy.title[lang]}
      </h2>
      <p className="j-prose">{copy.body[lang]}</p>
      <dl className="j-ending__stats">
        <div>
          <dt>{copy.stats.xp[lang]}</dt>
          <dd>{xp}</dd>
        </div>
        <div>
          <dt>{copy.stats.level[lang]}</dt>
          <dd>{levelOf(xp)}</dd>
        </div>
        <div>
          <dt>{copy.stats.quests[lang]}</dt>
          <dd>{cleared}</dd>
        </div>
      </dl>
      <p className="j-ending__contact">
        <a className="j-link" href={`mailto:${header.email}`}>
          {header.email}
        </a>
        <a className="j-link" href={header.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="j-link" href={header.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
      <div className="j-title__actions">
        <a href={PDF_FILES[lang]} download className="j-btn j-btn--primary">
          {journey.pdf.heading[lang]}
        </a>
        <Link href={localizePath(SITE_PATHS.resume, lang)} className="j-btn">
          {journey.skip.plain[lang]}
        </Link>
        <button type="button" className="j-btn" onClick={onReplay}>
          {copy.replay[lang]}
        </button>
      </div>
    </Dialog>
  );
}
