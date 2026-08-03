import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/po/case-study-page";
import { cases, casesBySlug } from "@/content/cases";
import type { CaseSlug } from "@/content/cases/types";

const LANG = "ko" as const;

export const dynamicParams = false;

type PageParams = { slug: string };
type PageProps = { params: Promise<PageParams> };

export function generateStaticParams(): PageParams[] {
  return cases.map((caseStudy) => ({ slug: caseStudy.slug }));
}

function findCase(slug: string) {
  return casesBySlug[slug as CaseSlug];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = findCase(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title[LANG].join(" ")} — ${caseStudy.name}`,
    description: caseStudy.meta.description[LANG],
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = findCase(slug);
  if (!caseStudy) notFound();

  return <CaseStudyPage caseStudy={caseStudy} lang={LANG} />;
}
