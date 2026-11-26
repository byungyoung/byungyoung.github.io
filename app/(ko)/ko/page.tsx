import type { Metadata } from "next";

import { JourneyPage } from "@/components/journey/journey-page";
import { PersonJsonLd } from "@/components/site/person-json-ld";
import { resume } from "@/content/resume";
import { site } from "@/content/site";
import { displayName } from "@/lib/journey";
import { localizedAlternates } from "@/lib/metadata";

const LANG = "ko" as const;
const PATH = "/";

export const metadata: Metadata = {
  title: `${displayName(LANG)} ${site.titleSeparator} ${site.positioningTitle[LANG]}`,
  description: resume.meta.description[LANG],
  alternates: localizedAlternates(PATH, LANG),
};

export default function Page() {
  return (
    <>
      <PersonJsonLd />
      <JourneyPage lang={LANG} />
    </>
  );
}
