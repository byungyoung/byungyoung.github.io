import Link from "next/link";

import { GameShell } from "@/components/game/game-shell";
import { PdfViewer } from "@/components/game/pdf-viewer";
import { game } from "@/content/game";
import { resume } from "@/content/resume";
import type { Lang } from "@/content/types";
import { GAME_PATHS, PDF_FILES } from "@/lib/game";
import { localizePath } from "@/lib/paths";

type PdfPageProps = { lang: Lang };

export function PdfPage({ lang }: PdfPageProps) {
  const copy = game.pdf;
  const otherLang: Lang = lang === "ko" ? "en" : "ko";
  const file = PDF_FILES[lang];

  return (
    <GameShell lang={lang}>
      <section aria-labelledby="pdf-heading" className="g-pdfpage">
        <Link href={localizePath(GAME_PATHS.home, lang)} className="g-back">
          ◀ {copy.backToGame[lang]}
        </Link>
        <header className="g-screen__header">
          <p aria-hidden className="g-pixel g-eyebrow">
            {copy.eyebrow}
          </p>
          <h1 id="pdf-heading" className="g-screen__title">
            {copy.heading[lang]}
          </h1>
          <p className="g-screen__intro">{copy.intro[lang]}</p>
        </header>

        <div className="g-pdfpage__actions">
          <a href={file} download={`${resume.toolbar.pdfFileName[lang]}.pdf`} className="g-btn g-btn--primary">
            {copy.download[lang]}
          </a>
          <a href={file} target="_blank" rel="noreferrer" className="g-btn">
            {copy.open[lang]}
          </a>
          <Link href={localizePath(GAME_PATHS.resume, lang)} className="g-btn">
            {game.hud.plain[lang]}
          </Link>
          <a href={PDF_FILES[otherLang]} target="_blank" rel="noreferrer" lang={otherLang} className="g-link g-pdfpage__other">
            {copy.otherLang[lang]}
          </a>
        </div>

        <PdfViewer
          src={file}
          copy={{
            viewerLabel: copy.viewerLabel[lang],
            loading: copy.loading[lang],
            error: copy.error[lang],
            pageLabel: copy.pageLabel[lang],
            zoomIn: copy.zoomIn[lang],
            zoomOut: copy.zoomOut[lang],
            zoomReset: copy.zoomReset[lang],
          }}
        />
      </section>
    </GameShell>
  );
}
