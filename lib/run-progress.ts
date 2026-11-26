"use client";

import { useSyncExternalStore } from "react";

/**
 * The visitor's own run: which stages they opened and which quests they read.
 * This is about the person playing, never about the owner, and it lives only
 * in their browser. Storage can be missing or blocked, so every access is
 * guarded and the game still works with an in-memory run.
 */

const STORAGE_KEY = "run-progress-v1";
const TOAST_EVENT = "run:toast";
const GOTO_EVENT = "run:goto-stage";

export interface RunProgress {
  stages: readonly string[];
  quests: readonly string[];
  lastStage: string | null;
}

const EMPTY: RunProgress = { stages: [], quests: [], lastStage: null };

let cache: RunProgress | null = null;
const listeners = new Set<() => void>();

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function parse(raw: string | null): RunProgress {
  if (!raw) return EMPTY;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return EMPTY;
    const record = data as Record<string, unknown>;
    return {
      stages: isStringArray(record.stages) ? record.stages : [],
      quests: isStringArray(record.quests) ? record.quests : [],
      lastStage: typeof record.lastStage === "string" ? record.lastStage : null,
    };
  } catch {
    return EMPTY;
  }
}

function read(): RunProgress {
  try {
    return parse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return EMPTY;
  }
}

function write(next: RunProgress): void {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Blocked storage: keep the in-memory run for this visit.
  }
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY) return;
  cache = parse(event.newValue);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): RunProgress {
  cache ??= read();
  return cache;
}

function getServerSnapshot(): RunProgress {
  return EMPTY;
}

export function getRunProgress(): RunProgress {
  return getSnapshot();
}

export function useRunProgress(): RunProgress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Returns true the first time this stage is opened. */
export function markStage(stageId: string): boolean {
  const current = getSnapshot();
  const isNew = !current.stages.includes(stageId);
  write({
    ...current,
    stages: isNew ? [...current.stages, stageId] : current.stages,
    lastStage: stageId,
  });
  return isNew;
}

export function markQuest(slug: string): boolean {
  const current = getSnapshot();
  if (current.quests.includes(slug)) return false;
  write({ ...current, quests: [...current.quests, slug] });
  return true;
}

export function resetProgress(): void {
  write(EMPTY);
}

export function showToast(message: string): void {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

export function onToast(handler: (message: string) => void): () => void {
  const listener = (event: Event) => {
    const { detail } = event as CustomEvent<unknown>;
    if (typeof detail === "string") handler(detail);
  };
  window.addEventListener(TOAST_EVENT, listener);
  return () => window.removeEventListener(TOAST_EVENT, listener);
}

/** Lets the title menu drive the map without the two sharing React state. */
export function gotoStage(stageId: string): void {
  window.dispatchEvent(new CustomEvent<string>(GOTO_EVENT, { detail: stageId }));
}

export function onGotoStage(handler: (stageId: string) => void): () => void {
  const listener = (event: Event) => {
    const { detail } = event as CustomEvent<unknown>;
    if (typeof detail === "string") handler(detail);
  };
  window.addEventListener(GOTO_EVENT, listener);
  return () => window.removeEventListener(GOTO_EVENT, listener);
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
