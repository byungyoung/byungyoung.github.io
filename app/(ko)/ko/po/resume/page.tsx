import type { Metadata } from "next";

import { RedirectStub, redirectMetadata } from "@/components/site/redirect-stub";
import { SITE_PATHS } from "@/lib/journey";

const LANG = "ko" as const;

export const metadata: Metadata = redirectMetadata(SITE_PATHS.resume, LANG);

export default function Page() {
  return <RedirectStub to={SITE_PATHS.resume} lang={LANG} />;
}
