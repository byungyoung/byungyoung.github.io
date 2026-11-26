import { Journey } from "@/components/journey/journey";
import { CorrectionHistory } from "@/components/site/correction-history";
import type { Lang } from "@/content/types";
import { buildPlaces, totalCareerMonths } from "@/lib/journey";

type JourneyPageProps = { lang: Lang };

/** Server entry: résumé data is resolved here at build time and handed to the client scene. */
export function JourneyPage({ lang }: JourneyPageProps) {
  return (
    <Journey
      lang={lang}
      places={buildPlaces(lang)}
      totalMonths={totalCareerMonths()}
      patchNotes={<CorrectionHistory lang={lang} />}
    />
  );
}
