import type { Metadata } from "next";

import { ResumePage } from "@/components/resume/resume-page";
import { resume } from "@/content/resume";

const LANG = "ko" as const;

export const metadata: Metadata = {
  title: resume.meta.title[LANG],
  description: resume.meta.description[LANG],
};

export default function Page() {
  return <ResumePage lang={LANG} />;
}
