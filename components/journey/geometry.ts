/**
 * Isometric world geometry. Grid units (gx, gy, gz) project to world pixels
 * with a 2:1 tile. Places sit seven cells apart and the path alternates
 * between +gx (down-right on screen) and -gy (up-right), so the journey
 * reads left to right and gently zigzags.
 */

export const TILE_W = 64;
export const TILE_H = 32;
export const HEIGHT_UNIT = 16;
export const PLACE_SPACING = 7;

export type Vec2 = { x: number; y: number };
export type GridPoint = { gx: number; gy: number };

/** World-pixel offset so every coordinate inside the SVG is positive. */
export const ORIGIN: Vec2 = { x: 170, y: 250 };

export function iso(gx: number, gy: number, gz = 0): Vec2 {
  return {
    x: (gx - gy) * (TILE_W / 2) + ORIGIN.x,
    y: (gx + gy) * (TILE_H / 2) - gz * HEIGHT_UNIT + ORIGIN.y,
  };
}

export function points(list: Vec2[]): string {
  return list.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

export function placeCenter(index: number): GridPoint {
  const step = Math.floor(index / 2);
  const gx = (step + (index % 2)) * PLACE_SPACING;
  const gy = -step * PLACE_SPACING;
  return { gx, gy };
}

/** Segment i joins place i and i+1. Even segments run along +gx, odd ones along -gy. */
export function segmentAxis(index: number): "x" | "y" {
  return index % 2 === 0 ? "x" : "y";
}

/** The traveler stands on the front corner cell, which both path lines pass through. */
export function standPoint(index: number): GridPoint {
  const { gx, gy } = placeCenter(index);
  return { gx: gx + 1, gy: gy + 1 };
}

/** Path cells between place i and i+1, in walking order. */
export function segmentCells(index: number): GridPoint[] {
  const { gx, gy } = placeCenter(index);
  const cells: GridPoint[] = [];
  for (let step = 2; step <= PLACE_SPACING - 2; step += 1) {
    cells.push(segmentAxis(index) === "x" ? { gx: gx + step, gy: gy + 1 } : { gx: gx + 1, gy: gy - step });
  }
  return cells;
}

export function worldSize(placeCount: number): { width: number; height: number } {
  const last = placeCenter(placeCount - 1);
  const right = iso(last.gx + 2, last.gy - 2).x;
  return { width: Math.ceil(right + 140), height: 500 };
}

/** Where the camera looks for a place: a little above the island so the landmark fits. */
export function focusPoint(index: number): Vec2 {
  const { gx, gy } = placeCenter(index);
  return iso(gx, gy, 1.4);
}

export function standPixel(index: number): Vec2 {
  const { gx, gy } = standPoint(index);
  return iso(gx, gy, 0);
}

export function distance(a: Vec2, b: Vec2): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}
