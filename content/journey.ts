import type { L } from './types'

/**
 * Copy and staging for the journey (owner direction 2026-11-27: no scrolling,
 * one calm scene, walk from place to place; arriving opens that quest).
 *
 * No career facts live here except trophy lines, and every trophy restates a
 * line from content/resume.ts or cases/ (see `source`). Numbers the journey
 * shows are computed: XP is months in a role, a level is twelve of them.
 */

export type LandmarkKind = 'workshop' | 'townhouses' | 'gate' | 'library' | 'observatory' | 'beacon'

export interface TrophyCopy {
  title: L
  sub: L
  /** Where the fact comes from, for review. Never rendered. */
  source: string
}

export interface PlaceStaging {
  landmark: LandmarkKind
  /** What the place is in the world. Descriptive only, not a claim. */
  landmarkName: L
  /** Sky at this point of the day: [top, bottom]. The run starts at dawn and arrives at night. */
  sky: [string, string]
  trophies: TrophyCopy[]
}

export const MILITARY_PLACE_ID = 'military'

export const placeStaging: Record<string, PlaceStaging> = {
  osof: {
    landmark: 'workshop',
    landmarkName: { ko: '작은 공방 교실', en: 'A small workshop classroom' },
    sky: ['#f4dcc0', '#dfe3e6'],
    trophies: [
      {
        title: { ko: '고등학생 때 첫 창업', en: 'First company, founded in high school' },
        sub: { ko: 'OSOF 공동창업, 2016', en: 'Co-founded OSOF, 2016' },
        source: 'cases/osof.ts context[1] + resume.experience.osof.dateRange',
      },
      {
        title: { ko: '특허 출원, 등록, 매각', en: 'Patent filed, granted, sold' },
        sub: { ko: 'IoT 도난방지 장치', en: 'IoT anti-theft device' },
        source: 'resume.experience.osof.bullets.ko[4], .en[0]',
      },
      {
        title: { ko: '2018년 사업과 지분 매각', en: 'Business sold, 2018' },
        sub: { ko: '창업 후 약 2년 6개월 운영', en: 'Ran it for 2.5 years' },
        source: 'resume.experience.osof.summary + exit',
      },
    ],
  },
  paik: {
    landmark: 'townhouses',
    landmarkName: { ko: '외국인 이웃의 집들', en: 'Houses for new neighbors' },
    sky: ['#e3edf2', '#cfdfe7'],
    trophies: [
      {
        title: { ko: '0→1 구축, 2021년 지분 매각', en: '0→1, equity sold in 2021' },
        sub: { ko: '팀과 서비스는 인수사로 이관', en: 'Team and service moved to the acquirer' },
        source: 'resume.experience.paik.summary + bullets.en[0]',
      },
      {
        title: { ko: '첫 에이전트 5명 영입', en: 'First five agents recruited' },
        sub: { ko: '외국인 전문 중개 에이전트', en: 'Agents specializing in foreign clients' },
        source: 'resume.experience.paik.bullets.ko[3], .en[0]',
      },
    ],
  },
  military: {
    landmark: 'gate',
    landmarkName: { ko: '돌 관문', en: 'A stone gate' },
    sky: ['#dbe7ec', '#b8cfda'],
    trophies: [
      {
        title: { ko: '병역필', en: 'Military service completed' },
        sub: { ko: '18개월', en: '18 months' },
        source: 'resume.left.military',
      },
    ],
  },
  lingora: {
    landmark: 'library',
    landmarkName: { ko: '말하는 책의 탑', en: 'A tower of talking books' },
    sky: ['#efe6d4', '#d9ccb2'],
    trophies: [
      {
        title: { ko: '학습 효율 20% 향상', en: 'Learning efficiency up 20%' },
        sub: { ko: 'A/B 테스트를 거친 배포', en: 'Shipped behind an A/B test' },
        source: 'resume.experience.lingora.bullets.ko[2], .en[0]',
      },
      {
        title: { ko: '사용성 평가 85점', en: 'Usability evaluation 85' },
        sub: { ko: '입력 폼 항목 40% 축소', en: 'Form fields cut 40%' },
        source: 'resume.experience.lingora.bullets.ko[1..2], .en[0]',
      },
    ],
  },
  xitst: {
    landmark: 'observatory',
    landmarkName: { ko: '렌즈가 달린 관측소', en: 'An observatory with one lens' },
    sky: ['#f1cf9f', '#cf9f7a'],
    trophies: [
      {
        title: { ko: '카메라로 생체신호 5종 측정', en: 'Five vital signs from a camera' },
        sub: { ko: '심박수, HRV, 산소포화도, 체온, 호흡수', en: 'Heart rate, HRV, oxygen saturation, temperature, breathing' },
        source: 'resume.experience.xitst.bullets.ko[1]',
      },
      {
        title: { ko: '웹에서 데스크톱, 모바일, Figma까지', en: 'Web to desktop, mobile and Figma' },
        sub: { ko: '제품군 확장', en: 'One product, four surfaces' },
        source: 'resume.experience.xitst.bullets.ko[0], .en[0]',
      },
    ],
  },
  curi: {
    landmark: 'beacon',
    landmarkName: { ko: '목소리를 비추는 등대', en: 'A beacon that carries voices' },
    sky: ['#2e3550', '#151a2b'],
    trophies: [
      {
        title: { ko: '리서치 비용 90% 이상 절감', en: 'Research cost cut 90%+' },
        sub: { ko: '기간은 80% 이상 단축', en: 'Turnaround cut 80%+' },
        source: 'resume.experience.curi.bullets.ko[2], .en[1]',
      },
      {
        title: { ko: '9개월 만에 신규 SaaS 출시', en: 'New SaaS live within nine months' },
        sub: { ko: '총마진 90% 이상 구조', en: 'Sellable at 90%+ gross margin' },
        source: 'resume.experience.curi.bullets.ko[3], .en[2]',
      },
    ],
  },
}

export const journey = {
  skip: {
    plain: { ko: '일반 이력서로 보기', en: 'Plain résumé' },
    toContent: { ko: '여정 건너뛰고 이력서 읽기', en: 'Skip the journey, read the résumé' },
  },

  title: {
    eyebrow: { ko: '경력 여정', en: 'A career journey' },
    begin: { ko: '여정 시작', en: 'Begin the journey' },
    resume: { ko: '이어서 걷기', en: 'Continue the journey' },
    restart: { ko: '처음부터', en: 'Start over' },
    hint: {
      ko: '장소를 누르거나, 옆으로 밀거나, ← → 키로 이동합니다.',
      en: 'Tap a place, swipe, or use ← → to travel.',
    },
  },

  hud: {
    nav: { ko: '여정 메뉴', en: 'Journey menu' },
    home: { ko: '처음 화면으로', en: 'Back to the start' },
    character: { ko: '캐릭터', en: 'Character' },
    pdf: { ko: 'PDF', en: 'PDF' },
    plain: { ko: '이력서', en: 'Résumé' },
    level: 'LV',
    xp: 'XP',
    xpLabel: { ko: '모은 경험치', en: 'Experience collected' },
  },

  places: {
    listLabel: { ko: '여정의 장소', en: 'Places on the journey' },
    stage: { ko: '스테이지', en: 'Stage' },
    checkpoint: { ko: '체크포인트', en: 'Checkpoint' },
    locked: { ko: '잠김', en: 'locked' },
    cleared: { ko: '클리어', en: 'cleared' },
    here: { ko: '현재 위치', en: 'you are here' },
    lockedHint: {
      ko: '앞의 퀘스트를 마치면 길이 열립니다.',
      en: 'Clear the quest here to open the path.',
    },
    nextHint: { ko: '다음 장소', en: 'Next' },
  },

  quest: {
    accepted: { ko: '퀘스트 수락', en: 'Quest accepted' },
    inProgress: { ko: '진행 중', en: 'In progress' },
    cleared: { ko: '클리어', en: 'Cleared' },
    nowPlaying: { ko: '지금 여기', en: 'Now playing' },
    acquired: { ko: '매각', en: 'Acquired' },
    pages: {
      record: { ko: '기록', en: 'On the record' },
      briefing: { ko: '브리핑', en: 'Briefing' },
      objectives: { ko: '진행 단계', en: 'Objectives' },
      paths: { ko: '가지 않은 길', en: 'Paths not taken' },
      rewards: { ko: '결과와 배운 것', en: 'Rewards and lessons' },
      checkpoint: { ko: '체크포인트', en: 'Checkpoint' },
    },
    pathsNote: {
      ko: '검토했지만 고르지 않은 선택지와 그 이유입니다.',
      en: 'Options I weighed and turned down, and why.',
    },
    checkpointNote: {
      ko: '두 스테이지 사이의 관문입니다. 통과하면 다음 길이 열립니다.',
      en: 'A gate between two stages. Pass it to open the next path.',
    },
    metricLabel: { ko: '보상', en: 'Reward' },
    back: { ko: '이전', en: 'Back' },
    next: { ko: '다음', en: 'Next' },
    complete: { ko: '퀘스트 완료', en: 'Complete quest' },
    skip: { ko: '건너뛰기', en: 'Skip' },
    readPage: { ko: '한 페이지로 읽기', en: 'Read as a page' },
    close: { ko: '닫기', en: 'Close' },
    progress: { ko: '진행도', en: 'Progress' },
    time: { ko: '머문 기간', en: 'Time there' },
  },

  clear: {
    title: 'QUEST CLEAR',
    checkpoint: 'CHECKPOINT',
    xpGain: { ko: '경험치', en: 'XP gained' },
    xpNote: {
      ko: '그곳에서 보낸 1개월마다 1 XP',
      en: '1 XP for every month spent there',
    },
    levelUp: 'LEVEL UP',
    levelNote: { ko: '12 XP가 1년, 1년이 1레벨', en: '12 XP is a year, and a year is a level' },
    yearsSuffix: { ko: '년 치 경험', en: 'years of experience' },
    trophies: { ko: '획득한 업적', en: 'Trophies' },
    continue: { ko: '계속', en: 'Continue' },
    skipHint: { ko: '아무 곳이나 누르면 바로 넘어갑니다', en: 'Tap anywhere to skip' },
  },

  ending: {
    eyebrow: { ko: '지금까지의 여정', en: 'The journey so far' },
    title: { ko: '여정은 계속됩니다', en: 'The journey continues' },
    body: {
      ko: '여기까지가 지금의 기록입니다. 함께 다음 장소를 만들고 싶다면 연락 주세요.',
      en: 'That is the record so far. If you would like to build the next place together, get in touch.',
    },
    replay: { ko: '처음부터 다시', en: 'Replay the journey' },
    stats: {
      xp: { ko: '모은 경험치', en: 'XP collected' },
      quests: { ko: '클리어한 퀘스트', en: 'Quests cleared' },
      level: { ko: '레벨', en: 'Level' },
    },
  },

  character: {
    title: { ko: '캐릭터 정보', en: 'Character' },
    xpExplain: {
      ko: '경험치는 역할을 맡은 개월 수에서 빌드 시점에 계산합니다. 스킬 레벨이나 점수 바는 일부러 넣지 않았습니다.',
      en: 'XP is computed from months in a role at build time. There are no skill levels or score bars, on purpose.',
    },
    full: { ko: '전체 경력', en: 'Full career' },
    collected: { ko: '이번 여정에서 모은 것', en: 'Collected on this run' },
    sections: {
      summary: { ko: '소개', en: 'About' },
      skills: { ko: '역량', en: 'Skills' },
      education: { ko: '학력', en: 'Education' },
      military: { ko: '병역', en: 'Military service' },
      certifications: { ko: '자격', en: 'Certifications' },
      languages: { ko: '어학', en: 'Languages' },
      awards: { ko: '수상', en: 'Awards' },
      activities: { ko: '대외활동', en: 'Activities' },
      contact: { ko: '연락처', en: 'Contact' },
      patchNotes: { ko: '이 사이트의 정정 기록', en: 'Patch notes for this site' },
    },
  },

  pdf: {
    heading: { ko: '이력서 PDF', en: 'Résumé PDF' },
    intro: {
      ko: '실제로 제출하는 이력서입니다. 한국어본은 생년월일과 전화번호를 지운 공개용입니다.',
      en: 'The résumé I actually submit. The Korean edition is a public copy with the birth date and phone number removed.',
    },
    viewerLabel: { ko: '이력서 PDF 미리보기', en: 'Résumé PDF preview' },
    loading: { ko: 'PDF를 불러오는 중입니다', en: 'Loading the PDF' },
    error: {
      ko: '이 브라우저에서 PDF를 표시하지 못했습니다. 다운로드하거나 새 탭에서 열어 주세요.',
      en: "This browser couldn't display the PDF here. Download it or open it in a new tab.",
    },
    editions: { ko: '언어', en: 'Edition' },
    en: { ko: 'English (1쪽)', en: 'English (1 page)' },
    ko: { ko: '한국어 (4쪽)', en: 'Korean (4 pages)' },
    downloadEn: { ko: '영문 PDF 다운로드', en: 'Download English PDF' },
    downloadKo: { ko: '국문 PDF 다운로드', en: 'Download Korean PDF' },
    open: { ko: '새 탭에서 열기', en: 'Open in a new tab' },
    pageLabel: { ko: '쪽', en: 'Page' },
    zoomIn: { ko: '확대', en: 'Zoom in' },
    zoomOut: { ko: '축소', en: 'Zoom out' },
    zoomReset: { ko: '너비 맞춤', en: 'Fit width' },
    back: { ko: '여정으로', en: 'Back to the journey' },
    meta: {
      title: { ko: '박병영 이력서 PDF', en: 'Byungyoung Park Résumé PDF' },
      description: {
        ko: '박병영 이력서 PDF 보기와 다운로드 (국문, 영문)',
        en: "View and download Byungyoung Park's résumé as a PDF (English, Korean)",
      },
    },
  },

  questPage: {
    back: { ko: '여정으로', en: 'Back to the journey' },
    resume: { ko: '일반 이력서', en: 'Plain résumé' },
    sections: {
      context: { ko: '배경', en: 'Context' },
      process: { ko: '과정', en: 'Process' },
      rejected: { ko: '기각한 선택지', en: 'Options I rejected' },
      result: { ko: '결과', en: 'Result' },
      learned: { ko: '배운 것', en: 'What I learned' },
    },
    caseLabel: { ko: '케이스 스터디', en: 'Case study' },
    fieldNote: { ko: '여백 메모', en: 'Margin note' },
  },

  resumeCases: { ko: '케이스 스터디', en: 'Case studies' },
}
