"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import { PlayerSprite } from "@/components/game/pixel-art";
import type { StageView } from "@/lib/game";
import {
  getRunProgress,
  markStage,
  onGotoStage,
  prefersReducedMotion,
  showToast,
  useRunProgress,
} from "@/lib/run-progress";

export interface WorldMapCopy {
  boardLabel: string;
  stage: string;
  checkpoint: string;
  of: string;
  status: { current: string; cleared: string; acquired: string; passed: string };
  fields: { period: string; time: string; log: string; gear: string };
  enterQuest: string;
  prev: string;
  next: string;
  keyHint: string;
  stageFound: string;
  allExplored: string;
}

type WorldMapProps = {
  stages: StageView[];
  copy: WorldMapCopy;
};

/** Node heights (% of the board) — a gentle up-and-down trail, never a straight line. */
const WAVE = [62, 36, 58, 32, 60, 38, 50];
const EDGE_PCT = 7;
const WALK_MS = 420;
const IN_VIEW_RATIO = 0.35;
const PANEL_ID = "stage-panel";

interface Point {
  x: number;
  y: number;
}

function nodePoint(index: number, count: number): Point {
  const span = 100 - EDGE_PCT * 2;
  const x = count > 1 ? EDGE_PCT + (index * span) / (count - 1) : 50;
  return { x, y: WAVE[index % WAVE.length] };
}

/** Orthogonal steps between nodes, like a path drawn on graph paper. */
function trailPath(points: Point[]): string {
  return points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      const prev = points[index - 1];
      const mid = (prev.x + point.x) / 2;
      return `H ${mid} V ${point.y} H ${point.x}`;
    })
    .join(" ");
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function stageLabel(stage: StageView, copy: WorldMapCopy): string {
  return stage.kind === "checkpoint" ? copy.checkpoint : `${copy.stage} ${pad(stage.position)}`;
}

export function WorldMap({ stages, copy }: WorldMapProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [walking, setWalking] = useState(false);
  const indexRef = useRef(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const explored = useRunProgress().stages;

  const points = stages.map((_, i) => nodePoint(i, stages.length));
  const stage = stages[index];

  const record = useCallback(
    (target: StageView) => {
      if (!markStage(target.id)) return;
      const explored = getRunProgress().stages;
      const done = stages.every((item) => explored.includes(item.id));
      showToast(done ? copy.allExplored : `${copy.stageFound}: ${target.mapLabel}`);
    },
    [copy.allExplored, copy.stageFound, stages],
  );

  const select = useCallback(
    (next: number, { focus = false } = {}) => {
      const clamped = Math.min(Math.max(next, 0), stages.length - 1);
      indexRef.current = clamped;
      setIndex(clamped);
      record(stages[clamped]);
      if (focus) tabRefs.current[clamped]?.focus();
    },
    [record, stages],
  );

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("stage");
    const found = stages.findIndex((item) => item.id === wanted);
    if (found >= 0) select(found);
  }, [select, stages]);

  useEffect(
    () =>
      onGotoStage((id) => {
        const found = stages.findIndex((item) => item.id === id);
        if (found >= 0) select(found, { focus: true });
      }),
    [select, stages],
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    setWalking(true);
    const timer = window.setTimeout(() => setWalking(false), WALK_MS);
    return () => window.clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.intersectionRatio >= IN_VIEW_RATIO;
      },
      { threshold: [0, IN_VIEW_RATIO, 1] },
    );
    observer.observe(board);

    const onGlobalKey = (event: globalThis.KeyboardEvent) => {
      const idle = document.activeElement === document.body || document.activeElement === null;
      if (!idle || !inView || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      select(indexRef.current + (event.key === "ArrowRight" ? 1 : -1), { focus: true });
    };

    window.addEventListener("keydown", onGlobalKey);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onGlobalKey);
    };
  }, [select]);

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: stages.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key], { focus: true });
      return;
    }
    if (event.key === "Enter" && stage.questHref) {
      event.preventDefault();
      router.push(stage.questHref);
    }
  };

  const tokenStyle = {
    left: `${points[index].x}%`,
    top: `${points[index].y}%`,
  } as CSSProperties;

  return (
    <div className="g-map">
      <div ref={boardRef} className="g-board g-frame g-dotgrid">
        <svg aria-hidden className="g-board__trail" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={trailPath(points)} className="g-board__path" />
          <path d={trailPath(points.slice(0, index + 1))} className="g-board__path g-board__path--done" />
        </svg>

        <div role="tablist" aria-label={copy.boardLabel} className="g-board__nodes">
          {stages.map((item, i) => {
            const selected = i === index;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                id={`stage-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={PANEL_ID}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onTabKey}
                className="g-node"
                data-kind={item.kind}
                data-current={item.current || undefined}
                data-explored={explored.includes(item.id) || undefined}
                data-acquired={item.acquired || undefined}
                data-label-pos={points[i].y < 50 ? "below" : "above"}
                style={{ left: `${points[i].x}%`, top: `${points[i].y}%` } as CSSProperties}
              >
                <span aria-hidden className="g-node__block" />
                <span className="g-node__label">
                  <span className="g-pixel g-node__year">{item.year}</span>
                  <span className="g-node__name">{item.mapLabel}</span>
                </span>
                <span className="sr-only">
                  {`${stageLabel(item, copy)}, ${item.position} ${copy.of} ${stages.length}`}
                </span>
              </button>
            );
          })}
        </div>

        <div aria-hidden className="g-token" data-walking={walking || undefined} style={tokenStyle}>
          <PlayerSprite className="g-token__sprite" />
        </div>
      </div>

      <p className="g-map__hint g-hint--keys">{copy.keyHint}</p>

      <StagePanel
        stage={stage}
        copy={copy}
        onPrev={() => select(index - 1)}
        onNext={() => select(index + 1)}
        isFirst={index === 0}
        isLast={index === stages.length - 1}
      />
    </div>
  );
}

type StagePanelProps = {
  stage: StageView;
  copy: WorldMapCopy;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
};

function StagePanel({ stage, copy, onPrev, onNext, isFirst, isLast }: StagePanelProps) {
  const status = stage.current
    ? { text: copy.status.current, tone: "accent" }
    : stage.kind === "checkpoint"
      ? { text: copy.status.passed, tone: "plain" }
      : { text: copy.status.cleared, tone: "plain" };

  return (
    <div
      id={PANEL_ID}
      role="tabpanel"
      aria-labelledby={`stage-tab-${stage.id}`}
      tabIndex={0}
      className="g-stage g-frame"
      data-kind={stage.kind}
    >
      <div className="g-stage__side">
        <p className="g-stage__top">
          <span className="g-pixel g-stage__num">{stageLabel(stage, copy)}</span>
          <span className={`g-chip g-chip--${status.tone}`}>{status.text}</span>
          {stage.acquired ? <span className="g-chip g-chip--accent">{copy.status.acquired}</span> : null}
        </p>
        <h3 className="g-stage__company">{stage.company}</h3>
        <p className="g-stage__role">{stage.role}</p>
        {stage.title ? <p className="g-stage__title">{stage.title}</p> : null}

        <dl className="g-stage__meta">
          <div>
            <dt className="g-pixel">{copy.fields.period}</dt>
            <dd>{stage.period}</dd>
          </div>
          {stage.duration ? (
            <div>
              <dt className="g-pixel">{copy.fields.time}</dt>
              <dd>{stage.duration}</dd>
            </div>
          ) : null}
        </dl>

        <div className="g-stage__actions">
          <button type="button" onClick={onPrev} disabled={isFirst} className="g-btn g-btn--sm" aria-label={copy.prev}>
            ◀
          </button>
          <button type="button" onClick={onNext} disabled={isLast} className="g-btn g-btn--sm" aria-label={copy.next}>
            ▶
          </button>
          {stage.questHref ? (
            <Link href={stage.questHref} className="g-btn g-btn--primary">
              {copy.enterQuest} <span aria-hidden>▶</span>
            </Link>
          ) : null}
        </div>
      </div>

      {stage.bullets.length > 0 || stage.tags.length > 0 ? (
        <div className="g-stage__body">
          {stage.bullets.length > 0 ? (
            <>
              <h4 className="g-pixel g-label">{copy.fields.log}</h4>
              <ul className="g-list">
                {stage.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </>
          ) : null}
          {stage.tags.length > 0 ? (
            <>
              <h4 className="g-pixel g-label g-stage__gear">{copy.fields.gear}</h4>
              <ul className="g-tags">
                {stage.tags.map((tag) => (
                  <li key={tag} className="g-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
