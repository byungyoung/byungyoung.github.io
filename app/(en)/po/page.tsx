import type { Metadata } from "next";

import { PoLandingPage } from "@/components/po/po-landing-page";
import { poLanding } from "@/content/po-landing";
import { localizedAlternates } from "@/lib/metadata";

const LANG = "en" as const;
const PATH = "/po/";

export const metadata: Metadata = {
  title: poLanding.meta.title[LANG],
  description: poLanding.meta.description[LANG],
  alternates: localizedAlternates(PATH, LANG),
};

export default function Page() {
  return <PoLandingPage lang={LANG} />;
}
