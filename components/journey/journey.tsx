"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import {
  cameraTransform,
  OVERVIEW_GLIDE_MS,
  overviewCamera,
  placeCamera,
  walkDuration,
  type Viewport,
} from "@/components/journey/camera";
import { ClearOverlay, type ClearInfo } from "@/components/journey/clear-overlay";
import { iso, placeCenter, standPixel, type Vec2 } from "@/components/journey/geometry";
import { CharacterOverlay, EndingOverlay, JourneyHud, TitleOverlay } from "@/components/journey/panels";
import { pagesFor, QuestCard } from "@/components/journey/quest-card";
import { Traveler } from "@/components/journey/traveler";
import { World } from "@/components/journey/world";
import { journey } from "@/content/journey";
import type { Lang } from "@/content/types";
import { SITE_PATHS, type PlaceView } from "@/lib/journey";
import { localizePath } from "@/lib/paths";
import { markCleared, prefersReducedMotion, rememberPlace, resetJourney, useJourneyProgress } from "@/lib/journey-store";

type Phase = "title" | "travel" | "clear" | "ending";

type JourneyProps = {
  lang: Lang;
  places: PlaceView[];
  totalMonths: number;
  /** Server-rendered correction history, shown in the character sheet. */
  patchNotes: ReactNode;
};

/** The long 2022 to 2024 gap (military checkpoint to Lingora) is crossed on a sliding bridge. */
const BRIDGE_AFTER_ID = "military";
const SWIPE_MIN_PX = 44;
const HINT_MS = 2400;
const FALLBACK_VIEW: Viewport = { width: 390, height: 844 };

function xpOf(places: PlaceView[], cleared: readonly string[]): number {
  return places.filter((place) => cleared.includes(place.id)).reduce((sum, place) => sum + place.months, 0);
}

/** First place the visitor has not cleared yet: the furthest they can walk to. */
function frontier(places: PlaceView[], cleared: readonly string[]): number {
  const index = places.findIndex((place) => !cleared.includes(place.id));
  return index === -1 ? places.length - 1 : index;
}

function waypoints(from: number, to: number): Vec2[] {
  const step = to > from ? 1 : -1;
  const path: Vec2[] = [];
  for (let i = from; i !== to + step; i += step) path.push(standPixel(i));
  return path;
}

function placeLabel(place: PlaceView, total: number, lang: Lang, state: string): string {
  const kind = place.kind === "checkpoint" ? journey.places.checkpoint[lang] : `${journey.places.stage[lang]} ${place.index + 1} / ${total}`;
  return `${kind}: ${place.company}, ${place.role}, ${place.period}${state ? `, ${state}` : ""}`;
}

export function Journey({ lang, places, totalMonths, patchNotes }: JourneyProps) {
  const progress = useJourneyProgress();
  const [phase, setPhase] = useState<Phase>("title");
  const [current, setCurrent] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [characterOpen, setCharacterOpen] = useState(false);
  const [clearInfo, setClearInfo] = useState<ClearInfo | null>(null);
  const [view, setView] = useState<Viewport | null>(null);
  const [glideMs, setGlideMs] = useState(0);
  const [travelerAt, setTravelerAt] = useState<Vec2>(() => standPixel(0));
  const [walking, setWalking] = useState(false);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [hint, setHint] = useState<string | null>(null);
  const [nextPulse, setNextPulse] = useState<number | null>(null);

  const sceneRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<SVGGElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const walkRef = useRef<Animation | null>(null);
  const arriveTimer = useRef(0);
  const hintTimer = useRef(0);
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const cleared = progress.cleared;
  const xp = xpOf(places, cleared);
  const reach = frontier(places, cleared);
  const bridgeSegment = places.findIndex((place) => place.id === BRIDGE_AFTER_ID);
  const builtUpTo = places.reduce((last, place, index) => (cleared.includes(place.id) && index === last + 1 ? index : last), -1);
  const place = places[current];

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const measure = () => setView({ width: scene.clientWidth, height: scene.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    walkRef.current?.cancel();
    walkRef.current = null;
  }, [travelerAt]);

  useEffect(
    () => () => {
      window.clearTimeout(arriveTimer.current);
      window.clearTimeout(hintTimer.current);
    },
    [],
  );

  const camera = useMemo(() => {
    const viewport = view ?? FALLBACK_VIEW;
    if (phase === "title") return overviewCamera(places.length, viewport);
    const peeking = phase === "travel" && !cardOpen && arrived && nextPulse === current + 1;
    return placeCamera(peeking ? current + 0.5 : current, viewport);
  }, [phase, current, view, places.length, cardOpen, arrived, nextPulse]);

  const showHint = useCallback((message: string) => {
    window.clearTimeout(hintTimer.current);
    setHint(message);
    hintTimer.current = window.setTimeout(() => setHint(null), HINT_MS);
  }, []);

  const arrive = useCallback(
    (index: number) => {
      setArrived(true);
      setCardOpen(true);
      setPage(0);
      rememberPlace(places[index].id);
      setNextPulse((pulse) => (pulse === index ? null : pulse));
      requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
    },
    [places],
  );

  const travelTo = useCallback(
    async (target: number) => {
      if (phase !== "travel" || target < 0 || target >= places.length) return;
      if (target === current) {
        if (arrived && !cardOpen) arrive(current);
        return;
      }
      if (target > reach) {
        showHint(journey.places.lockedHint[lang]);
        return;
      }

      walkRef.current?.finish();
      window.clearTimeout(arriveTimer.current);
      const path = waypoints(current, target);
      const reduced = prefersReducedMotion();
      const duration = reduced ? 0 : walkDuration(path);

      setCardOpen(false);
      setArrived(false);
      setFacing(target > current ? "right" : "left");
      setGlideMs(duration);
      setCurrent(target);

      const node = travelerRef.current;
      if (node && duration > 0) {
        let length = 0;
        const lengths = path.map((point, i) => (i === 0 ? 0 : (length += Math.hypot(point.x - path[i - 1].x, point.y - path[i - 1].y))));
        const frames = path.map((point, i) => ({
          transform: `translate(${point.x}px, ${point.y}px)`,
          offset: length > 0 ? lengths[i] / length : i / Math.max(path.length - 1, 1),
        }));
        setWalking(true);
        const animation = node.animate(frames, { duration, easing: "linear", fill: "forwards" });
        walkRef.current = animation;
        try {
          await animation.finished;
        } catch {
          // Cancelled by a newer trip; that trip takes over.
          return;
        }
        setWalking(false);
      }
      setTravelerAt(path[path.length - 1]);
      arrive(target);
    },
    [phase, places.length, current, reach, arrived, cardOpen, arrive, showHint, lang],
  );

  const begin = useCallback(
    (index: number) => {
      const reduced = prefersReducedMotion();
      setPhase("travel");
      setCurrent(index);
      setTravelerAt(standPixel(index));
      setGlideMs(reduced ? 0 : OVERVIEW_GLIDE_MS);
      setArrived(false);
      window.clearTimeout(arriveTimer.current);
      arriveTimer.current = window.setTimeout(() => arrive(index), reduced ? 0 : OVERVIEW_GLIDE_MS);
    },
    [arrive],
  );

  const resumeIndex = Math.min(
    Math.max(places.findIndex((item) => item.id === progress.last), 0),
    reach,
  );

  const complete = useCallback(() => {
    const alreadyCleared = cleared.includes(place.id);
    setCardOpen(false);
    if (alreadyCleared) {
      if (current < places.length - 1) {
        setGlideMs(prefersReducedMotion() ? 0 : 900);
        setNextPulse(current + 1);
      }
      return;
    }
    const before = xpOf(places, cleared);
    const next = markCleared(place.id);
    setClearInfo({
      placeId: place.id,
      company: place.company,
      checkpoint: place.kind === "checkpoint",
      gained: place.months,
      before,
      after: xpOf(places, next.cleared),
      total: totalMonths,
      trophies: place.trophies,
    });
    setPhase("clear");
  }, [cleared, place, current, places, totalMonths]);

  const continueAfterClear = useCallback(() => {
    setClearInfo(null);
    if (current >= places.length - 1) {
      setPhase("ending");
      return;
    }
    setGlideMs(prefersReducedMotion() ? 0 : 900);
    setPhase("travel");
    setNextPulse(current + 1);
  }, [current, places.length]);

  const goHome = useCallback(() => {
    walkRef.current?.finish();
    setCardOpen(false);
    setGlideMs(prefersReducedMotion() ? 0 : OVERVIEW_GLIDE_MS);
    setPhase("title");
  }, []);

  const replay = useCallback(() => {
    resetJourney();
    setPhase("title");
    setCurrent(0);
    setTravelerAt(standPixel(0));
    setNextPulse(null);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || characterOpen || phase === "clear" || phase === "ending") return;
      const inCard = (event.target as HTMLElement | null)?.closest?.(".j-card");
      if (phase === "title") return;

      if (event.key === "Escape" && cardOpen) {
        setCardOpen(false);
        return;
      }
      if (inCard && cardOpen) {
        const count = pagesFor(place).length;
        if (event.key === "ArrowRight" && page < count - 1) setPage(page + 1);
        else if (event.key === "ArrowLeft" && page > 0) setPage(page - 1);
        return;
      }
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        void travelTo(current + 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        void travelTo(current - 1);
      } else if ((event.key === "Enter" || event.key === " ") && !cardOpen && arrived && (event.target as HTMLElement | null) === document.body) {
        event.preventDefault();
        arrive(current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, cardOpen, characterOpen, place, page, current, arrived, travelTo, arrive]);

  const onPointerDown = (event: ReactPointerEvent) => {
    swipe.current = { x: event.clientX, y: event.clientY, moved: false };
  };
  const onPointerUp = (event: ReactPointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || phase !== "travel") return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.3) {
      if (walkRef.current) walkRef.current.finish();
      return;
    }
    start.moved = true;
    void travelTo(current + (dx < 0 ? 1 : -1));
  };

  const sky = phase === "title" ? places[0].sky : place.sky;
  const night = phase !== "title" && place.landmark === "beacon";

  return (
    <div className="journey" data-phase={phase} data-ready={view ? true : undefined} data-night={night || undefined}>
      <nav aria-label={journey.skip.plain[lang]}>
        <a className="j-skip" href={localizePath(SITE_PATHS.resume, lang)}>
          {journey.skip.toContent[lang]}
        </a>
      </nav>

      <div
        ref={sceneRef}
        className="j-scene"
        style={{ "--sky-top": sky[0], "--sky-bottom": sky[1] } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className="j-stars" aria-hidden />
        <div className="j-clouds" aria-hidden style={{ transform: `translate3d(${(camera.x * 0.18).toFixed(1)}px, 0, 0)`, transitionDuration: `${glideMs}ms` }}>
          <span />
          <span />
          <span />
        </div>
        <div className="j-camera" style={{ transform: cameraTransform(camera), transitionDuration: `${glideMs}ms` }}>
          <World
            places={places}
            builtUpTo={builtUpTo}
            openIndex={arrived && phase !== "title" ? current : null}
            bridgeSegment={bridgeSegment}
          >
            <Traveler ref={travelerRef} at={travelerAt} walking={walking} facing={facing} visible={phase !== "title"} />
          </World>

          <nav aria-label={journey.places.listLabel[lang]} className="j-places">
            {places.map((item, index) => {
              const grid = placeCenter(index);
              const center = iso(grid.gx, grid.gy, 0.9);
              const isCleared = cleared.includes(item.id);
              const locked = index > reach;
              const state = locked ? journey.places.locked[lang] : isCleared ? journey.places.cleared[lang] : index === current && phase !== "title" ? journey.places.here[lang] : "";
              return (
                <button
                  key={item.id}
                  type="button"
                  className="j-place"
                  style={{ left: center.x, top: center.y }}
                  data-locked={locked || undefined}
                  data-cleared={isCleared || undefined}
                  data-current={(index === current && phase !== "title") || undefined}
                  data-next={nextPulse === index || undefined}
                  aria-label={placeLabel(item, places.length, lang, state)}
                  aria-current={index === current && phase !== "title" ? "location" : undefined}
                  disabled={phase === "title"}
                  onClick={() => {
                    if (swipe.current?.moved) return;
                    void travelTo(index);
                  }}
                >
                  <span className="j-place__tag" aria-hidden>
                    <span className="j-place__year">{item.year}</span>
                    <span className="j-place__name">{item.company}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <JourneyHud lang={lang} xp={xp} total={totalMonths} onHome={goHome} onCharacter={() => setCharacterOpen(true)} />

      {phase === "title" ? (
        <TitleOverlay
          lang={lang}
          hasProgress={cleared.length > 0}
          onBegin={() => begin(cleared.length > 0 ? resumeIndex : 0)}
          onRestart={() => {
            resetJourney();
            begin(0);
          }}
        />
      ) : null}

      {phase === "travel" && cardOpen ? (
        <QuestCard
          lang={lang}
          place={place}
          total={places.length}
          page={page}
          cleared={cleared.includes(place.id)}
          headingRef={headingRef}
          onPage={(next) => setPage(Math.min(Math.max(next, 0), pagesFor(place).length - 1))}
          onComplete={complete}
          onClose={() => setCardOpen(false)}
        />
      ) : null}

      {phase === "travel" && !cardOpen && arrived ? (
        <button type="button" className="j-reopen" onClick={() => arrive(current)}>
          {place.company} <span aria-hidden>▴</span>
        </button>
      ) : null}

      <p className="j-hint" role="status" aria-live="polite">
        {hint ?? ""}
      </p>

      {phase === "clear" && clearInfo ? <ClearOverlay lang={lang} info={clearInfo} onContinue={continueAfterClear} /> : null}

      {phase === "ending" ? (
        <EndingOverlay
          lang={lang}
          xp={xp}
          cleared={places.filter((item) => item.kind === "stage" && cleared.includes(item.id)).length}
          onReplay={replay}
          onClose={() => setPhase("travel")}
        />
      ) : null}

      {characterOpen ? (
        <CharacterOverlay lang={lang} xp={xp} total={totalMonths} patchNotes={patchNotes} onClose={() => setCharacterOpen(false)} />
      ) : null}
    </div>
  );
}
