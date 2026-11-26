import type { Metadata } from "next";

import { RedirectStub, redirectMetadata } from "@/components/site/redirect-stub";
import { GAME_PATHS } from "@/lib/game";

const LANG = "en" as const;

export const metadata: Metadata = redirectMetadata(GAME_PATHS.resume, LANG);

export default function Page() {
  return <RedirectStub to={GAME_PATHS.resume} lang={LANG} />;
}
