import type { ReactNode } from "react";

import { iso, points } from "@/components/journey/geometry";

export type Shade = { top: string; left: string; right: string };

type PrismProps = {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  shade: Shade;
  className?: string;
  children?: ReactNode;
};

/**
 * An axis-aligned box in grid units. Only the three faces a viewer can see
 * are drawn: top, the +gy face (screen left) and the +gx face (screen right).
 * Light comes from the upper left, so the right face is the darkest.
 */
export function Prism({ x, y, z = 0, w, d, h, shade, className, children }: PrismProps) {
  const top = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const left = [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)];
  const right = [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)];

  return (
    <g className={className}>
      <polygon points={points(left)} fill={shade.left} />
      <polygon points={points(right)} fill={shade.right} />
      <polygon points={points(top)} fill={shade.top} />
      {children}
    </g>
  );
}

/** A flat quad on the +gy face (screen left) of a box, e.g. a door or window. */
export function LeftFacePanel({
  x0,
  x1,
  y,
  z0,
  z1,
  fill,
  className,
}: {
  x0: number;
  x1: number;
  y: number;
  z0: number;
  z1: number;
  fill: string;
  className?: string;
}) {
  return <polygon className={className} points={points([iso(x0, y, z1), iso(x1, y, z1), iso(x1, y, z0), iso(x0, y, z0)])} fill={fill} />;
}

/** A flat quad on the +gx face (screen right) of a box. */
export function RightFacePanel({
  x,
  y0,
  y1,
  z0,
  z1,
  fill,
  className,
}: {
  x: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
  fill: string;
  className?: string;
}) {
  return <polygon className={className} points={points([iso(x, y0, z1), iso(x, y1, z1), iso(x, y1, z0), iso(x, y0, z0)])} fill={fill} />;
}

export const SHADES = {
  grass: { top: "#b9c6a5", left: "#d8cdb4", right: "#c1b292" },
  rock: { top: "#b2a386", left: "#a39478", right: "#8c7e65" },
  rockDeep: { top: "#9c8e74", left: "#8d8068", right: "#776b56" },
  tile: { top: "#eee6d5", left: "#d3c7ae", right: "#bcae92" },
  wall: { top: "#f5efe4", left: "#e6dccb", right: "#cdbfa6" },
  roof: { top: "#c98466", left: "#b06c50", right: "#97583f" },
  slate: { top: "#9fb0b8", left: "#8197a1", right: "#6b808a" },
  stone: { top: "#ddd6c8", left: "#c7bfae", right: "#aca391" },
  bookA: { top: "#e7dcc5", left: "#7f9a92", right: "#67817a" },
  bookB: { top: "#efe4cf", left: "#c07a5a", right: "#a46448" },
  bookC: { top: "#f2e8d3", left: "#d6a64e", right: "#b98b3c" },
  bookD: { top: "#ece1cb", left: "#6f7c95", right: "#5b677e" },
  tower: { top: "#f1ebe0", left: "#e2d8c6", right: "#c8b99e" },
  wood: { top: "#c9a77c", left: "#a9875e", right: "#8f7049" },
} satisfies Record<string, Shade>;

export const ACCENT = "#f2b134";
export const ACCENT_SOFT = "#ffd98a";
export const INTERIOR = "#3a3328";
export const INK = "#2b2a2e";
