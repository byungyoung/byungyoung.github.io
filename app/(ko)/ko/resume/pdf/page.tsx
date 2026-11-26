import type { Metadata } from "next";

import { PdfPage } from "@/components/game/pdf-page";
import { game } from "@/content/game";
import { GAME_PATHS } from "@/lib/game";
import { localizedAlternates } from "@/lib/metadata";

const LANG = "ko" as const;

export const metadata: Metadata = {
  title: game.pdf.meta.title[LANG],
  description: game.pdf.meta.description[LANG],
  alternates: localizedAlternates(GAME_PATHS.pdf, LANG),
};

export default function Page() {
  return <PdfPage lang={LANG} />;
}
