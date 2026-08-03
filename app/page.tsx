import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { home } from "@/content/home";

const LANG = "ko" as const;

export const metadata: Metadata = {
  title: home.meta.title[LANG],
  description: home.meta.description[LANG],
};

export default function Page() {
  return <HomePage lang={LANG} />;
}
