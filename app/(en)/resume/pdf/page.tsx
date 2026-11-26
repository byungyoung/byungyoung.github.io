import type { Metadata } from "next";

import { PdfPage } from "@/components/plain/pdf-page";
import { journey } from "@/content/journey";
import { SITE_PATHS } from "@/lib/journey";
import { localizedAlternates } from "@/lib/metadata";

const LANG = "en" as const;

export const metadata: Metadata = {
  title: journey.pdf.meta.title[LANG],
  description: journey.pdf.meta.description[LANG],
  alternates: localizedAlternates(SITE_PATHS.pdf, LANG),
};

export default function Page() {
  return <PdfPage lang={LANG} />;
}
