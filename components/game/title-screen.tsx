import { PlayerSprite } from "@/components/game/pixel-art";
import { TitleMenu, type TitleMenuItem } from "@/components/game/title-menu";
import { game } from "@/content/game";
import { home } from "@/content/home";
import { site } from "@/content/site";
import type { Lang } from "@/content/types";
import { buildStages, displayName, GAME_PATHS } from "@/lib/game";
import { localizePath } from "@/lib/paths";

const MENU_TARGET: Record<TitleMenuItem["id"], string> = {
  continue: GAME_PATHS.map,
  start: GAME_PATHS.map,
  character: GAME_PATHS.character,
  quests: GAME_PATHS.quests,
  pdf: GAME_PATHS.pdf,
  plain: GAME_PATHS.resume,
};

type TitleScreenProps = { lang: Lang };

export function TitleScreen({ lang }: TitleScreenProps) {
  const copy = game.title;
  const stages = buildStages(lang);
  const first = stages[0];
  const current = stages.find((stage) => stage.current);

  const items: TitleMenuItem[] = copy.menu.map((item) => ({
    id: item.id,
    pixel: item.pixel,
    label: item.label[lang],
    href: localizePath(MENU_TARGET[item.id], lang),
  }));

  return (
    <section aria-labelledby="title-heading" className="g-title g-dotgrid">
      <div className="g-title__inner">
        <div>
        <p className="g-pixel g-eyebrow">
          {copy.eyebrow[lang]} <span className="g-title__years">{first?.year} — NOW</span>
        </p>

        <h1 id="title-heading" className="g-title__name" data-lang={lang}>
          {displayName(lang)}
        </h1>
        <p className="g-pixel g-title__class">{site.positioningTitle[lang]}</p>
        <p className="g-title__tagline">{home.hero.h1[lang].join(" ")}</p>

        {current ? (
          <p className="g-title__now">
            <span className="g-chip g-chip--accent">{copy.nowPlaying[lang]}</span>
            <span>
              {current.role}, {current.company}
            </span>
          </p>
        ) : null}
        </div>

        <div className="g-title__console">
        <div className="g-title__stage">
          <PlayerSprite className="g-title__sprite" />
          <p aria-hidden className="g-pixel g-title__press">
            {copy.pressStart}
          </p>
        </div>

        <TitleMenu
          items={items}
          menuLabel={copy.menuLabel[lang]}
          firstStageId={first?.id ?? ""}
          keyHint={copy.keyHint[lang]}
          touchHint={copy.touchHint[lang]}
        />
        </div>
      </div>
    </section>
  );
}
