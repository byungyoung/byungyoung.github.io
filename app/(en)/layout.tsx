import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteDocument } from "@/components/site-document";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata("en");

export default function EnRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
