import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/po/case-study-page";
import { caseMetadata, caseParams, findCase, type CaseParams } from "@/lib/case-route";

const LANG = "en" as const;

export const dynamicParams = false;

type PageProps = { params: Promise<CaseParams> };

export function generateStaticParams(): CaseParams[] {
  return caseParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return caseMetadata(slug, LANG);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = findCase(slug);
  if (!caseStudy) notFound();

  return <CaseStudyPage caseStudy={caseStudy} lang={LANG} />;
}
