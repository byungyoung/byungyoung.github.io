import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteDocument } from "@/components/site-document";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata("ko");

export default function KoRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <SiteDocument lang="ko">{children}</SiteDocument>;
}
