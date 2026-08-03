import type { L } from './types'
import { site } from './site'

export interface HomeExperienceEntry {
  id: string
  period: L
  role: L
  desc: L
  tags: string[]
  exit: boolean
}

export interface HomeProject {
  id: string
  name: L
  desc: L
  link: L
  href: string
}

export interface SkillGroup {
  title: L
  tags: string[]
}

export interface Credential {
  label: L
  value: L
}

export interface HomeContent {
  meta: { title: L; description: L }
  nav: {
    about: L
    experience: L
    skills: L
    projects: L
    contact: L
    po: L
    poHref: string
  }
  hero: {
    badge: L
    h1: L<string[]>
    subtitle: L
    ctaPo: L
    ctaPoHref: string
    ctaResume: L
    ctaResumeHref: string
    ctaGithub: L
    ctaGithubHref: string
  }
  poBanner: { title: L; sub: L; btn: L; href: string }
  about: { heading: L; body1: L; body2: L }
  experience: { heading: L; exitLabel: L; items: HomeExperienceEntry[] }
  skills: { heading: L; groups: SkillGroup[] }
  credentials: Credential[]
  projects: { heading: L; items: HomeProject[] }
  contact: { heading: L; email: string; linkedin: string; github: string }
}

export const home: HomeContent = {
  meta: {
    title: {
      ko: `${site.name} ${site.titleSeparator} ${site.positioningTitle.ko}`,
      en: `${site.nameEn} ${site.titleSeparator} ${site.positioningTitle.en}`,
    },
    description: {
      ko: '기획한 제품을 직접 만드는 Technical Product Owner. 두 번의 창업 Exit, rPPG 감정 분석 플랫폼 CTO, 현재 CURI AI.',
      en: 'A Technical Product Owner who builds the products they spec. Two startups, two exits; CTO of an rPPG emotion-analysis platform; now at CURI AI.',
    },
  },

  nav: {
    about: { ko: 'About', en: 'About' },
    experience: { ko: 'Experience', en: 'Experience' },
    skills: { ko: 'Skills', en: 'Skills' },
    projects: { ko: 'Projects', en: 'Projects' },
    contact: { ko: 'Contact', en: 'Contact' },
    po: { ko: 'PO 포트폴리오', en: 'PO Portfolio' },
    poHref: site.urls.poHome,
  },

  hero: {
    badge: { ko: '이직 기회를 열어두고 있습니다', en: 'Open to opportunities' },
    h1: {
      ko: ['기획한 제품을', '직접 만듭니다'],
      en: ['I build the products', 'I spec'],
    },
    subtitle: {
      ko: '고려대학교에서 컴퓨터학과 경영학을 이중전공했습니다. 개발자로 시작해 두 번 창업했고 두 곳 모두 Exit했습니다. 지금은 CURI AI에서 Voice AI 리서치 플랫폼의 Product Owner로 일합니다.',
      en: 'Computer Science and Business at Korea University. Started as a developer, founded two companies and exited both. Now Product Owner at CURI AI, building a Voice-AI research platform.',
    },
    ctaPo: { ko: 'PO 포트폴리오 보기', en: 'View PO portfolio' },
    ctaPoHref: site.urls.poHome,
    ctaResume: { ko: '이력서', en: 'Résumé' },
    ctaResumeHref: site.urls.resume,
    ctaGithub: { ko: 'GitHub', en: 'GitHub' },
    ctaGithubHref: site.urls.github,
  },

  poBanner: {
    title: { ko: 'Product Owner 직무 포트폴리오', en: 'Product Owner portfolio' },
    sub: {
      ko: '제품 결정의 근거와 기각 사유까지 남긴 케이스 스터디 4편',
      en: 'Four case studies documenting the decisions — and what was ruled out and why',
    },
    btn: { ko: '보러 가기', en: 'Open' },
    href: site.urls.poHome,
  },

  about: {
    heading: { ko: '기술과 제품 사이에서', en: 'Between engineering and product' },
    body1: {
      ko: '코드를 쓰다가 두 번 창업했고, 제품을 만들다 보니 Product Owner가 됐습니다. 기획서를 넘기고 기다리는 대신 직접 만들어 확인하는 쪽을 택해 왔습니다.',
      en: 'I was writing code, founded two companies, and became a Product Owner along the way. Rather than hand off a spec and wait, I have always preferred to build it and find out.',
    },
    body2: {
      ko: '결정을 먼저 문서로 남기고, 그 결정을 무너뜨릴 게이트를 스스로 만들고, 게이트에 걸리면 내 결과물을 반려합니다. 그 과정을 PO 포트폴리오에 정리해 두었습니다.',
      en: 'I write the decision down first, build the gate that would break it, and reject my own work when it hits that gate. The PO portfolio walks through that process.',
    },
  },

  experience: {
    heading: { ko: '경력', en: 'Experience' },
    exitLabel: { ko: 'Exit', en: 'Exit' },
    items: [
      {
        id: 'curi',
        period: { ko: '2026.01 — 재직 중', en: 'Jan 2026 — Present' },
        role: { ko: 'Product Owner · CURI AI', en: 'Product Owner · CURI AI' },
        desc: {
          ko: 'K-뷰티와 패션 B2B 고객을 위한 Voice AI 대화형 리서치 플랫폼. 자동화 인터뷰 파이프라인을 기획하고 제품 3종을 직접 개발해 출시했습니다.',
          en: 'A Voice-AI conversational research platform for B2B clients in K-Beauty and fashion. Planned the automated interview pipeline and personally built and shipped three products.',
        },
        tags: ['Product', 'Voice AI', 'FastAPI', 'Next.js'],
        exit: false,
      },
      {
        id: 'xitst',
        period: { ko: '2025.03 — 2025.12', en: 'Mar 2025 — Dec 2025' },
        role: { ko: 'CTO · Xitst', en: 'CTO · Xitst' },
        desc: {
          ko: '얼굴 영상에서 생체 신호를 추출해 감정을 추론하는 rPPG 플랫폼. 선행 연구가 보고한 정확도를 설계 기준으로 삼아 신호 처리 파이프라인을 구축했습니다.',
          en: 'An rPPG platform inferring emotional state from facial video. Built the signal-processing pipeline against the accuracy published research reports.',
        },
        tags: ['rPPG', 'Computer Vision', 'Python', 'AWS'],
        exit: false,
      },
      {
        id: 'refactorworks',
        period: { ko: '2025.02 — 2025.03', en: 'Feb 2025 — Mar 2025' },
        role: {
          ko: 'Developer Experience Manager · Refactor Works',
          en: 'Developer Experience Manager · Refactor Works',
        },
        desc: {
          ko: '시니어 개발자 커뮤니티를 주선하고 주 1회 밋업을 운영했습니다. 매주 그 주의 기술과 사회 이슈를 주제로 토론했고 구성원의 이직을 지원했습니다.',
          en: "Convened a senior-developer community and ran a weekly meetup, debating that week's technical and social issues and supporting members through job transitions.",
        },
        tags: ['Community', 'DX'],
        exit: false,
      },
      {
        id: 'lingora',
        period: { ko: '2024.09 — 2024.12', en: 'Sep 2024 — Dec 2024' },
        role: { ko: 'Software Developer · Lingora AI', en: 'Software Developer · Lingora AI' },
        desc: {
          ko: 'AI 영어 학습 플랫폼의 핵심 UX 플로우를 재설계했습니다. CMS 병목 3건을 찾아 폼 필드를 40% 줄였고 작업 효율 20% 향상, 사용성 평가 85점을 얻었습니다.',
          en: 'Rebuilt core UX flows for an AI English-tutoring product. Found three CMS bottlenecks, cut form fields by 40%, lifting task efficiency 20% and scoring 85 on the usability evaluation.',
        },
        tags: ['Next.js', 'React', 'Spring', 'UX'],
        exit: false,
      },
      {
        id: 'paik',
        period: { ko: '2019.06 — 2021.01', en: 'Jun 2019 — Jan 2021' },
        role: { ko: '공동창업자 · CTO · Paik', en: 'Co-founder · CTO · Paik' },
        desc: {
          ko: '국내 거주 외국인 대상 부동산 중개 플랫폼을 0에서 1까지 만들었습니다. 제품 설계부터 풀스택 구현, 에이전트 리크루팅까지 맡았고 매각으로 마무리했습니다.',
          en: 'Took a real-estate brokerage platform for foreign residents in Korea from 0 to 1 — product design, full-stack build, and agent recruiting — through to a successful exit.',
        },
        tags: ['Fullstack', 'WebSocket', 'MySQL'],
        exit: true,
      },
      {
        id: 'osof',
        period: { ko: '2016.05 — 2018.11', en: 'May 2016 — Nov 2018' },
        role: { ko: '공동창업자 · 대표 · OSOF', en: 'Co-founder · CEO · OSOF' },
        desc: {
          ko: '청소년 소프트웨어 교육 서비스를 2년 6개월 운영했습니다. 모객과 커리큘럼, 운영 체계를 처음부터 만들고 매각했습니다.',
          en: 'Ran a youth software-education service for two and a half years, building acquisition, curriculum, and operations from scratch before exiting.',
        },
        tags: ['EdTech', 'Operations'],
        exit: true,
      },
    ],
  },

  skills: {
    heading: { ko: '할 수 있는 것', en: 'What I do' },
    groups: [
      {
        title: { ko: '프로덕트', en: 'Product' },
        tags: ['제품 기획', '로드맵 · 우선순위', 'OKR', '애자일 실행', 'PMF 검증', 'GTM'],
      },
      {
        title: { ko: '언어 · 프레임워크', en: 'Languages & frameworks' },
        tags: ['TypeScript', 'Python', 'Java', 'React', 'Next.js', 'Node.js', 'FastAPI', 'Spring'],
      },
      {
        title: { ko: 'AI · 데이터', en: 'AI & data' },
        tags: ['LLM 제품 적용', '프롬프트 엔지니어링', 'AI 에이전트 설계', 'Voice AI', '컴퓨터 비전', 'rPPG', '모델 평가'],
      },
      {
        title: { ko: '인프라 · 분석', en: 'Infrastructure & analytics' },
        tags: ['PostgreSQL', 'MySQL', 'Redis', 'Neo4j', 'AWS', 'Docker', 'CI/CD', 'SQL', 'GA4'],
      },
    ],
  },

  credentials: [
    {
      label: { ko: '학력', en: 'Education' },
      value: {
        ko: '고려대학교 컴퓨터학과 경영학 이중전공 (2019.03 — 2025.02)',
        en: 'Korea University — Computer Science & Business, double major (Mar 2019 — Feb 2025)',
      },
    },
    {
      label: { ko: '자격', en: 'Certifications' },
      value: {
        ko: 'SQLD(2023.07), ADsP(2023.03) — 한국데이터산업진흥원',
        en: 'SQLD (Jul 2023), ADsP (Mar 2023) — Korea Data Agency',
      },
    },
    {
      label: { ko: '어학', en: 'Languages' },
      value: {
        ko: '영어 비즈니스 회화 (OPIc IH)',
        en: 'Korean (native); English, business proficiency (OPIc IH)',
      },
    },
    {
      label: { ko: '수상', en: 'Awards' },
      value: {
        ko: 'FIRST Tech Challenge 전국 1위, FIRST Scholarship (2016 — 2018)',
        en: 'FIRST Tech Challenge national champion, FIRST Scholarship (2016 — 2018)',
      },
    },
    {
      label: { ko: '병역', en: 'Military' },
      value: {
        ko: '병역필 (2021.02 — 2022.07, 18개월)',
        en: 'Service completed (Feb 2021 — Jul 2022, 18 months)',
      },
    },
    {
      label: { ko: '활동', en: 'Activities' },
      value: {
        ko: '고려대학교 SW 봉사단 단원 (2025.03 — 2025.12)',
        en: 'Member, Korea University SW Volunteer Corps (Mar 2025 — Dec 2025)',
      },
    },
  ],

  projects: {
    heading: { ko: '주요 작업물', en: 'Selected work' },
    items: [
      {
        id: 'xitst',
        name: { ko: 'Xitst rPPG 플랫폼', en: 'Xitst rPPG platform' },
        desc: {
          ko: '카메라만으로 심리 상태를 읽는 비접촉 감정 분석. 신호 처리 파이프라인 설계와 TCI 심리 모델 통합.',
          en: 'Non-contact emotion analysis that reads psychological state from a camera alone. Signal-processing pipeline design and TCI model integration.',
        },
        link: { ko: '케이스 스터디', en: 'Case study' },
        href: '/po/cases/xitst/',
      },
      {
        id: 'lingora',
        name: { ko: 'Lingora AI 튜터', en: 'Lingora AI tutor' },
        desc: {
          ko: 'AI 영어 학습 플랫폼. CMS 병목을 찾아 콘텐츠 제작 워크플로우를 단순화했습니다.',
          en: 'AI English-learning platform. Located the CMS bottlenecks and simplified the content-authoring workflow.',
        },
        link: { ko: '케이스 스터디', en: 'Case study' },
        href: '/po/cases/lingora/',
      },
      {
        id: 'paik',
        name: { ko: 'Paik 부동산 플랫폼', en: 'Paik real-estate platform' },
        desc: {
          ko: '외국인 대상 부동산 중개 플랫폼. 현장 인터뷰로 수요를 검증하고 0에서 1까지 만든 뒤 Exit.',
          en: 'Brokerage platform for foreign residents. Validated demand through field interviews, built 0 to 1, then exited.',
        },
        link: { ko: '케이스 스터디', en: 'Case study' },
        href: '/po/cases/paik/',
      },
      {
        id: 'osof',
        name: { ko: 'OSOF SW 교육', en: 'OSOF software education' },
        desc: {
          ko: '청소년 소프트웨어 교육 서비스. 커리큘럼과 운영을 직접 설계해 2년 6개월 운영 후 Exit.',
          en: 'Youth software-education service. Designed the curriculum and operations, ran it for two and a half years, then exited.',
        },
        link: { ko: '케이스 스터디', en: 'Case study' },
        href: '/po/cases/osof/',
      },
    ],
  },

  contact: {
    heading: { ko: '연락하기', en: 'Get in touch' },
    email: site.email,
    linkedin: site.urls.linkedin,
    github: site.urls.github,
  },
}
