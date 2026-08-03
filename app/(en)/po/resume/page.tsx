import type { Metadata } from "next";

import { ResumePage } from "@/components/resume/resume-page";
import { resume } from "@/content/resume";
import { localizedAlternates } from "@/lib/metadata";

const LANG = "en" as const;
const PATH = "/po/resume/";

export const metadata: Metadata = {
  title: resume.meta.title[LANG],
  description: resume.meta.description[LANG],
  alternates: localizedAlternates(PATH, LANG),
};

export default function Page() {
  return <ResumePage lang={LANG} />;
}
