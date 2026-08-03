import { ImageResponse } from "next/og";

import { OG_FONT_FAMILY, loadOgFonts } from "@/lib/og-fonts";

export const dynamic = "force-static";

export const alt = "BY.";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const PAPER = "#FCFBF9";
const INK = "#1D1B18";

export default async function AppleIcon() {
  const fonts = await loadOgFonts(700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PAPER,
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: -3,
            color: INK,
          }}
        >
          BY.
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
