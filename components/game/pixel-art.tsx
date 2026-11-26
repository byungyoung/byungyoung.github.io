import type { TrophyIcon } from "@/content/game";
import { cn } from "@/lib/utils";

/**
 * Original pixel art drawn for this site: a builder carrying a notebook, plus a
 * small set of trophy glyphs. Each row is one line of pixels; "." is empty.
 */

type Palette = Record<string, string>;

const SPRITE_PALETTE: Palette = {
  k: "var(--g-sprite-ink)",
  s: "var(--g-sprite-skin)",
  e: "var(--g-sprite-ink)",
  a: "var(--g-accent)",
  A: "var(--g-sprite-shade)",
  w: "var(--g-sprite-paper)",
  l: "var(--g-sprite-line)",
  p: "var(--g-sprite-pants)",
  b: "var(--g-sprite-ink)",
};

const SPRITE_TOP = [
  "....kkkk....",
  "...kkkkkkk..",
  "..kkkkkkkkk.",
  "..kksssssk..",
  "..ksesssek..",
  "..kssssssk..",
  "...kssssk...",
  "..aaaaaaaa..",
  ".aaaAaaawww.",
  ".aaaAaaawlw.",
  ".saaAaaawww.",
  "..aaaaaaaa..",
  "..pppppppp..",
];

const LEGS_IDLE = ["..ppp..ppp..", "..ppp..ppp..", "..bbb..bbb.."];
const LEGS_STEP = ["..ppp...pp..", ".ppp....ppp.", ".bbb....bbb."];

const SPRITE_WIDTH = 12;
const SPRITE_HEIGHT = 16;

function Pixels({ rows, palette, offsetY = 0 }: { rows: string[]; palette: Palette; offsetY?: number }) {
  return (
    <>
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "." ? null : (
            <rect key={`${x}-${y}`} x={x} y={y + offsetY} width={1} height={1} fill={palette[cell]} />
          ),
        ),
      )}
    </>
  );
}

type SpriteProps = {
  className?: string;
  /** When set, the sprite is announced as an image; otherwise it is decorative. */
  label?: string;
};

export function PlayerSprite({ className, label }: SpriteProps) {
  const a11y = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const };

  return (
    <svg
      {...a11y}
      viewBox={`0 0 ${SPRITE_WIDTH} ${SPRITE_HEIGHT}`}
      shapeRendering="crispEdges"
      className={cn("g-sprite", className)}
    >
      <Pixels rows={SPRITE_TOP} palette={SPRITE_PALETTE} />
      <g className="g-sprite__frame g-sprite__frame--a">
        <Pixels rows={LEGS_IDLE} palette={SPRITE_PALETTE} offsetY={SPRITE_TOP.length} />
      </g>
      <g className="g-sprite__frame g-sprite__frame--b">
        <Pixels rows={LEGS_STEP} palette={SPRITE_PALETTE} offsetY={SPRITE_TOP.length} />
      </g>
    </svg>
  );
}

const ICON_PALETTE: Palette = {
  x: "currentColor",
  o: "var(--g-accent)",
};

const ICONS: Record<TrophyIcon, string[]> = {
  flag: [
    "x.......",
    "xoooo...",
    "xooooo..",
    "xoooo...",
    "x.......",
    "x.......",
    "x.......",
    "xxx.....",
  ],
  coin: [
    "..xxxx..",
    ".xoooox.",
    "xooxxoox",
    "xoxoooox",
    "xoxoooox",
    "xooxxoox",
    ".xoooox.",
    "..xxxx..",
  ],
  star: [
    "...xx...",
    "..xoox..",
    "xxxooxxx",
    "xoooooox",
    ".xoooox.",
    ".xoxxox.",
    "xox..xox",
    "xx....xx",
  ],
  scroll: [
    ".xxxxxx.",
    "xoooooox",
    ".xoooox.",
    ".xxxxxx.",
    ".xoooox.",
    ".xxxxxx.",
    "xoooooox",
    ".xxxxxx.",
  ],
  chip: [
    ".x.x.x..",
    "xxxxxxx.",
    ".xooox..",
    "xxoooxx.",
    ".xooox..",
    "xxxxxxx.",
    ".x.x.x..",
    "........",
  ],
  shield: [
    "xxxxxxxx",
    "xoooooox",
    "xooxxoox",
    "xoxooxox",
    "xooxxoox",
    ".xoooox.",
    "..xoox..",
    "...xx...",
  ],
  bubble: [
    ".xxxxxx.",
    "xoooooox",
    "xoxoxoox",
    "xoooooox",
    ".xxxxxx.",
    "..xx....",
    ".x......",
    "........",
  ],
  key: [
    ".xxx....",
    "xooox...",
    "xo.ox...",
    "xooox...",
    ".xxxxxxx",
    "....x.xx",
    "....x...",
    "........",
  ],
};

export function TrophyGlyph({ icon, className }: { icon: TrophyIcon; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 8 8" shapeRendering="crispEdges" className={cn("g-glyph", className)}>
      <Pixels rows={ICONS[icon]} palette={ICON_PALETTE} />
    </svg>
  );
}
