import Link from "next/link";
import type { ReactNode } from "react";

import { PlayerSprite, TrophyGlyph } from "@/components/game/pixel-art";
import { WorldMap, type WorldMapCopy } from "@/components/game/world-map";
import { CorrectionHistory } from "@/components/site/correction-history";
import { game } from "@/content/game";
import { poLanding } from "@/content/po-landing";
import { resume } from "@/content/resume";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import {
  buildQuests,
  buildStages,
  buildStats,
  buildTrophies,
  currentStage,
  displayName,
  GAME_PATHS,
  mapPathForStage,
} from "@/lib/game";
import { formatMonthRange } from "@/lib/duration";
import { localizePath } from "@/lib/paths";

type SectionProps = { lang: Lang };

type ScreenHeaderProps = {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: string;
};

function ScreenHeader({ id, eyebrow, heading, intro }: ScreenHeaderProps) {
  return (
    <header className="g-screen__header">
      <p aria-hidden className="g-pixel g-eyebrow">
        {eyebrow}
      </p>
      <h2 id={`${id}-heading`} className="g-screen__title">
        {heading}
      </h2>
      {intro ? <p className="g-screen__intro">{intro}</p> : null}
    </header>
  );
}

function Screen({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="g-screen">
      <div className="g-screen__inner">{children}</div>
    </section>
  );
}

export function MapScreen({ lang }: SectionProps) {
  const copy = game.map;
  const mapCopy: WorldMapCopy = {
    boardLabel: copy.boardLabel[lang],
    stage: copy.stage,
    checkpoint: copy.checkpoint,
    of: copy.of[lang],
    status: {
      current: copy.status.current[lang],
      cleared: copy.status.cleared[lang],
      acquired: copy.status.acquired[lang],
      passed: copy.status.passed[lang],
    },
    fields: {
      period: copy.fields.period[lang],
      time: copy.fields.time[lang],
      log: copy.fields.log[lang],
      gear: copy.fields.gear[lang],
    },
    enterQuest: copy.enterQuest[lang],
    prev: copy.prev[lang],
    next: copy.next[lang],
    keyHint: copy.keyHint[lang],
    stageFound: game.progress.stageFound[lang],
    allExplored: game.progress.allExplored[lang],
  };

  return (
    <Screen id="map">
      <ScreenHeader id="map" eyebrow={copy.eyebrow} heading={copy.heading[lang]} intro={copy.intro[lang]} />
      <WorldMap stages={buildStages(lang)} copy={mapCopy} />
    </Screen>
  );
}

export function CharacterScreen({ lang }: SectionProps) {
  const copy = game.character;
  const { left } = resume;
  const sections = ui.resume.sections;
  const stats = buildStats(lang);

  const profile = [
    {
      term: sections.education[lang],
      lines: [left.education.school[lang], left.education.degree[lang], `${left.education.period[lang]}, ${left.education.status[lang]}`],
    },
    {
      term: sections.languages[lang],
      lines: [...left.languages.items.map((item) => item[lang]), left.languages.sub[lang]],
    },
    {
      term: sections.military[lang],
      lines: [left.military.status[lang], left.military.period[lang]],
    },
    {
      term: sections.activities[lang],
      lines: left.activities.flatMap((item) => [
        item.name[lang],
        formatMonthRange(item.dateRange, lang, resume.presentLabel[lang]),
      ]),
    },
  ];

  return (
    <Screen id="character">
      <ScreenHeader id="character" eyebrow={copy.eyebrow} heading={copy.heading[lang]} />

      <div className="g-sheet">
        <div className="g-sheet__id g-frame">
          <div className="g-portrait">
            <PlayerSprite className="g-portrait__sprite" label={copy.portraitAlt[lang]} />
          </div>
          <div>
            <p className="g-sheet__name">{displayName(lang)}</p>
            <dl className="g-sheet__facts">
              <div>
                <dt className="g-pixel">{copy.classLabel[lang]}</dt>
                <dd>{site.positioningTitle[lang]}</dd>
              </div>
              <div>
                <dt className="g-pixel">{copy.guildLabel[lang]}</dt>
                <dd>{currentStage(lang)?.company ?? site.worksFor}</dd>
              </div>
              <div>
                <dt className="g-pixel">{copy.originLabel[lang]}</dt>
                <dd>
                  {left.education.school[lang]}, {left.education.degree[lang]}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="g-sheet__stats">
          <h3 className="g-pixel g-label">{copy.statsHeading[lang]}</h3>
          <dl className="g-stats">
            {stats.map((stat) => (
              <div key={stat.id} className="g-stat g-frame" data-stat={stat.id}>
                <dt className="g-stat__label">{stat.label}</dt>
                <dd className="g-stat__value">
                  <span className="g-pixel">{stat.value}</span>
                  {stat.unit ? <span className="g-pixel g-stat__unit">{stat.unit}</span> : null}
                </dd>
                <dd className="g-stat__note">
                  {stat.detail ? <span className="g-stat__detail">{stat.detail}. </span> : null}
                  {stat.note}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="g-sheet__inventory">
          <h3 className="g-pixel g-label">
            {copy.inventoryHeading[lang]} <span className="g-label__sub">{copy.inventorySub[lang]}</span>
          </h3>
          <div className="g-inventory">
            {left.skillGroups.map((group) => (
              <div key={group.title.en} className="g-slot g-frame">
                <h4 className="g-slot__title">{group.title[lang]}</h4>
                <ul className="g-tags">
                  {group.tags.map((tag) => (
                    <li key={tag} className="g-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="g-note">{copy.noLevels[lang]}</p>
        </div>

        <div className="g-sheet__profile">
          <h3 className="g-pixel g-label">{copy.profileHeading[lang]}</h3>
          <dl className="g-profile">
            {profile.map((row) => (
              <div key={row.term}>
                <dt>{row.term}</dt>
                {row.lines.map((line) => (
                  <dd key={line}>{line}</dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Screen>
  );
}

export function QuestScreen({ lang }: SectionProps) {
  const copy = game.quests;
  const quests = buildQuests(lang);
  const active = currentStage(lang);
  const activeLanding = poLanding.experience.items.find((item) => item.id === active?.id);

  return (
    <Screen id="quests">
      <ScreenHeader id="quests" eyebrow={copy.eyebrow} heading={copy.heading[lang]} intro={copy.intro[lang]} />

      <ol className="g-quests">
        {active && activeLanding ? (
          <li className="g-quest g-frame" data-active>
            <div className="g-quest__head">
              <span className="g-pixel g-quest__num">{active.mapLabel}</span>
              <span className="g-chip g-chip--accent">{copy.active[lang]}</span>
            </div>
            <h3 className="g-quest__title">{activeLanding.title[lang]}</h3>
            <p className="g-quest__body">{activeLanding.body[lang]}</p>
            <div className="g-quest__foot">
              <Link href={mapPathForStage(active.id, lang)} className="g-btn g-btn--sm">
                {copy.viewStage[lang]}
              </Link>
            </div>
          </li>
        ) : null}

        {quests.map((quest) => (
          <li key={quest.slug} className="g-quest g-frame">
            <div className="g-quest__head">
              <span className="g-pixel g-quest__num">
                {copy.quest} {quest.num}
              </span>
              <span className="g-chip g-chip--plain">{copy.completed[lang]}</span>
              {quest.acquired ? <span className="g-chip g-chip--accent">{game.map.status.acquired[lang]}</span> : null}
            </div>
            <h3 className="g-quest__title">
              <Link href={quest.href} className="g-quest__link">
                {quest.title}
              </Link>
            </h3>
            <p className="g-quest__body">{quest.body}</p>
            <div className="g-quest__foot">
              <div className="g-reward">
                <p className="g-pixel g-reward__label">{copy.reward[lang]}</p>
                <p className="g-reward__value">
                  <span className="g-pixel">{quest.metric.value}</span>
                  {quest.metric.unit ? <span className="g-reward__unit">{quest.metric.unit}</span> : null}
                </p>
                <p className="g-reward__caption">
                  {[quest.metric.label, quest.metric.caveat, quest.metric.comparison].filter(Boolean).join(", ")}
                </p>
              </div>
              <Link href={quest.href} className="g-btn g-btn--primary" aria-hidden tabIndex={-1}>
                {copy.enter[lang]} <span>▶</span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </Screen>
  );
}

export function TrophyScreen({ lang }: SectionProps) {
  const copy = game.trophies;

  return (
    <Screen id="trophies">
      <ScreenHeader id="trophies" eyebrow={copy.eyebrow} heading={copy.heading[lang]} intro={copy.intro[lang]} />
      <ul className="g-trophies">
        {buildTrophies(lang).map((trophy) => (
          <li key={trophy.id} className="g-trophy g-frame">
            <TrophyGlyph icon={trophy.icon} className="g-trophy__glyph" />
            <div>
              <p className="g-trophy__title">{trophy.title}</p>
              <p className="g-trophy__sub">{trophy.sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

export function ContinueScreen({ lang }: SectionProps) {
  const copy = game.continueScreen;
  const { contact } = poLanding;

  const links = [
    { term: ui.contact.email[lang], href: `mailto:${contact.email}`, value: contact.email, external: false },
    { term: ui.contact.linkedin[lang], href: contact.linkedin, value: contact.linkedin, external: true },
    { term: ui.contact.github[lang], href: contact.github, value: contact.github, external: true },
  ];

  return (
    <Screen id="contact">
      <ScreenHeader
        id="contact"
        eyebrow={copy.eyebrow}
        heading={contact.heading[lang]}
        intro={contact.body[lang]}
      />
      <div className="g-continue">
        <dl className="g-contact">
          {links.map((link) => (
            <div key={link.term}>
              <dt className="g-pixel">{link.term}</dt>
              <dd>
                <a
                  href={link.href}
                  rel={link.external ? "noreferrer" : undefined}
                  target={link.external ? "_blank" : undefined}
                  className="g-link"
                >
                  {link.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
        <div className="g-continue__ctas">
          <Link href={localizePath(GAME_PATHS.pdf, lang)} className="g-btn g-btn--primary">
            {copy.pdfCta[lang]}
          </Link>
          <Link href={localizePath(GAME_PATHS.resume, lang)} className="g-btn">
            {copy.plainCta[lang]}
          </Link>
        </div>
      </div>

      <div className="g-patch">
        <p aria-hidden className="g-pixel g-eyebrow">
          {copy.patchNotes}
        </p>
        <CorrectionHistory lang={lang} />
      </div>
    </Screen>
  );
}

export function GameFooter({ lang }: SectionProps) {
  return (
    <footer className="g-footer">
      <p className="g-pixel">
        © {new Date().getFullYear()} {displayName(lang)}
      </p>
    </footer>
  );
}
