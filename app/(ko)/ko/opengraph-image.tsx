import { ogAlt, renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";

export const alt = ogAlt("ko");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage("ko");
}
