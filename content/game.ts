import type { L } from './types'

/**
 * Copy for the game layer (title screen, map, character sheet, quest log,
 * trophies, PDF viewer). Owner request 2026-11-26: merge résumé and portfolio
 * into one site that plays like a game.
 *
 * No new facts live here. Every career fact, date, and number is read from
 * resume.ts, po-landing.ts, cases/, and site.ts. The only text in this file is
 * game chrome, plus trophy titles that restate facts already in those modules
 * (each one names its source).
 *
 * Rule carried over from the 2026-07-30 correction (commit 4fe9ee9): no skill
 * levels, no score bars, no invented numbers. Every number the game shows is a
 * count of content items or a duration computed from date ranges.
 */

export type MenuItemId = 'continue' | 'start' | 'character' | 'quests' | 'pdf' | 'plain'

export interface MenuItemCopy {
  id: MenuItemId
  /** Latin-only pixel label; decorative, hidden from assistive tech. */
  pixel: string
  label: L
}

export interface StatCopy {
  label: L
  note: L
}

export type TrophyIcon = 'flag' | 'coin' | 'star' | 'scroll' | 'chip' | 'shield' | 'bubble' | 'key'

export interface TrophyCopy {
  id: string
  icon: TrophyIcon
  title: L
  sub: L
  /** Where the fact comes from, for review. Never rendered. */
  source: string
}

const AWARD_ICON: TrophyIcon = 'star'
const CERT_ICON: TrophyIcon = 'key'
const MILITARY_ICON: TrophyIcon = 'shield'
const LANGUAGE_ICON: TrophyIcon = 'bubble'

export const game = {
  skip: {
    banner: {
      ko: '채용 담당자이신가요? 게임 없이 일반 이력서로 바로 볼 수 있습니다.',
      en: 'Recruiting? Skip the game and read the plain résumé.',
    },
    link: { ko: '일반 이력서 보기', en: 'Read the plain résumé' },
    toContent: { ko: '본문으로 건너뛰기', en: 'Skip to main content' },
    navLabel: { ko: '바로가기', en: 'Shortcuts' },
  },

  hud: {
    home: { ko: '타이틀 화면으로', en: 'Back to title screen' },
    nav: { ko: '게임 메뉴', en: 'Game menu' },
    map: { ko: '지도', en: 'Map' },
    character: { ko: '캐릭터', en: 'Character' },
    quests: { ko: '퀘스트', en: 'Quests' },
    trophies: { ko: '업적', en: 'Trophies' },
    pdf: { ko: 'PDF', en: 'PDF' },
    plain: { ko: '이력서', en: 'Résumé' },
    explored: { ko: '탐험한 스테이지', en: 'Stages explored' },
  },

  title: {
    eyebrow: { ko: 'CAREER RUN', en: 'CAREER RUN' },
    nowPlaying: { ko: '현재', en: 'Now' },
    pressStart: 'PRESS START',
    menuLabel: { ko: '시작 메뉴', en: 'Start menu' },
    menu: [
      { id: 'continue', pixel: 'CONTINUE', label: { ko: '이어서 하기', en: 'Continue' } },
      { id: 'start', pixel: 'START', label: { ko: '모험 시작', en: 'Start the run' } },
      { id: 'character', pixel: 'CHARACTER', label: { ko: '캐릭터 정보', en: 'Character sheet' } },
      { id: 'quests', pixel: 'QUESTS', label: { ko: '퀘스트 기록', en: 'Quest log' } },
      { id: 'pdf', pixel: 'PDF', label: { ko: '이력서 PDF', en: 'Résumé PDF' } },
      { id: 'plain', pixel: 'SKIP', label: { ko: '일반 이력서로 보기', en: 'Plain résumé' } },
    ] satisfies MenuItemCopy[],
    keyHint: { ko: '↑ ↓ 이동  /  Enter 선택', en: '↑ ↓ move  /  Enter select' },
    touchHint: { ko: '메뉴를 탭해서 시작하세요', en: 'Tap a menu item to begin' },
  },

  map: {
    eyebrow: 'WORLD MAP',
    heading: { ko: '경력 지도', en: 'Career map' },
    intro: {
      ko: '지금까지 거쳐 온 스테이지입니다. 하나를 골라 그곳에서 무엇을 했는지 확인하세요.',
      en: 'Every stage of the run so far. Pick one to see what happened there.',
    },
    keyHint: { ko: '← → 이동  /  Enter 퀘스트 입장', en: '← → move  /  Enter opens the quest' },
    boardLabel: { ko: '스테이지 선택', en: 'Stage select' },
    stage: 'STAGE',
    checkpoint: 'CHECKPOINT',
    of: { ko: '중', en: 'of' },
    status: {
      current: { ko: '진행 중', en: 'NOW PLAYING' },
      cleared: { ko: '클리어', en: 'CLEARED' },
      acquired: { ko: '매각', en: 'ACQUIRED' },
      passed: { ko: '통과', en: 'PASSED' },
    },
    fields: {
      period: { ko: '기간', en: 'Period' },
      time: { ko: '플레이 시간', en: 'Time played' },
      log: { ko: '한 일', en: 'What I did' },
      gear: { ko: '장비', en: 'Gear' },
    },
    enterQuest: { ko: '퀘스트 입장', en: 'Enter quest' },
    prev: { ko: '이전 스테이지', en: 'Previous stage' },
    next: { ko: '다음 스테이지', en: 'Next stage' },
  },

  character: {
    eyebrow: 'CHARACTER',
    heading: { ko: '캐릭터 정보', en: 'Character sheet' },
    portraitAlt: {
      ko: '노트를 든 픽셀 캐릭터로 그린 박병영',
      en: 'Byungyoung Park drawn as a pixel character holding a notebook',
    },
    classLabel: { ko: '클래스', en: 'Class' },
    guildLabel: { ko: '소속', en: 'Guild' },
    originLabel: { ko: '출신', en: 'Origin' },
    statsHeading: { ko: '스탯', en: 'Stats' },
    stats: {
      xp: {
        label: { ko: '경험치', en: 'XP' },
        note: {
          ko: '역할을 맡은 1개월마다 1 XP. 스테이지 기간으로 빌드 시점에 계산합니다.',
          en: '1 XP per month in a role, computed from the stage dates at build time.',
        },
      },
      stages: {
        label: { ko: '스테이지', en: 'Stages' },
        note: { ko: '거쳐 온 회사와 팀', en: 'Companies and teams' },
      },
      quests: {
        label: { ko: '퀘스트', en: 'Quests' },
        note: { ko: '공개한 케이스 스터디', en: 'Published case studies' },
      },
      acquired: {
        label: { ko: '창업 후 매각', en: 'Founded, then acquired' },
        note: { ko: '공동창업한 두 곳 모두', en: 'Both companies I co-founded' },
      },
      certs: {
        label: { ko: '자격증', en: 'Certifications' },
        note: { ko: '한국데이터산업진흥원', en: 'Korea Data Agency' },
      },
      awards: {
        label: { ko: '수상', en: 'Awards' },
        note: { ko: '대회와 장학금', en: 'Competitions and a scholarship' },
      },
    } satisfies Record<string, StatCopy>,
    xpUnit: 'XP',
    inventoryHeading: { ko: '인벤토리', en: 'Inventory' },
    inventorySub: { ko: '가지고 다니는 기술', en: 'Skills carried' },
    noLevels: {
      ko: '스킬 레벨과 숫자 바는 일부러 넣지 않았습니다. 근거 없는 수치는 2026년 7월 이 사이트에서 걷어냈고, 게임도 그 규칙을 지킵니다.',
      en: 'No skill levels or bars, on purpose. Numbers without evidence were taken off this site in July 2026, and the game keeps that rule.',
    },
    profileHeading: { ko: '프로필', en: 'Profile' },
  },

  quests: {
    eyebrow: 'QUEST LOG',
    heading: { ko: '퀘스트 기록', en: 'Quest log' },
    intro: {
      ko: '결정의 근거와 기각한 선택지까지 남긴 케이스 스터디입니다.',
      en: 'Case studies that keep the reasons behind each decision, including the options I rejected.',
    },
    quest: 'QUEST',
    completed: { ko: '완료', en: 'COMPLETED' },
    active: { ko: '진행 중', en: 'IN PROGRESS' },
    enter: { ko: '퀘스트 입장', en: 'Enter quest' },
    viewStage: { ko: '지도에서 보기', en: 'View on the map' },
    reward: { ko: '보상', en: 'Reward' },
    sections: {
      briefing: { ko: '브리핑', en: 'Briefing' },
      objectives: { ko: '진행 단계', en: 'Objectives' },
      paths: { ko: '가지 않은 길', en: 'Paths not taken' },
      rewards: { ko: '결과', en: 'Rewards' },
      lessons: { ko: '배운 것', en: 'Lessons' },
    },
    pathsNote: {
      ko: '검토했지만 고르지 않은 선택지와 그 이유입니다.',
      en: 'Options I weighed and turned down, and why.',
    },
    fieldNote: { ko: '현장 메모', en: 'Field note' },
    backToMap: { ko: '지도로 돌아가기', en: 'Back to the map' },
    prevQuest: { ko: '이전 퀘스트', en: 'Previous quest' },
    nextQuest: { ko: '다음 퀘스트', en: 'Next quest' },
  },

  trophies: {
    eyebrow: 'TROPHIES',
    heading: { ko: '업적', en: 'Achievements' },
    intro: {
      ko: '실제로 있었던 일만 올렸습니다. 출처는 모두 이 사이트의 이력서와 케이스 스터디입니다.',
      en: 'Only things that actually happened, each one taken from the résumé and case studies on this site.',
    },
    items: [
      {
        id: 'founder-high-school',
        icon: 'flag',
        title: { ko: '고등학생 때 첫 창업', en: 'Founded a company in high school' },
        sub: { ko: 'OSOF 공동창업, 2016', en: 'Co-founded OSOF, 2016' },
        source: 'cases/osof.ts context[1] + resume.experience.osof.dateRange',
      },
      {
        id: 'acquired-osof',
        icon: 'coin',
        title: { ko: 'OSOF 매각', en: 'OSOF acquired' },
        sub: { ko: '2018년 사업과 지분 매각', en: 'Business and equity sold, 2018' },
        source: 'cases/osof.ts results[3] + resume.experience.osof.exit',
      },
      {
        id: 'acquired-paik',
        icon: 'coin',
        title: { ko: 'Paik 매각', en: 'Paik acquired' },
        sub: { ko: '2021년 지분 매각', en: 'Equity sold, 2021' },
        source: 'cases/paik.ts metrics[0].caveat + resume.experience.paik.exit',
      },
      {
        id: 'patent',
        icon: 'scroll',
        title: { ko: '특허 출원, 등록, 매각', en: 'Patent filed, granted, sold' },
        sub: { ko: 'OSOF IoT 도난방지 장치', en: 'OSOF IoT anti-theft device' },
        source: 'resume.experience.osof.bullets[3]',
      },
      {
        id: 'play-store',
        icon: 'chip',
        title: { ko: 'Play 스토어 앱 출시', en: 'Shipped an app on Google Play' },
        sub: { ko: '도난방지 장치 제어 앱, PCB 직접 설계', en: 'Companion app for the anti-theft device, own PCB design' },
        source: 'resume.experience.osof.bullets[2]',
      },
      {
        id: 'curi-three',
        icon: 'star',
        title: { ko: '제품 3종 직접 출시', en: 'Three products shipped' },
        sub: { ko: 'CURI AI: EMAIL-CURI, ASKCURI, CUNNECT', en: 'CURI AI: EMAIL-CURI, ASKCURI, CUNNECT' },
        source: 'resume.experience.curi.bullets[1]',
      },
    ] satisfies TrophyCopy[],
    awardIcon: AWARD_ICON,
    certIcon: CERT_ICON,
    militaryIcon: MILITARY_ICON,
    languageIcon: LANGUAGE_ICON,
  },

  progress: {
    heading: { ko: '나의 진행도', en: 'Your progress' },
    stageFound: { ko: '스테이지 발견', en: 'Stage discovered' },
    questEntered: { ko: '퀘스트 입장', en: 'Quest entered' },
    allExplored: {
      ko: '모든 스테이지를 탐험했습니다. 플레이해 주셔서 감사합니다.',
      en: 'Every stage explored. Thanks for playing.',
    },
    reset: { ko: '진행도 초기화', en: 'Reset progress' },
  },

  continueScreen: {
    eyebrow: 'CONTINUE?',
    pdfCta: { ko: '이력서 PDF', en: 'Résumé PDF' },
    plainCta: { ko: '일반 이력서', en: 'Plain résumé' },
    patchNotes: 'PATCH NOTES',
  },

  pdf: {
    eyebrow: 'SAVE FILE',
    heading: { ko: '이력서 PDF', en: 'Résumé PDF' },
    intro: {
      ko: '이 사이트의 일반 이력서와 같은 내용을 PDF로 만든 파일입니다.',
      en: 'The plain résumé on this site, as a PDF.',
    },
    download: { ko: 'PDF 다운로드', en: 'Download PDF' },
    open: { ko: '새 탭에서 열기', en: 'Open in a new tab' },
    otherLang: { ko: 'English PDF', en: '한국어 PDF' },
    viewerLabel: { ko: '이력서 PDF 미리보기', en: 'Résumé PDF preview' },
    loading: { ko: 'PDF를 불러오는 중입니다', en: 'Loading the PDF' },
    error: {
      ko: '이 브라우저에서 PDF를 표시하지 못했습니다. 다운로드하거나 새 탭에서 열어 주세요.',
      en: "This browser couldn't display the PDF here. Download it or open it in a new tab.",
    },
    pageLabel: { ko: '쪽', en: 'Page' },
    zoomIn: { ko: '확대', en: 'Zoom in' },
    zoomOut: { ko: '축소', en: 'Zoom out' },
    zoomReset: { ko: '화면 너비에 맞추기', en: 'Fit to width' },
    backToGame: { ko: '게임으로 돌아가기', en: 'Back to the game' },
    meta: {
      title: { ko: '박병영 이력서 PDF', en: 'Byungyoung Park Résumé PDF' },
      description: {
        ko: '박병영 이력서 PDF 보기와 다운로드',
        en: "View and download Byungyoung Park's résumé as a PDF",
      },
    },
  },
}
