import type { Metadata } from "next";

import { PoLandingPage } from "@/components/po/po-landing-page";
import { poLanding } from "@/content/po-landing";

const LANG = "ko" as const;

export const metadata: Metadata = {
  title: poLanding.meta.title[LANG],
  description: poLanding.meta.description[LANG],
};

export default function Page() {
  return <PoLandingPage lang={LANG} />;
}
