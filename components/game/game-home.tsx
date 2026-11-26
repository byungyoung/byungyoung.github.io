import { GameShell } from "@/components/game/game-shell";
import {
  CharacterScreen,
  ContinueScreen,
  MapScreen,
  QuestScreen,
  TrophyScreen,
} from "@/components/game/sections";
import { TitleScreen } from "@/components/game/title-screen";
import type { Lang } from "@/content/types";

type GameHomeProps = { lang: Lang };

/** Résumé and portfolio in one run: title, map, character, quests, trophies, contact. */
export function GameHome({ lang }: GameHomeProps) {
  return (
    <GameShell lang={lang}>
      <TitleScreen lang={lang} />
      <MapScreen lang={lang} />
      <CharacterScreen lang={lang} />
      <QuestScreen lang={lang} />
      <TrophyScreen lang={lang} />
      <ContinueScreen lang={lang} />
    </GameShell>
  );
}
