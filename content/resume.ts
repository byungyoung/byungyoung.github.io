import type { ContentStatus, L, Metric } from './types'
import { site } from './site'

export interface DateRange {
  start: string
  end: string | null
}

export interface ResumeExperienceEntry {
  id: string
  company: L
  dateRange: DateRange
  role: L
  exit: boolean
  bullets: L<string[]>
}

export interface ComputedMetric {
  label: L
  caveat?: L
}

export interface TaggedGroup {
  title: L
  tags: string[]
}

export interface NamedSub {
  name: L
  sub: L
}

export interface ActivityEntry {
  name: L
  dateRange: DateRange
}

export interface ResumeContent {
  meta: { title: L; description: L }
  toolbar: {
    backLabel: L
    backHref: string
    pdfLabel: L
    pdfGeneratingLabel: L
    /** document.title is swapped to this before window.print() so the saved PDF is named per language */
    pdfFileName: L
  }
  header: {
    name: string
    title: L
    tagline: L
    email: string
    linkedin: string
    github: string
  }
  metrics: Metric[]
  totalExperienceMetric: ComputedMetric
  presentLabel: L
  left: {
    education: { school: L; degree: L; period: L; status: L }
    skillGroups: TaggedGroup[]
    certifications: NamedSub[]
    languages: { items: L[]; sub: L }
    awards: NamedSub[]
    military: { status: L; period: L }
    activities: ActivityEntry[]
  }
  experience: ResumeExperienceEntry[]
  translationStatus: ContentStatus
}

export const resume: ResumeContent = {
  meta: {
    title: {
      ko: `${site.name} 이력서 ${site.titleSeparator} ${site.positioningTitle.ko}`,
      en: `${site.nameEn} Résumé ${site.titleSeparator} ${site.positioningTitle.en}`,
    },
    description: {
      ko: `${site.name} 이력서 — ${site.positioningTitle.ko}, 창업 2회 및 Exit 2회.`,
      en: `${site.nameEn} résumé — ${site.positioningTitle.en}, two startups founded, two exits.`,
    },
  },

  toolbar: {
    backLabel: { ko: '← 포트폴리오로', en: '← Back to portfolio' },
    backHref: site.urls.poHome,
    pdfLabel: { ko: 'PDF 다운로드', en: 'Download PDF' },
    pdfGeneratingLabel: { ko: '생성 중…', en: 'Generating…' },
    pdfFileName: { ko: '박병영_이력서_PO', en: 'Byungyoung_Park_PO_Resume' },
  },

  header: {
    name: site.name,
    title: site.positioningTitle,
    tagline: {
      ko: '기획한 제품을 직접 만듭니다. 두 번 창업해 두 곳 모두 Exit했고, 그중 한 곳과 이후 한 곳에서 CTO로 엔지니어링을 총괄했습니다.',
      en: 'I build the products I spec. I founded two companies and exited both, and served as CTO leading engineering at one of them and again afterward at another.',
    },
    email: site.email,
    linkedin: site.urls.linkedin,
    github: site.urls.github,
  },

  metrics: [
    {
      value: '92',
      unit: '%',
      label: { ko: 'rPPG 감정 분류 정확도', en: 'rPPG emotion-classification accuracy' },
      caveat: { ko: '선행 연구 보고치, 설계 목표 (Xitst 2025)', en: 'per prior published research, design target (Xitst 2025)' },
    },
    {
      value: '85',
      label: { ko: '사용성 평가 점수', en: 'Usability evaluation score' },
      caveat: { ko: '사내 평가 기준 (Lingora AI 2024)', en: 'internal evaluation (Lingora AI 2024)' },
    },
  ],

  totalExperienceMetric: {
    label: { ko: '총 경력', en: 'Total experience' },
    caveat: { ko: '창업 2회, Exit 2회 포함', en: 'includes 2 startups founded, 2 exits' },
  },

  presentLabel: { ko: '재직 중', en: 'Present' },

  left: {
    education: {
      school: { ko: '고려대학교', en: 'Korea University' },
      degree: { ko: '컴퓨터학과 경영학 이중전공', en: 'Computer Science & Business, double major' },
      period: { ko: '2019.03 — 2025.02', en: 'Mar 2019 — Feb 2025' },
      status: { ko: '졸업', en: 'Graduated' },
    },
    skillGroups: [
      {
        title: { ko: 'Product', en: 'Product' },
        tags: ['제품 기획', '로드맵', '우선순위 결정', 'OKR', '초기 제품 구축', '애자일 실행', 'PMF 검증', 'GTM'],
      },
      {
        title: { ko: 'Engineering', en: 'Engineering' },
        tags: ['TypeScript', 'Python', 'Java', 'React', 'Next.js', 'Node.js', 'FastAPI', 'Spring'],
      },
      {
        title: { ko: 'AI와 데이터', en: 'AI & Data' },
        tags: ['LLM 제품 적용', '프롬프트 엔지니어링', 'AI 에이전트 설계', 'Voice AI', '컴퓨터 비전', 'rPPG', '모델 평가'],
      },
      {
        title: { ko: '인프라와 분석', en: 'Infrastructure & Analytics' },
        tags: ['PostgreSQL', 'MySQL', 'Redis', 'Neo4j', 'AWS', 'Docker', 'CI/CD', 'SQL', 'GA4', 'Figma'],
      },
    ],
    certifications: [
      {
        name: { ko: 'SQLD (SQL 개발자)', en: 'SQLD (SQL Developer)' },
        sub: { ko: '2023.07, 한국데이터산업진흥원', en: 'Jul 2023, Korea Data Agency' },
      },
      {
        name: { ko: 'ADsP (데이터분석 준전문가)', en: 'ADsP (Advanced Data Analytics Semi-Professional)' },
        sub: { ko: '2023.03, 한국데이터산업진흥원', en: 'Mar 2023, Korea Data Agency' },
      },
    ],
    languages: {
      items: [
        { ko: '한국어 — 모국어', en: 'Korean — native' },
        { ko: '영어 — 비즈니스 회화 가능', en: 'English — business proficiency' },
      ],
      sub: { ko: 'OPIc IH', en: 'OPIc IH' },
    },
    awards: [
      {
        name: { ko: '전국 로봇 대회 1위', en: 'National Robotics Competition, 1st place' },
        sub: { ko: 'FIRST Tech Challenge', en: 'FIRST Tech Challenge' },
      },
      {
        name: { ko: 'FIRST Scholarship', en: 'FIRST Scholarship' },
        sub: { ko: 'Qualcomm, FTC (2016 — 2018)', en: 'Qualcomm, FTC (2016 — 2018)' },
      },
    ],
    military: {
      status: { ko: '병역필', en: 'Service completed' },
      period: { ko: '2021.02 — 2022.07 (18개월)', en: 'Feb 2021 — Jul 2022 (18 months)' },
    },
    activities: [
      {
        name: { ko: '고려대학교 SW 봉사단 단원', en: 'Member, Korea University SW Volunteer Corps' },
        dateRange: { start: '2025-03', end: '2025-12' },
      },
    ],
  },

  experience: [
    {
      id: 'curi',
      company: { ko: 'CURI AI', en: 'CURI AI' },
      dateRange: { start: '2026-01', end: null },
      role: { ko: 'Product Owner', en: 'Product Owner' },
      exit: false,
      bullets: {
        ko: [
          'K-뷰티와 패션 B2B 고객 대상 Voice AI 대화형 리서치 플랫폼 제품 총괄. 자동화 인터뷰 파이프라인과 인사이트 도출 흐름 전반 기획 및 실행',
          'EMAIL-CURI(인터뷰 발송), ASKCURI 랜딩 페이지, CUNNECT 등 제품 3종의 기획, 개발, 출시를 직접 수행',
          '도메인 특화 sLM 평가 체계 설계 및 프로덕션 승격 게이트 운영',
          '엔지니어링, 디자인, GTM 조직에 걸친 애자일 실행 주도, 데이터 기반 반복 개선 체계 운영',
        ],
        en: [
          'Own the Voice-AI conversational research platform for B2B clients in K-Beauty and fashion. Plan and execute the automated interview pipeline and the full insight-generation flow',
          'Personally plan, build, and ship three products — EMAIL-CURI (interview delivery), the ASKCURI landing page, and CUNNECT',
          'Design the evaluation framework for a domain-specific sLM and operate the production-promotion gate',
          'Lead agile execution across engineering, design, and GTM, and run a data-driven iterative-improvement system',
        ],
      },
    },
    {
      id: 'xitst',
      company: { ko: '엑시스트 (Xitst)', en: 'Xitst' },
      dateRange: { start: '2025-03', end: '2025-12' },
      role: { ko: 'Chief Technology Officer', en: 'Chief Technology Officer' },
      exit: false,
      bullets: {
        ko: [
          '창업 팀의 엔지니어링 총괄. 기술 스택 선정과 아키텍처 의사결정 담당',
          'rPPG 선행 연구 보고 정확도(약 92%, 접촉식 PPG는 약 98%)를 설계 기준으로 감정 분류 파이프라인 구축 — 정확도를 내주고 카메라만으로 측정하는 접근성을 얻는 트레이드오프',
          'TCI 심리 모델 기반 종합 평가 프레임워크 구축',
          'Python 추론 서비스, Next.js 클라이언트, AWS 서버리스 인프라를 엔드투엔드로 책임',
        ],
        en: [
          'Led engineering for the founding team. Owned technology-stack selection and architecture decisions',
          'Built the emotion-classification pipeline against the accuracy prior rPPG research reported (roughly 92%; contact PPG is roughly 98%) as the design target — a trade-off that gives up accuracy for the accessibility of measuring with a camera alone',
          'Built a comprehensive evaluation framework based on the TCI psychological model',
          'Owned the Python inference service, Next.js client, and AWS serverless infrastructure end to end',
        ],
      },
    },
    {
      id: 'refactorworks',
      company: { ko: 'Refactor Works', en: 'Refactor Works' },
      dateRange: { start: '2025-02', end: '2025-03' },
      role: { ko: 'Developer Experience Manager', en: 'Developer Experience Manager' },
      exit: false,
      bullets: {
        ko: [
          '시니어 개발자 모임 주선 및 주 1회 정기 밋업 기획 및 운영',
          '매주 그 주에 화제가 된 기술 이슈와 사회적 이슈를 주제로 토론 세션 진행',
          '참여 개발자의 이직 과정 지원',
        ],
        en: [
          'Convened a senior-developer meetup and planned and ran a weekly session',
          "Led discussion sessions on that week's trending technical and social issues",
          'Supported participating developers through their job transitions',
        ],
      },
    },
    {
      id: 'lingora',
      company: { ko: 'Lingora AI (마켓디자이너스)', en: 'Lingora AI (Market Designers)' },
      dateRange: { start: '2024-09', end: '2024-12' },
      role: { ko: 'Software Developer', en: 'Software Developer' },
      exit: false,
      bullets: {
        ko: [
          'AI 영어 학습 플랫폼의 핵심 UX 플로우 재설계 담당',
          '튜터 인터뷰와 사용 로그 분석으로 CMS 병목 3건 식별. 콘텐츠 분류 체계를 재설계하고 폼 필드 수를 40% 축소',
          'React와 Spring 연동 구간 최적화, 불필요한 API 호출 제거로 응답 속도 개선',
          'A/B 테스트를 거쳐 배포, 작업 효율 20% 향상 및 사용성 평가 85점 달성 (사내 평가 기준)',
          'LLM 피드백을 학습 여정에 통합하는 Next.js와 TypeScript 기능 개발',
        ],
        en: [
          'Owned the redesign of core UX flows for the AI English-learning platform',
          'Identified three CMS bottlenecks through tutor interviews and usage-log analysis. Redesigned the content-classification system and cut form fields by 40%',
          'Optimized the React-Spring integration layer, improving response time by removing unnecessary API calls',
          'Shipped after A/B testing — 20% gain in task efficiency and an 85-point usability evaluation score (internal benchmark)',
          'Built Next.js and TypeScript features integrating LLM feedback into the learning journey',
        ],
      },
    },
    {
      id: 'paik',
      company: { ko: 'Paik', en: 'Paik' },
      dateRange: { start: '2019-06', end: '2021-01' },
      role: { ko: '공동창업자 겸 CTO', en: 'Co-founder & CTO' },
      exit: true,
      bullets: {
        ko: [
          '국내 거주 외국인 대상 부동산 중개 플랫폼. 제품 설계, 아키텍처, 풀스택 개발, 출시까지 초기 구축 전 과정 총괄',
          '외국인 밀집 지역 현장 인터뷰로 수요 검증. 중개 에이전트 측 수요도 함께 확인',
          '반응형 웹 프론트엔드, WebSocket 실시간 채팅, 사용자 인증, 매물 등록 시스템 직접 구축',
          'MySQL 쿼리 튜닝과 데이터 구조 최적화로 응답 성능 개선',
          '외국인 전문 중개 에이전트 5명 초기 리크루팅, 피드백 기반으로 등록 플로우 반복 개선',
        ],
        en: [
          'A real-estate brokerage platform for foreign residents in Korea. Owned the entire initial build — product design, architecture, full-stack development, through to launch',
          'Validated demand through field interviews in neighborhoods with dense foreign populations. Confirmed demand on the brokerage-agent side as well',
          'Built the responsive web frontend, WebSocket real-time chat, user authentication, and listing-registration system myself',
          'Improved response performance through MySQL query tuning and data-structure optimization',
          'Recruited the first five agents specializing in foreign clients, and iterated on the registration flow based on their feedback',
        ],
      },
    },
    {
      id: 'osof',
      company: { ko: 'OSOF', en: 'OSOF' },
      dateRange: { start: '2016-05', end: '2018-11' },
      role: { ko: '공동창업자 겸 대표', en: 'Co-founder & CEO' },
      exit: true,
      bullets: {
        ko: [
          '청소년 대상 소프트웨어 교육 서비스. 고객 유입, 커리큘럼, 운영 체계를 처음부터 구축해 2년 6개월 운영',
          '컴퓨팅 사고력 중심의 단계별 커리큘럼 설계 — 언플러그드 활동에서 스크래치를 거쳐 텍스트 코딩으로 이어지는 구성에 프로젝트 기반 학습 적용',
          '아두이노 기반 IoT 도난방지 장치 제작 심화 과정 개발',
        ],
        en: [
          'A software-education service for teenagers. Built acquisition, curriculum, and operations from scratch and ran it for two and a half years',
          'Designed a staged curriculum centered on computational thinking — applied project-based learning across a progression from unplugged activities through Scratch to text-based coding',
          'Developed an advanced track building an Arduino-based IoT anti-theft device',
        ],
      },
    },
  ],

  translationStatus: 'draft',
}
