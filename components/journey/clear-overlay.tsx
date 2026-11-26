"use client";

import { useEffect, useRef, useState } from "react";

import { journey } from "@/content/journey";
import type { Lang } from "@/content/types";
import { prefersReducedMotion } from "@/lib/journey-store";
import { MONTHS_PER_LEVEL } from "@/lib/journey";

export interface ClearInfo {
  placeId: string;
  company: string;
  checkpoint: boolean;
  gained: number;
  before: number;
  after: number;
  total: number;
  trophies: { title: string; sub: string }[];
}

type ClearOverlayProps = {
  lang: Lang;
  info: ClearInfo;
  onContinue: () => void;
};

const COUNT_DELAY_MS = 450;
const COUNT_MS = 800;

function level(xp: number): number {
  return Math.floor(xp / MONTHS_PER_LEVEL);
}

/**
 * QUEST CLEAR: title drops in, XP counts up and fills the bar, trophies pop,
 * and LEVEL UP flashes when a full year was crossed. About two seconds; a tap
 * anywhere shows the final state at once, and Continue is live from the start.
 */
export function ClearOverlay({ lang, info, onContinue }: ClearOverlayProps) {
  const copy = journey.clear;
  const [skipped, setSkipped] = useState(false);
  const [shown, setShown] = useState(info.before);
  const continueRef = useRef<HTMLButtonElement>(null);
  const levelBefore = level(info.before);
  const levelAfter = level(info.after);
  const leveledUp = levelAfter > levelBefore;

  useEffect(() => {
    continueRef.current?.focus({ preventScroll: true });
    if (prefersReducedMotion()) {
      setSkipped(true);
      return;
    }
    let frame = 0;
    const start = performance.now() + COUNT_DELAY_MS;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / COUNT_MS, 0), 1);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(info.before + (info.after - info.before) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [info.before, info.after]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onContinue();
      } else if (!skipped && event.key !== "Tab" && event.key !== "Enter" && event.key !== " ") {
        setSkipped(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onContinue, skipped]);

  const xp = skipped ? info.after : shown;
  const fill = info.total > 0 ? (xp / info.total) * 100 : 0;

  return (
    <div
      className="j-overlay j-clear"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-title"
      data-skipped={skipped || undefined}
      onClick={() => setSkipped(true)}
    >
      <div className="j-clear__panel">
        <p className="j-clear__place">{info.company}</p>
        <h2 id="clear-title" className="j-clear__title" aria-label={info.checkpoint ? copy.checkpoint : copy.title}>
          {[...(info.checkpoint ? copy.checkpoint : copy.title)].map((char, index) => (
            <span key={index} aria-hidden style={{ animationDelay: `${index * 38}ms` }}>
              {char === " " ? " " : char}
            </span>
          ))}
        </h2>

        {info.gained > 0 ? (
          <div className="j-clear__xp">
            <p className="j-clear__gain">
              +{info.gained} <span>XP</span>
            </p>
            <p className="j-clear__note">{copy.xpNote[lang]}</p>
            <div className="j-xpbar" aria-hidden>
              <span className="j-xpbar__fill" style={{ width: `${fill}%` }} />
            </div>
            <p className="j-clear__totals">
              <span>
                {journey.hud.level} {level(xp)}
              </span>
              <span>
                {xp} / {info.total} XP
              </span>
            </p>
          </div>
        ) : null}

        {leveledUp ? (
          <div className="j-levelup">
            <p className="j-levelup__label">{copy.levelUp}</p>
            <p className="j-levelup__value">
              {journey.hud.level} {levelAfter}
            </p>
            <p className="j-levelup__note">
              {lang === "ko" ? `${levelAfter}${copy.yearsSuffix[lang]}` : `${levelAfter} ${copy.yearsSuffix[lang]}`}. {copy.levelNote[lang]}
            </p>
          </div>
        ) : null}

        {info.trophies.length > 0 ? (
          <div className="j-clear__trophies">
            <p className="j-clear__note">{copy.trophies[lang]}</p>
            <ul>
              {info.trophies.map((trophy, index) => (
                <li key={trophy.title} className="j-trophy" style={{ animationDelay: `${1150 + index * 170}ms` }}>
                  <span aria-hidden className="j-trophy__mark">
                    ✦
                  </span>
                  <span>
                    <strong>{trophy.title}</strong>
                    <small>{trophy.sub}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <button
          ref={continueRef}
          type="button"
          className="j-btn j-btn--primary j-clear__continue"
          onClick={(event) => {
            event.stopPropagation();
            onContinue();
          }}
        >
          {copy.continue[lang]} ▸
        </button>
        <p className="j-clear__skip" aria-hidden>
          {copy.skipHint[lang]}
        </p>
      </div>
    </div>
  );
}
