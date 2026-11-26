import Link from "next/link";

import { PdfReader } from "@/components/plain/pdf-reader";
import { SiteFooter } from "@/components/site/footer";
import { LangToggle } from "@/components/site/lang-toggle";
import { journey } from "@/content/journey";
import { resume } from "@/content/resume";
import type { Lang } from "@/content/types";
import { PDF_FILES, SITE_PATHS } from "@/lib/journey";
import { localizePath } from "@/lib/paths";

const CONTAINER = "max-w-[var(--container)]";
const NAV_LINK =
  "inline-flex min-h-9 items-center whitespace-nowrap font-mono text-caption text-subtle underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

type PdfPageProps = { lang: Lang };

export function PdfPage({ lang }: PdfPageProps) {
  const copy = journey.pdf;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/88 backdrop-blur-md">
        <div className={`mx-auto flex h-14 ${CONTAINER} items-center gap-4 px-4 sm:px-6`}>
          <Link href={localizePath(SITE_PATHS.home, lang)} className={NAV_LINK}>
            <span aria-hidden>←</span>
            <span className="max-sm:sr-only">&nbsp;{copy.back[lang]}</span>
          </Link>
          <Link href={localizePath(SITE_PATHS.resume, lang)} className={`${NAV_LINK} ms-auto`}>
            {journey.skip.plain[lang]}
          </Link>
          <LangToggle lang={lang} />
        </div>
      </header>

      <main id="main" className={`mx-auto ${CONTAINER} px-6 pt-12 pb-4`}>
        <h1 className="text-h1 text-foreground">{copy.heading[lang]}</h1>
        <p className="mt-3 max-w-[var(--measure)] text-body-sm text-muted-foreground">{copy.intro[lang]}</p>
        <PdfReader
          initial={lang}
          groupLabel={copy.editions[lang]}
          openLabel={copy.open[lang]}
          editions={[
            { lang: "en", label: copy.en[lang], href: PDF_FILES.en, downloadLabel: copy.downloadEn[lang], fileName: `${resume.toolbar.pdfFileName.en}.pdf` },
            { lang: "ko", label: copy.ko[lang], href: PDF_FILES.ko, downloadLabel: copy.downloadKo[lang], fileName: `${resume.toolbar.pdfFileName.ko}.pdf` },
          ]}
          viewerCopy={{
            viewerLabel: copy.viewerLabel[lang],
            loading: copy.loading[lang],
            error: copy.error[lang],
            pageLabel: copy.pageLabel[lang],
            zoomIn: copy.zoomIn[lang],
            zoomOut: copy.zoomOut[lang],
            zoomReset: copy.zoomReset[lang],
          }}
        />
      </main>

      <SiteFooter lang={lang} corrections="none" containerClassName={CONTAINER} />
    </>
  );
}
