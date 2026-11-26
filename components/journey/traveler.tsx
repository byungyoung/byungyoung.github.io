import { forwardRef } from "react";

import type { Vec2 } from "@/components/journey/geometry";

type TravelerProps = {
  at: Vec2;
  walking: boolean;
  facing: "left" | "right";
  visible: boolean;
};

/**
 * An original traveler: a small figure in an ochre jacket with a satchel and
 * a notebook. Feet sit on (0, 0); the outer group is moved by the journey.
 */
export const Traveler = forwardRef<SVGGElement, TravelerProps>(function Traveler(
  { at, walking, facing, visible },
  ref,
) {
  return (
    <g
      ref={ref}
      className="j-traveler"
      data-visible={visible || undefined}
      style={{ transform: `translate(${at.x}px, ${at.y}px)` }}
    >
      <ellipse cx={0} cy={0} rx={9} ry={4} fill="rgba(40, 36, 30, 0.2)" />
      <g className="j-traveler__drop">
        <g className="j-traveler__body" data-walking={walking || undefined} data-facing={facing}>
          <rect className="j-leg j-leg--a" x={-3.6} y={-9} width={3} height={8.5} rx={1.4} fill="#3b4252" />
          <rect className="j-leg j-leg--b" x={0.6} y={-9} width={3} height={8.5} rx={1.4} fill="#323846" />
          <rect x={-7.2} y={-20} width={4.2} height={9} rx={1.8} fill="#8a5d34" />
          <rect x={-5.2} y={-21.5} width={10.4} height={13.5} rx={4.6} fill="#e0a148" />
          <rect x={-1} y={-21.5} width={2} height={13} fill="#c98a37" />
          <rect x={4} y={-16} width={4} height={5} rx={0.8} fill="#fffaf0" stroke="#d9cdb5" strokeWidth={0.6} />
          <circle cx={0} cy={-26.5} r={5} fill="#efc59c" />
          <path d="M -5.2 -27.4 Q -4.6 -33.2 0.4 -32.6 Q 5.4 -32.4 5.3 -27.2 Q 2.4 -29.6 -1.6 -29 Q -3.6 -28.6 -5.2 -27.4 Z" fill="#2b2a2e" />
        </g>
      </g>
    </g>
  );
});
