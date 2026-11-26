import Link from "next/link";

import { ProgressMeter } from "@/components/game/progress-meter";
import { LangToggle } from "@/components/site/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { game } from "@/content/game";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { buildStages, GAME_PATHS } from "@/lib/game";
import { localizePath } from "@/lib/paths";

type HudProps = { lang: Lang };

/** Sticky heads-up display shared by every game screen. */
export function Hud({ lang }: HudProps) {
  const copy = game.hud;
  const stageIds = buildStages(lang).map((stage) => stage.id);
  const href = (path: string) => localizePath(path, lang);

  const nav = [
    { href: href(GAME_PATHS.map), label: copy.map[lang] },
    { href: href(GAME_PATHS.character), label: copy.character[lang] },
    { href: href(GAME_PATHS.quests), label: copy.quests[lang] },
    { href: href(GAME_PATHS.trophies), label: copy.trophies[lang] },
  ];

  return (
    <header className="g-hud">
      <div className="g-hud__inner">
        <Link href={href(GAME_PATHS.home)} className="g-hud__logo g-pixel" aria-label={copy.home[lang]}>
          {ui.header.logo}
        </Link>

        <nav aria-label={copy.nav[lang]} className="g-hud__nav">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="g-hud__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ProgressMeter stageIds={stageIds} label={copy.explored[lang]} />

        <div className="g-hud__actions">
          <Link href={href(GAME_PATHS.pdf)} className="g-btn g-btn--sm">
            {copy.pdf[lang]}
          </Link>
          <Link href={href(GAME_PATHS.resume)} className="g-btn g-btn--sm g-hud__plain">
            {copy.plain[lang]}
          </Link>
          <LangToggle lang={lang} className="g-hud__toggle" />
          <ThemeToggle lang={lang} className="g-hud__toggle g-hud__theme" />
        </div>
      </div>
    </header>
  );
}

type SkipLinksProps = { lang: Lang };

/** Always-available exits: plain résumé for recruiters, main content for keyboard users. */
export function SkipLinks({ lang }: SkipLinksProps) {
  return (
    <nav aria-label={game.skip.navLabel[lang]} className="g-skip">
      <a href="#main" className="g-skip__a11y">
        {game.skip.toContent[lang]}
      </a>
      <p className="g-skip__banner">
        <span className="g-skip__text">{game.skip.banner[lang]}</span>{" "}
        <Link href={localizePath(GAME_PATHS.resume, lang)} className="g-skip__link">
          {game.skip.link[lang]} →
        </Link>
      </p>
    </nav>
  );
}
