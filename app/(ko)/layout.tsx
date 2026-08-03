import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteDocument } from "@/components/site-document";
import { METADATA_BASE } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
};

export default function KoRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <SiteDocument lang="ko">{children}</SiteDocument>;
}
