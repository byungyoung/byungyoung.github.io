import type { ReactNode } from "react";

import {
  iso,
  placeCenter,
  points,
  segmentAxis,
  segmentCells,
  worldSize,
} from "@/components/journey/geometry";
import { Landmark, Tree } from "@/components/journey/landmarks";
import { Prism, SHADES } from "@/components/journey/shapes";
import type { LandmarkKind } from "@/content/journey";

export interface WorldPlace {
  id: string;
  landmark: LandmarkKind;
}

type WorldProps = {
  places: WorldPlace[];
  /** Index of the last segment whose path is built (−1 = none). */
  builtUpTo: number;
  /** Index of the place whose door is open (the traveler is inside it). */
  openIndex: number | null;
  /** Segment drawn as a sliding bridge instead of rising tiles. */
  bridgeSegment: number;
  /** Painted last, above every island (the traveler). */
  children?: ReactNode;
};

/** Trees sit on cells the walking lanes never cross. */
function treeCell(index: number, count: number): { gx: number; gy: number } | null {
  const { gx, gy } = placeCenter(index);
  if (index % 2 === 0) return { gx: gx - 1, gy: gy + 1 };
  if (index === count - 1) return { gx: gx + 1, gy: gy - 1 };
  return null;
}

function Island({ index, place, open, count }: { index: number; place: WorldPlace; open: boolean; count: number }) {
  const { gx, gy } = placeCenter(index);
  const tree = treeCell(index, count);

  return (
    <g className="j-island" data-open={open || undefined} data-place={place.id}>
      <Prism x={gx - 0.5} y={gy - 0.5} z={-2.4} w={1} d={1} h={0.8} shade={SHADES.rockDeep} />
      <Prism x={gx - 1} y={gy - 1} z={-1.6} w={2} d={2} h={1.1} shade={SHADES.rock} />
      <Prism x={gx - 1.5} y={gy - 1.5} z={-0.5} w={3} d={3} h={0.5} shade={SHADES.grass} />
      <Landmark kind={place.landmark} cx={gx} cy={gy} id={`door-${place.id}`} />
      {tree ? <Tree gx={tree.gx} gy={tree.gy} /> : null}
    </g>
  );
}

function PathTiles({ index, built, bridge }: { index: number; built: boolean; bridge: boolean }) {
  const cells = segmentCells(index);

  const ghost = (
    <g className="j-ghost" aria-hidden>
      {cells.map((cell) => (
        <polygon
          key={`${cell.gx}:${cell.gy}`}
          points={points([iso(cell.gx - 0.45, cell.gy - 0.45), iso(cell.gx + 0.45, cell.gy - 0.45), iso(cell.gx + 0.45, cell.gy + 0.45), iso(cell.gx - 0.45, cell.gy + 0.45)])}
        />
      ))}
    </g>
  );

  if (bridge) {
    const first = cells[0];
    const last = cells[cells.length - 1];
    const along = segmentAxis(index) === "x";
    const x = along ? first.gx - 0.5 : first.gx - 0.4;
    const y = along ? first.gy - 0.4 : last.gy - 0.5;
    const w = along ? cells.length : 0.8;
    const d = along ? 0.8 : cells.length;

    return (
      <g>
        {ghost}
        <g className="j-bridge" data-built={built || undefined}>
          <Prism x={x} y={y} z={-0.22} w={w} d={d} h={0.22} shade={SHADES.wood} />
          {cells.map((cell, i) =>
            i % 2 === 0 ? (
              <line
                key={i}
                x1={iso(cell.gx + (along ? 0 : 0.42), cell.gy + (along ? 0.42 : 0), 0).x}
                y1={iso(cell.gx + (along ? 0 : 0.42), cell.gy + (along ? 0.42 : 0), 0).y}
                x2={iso(cell.gx + (along ? 0 : 0.42), cell.gy + (along ? 0.42 : 0), 0.55).x}
                y2={iso(cell.gx + (along ? 0 : 0.42), cell.gy + (along ? 0.42 : 0), 0.55).y}
                stroke="#8f7049"
                strokeWidth={2}
              />
            ) : null,
          )}
          <line
            x1={iso(first.gx + (along ? -0.5 : 0.42), first.gy + (along ? 0.42 : 0.5), 0.5).x}
            y1={iso(first.gx + (along ? -0.5 : 0.42), first.gy + (along ? 0.42 : 0.5), 0.5).y}
            x2={iso(last.gx + (along ? 0.5 : 0.42), last.gy + (along ? 0.42 : -0.5), 0.5).x}
            y2={iso(last.gx + (along ? 0.5 : 0.42), last.gy + (along ? 0.42 : -0.5), 0.5).y}
            stroke="#a9875e"
            strokeWidth={2}
          />
        </g>
      </g>
    );
  }

  return (
    <g>
      {ghost}
      {cells.map((cell, i) => (
        <g
          key={`${cell.gx}:${cell.gy}`}
          className="j-tile"
          data-built={built || undefined}
          style={{ transitionDelay: built ? `${i * 90}ms` : "0ms" }}
        >
          <Prism x={cell.gx - 0.45} y={cell.gy - 0.45} z={-0.25} w={0.9} d={0.9} h={0.25} shade={SHADES.tile} />
        </g>
      ))}
    </g>
  );
}

/**
 * The whole world as one SVG in world pixels (1 unit = 1 CSS px before the
 * camera scales it). Back-row islands are painted first, then the paths, then
 * the front row, so nothing needs runtime depth sorting; the traveler is a
 * sibling layer painted on top.
 */
export function World({ places, builtUpTo, openIndex, bridgeSegment, children }: WorldProps) {
  const { width, height } = worldSize(places.length);
  const backRow = places.map((place, index) => ({ place, index })).filter(({ index }) => index % 2 === 0);
  const frontRow = places.map((place, index) => ({ place, index })).filter(({ index }) => index % 2 === 1);

  return (
    <svg className="j-world" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      {backRow.map(({ place, index }) => (
        <Island key={place.id} index={index} place={place} open={openIndex === index} count={places.length} />
      ))}
      {places.slice(0, -1).map((place, index) => (
        <PathTiles key={`path-${place.id}`} index={index} built={index <= builtUpTo} bridge={index === bridgeSegment} />
      ))}
      {frontRow.map(({ place, index }) => (
        <Island key={place.id} index={index} place={place} open={openIndex === index} count={places.length} />
      ))}
      {children}
    </svg>
  );
}
