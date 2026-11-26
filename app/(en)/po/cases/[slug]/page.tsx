import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RedirectStub, redirectMetadata } from "@/components/site/redirect-stub";
import { caseParams, findCase, type CaseParams } from "@/lib/case-route";
import { questPath } from "@/lib/journey";

const LANG = "en" as const;

export const dynamicParams = false;

type PageProps = { params: Promise<CaseParams> };

export function generateStaticParams(): CaseParams[] {
  return caseParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const caseStudy = findCase((await params).slug);
  return caseStudy ? redirectMetadata(questPath(caseStudy.slug), LANG) : {};
}

export default async function Page({ params }: PageProps) {
  const caseStudy = findCase((await params).slug);
  if (!caseStudy) notFound();

  return <RedirectStub to={questPath(caseStudy.slug)} lang={LANG} />;
}
