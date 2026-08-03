import type { ContentStatus, L, Metric } from './types'
import { site } from './site'

export interface PoExperienceEntry {
  id: string
  company: L
  period: L
  roleTag: L
  title: L
  body: L
  tags: string[]
  exit: boolean
}

export interface PoCaseCard {
  slug: 'xitst' | 'lingora' | 'paik' | 'osof'
  num: string
  title: L
  body: L
  metric: Metric
  href: string
}

export interface PoLandingContent {
  meta: { title: L; description: L }
  nav: { metrics: L; experience: L; cases: L; contact: L; resumeCta: L; resumeCtaHref: string }
  hero: {
    badge: L
    titleLine1: L
    titleHighlight: L
    sub: L<string[]>
    ctaCases: L
    ctaCasesHref: string
    ctaLinkedin: L
    ctaLinkedinHref: string
  }
  metrics: Metric[]
  experience: { heading: L; sectionLabel: L; items: PoExperienceEntry[] }
  cases: { heading: L; sectionLabel: L; items: PoCaseCard[]; linkLabel: L }
  contact: {
    sectionLabel: L
    heading: L
    body: L
    email: string
    linkedinLabel: L
    linkedin: string
    githubLabel: L
    github: string
  }
  translationStatus: ContentStatus
}

export const poLanding: PoLandingContent = {
  meta: {
    title: {
      ko: `${site.name} ${site.titleSeparator} ${site.positioningTitle.ko}`,
      en: `${site.nameEn} ${site.titleSeparator} ${site.positioningTitle.en}`,
    },
    description: {
      ko: '기술을 이해하는 Technical Product Owner 박병영의 포트폴리오',
      en: "Byungyoung Park's portfolio — a Technical Product Owner who understands the engineering.",
    },
  },

  nav: {
    metrics: { ko: 'Impact', en: 'Impact' },
    experience: { ko: 'Experience', en: 'Experience' },
    cases: { ko: 'Case Studies', en: 'Case Studies' },
    contact: { ko: 'Contact', en: 'Contact' },
    resumeCta: { ko: '이력서 보기', en: 'View résumé' },
    resumeCtaHref: site.urls.resume,
  },

  hero: {
    badge: { ko: '이직 기회를 열어두고 있습니다', en: 'Open to opportunities' },
    titleLine1: { ko: '기술을 이해하는', en: 'A' },
    titleHighlight: {
      ko: `${site.positioningTitle.ko}.`,
      en: `${site.positioningTitle.en} who understands the engineering.`,
    },
    sub: {
      ko: [
        '개발자로 시작해 두 번의 창업을 거친 박병영입니다.',
        '사용자의 문제를 데이터로 정의하고, 팀이 올바른 방향으로',
        '빠르게 달릴 수 있도록 Why를 만듭니다.',
      ],
      en: [
        "I'm Byungyoung Park — started as a developer, went through two startups.",
        'I define user problems with data, and build the Why',
        'that lets a team move fast in the right direction.',
      ],
    },
    ctaCases: { ko: 'Case Studies 보기', en: 'View case studies' },
    ctaCasesHref: '#cases',
    ctaLinkedin: { ko: 'LinkedIn →', en: 'LinkedIn →' },
    ctaLinkedinHref: site.urls.linkedin,
  },

  metrics: [
    {
      value: '92',
      unit: '%',
      label: { ko: 'rPPG 감정 분류 정확도', en: 'rPPG emotion-classification accuracy' },
      caveat: { ko: '선행 연구 보고치, 설계 목표', en: 'per prior published research, design target' },
      comparison: { ko: 'Xitst 2025', en: 'Xitst 2025' },
    },
    {
      value: '85',
      label: { ko: '사용성 평가 점수', en: 'Usability evaluation score' },
      caveat: { ko: 'Lingora AI, 2024', en: 'Lingora AI, 2024' },
    },
    {
      value: '2',
      unit: '×',
      label: { ko: '스타트업 창업 및 Exit', en: 'Startups founded and exited' },
      caveat: { ko: 'OSOF, Paik', en: 'OSOF, Paik' },
    },
  ],

  experience: {
    heading: { ko: '걸어온 길', en: 'The path so far' },
    sectionLabel: { ko: 'Experience', en: 'Experience' },
    items: [
      {
        id: 'curi',
        company: { ko: 'CURI AI', en: 'CURI AI' },
        period: { ko: '2026.01 — Present', en: 'Jan 2026 — Present' },
        roleTag: { ko: 'Product Owner', en: 'Product Owner' },
        title: { ko: 'Voice-AI 대화형 리서치 플랫폼', en: 'Voice-AI conversational research platform' },
        body: {
          ko: '사람이 진행하던 심층 소비자 인터뷰를 대화형 에이전트가 대신 수행하는 B2B 리서치 제품. 제품 정의부터 구현까지 직접 담당하고, 도메인 특화 sLM의 평가 체계와 프로덕션 승격 게이트를 설계 및 운영.',
          en: 'A B2B research product where a conversational agent conducts the deep consumer interviews a human used to run. Owned everything from product definition through implementation, and designed and operate the evaluation framework and production-promotion gate for the domain-specific sLM.',
        },
        tags: ['Voice AI', 'LangGraph', 'sLM', '평가 설계'],
        exit: false,
      },
      {
        id: 'xitst',
        company: { ko: '엑시스트 (Xitst)', en: 'Xitst' },
        period: { ko: '2025.03 — 2025.12', en: 'Mar 2025 — Dec 2025' },
        roleTag: { ko: 'CTO', en: 'CTO' },
        title: { ko: 'AI 기반 원격 심리 분석 플랫폼', en: 'AI-driven remote psychological-analysis platform' },
        body: {
          ko: 'rPPG(비접촉 생체 신호) 기술로 얼굴 영상에서 감정 상태를 실시간 분석. TCI 심리 모델과 결합해 개인 맞춤형 치유 중재를 제공하는 플랫폼의 전체 제품 로드맵 설계 및 기술 실행.',
          en: 'Analyzed emotional state in real time from facial video using rPPG (non-contact biosignal) technology. Designed the full product roadmap and led the technical execution for a platform that combines this with the TCI psychological model to deliver personalized therapeutic interventions.',
        },
        tags: ['rPPG', 'AWS Serverless', 'Next.js', '감정 AI'],
        exit: false,
      },
      {
        id: 'refactorworks',
        company: { ko: 'Refactor Works', en: 'Refactor Works' },
        period: { ko: '2025.02 — 2025.03', en: 'Feb 2025 — Mar 2025' },
        roleTag: { ko: 'Developer Experience Manager', en: 'Developer Experience Manager' },
        title: { ko: '시니어 개발자 커뮤니티', en: 'Senior developer community' },
        body: {
          ko: '시니어 개발자 모임을 주선하고 주 1회 정기 밋업을 기획 및 운영. 매주 그 주에 화제가 된 기술 이슈와 사회적 이슈를 주제로 토론 세션을 진행하고, 참여 개발자의 이직 과정을 지원.',
          en: "Convened a senior-developer meetup and planned and ran a weekly session. Led discussion on that week's technical and social issues, and supported participating developers through their job transitions.",
        },
        tags: ['커뮤니티 운영', 'DX'],
        exit: false,
      },
      {
        id: 'lingora',
        company: { ko: 'Lingora AI', en: 'Lingora AI' },
        period: { ko: '2024.09 — 2024.12', en: 'Sep 2024 — Dec 2024' },
        roleTag: { ko: 'Software Developer', en: 'Software Developer' },
        title: { ko: 'AI 영어 학습 플랫폼 (마켓디자이너스)', en: 'AI English-learning platform (Market Designers)' },
        body: {
          ko: '핵심 UX 플로우 재설계 담당. 튜터 인터뷰와 사용 로그 분석으로 CMS 병목 3건을 식별하고 폼 필드를 40% 축소, A/B 테스트를 거쳐 배포해 작업 효율 20% 향상, 사용성 평가 85점 (사내 평가 기준).',
          en: 'Owned the redesign of core UX flows. Identified three CMS bottlenecks through tutor interviews and usage-log analysis, cut form fields by 40%, and shipped after A/B testing — lifting task efficiency 20% and scoring 85 on the usability evaluation (internal benchmark).',
        },
        tags: ['React', 'Spring', 'Next.js', 'UX 실험'],
        exit: false,
      },
      {
        id: 'paik',
        company: { ko: 'Paik', en: 'Paik' },
        period: { ko: '2019.06 — 2021.01', en: 'Jun 2019 — Jan 2021' },
        roleTag: { ko: '공동창업자 · CTO · Exit', en: 'Co-founder · CTO · Exit' },
        title: { ko: '외국인 대상 부동산 중개 플랫폼', en: 'Real-estate brokerage platform for foreign residents' },
        body: {
          ko: '국내 거주 외국인과 중개 에이전트를 연결하는 플랫폼을 0에서 1까지 구축. 외국인 밀집 지역 현장 인터뷰로 수요를 검증하고, 실시간 채팅, 인증, 매물 등록을 풀스택으로 구현한 뒤 매각.',
          en: 'Built a platform connecting foreign residents in Korea with brokerage agents, from 0 to 1. Validated demand through field interviews in foreign-resident neighborhoods, built real-time chat, auth, and listing registration full-stack, then sold the business.',
        },
        tags: ['풀스택', 'WebSocket', 'MySQL', 'Exit'],
        exit: true,
      },
      {
        id: 'osof',
        company: { ko: 'OSOF', en: 'OSOF' },
        period: { ko: '2016.05 — 2018.11', en: 'May 2016 — Nov 2018' },
        roleTag: { ko: '공동창업자 · 대표 · Exit', en: 'Co-founder · CEO · Exit' },
        title: { ko: '청소년 소프트웨어 교육 서비스', en: 'Youth software-education service' },
        body: {
          ko: '고객 유입, 커리큘럼, 운영 체계를 처음부터 구축해 2년 6개월 운영. 언플러그드 활동에서 스크래치를 거쳐 텍스트 코딩으로 이어지는 단계별 커리큘럼을 설계하고 매각.',
          en: 'Built acquisition, curriculum, and operations from scratch and ran the service for two and a half years. Designed a staged curriculum running from unplugged activities through Scratch to text-based coding, then sold the business.',
        },
        tags: ['EdTech', '커리큘럼 설계', 'Exit'],
        exit: true,
      },
    ],
  },

  cases: {
    heading: { ko: '문제와 해결', en: 'Problems and solutions' },
    sectionLabel: { ko: 'Case Studies', en: 'Case Studies' },
    linkLabel: { ko: '자세히 보기 →', en: 'Read more →' },
    items: [
      {
        slug: 'xitst',
        num: 'CASE 01',
        title: {
          ko: '비접촉 감정 분석 — 선행 연구 기준 92%를 목표로',
          en: 'Non-contact emotion analysis — targeting the 92% prior research reported',
        },
        body: {
          ko: '접촉식 장비 없이 카메라만으로 심리 상태를 측정한다는 아이디어. rPPG 알고리즘의 노이즈 문제를 신호 처리 파이프라인으로 해결하고, TCI 심리 모델과 통합해 선행 연구가 보고한 정확도 수준을 설계 기준으로 삼았다.',
          en: 'An idea to measure psychological state from a camera alone, with no contact equipment. Solved the rPPG algorithm\'s noise problem with a signal-processing pipeline, integrated it with the TCI psychological model, and set the design target at the accuracy level prior research had reported.',
        },
        metric: {
          value: '92',
          unit: '%',
          label: { ko: 'rPPG 선행 연구 보고 정확도', en: 'rPPG accuracy per prior published research' },
          comparison: { ko: '접촉식 PPG는 약 98%', en: 'contact PPG is roughly 98%' },
        },
        href: '/po/cases/xitst.html',
      },
      {
        slug: 'lingora',
        num: 'CASE 02',
        title: {
          ko: 'Lingora AI UX 개선 → 사용성 평가 85점',
          en: 'Lingora AI UX improvements → 85-point usability score',
        },
        body: {
          ko: '콘텐츠 관리 시스템 병목 파악. 데이터 기반 CMS 재설계와 UI 개선으로 튜터의 콘텐츠 제작 워크플로우를 단순화. 작업 효율 20% 향상, 사용성 평가 85점 (수치는 모두 사내 평가 기준).',
          en: "Identified the content-management-system bottleneck. Simplified tutors' content-authoring workflow through a data-driven CMS redesign and UI improvements — 20% gain in task efficiency, 85-point usability score (all figures per internal evaluation).",
        },
        metric: {
          value: '+20',
          unit: '%',
          label: { ko: '작업 효율 향상', en: 'Task-efficiency gain' },
          caveat: { ko: 'UX 개선 이후', en: 'after the UX improvements' },
        },
        href: '/po/cases/lingora.html',
      },
      {
        slug: 'paik',
        num: 'CASE 03',
        title: { ko: '외국인 부동산 플랫폼 0 → 1 Exit', en: 'Real-estate platform for foreign residents: 0 to 1 to exit' },
        body: {
          ko: '언어 장벽으로 한국 부동산 시장 접근이 어려운 외국인 문제를 포착. 에이전트-고객 실시간 연결 플랫폼을 기획부터 개발까지 주도, 이후 성공적으로 Exit.',
          en: "Identified the problem of foreign residents locked out of Korea's real-estate market by the language barrier. Led a real-time agent-client matching platform from planning through development, then exited successfully.",
        },
        metric: {
          value: 'Exit',
          label: { ko: '0 → 1 빌드 후', en: 'Built 0 to 1,' },
          caveat: { ko: '성공적 엑싯', en: 'then a successful exit' },
        },
        href: '/po/cases/paik.html',
      },
      {
        slug: 'osof',
        num: 'CASE 04',
        title: {
          ko: '청소년 SW 교육 프로그램 2년 6개월 운영',
          en: 'Youth software-education program, run for two and a half years',
        },
        body: {
          ko: '광주 지역 초중학생 대상 소프트웨어 교육 공백 발견. 컴퓨팅 사고력 중심 커리큘럼 개발, 실습 프로젝트 운영으로 STEM 관심 증진. 2년 6개월 지속 운영 후 Exit.',
          en: 'Found a gap in software education for middle- and elementary-school students in Gwangju. Built a computational-thinking curriculum and ran hands-on projects to build STEM interest. Ran continuously for two and a half years, then exited.',
        },
        metric: {
          value: '2.5',
          label: { ko: '프로그램 지속 운영', en: 'Program run continuously' },
          caveat: { ko: '커리큘럼 자체 개발', en: 'in-house curriculum' },
        },
        href: '/po/cases/osof.html',
      },
    ],
  },

  contact: {
    sectionLabel: { ko: 'Contact', en: 'Contact' },
    heading: { ko: '함께 만들어봐요', en: "Let's build something together" },
    body: {
      ko: '기술과 제품 사이 어딘가에서 의미 있는 변화를 만들고 싶은 분들과 이야기 나누고 싶습니다.',
      en: "I'd like to talk to anyone looking to make meaningful change somewhere between engineering and product.",
    },
    email: site.email,
    linkedinLabel: { ko: 'LinkedIn', en: 'LinkedIn' },
    linkedin: site.urls.linkedin,
    githubLabel: { ko: 'GitHub', en: 'GitHub' },
    github: site.urls.github,
  },

  translationStatus: 'draft',
}
