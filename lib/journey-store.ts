"use client";

import { useSyncExternalStore } from "react";

/**
 * The visitor's own journey: which places they cleared and where they last
 * stood. It describes the person playing, never the owner, and lives only in
 * their browser. Storage may be missing or blocked, so every access is guarded
 * and the journey still works in memory.
 */

const STORAGE_KEY = "journey-progress-v1";

export interface JourneyProgress {
  cleared: readonly string[];
  last: string | null;
}

const EMPTY: JourneyProgress = { cleared: [], last: null };

let cache: JourneyProgress | null = null;
const listeners = new Set<() => void>();

function parse(raw: string | null): JourneyProgress {
  if (!raw) return EMPTY;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return EMPTY;
    const record = data as Record<string, unknown>;
    const cleared = Array.isArray(record.cleared)
      ? record.cleared.filter((item): item is string => typeof item === "string")
      : [];
    return { cleared, last: typeof record.last === "string" ? record.last : null };
  } catch {
    return EMPTY;
  }
}

function read(): JourneyProgress {
  try {
    return parse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return EMPTY;
  }
}

function write(next: JourneyProgress): void {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Blocked storage: keep the in-memory journey for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cache = parse(event.newValue);
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): JourneyProgress {
  cache ??= read();
  return cache;
}

function getServerSnapshot(): JourneyProgress {
  return EMPTY;
}

export function useJourneyProgress(): JourneyProgress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function markCleared(placeId: string): JourneyProgress {
  const current = getSnapshot();
  const next = current.cleared.includes(placeId)
    ? { ...current, last: placeId }
    : { cleared: [...current.cleared, placeId], last: placeId };
  write(next);
  return next;
}

export function rememberPlace(placeId: string): void {
  const current = getSnapshot();
  if (current.last === placeId) return;
  write({ ...current, last: placeId });
}

export function resetJourney(): void {
  write(EMPTY);
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
