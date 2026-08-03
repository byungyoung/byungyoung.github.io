import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Satori (behind `next/og`) cannot see system fonts, so every glyph in a
 * generated image has to come from a font file we read off disk at build time.
 * Pretendard ships uncompressed `.woff` subsets — satori accepts ttf/otf/woff
 * but rejects woff2, which rules out the `web/variable` bundle the site itself
 * uses. The `woff-subset` build carries KS X 1001 hangul plus Latin at ~350 KB
 * per weight, so it covers both surfaces without pulling in a 1.5 MB OTF.
 *
 * Nothing here is committed: the files live in node_modules and are only read
 * while the static export is being produced.
 */
const FONT_DIR = path.join(
  process.cwd(),
  "node_modules",
  "pretendard",
  "dist",
  "web",
  "static",
  "woff-subset",
);

export type OgFontWeight = 400 | 600 | 700;

const FILE_BY_WEIGHT: Record<OgFontWeight, string> = {
  400: "Pretendard-Regular.subset.woff",
  600: "Pretendard-SemiBold.subset.woff",
  700: "Pretendard-Bold.subset.woff",
};

export const OG_FONT_FAMILY = "Pretendard";

type OgFont = {
  name: string;
  data: Buffer;
  weight: OgFontWeight;
  style: "normal";
};

export async function loadOgFont(weight: OgFontWeight): Promise<OgFont> {
  return {
    name: OG_FONT_FAMILY,
    data: await readFile(path.join(FONT_DIR, FILE_BY_WEIGHT[weight])),
    weight,
    style: "normal",
  };
}

export function loadOgFonts(...weights: OgFontWeight[]): Promise<OgFont[]> {
  return Promise.all(weights.map(loadOgFont));
}
