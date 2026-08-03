import type { ReactNode } from "react";
import { IBM_Plex_Mono } from "next/font/google";

import { RootShell } from "@/components/root-shell";
import type { Lang } from "@/content/types";
import { LANG_DETECTION_SCRIPT } from "@/lib/lang-detection";

import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/app/globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

type SiteDocumentProps = {
  lang: Lang;
  children: ReactNode;
};

/**
 * The single html/body shell shared by both root layouts — (en) at the bare
 * routes and (ko) under /ko. Keeping it in one place is what stops the two
 * layouts from drifting.
 */
export function SiteDocument({ lang, children }: SiteDocumentProps) {
  return (
    <html lang={lang} className={ibmPlexMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_DETECTION_SCRIPT }} />
      </head>
      <body>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
