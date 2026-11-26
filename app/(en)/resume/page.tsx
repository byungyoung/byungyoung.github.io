import type { Metadata } from "next";

import { ResumePage } from "@/components/resume/resume-page";
import { resume } from "@/content/resume";
import { SITE_PATHS } from "@/lib/journey";
import { localizedAlternates } from "@/lib/metadata";

const LANG = "en" as const;

export const metadata: Metadata = {
  title: resume.meta.title[LANG],
  description: resume.meta.description[LANG],
  alternates: localizedAlternates(SITE_PATHS.resume, LANG),
};

export default function Page() {
  return <ResumePage lang={LANG} />;
}
