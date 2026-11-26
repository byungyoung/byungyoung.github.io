import type { JSX } from "react";

import type { LandmarkKind } from "@/content/journey";
import { iso, points, type Vec2 } from "@/components/journey/geometry";
import {
  ACCENT,
  ACCENT_SOFT,
  INK,
  INTERIOR,
  LeftFacePanel,
  Prism,
  RightFacePanel,
  SHADES,
} from "@/components/journey/shapes";

/**
 * Original landmarks, one per place, each built from a few boxes on the back
 * two-by-two cells of an island (the front row and column stay free for the
 * walking path). Every landmark has one thing that opens when the traveler
 * arrives: a door, a gate, a hatch.
 */

type LandmarkProps = { kind: LandmarkKind; cx: number; cy: number; id: string };

type DoorProps = { id: string; x0: number; x1: number; y: number; z0: number; z1: number; fill?: string };

/** A door on a +gy face: warm light behind, a panel that slides up out of the frame. */
function Door({ id, x0, x1, y, z0, z1, fill = "#7a5b3e" }: DoorProps) {
  const frame = [iso(x0, y, z1), iso(x1, y, z1), iso(x1, y, z0), iso(x0, y, z0)];
  return (
    <g>
      <clipPath id={`clip-${id}`}>
        <polygon points={points(frame)} />
      </clipPath>
      <polygon points={points(frame)} fill={ACCENT_SOFT} />
      <g clipPath={`url(#clip-${id})`}>
        <polygon className="j-door" points={points(frame)} fill={fill} />
      </g>
    </g>
  );
}

function Tree({ gx, gy }: { gx: number; gy: number }) {
  const base = iso(gx, gy, 0.3);
  const apex = iso(gx, gy, 1.5);
  const half = 13;
  return (
    <g>
      <Prism x={gx - 0.06} y={gy - 0.06} w={0.12} d={0.12} h={0.3} shade={SHADES.wood} />
      <polygon points={points([{ x: base.x - half, y: base.y }, apex, { x: base.x, y: base.y + 6 }])} fill="#8fa37f" />
      <polygon points={points([{ x: base.x + half, y: base.y }, apex, { x: base.x, y: base.y + 6 }])} fill="#738a66" />
    </g>
  );
}

function Workshop({ cx, cy, id }: Omit<LandmarkProps, "kind">) {
  const fx = cx - 1.5;
  const fy = cy - 1.5;
  const ridgeZ = 2;
  const eaveZ = 1.25;
  const antennaBase = iso(fx + 1.55, fy + 1, 1.9);
  const antennaTop = iso(fx + 1.55, fy + 1, 2.7);

  return (
    <g>
      <Prism x={fx + 0.15} y={fy + 0.25} w={1.7} d={1.5} h={eaveZ} shade={SHADES.wall} />
      <Door id={id} x0={fx + 0.5} x1={fx + 0.92} y={fy + 1.75} z0={0} z1={0.82} />
      <RightFacePanel x={fx + 1.85} y0={fy + 0.6} y1={fy + 1.15} z0={0.5} z1={0.95} fill={ACCENT_SOFT} />
      <polygon
        points={points([iso(fx + 1.85, fy + 0.25, eaveZ), iso(fx + 1.85, fy + 1.75, eaveZ), iso(fx + 1.85, fy + 1, ridgeZ)])}
        fill={SHADES.wall.right}
      />
      <polygon
        points={points([iso(fx + 0.05, fy + 1.85, eaveZ), iso(fx + 1.95, fy + 1.85, eaveZ), iso(fx + 1.95, fy + 1, ridgeZ), iso(fx + 0.05, fy + 1, ridgeZ)])}
        fill={SHADES.roof.left}
      />
      <line x1={antennaBase.x} y1={antennaBase.y} x2={antennaTop.x} y2={antennaTop.y} stroke={INK} strokeWidth={1.5} />
      <circle className="j-blink" cx={antennaTop.x} cy={antennaTop.y} r={2.6} fill={ACCENT} />
    </g>
  );
}

function Townhouses({ cx, cy, id }: Omit<LandmarkProps, "kind">) {
  const fx = cx - 1.5;
  const fy = cy - 1.5;
  const bubble = iso(fx + 1.4, fy + 1, 2.75);

  return (
    <g>
      <Prism x={fx + 0.1} y={fy + 0.3} w={0.85} d={1.4} h={2.2} shade={SHADES.stone} />
      <Prism x={fx + 0.05} y={fy + 0.25} z={2.2} w={0.95} d={1.5} h={0.14} shade={SHADES.slate} />
      <LeftFacePanel x0={fx + 0.3} x1={fx + 0.62} y={fy + 1.7} z0={1.25} z1={1.68} fill={ACCENT_SOFT} />
      <LeftFacePanel x0={fx + 0.3} x1={fx + 0.62} y={fy + 1.7} z0={0.5} z1={0.92} fill="#8fa0a8" />
      <Prism x={fx + 1} y={fy + 0.3} w={0.85} d={1.4} h={1.6} shade={SHADES.wall} />
      <Prism x={fx + 0.95} y={fy + 0.25} z={1.6} w={0.95} d={1.5} h={0.14} shade={SHADES.roof} />
      <Door id={id} x0={fx + 1.25} x1={fx + 1.6} y={fy + 1.7} z0={0} z1={0.75} fill="#5f7480" />
      <RightFacePanel x={fx + 1.85} y0={fy + 0.65} y1={fy + 1.1} z0={0.9} z1={1.3} fill={ACCENT_SOFT} />
      <g className="j-float">
        <rect x={bubble.x - 13} y={bubble.y - 16} width={26} height={15} rx={6} fill="#fffaf0" stroke="#d9cdb5" />
        <polygon points={points([{ x: bubble.x - 3, y: bubble.y - 2 }, { x: bubble.x + 3, y: bubble.y - 2 }, { x: bubble.x - 4, y: bubble.y + 4 }])} fill="#fffaf0" />
        {[-6, 0, 6].map((dx) => (
          <circle key={dx} cx={bubble.x + dx} cy={bubble.y - 8.5} r={1.6} fill={INK} />
        ))}
      </g>
    </g>
  );
}

function Gate({ cx, cy, id }: Omit<LandmarkProps, "kind">) {
  const fx = cx - 1.5;
  const fy = cy - 1.5;
  const y = fy + 1.25;
  const opening = [iso(fx + 0.65, y, 1.7), iso(fx + 1.35, y, 1.7), iso(fx + 1.35, y, 0), iso(fx + 0.65, y, 0)];
  const pole0 = iso(fx + 0.4, fy + 1, 2);
  const pole1 = iso(fx + 0.4, fy + 1, 3);

  return (
    <g>
      <Prism x={fx + 0.3} y={fy + 0.9} w={0.35} d={0.35} h={1.7} shade={SHADES.stone} />
      <clipPath id={`clip-${id}`}>
        <polygon points={points(opening)} />
      </clipPath>
      <g clipPath={`url(#clip-${id})`}>
        <g className="j-door">
          {[0.72, 0.88, 1.04, 1.2].map((x) => (
            <polygon key={x} points={points([iso(fx + x, y, 1.7), iso(fx + x + 0.06, y, 1.7), iso(fx + x + 0.06, y, 0), iso(fx + x, y, 0)])} fill="#6b5a45" />
          ))}
          <polygon points={points([iso(fx + 0.65, y, 0.95), iso(fx + 1.35, y, 0.95), iso(fx + 1.35, y, 0.85), iso(fx + 0.65, y, 0.85)])} fill="#6b5a45" />
        </g>
      </g>
      <Prism x={fx + 1.35} y={fy + 0.9} w={0.35} d={0.35} h={1.7} shade={SHADES.stone} />
      <Prism x={fx + 0.2} y={fy + 0.85} z={1.7} w={1.6} d={0.45} h={0.3} shade={SHADES.stone} />
      <line x1={pole0.x} y1={pole0.y} x2={pole1.x} y2={pole1.y} stroke={INK} strokeWidth={1.5} />
      <polygon className="j-flag" points={points([pole1, { x: pole1.x + 18, y: pole1.y + 5 }, { x: pole1.x, y: pole1.y + 10 }])} fill={ACCENT} />
    </g>
  );
}

function Library({ cx, cy, id }: Omit<LandmarkProps, "kind">) {
  const fx = cx - 1.5;
  const fy = cy - 1.5;
  const letters = iso(fx + 1, fy + 1, 2.7);

  return (
    <g>
      <Prism x={fx + 0.1} y={fy + 0.25} w={1.8} d={1.55} h={0.55} shade={SHADES.bookA} />
      <Door id={id} x0={fx + 0.75} x1={fx + 1.15} y={fy + 1.8} z0={0} z1={0.45} fill="#4f665f" />
      <Prism x={fx + 0.25} y={fy + 0.35} z={0.55} w={1.55} d={1.3} h={0.5} shade={SHADES.bookB} />
      <Prism x={fx + 0.15} y={fy + 0.45} z={1.05} w={1.7} d={1.15} h={0.45} shade={SHADES.bookC} />
      <Prism x={fx + 0.45} y={fy + 0.55} z={1.5} w={1.1} d={0.95} h={0.55} shade={SHADES.bookD} />
      <g className="j-float j-letters" fontFamily="Georgia, serif" fontSize={15} fill={INK}>
        <text x={letters.x - 16} y={letters.y}>A</text>
        <text x={letters.x + 2} y={letters.y - 8} fontSize={12}>a</text>
        <text x={letters.x + 12} y={letters.y + 2} fontSize={13}>?</text>
      </g>
    </g>
  );
}

function ellipsePath(c: Vec2, rx: number, ry: number, dome: number): string {
  return `M ${c.x - rx} ${c.y} A ${rx} ${dome} 0 0 1 ${c.x + rx} ${c.y} A ${rx} ${ry} 0 0 1 ${c.x - rx} ${c.y} Z`;
}

function Observatory({ cx, cy, id }: Omit<LandmarkProps, "kind">) {
  const fx = cx - 1.5;
  const fy = cy - 1.5;
  const c = iso(fx + 1, fy + 1, 1.1);
  const rx = 31;
  const ry = 15.5;
  const lens = { x: c.x + 24, y: c.y - 30 };
  const pulse = [0, 0.18, 0.3, 0.38, 0.46, 0.56, 0.7, 0.9].map((t, i) => {
    const p = iso(fx + 1.7, fy + 0.55 + t * 0.9, 0.67 + (i === 3 ? 0.18 : i === 4 ? -0.14 : 0));
    return p;
  });

  return (
    <g>
      <Prism x={fx + 0.3} y={fy + 0.3} w={1.4} d={1.4} h={1.1} shade={SHADES.wall} />
      <Door id={id} x0={fx + 0.8} x1={fx + 1.2} y={fy + 1.7} z0={0} z1={0.75} fill="#5d6b7c" />
      <RightFacePanel x={fx + 1.7} y0={fy + 0.5} y1={fy + 1.5} z0={0.45} z1={0.9} fill="#38414f" />
      <polyline className="j-pulse" points={points(pulse)} fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinejoin="round" />
      <path d={ellipsePath(c, rx, ry, rx * 0.95)} fill="#ece6d9" />
      <path d={`M ${c.x} ${c.y - rx * 0.95} A ${rx} ${rx * 0.95} 0 0 1 ${c.x + rx} ${c.y} A ${rx} ${ry} 0 0 1 ${c.x} ${c.y + ry} Z`} fill="#d3cab8" />
      <line x1={c.x + 6} y1={c.y - 18} x2={lens.x} y2={lens.y} stroke="#5d6b7c" strokeWidth={7} strokeLinecap="round" />
      <circle cx={lens.x} cy={lens.y} r={4.2} fill={ACCENT} className="j-blink j-blink--slow" />
    </g>
  );
}

function Beacon({ cx, cy, id }: Omit<LandmarkProps, "kind">) {
  const fx = cx - 1.5;
  const fy = cy - 1.5;
  const lantern = iso(fx + 1, fy + 1, 4.37);
  const apex = iso(fx + 1, fy + 1, 5.1);
  const capZ = 4.62;

  return (
    <g>
      <Prism x={fx + 0.35} y={fy + 0.35} w={1.3} d={1.3} h={0.4} shade={SHADES.stone} />
      <Prism x={fx + 0.6} y={fy + 0.6} z={0.4} w={0.8} d={0.8} h={3.6} shade={SHADES.tower} />
      {[1.5, 2.7].map((z) => (
        <g key={z}>
          <LeftFacePanel x0={fx + 0.6} x1={fx + 1.4} y={fy + 1.4} z0={z} z1={z + 0.3} fill={SHADES.slate.left} />
          <RightFacePanel x={fx + 1.4} y0={fy + 0.6} y1={fy + 1.4} z0={z} z1={z + 0.3} fill={SHADES.slate.right} />
        </g>
      ))}
      <Door id={id} x0={fx + 0.85} x1={fx + 1.15} y={fy + 1.4} z0={0.4} z1={1.05} fill="#5b677e" />
      <Prism x={fx + 0.5} y={fy + 0.5} z={4} w={1} d={1} h={0.12} shade={SHADES.slate} />
      <Prism x={fx + 0.65} y={fy + 0.65} z={4.12} w={0.7} d={0.7} h={0.5} shade={{ top: ACCENT_SOFT, left: "#ffe2a8", right: ACCENT }} />
      <polygon points={points([iso(fx + 0.6, fy + 1.4, capZ), iso(fx + 1.4, fy + 1.4, capZ), apex])} fill={SHADES.roof.left} />
      <polygon points={points([iso(fx + 1.4, fy + 1.4, capZ), iso(fx + 1.4, fy + 0.6, capZ), apex])} fill={SHADES.roof.right} />
      <g className="j-waves" style={{ transformOrigin: `${lantern.x}px ${lantern.y}px` }}>
        {[18, 30, 42].map((r, i) => (
          <path
            key={r}
            className="j-wave"
            style={{ animationDelay: `${i * 0.5}s` }}
            d={`M ${lantern.x + r * 0.55} ${lantern.y - r * 0.8} A ${r} ${r} 0 0 1 ${lantern.x + r * 0.55} ${lantern.y + r * 0.8}`}
            fill="none"
            stroke={ACCENT_SOFT}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle cx={lantern.x} cy={lantern.y} r={26} fill={ACCENT} opacity={0.16} className="j-glow" />
    </g>
  );
}

const LANDMARKS: Record<LandmarkKind, (props: Omit<LandmarkProps, "kind">) => JSX.Element> = {
  workshop: Workshop,
  townhouses: Townhouses,
  gate: Gate,
  library: Library,
  observatory: Observatory,
  beacon: Beacon,
};

export function Landmark({ kind, ...rest }: LandmarkProps) {
  const Component = LANDMARKS[kind];
  return <Component {...rest} />;
}

export { Tree };
