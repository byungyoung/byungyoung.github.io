import type { MarginNote } from './types'

export const notes: MarginNote[] = [
  {
    id: 'about-gate',
    anchor: 'home.about',
    text: {
      ko: '이 사이트도 그 게이트에 걸린 적이 있다. 기록은 아래 changelog에.',
      en: 'This site has failed that gate before. The record is below.',
    },
    status: 'approved',
    evidence: 'content/changelog.ts — self-referential correction record',
  },
  {
    id: 'exp-xitst-92',
    anchor: 'home.experience.xitst',
    text: {
      ko: '내가 잰 값이 아니다. 그래서 "설계 기준"이라고 쓴다.',
      en: "Not a number I measured — which is why it says 'design target.'",
    },
    status: 'approved',
    evidence: 'assets/js/i18n.js exp.e2.desc + commit 78507f6',
  },
  {
    id: 'exp-refactorworks',
    anchor: 'home.experience.refactorworks',
    text: {
      ko: '두 달짜리 경력이다. 빼는 게 깔끔했겠지만, 기록이니까 남긴다.',
      en: 'A two-month job. Dropping it would look cleaner; this is a record, so it stays.',
    },
    status: 'approved',
    evidence: 'index.html exp.e3 timeline entry (2025.02 — 2025.03), owner accepted',
  },
  {
    id: 'exp-osof-duration',
    anchor: 'home.experience.osof',
    text: {
      ko: '기간 표기가 페이지마다 달랐다. 지금은 한 값이다.',
      en: "This duration used to differ from page to page. Now it's one value.",
    },
    status: 'approved',
    evidence: 'i18n.js exp.e6.desc vs po/cases/osof.html Result (2년 7개월) — reconciled to 2년 6개월',
  },
  {
    id: 'po-metric-92',
    anchor: 'po.metrics.rppg',
    text: {
      ko: '한때 자체 측정처럼 써놨었다. 2026-07-30에 고쳤다.',
      en: 'This used to read like a number I\'d measured myself. Fixed on 2026-07-30.',
    },
    status: 'approved',
    evidence: 'po/index.html metrics-strip + commit 78507f6',
  },
  {
    id: 'po-metric-85',
    anchor: 'po.metrics.usability',
    text: {
      ko: "'만족도 85%'라고 썼다가 정정했다. 조사와 평가는 다르다.",
      en: "Originally written as '85% satisfaction,' then corrected. A survey and an evaluation are not the same thing.",
    },
    status: 'approved',
    evidence: 'po/index.html metrics-strip + commit 78507f6',
  },
  {
    id: 'case-xitst-92',
    anchor: 'case.xitst.result',
    text: {
      ko: '이 페이지의 예전 버전은 이 숫자를 자체 측정처럼 썼다. 커밋 78507f6에서 고쳤다.',
      en: "An earlier version of this page presented this number as something I'd measured myself. Fixed in commit 78507f6.",
    },
    status: 'approved',
    evidence: 'po/cases/xitst.html Result section + commit 78507f6',
  },
  {
    id: 'case-lingora-85',
    anchor: 'case.lingora.result',
    text: {
      ko: '85점의 기준은 사내 평가다. 외부 벤치마크가 아니다.',
      en: 'The 85-point score is an internal evaluation, not an external benchmark.',
    },
    status: 'draft',
    evidence: 'po/cases/lingora.html Result section — usability score basis not documented, owner review pending',
  },
  {
    id: 'case-paik-scope',
    anchor: 'case.paik.process',
    text: {
      ko: '처음 계획은 이것보다 컸다. 줄인 게 살렸다.',
      en: 'The original plan was bigger than this. Cutting it down is what made it work.',
    },
    status: 'draft',
    evidence: 'po/cases/paik.html Process#2 MVP 설계 — original scope not documented in source, owner review pending',
  },
  {
    id: 'case-osof-honesty',
    anchor: 'case.osof.context',
    text: {
      ko: "예전 버전은 이 사업을 '교육봉사 단체'라고 소개했다. 실제로는 매각까지 간 사업이다. 그것도 고쳤다.",
      en: "An earlier version described this as an 'educational volunteer group.' It was actually a business that sold. Fixed that too.",
    },
    status: 'approved',
    evidence: 'commit dc0c044 CV alignment pass',
  },
  {
    id: 'case-osof-team-ops',
    anchor: 'case.osof.process',
    text: {
      ko: '팀 운영 세부(구성원 모집 방식 등)는 오너 확인 전까지 일반적인 서술로만 남겼다.',
      en: 'Team-operations detail (how members were recruited, etc.) is left general pending owner confirmation.',
    },
    status: 'draft',
    evidence: '오너 확인 필요: 팀 운영 세부',
  },
  {
    id: 'resume-duration-computed',
    anchor: 'resume.metrics.total',
    text: {
      ko: '이 숫자는 날짜에서 계산된다. 손으로 고치는 걸 멈췄다.',
      en: 'This number is computed from dates. I stopped hand-editing it.',
    },
    status: 'approved',
    evidence: 'content/resume.ts experience[].dateRange — total computed at build time, not stored',
  },
]
