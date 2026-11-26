import { focusPoint, worldSize, type Vec2 } from "@/components/journey/geometry";

/** Above this width the quest card is a side panel instead of a bottom sheet. */
export const WIDE_MIN = 900;
export const PANEL_WIDTH = 440;

/** World pixels per millisecond while walking; long trips speed up so none blocks for long. */
const WALK_SPEED = 0.26;
const WALK_MIN_MS = 520;
const WALK_MAX_MS = 1800;
export const OVERVIEW_GLIDE_MS = 1200;

export interface Viewport {
  width: number;
  height: number;
}

export interface CameraState {
  x: number;
  y: number;
  scale: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isWide(view: Viewport): boolean {
  return view.width >= WIDE_MIN;
}

/**
 * Camera that centers a place in the free part of the screen (outside the
 * quest card). A fractional index looks between two places, used to show a
 * freshly built path together with the place it leads to.
 */
export function placeCamera(index: number, view: Viewport): CameraState {
  const wide = isWide(view);
  const scale = wide
    ? clamp(Math.min((view.width - PANEL_WIDTH) / 760, view.height / 660), 0.9, 1.2)
    : clamp(Math.min(view.width / 400, (view.height * 0.5) / 300), 0.72, 1.2);
  const focus = { x: wide ? (view.width - PANEL_WIDTH) / 2 : view.width / 2, y: wide ? view.height * 0.5 : view.height * 0.3 };
  const base = Math.floor(index);
  const t = index - base;
  const a = focusPoint(base);
  const b = t > 0 ? focusPoint(base + 1) : a;
  const target = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  const lift = !wide && t > 0 ? view.height * 0.16 : 0;
  return { x: focus.x - target.x * scale, y: focus.y + lift - target.y * scale, scale };
}

/** Whole world, small, in the lower part of the screen under the title. */
export function overviewCamera(placeCount: number, view: Viewport): CameraState {
  const { width, height } = worldSize(placeCount);
  const wide = isWide(view);
  const scale = Math.min((view.width * (wide ? 0.86 : 0.98)) / width, (view.height * 0.42) / (height * 0.7));
  const centerY = view.height * (wide ? 0.68 : 0.6);
  return { x: (view.width - width * scale) / 2, y: centerY - (height / 2) * scale, scale };
}

export function cameraTransform(camera: CameraState): string {
  return `translate3d(${camera.x.toFixed(1)}px, ${camera.y.toFixed(1)}px, 0) scale(${camera.scale.toFixed(4)})`;
}

export function walkDuration(path: Vec2[]): number {
  let total = 0;
  for (let i = 1; i < path.length; i += 1) {
    total += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
  }
  return clamp(total / WALK_SPEED, WALK_MIN_MS, WALK_MAX_MS);
}
