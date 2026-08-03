import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { PersonJsonLd } from "@/components/site/person-json-ld";
import { home } from "@/content/home";
import { localizedAlternates } from "@/lib/metadata";

const LANG = "en" as const;
const PATH = "/";

export const metadata: Metadata = {
  title: home.meta.title[LANG],
  description: home.meta.description[LANG],
  alternates: localizedAlternates(PATH, LANG),
};

export default function Page() {
  return (
    <>
      <PersonJsonLd />
      <HomePage lang={LANG} />
    </>
  );
}
