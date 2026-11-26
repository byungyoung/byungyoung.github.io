import type { ReactNode } from "react";

import { Hud, SkipLinks } from "@/components/game/hud";
import { GameFooter } from "@/components/game/sections";
import { ToastHost } from "@/components/game/toast-host";
import type { Lang } from "@/content/types";

type GameShellProps = {
  lang: Lang;
  children: ReactNode;
};

/** `.game` switches the root tokens to the game palette (see app/game/tokens.css). */
export function GameShell({ lang, children }: GameShellProps) {
  return (
    <div className="game">
      <SkipLinks lang={lang} />
      <Hud lang={lang} />
      <main id="main" tabIndex={-1} className="g-main">
        {children}
      </main>
      <GameFooter lang={lang} />
      <ToastHost />
    </div>
  );
}
