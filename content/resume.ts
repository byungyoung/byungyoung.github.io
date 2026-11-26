import type { L, Lang, Metric } from './types'
import { site } from './site'

/**
 * Final PO résumé (owner direction 2026-11-27: "the résumé should be the final
 * PO version"). Source of truth: by-brain output/resume/[resume]박병영.md (ko)
 * and [resume]Byungyoung.md (en), commit 3318e1d9a5 (2026-10-19, "이력서를 PO
 * 관점으로 재구성"). The two CVs are not translations of each other, so the
 * bullet lists differ per language on purpose. Interpunct enumerations from
 * the CVs are rewritten as plain lists (site copy rule).
 *
 * Birth date and phone number are deliberately absent.
 */

export interface DateRange {
  start: string
  end: string | null
}

export interface ResumeExperienceEntry {
  id: string
  company: L
  /** One line on what the company or product is. */
  summary: L
  dateRange: DateRange
  role: L
  exit: boolean
  bullets: L<string[]>
}

export interface ComputedMetric {
  label: L
  caveat?: L
}

export interface SkillGroup {
  title: string
  tags: string[]
}

export interface NamedSub {
  name: L
  sub: L
}

export interface ActivityEntry {
  name: L
  period: L
}

export interface ResumeContent {
  meta: { title: L; description: L }
  toolbar: {
    backLabel: L
    backHref: string
    pdfLabel: L
    pdfViewLabel: L
    /** Suggested download filename (without extension) per language. */
    pdfFileName: L
  }
  header: {
    name: string
    title: L
    headline: L
    summary: L<string[]>
    email: string
    linkedin: string
    github: string
    location: L
  }
  metrics: Metric[]
  totalExperienceMetric: ComputedMetric
  presentLabel: L
  left: {
    education: { school: L; degree: L; period: L; status: L }
    skillGroups: Record<Lang, SkillGroup[]>
    certifications: NamedSub[]
    languages: { items: L[]; sub: L }
    awards: NamedSub[]
    military: { status: L; period: L }
    activities: ActivityEntry[]
  }
  experience: ResumeExperienceEntry[]
}

const CURI_RESEARCH_CAVEAT: L = {
  ko: 'AI 기반 소비자 리서치, 기존 방식 대비 (CURI AI)',
  en: 'AI-run consumer research vs traditional methods (CURI AI)',
}

export const resume: ResumeContent = {
  meta: {
    title: {
      ko: `${site.name} 이력서 ${site.titleSeparator} ${site.positioningTitle.ko}`,
      en: `${site.nameEn} Résumé ${site.titleSeparator} ${site.positioningTitle.en}`,
    },
    description: {
      ko: `${site.name} 이력서 — ${site.positioningTitle.ko}. 창업 2회, 두 곳 모두 매각. 지금은 CURI AI에서 문제 정의부터 출시와 수익화까지 맡고 있습니다.`,
      en: `${site.nameEn} résumé — ${site.positioningTitle.en}. Two companies founded, both acquired. Now owning a go-to-market product at CURI AI from discovery to monetization.`,
    },
  },

  toolbar: {
    backLabel: { ko: '여정으로', en: 'Back to the journey' },
    backHref: '/',
    pdfLabel: { ko: 'PDF 다운로드', en: 'Download PDF' },
    pdfViewLabel: { ko: 'PDF 보기', en: 'View PDF' },
    pdfFileName: { ko: '박병영_이력서', en: 'Byungyoung_Park_Resume' },
  },

  header: {
    name: site.name,
    title: site.positioningTitle,
    headline: { ko: '창업 2회, 두 곳 모두 매각', en: '2× founder, both acquired' },
    summary: {
      ko: [
        '문제를 정의하고, 결정을 문서로 남기고, 출시 기준을 먼저 세우는 Product Owner입니다. 두 번 창업해 두 곳 모두 매각했고, 두 회사에서 CTO로 제품과 개발을 함께 이끌었습니다.',
        '현재 CURI AI에서 K-뷰티 브랜드의 미국 진출 GTM을 소프트웨어로 만드는 초기 스타트업의 Product Owner로, 브랜드 고객의 리텐션과 전환을 제품으로 구현하고 있습니다. 문제 정의부터 출시, 수익화까지 맡아 리서치 비용을 90% 이상, 기간을 80% 이상 줄였고, 입사 9개월 만에 신규 SaaS를 프로덕션까지 출시했습니다.',
        '직접 시제품을 만들고 출시할 수 있을 만큼 개발에 가깝게 일합니다. 아이디어에서 사용자 반응을 확인하기까지의 거리를 짧게 유지하는 것이 제 방식입니다.',
      ],
      en: [
        'Product Owner who defines the problem, writes down the decision, and sets the bar a release has to clear before it ships. Two companies founded and sold, two stints as CTO, and now owning a go-to-market product from discovery to monetization. Close enough to the build to prototype and ship myself.',
      ],
    },
    email: site.email,
    linkedin: site.urls.linkedin,
    github: site.urls.github,
    location: { ko: '서울특별시', en: 'Seoul, South Korea' },
  },

  metrics: [
    {
      value: '90',
      unit: '%+',
      label: { ko: '리서치 비용 절감', en: 'Research cost cut' },
      caveat: CURI_RESEARCH_CAVEAT,
    },
    {
      value: '80',
      unit: '%+',
      label: { ko: '리서치 기간 단축', en: 'Research turnaround cut' },
      caveat: CURI_RESEARCH_CAVEAT,
    },
    {
      value: '90',
      unit: '%+',
      label: { ko: '신규 SaaS 총마진', en: 'Gross margin on the new SaaS' },
      caveat: { ko: '출시 전에 설계한 판매 구조 (CURI AI)', en: 'designed in before launch (CURI AI)' },
    },
  ],

  totalExperienceMetric: {
    label: { ko: '총 경력', en: 'Total experience' },
    caveat: { ko: '창업 2회, 매각 2회 포함', en: 'includes 2 companies founded, both acquired' },
  },

  presentLabel: { ko: '재직 중', en: 'Present' },

  left: {
    education: {
      school: { ko: '고려대학교', en: 'Korea University' },
      degree: {
        ko: '컴퓨터학, 경영학 이중전공',
        en: 'B.S., Computer Science and Business Administration',
      },
      period: { ko: '2019.03 — 2025.08', en: 'Mar 2019 — Aug 2025' },
      status: { ko: '졸업', en: 'Graduated' },
    },
    skillGroups: {
      ko: [
        { title: '문제 정의', tags: ['사용자 인터뷰', '사용 로그 분석', '가설 설정과 최고위험 가설 선별'] },
        { title: '실행 관리', tags: ['PRD와 결정 로그 작성', '우선순위 설정', '출시 기준(게이트) 설계', 'A/B 테스트'] },
        { title: '사업', tags: ['초기 제품 구축(0→1)', '시장 진입 전략(GTM)', '창업 2회, 매각 2회'] },
        { title: '기술 이해', tags: ['AI와 LLM 제품 직접 구현 경험', '시제품을 혼자 만들어 검증할 수 있는 수준'] },
      ],
      en: [
        {
          title: 'Product',
          tags: [
            'Problem framing & user interviews',
            'Hypothesis-driven roadmaps',
            'A/B testing',
            'PRDs & decision logs',
            'Release criteria',
            '0→1',
            'GTM',
          ],
        },
        {
          title: 'Technical fluency',
          tags: ['Hands-on with AI/LLM products', 'Can prototype and ship (TypeScript, Python)'],
        },
      ],
    },
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
        name: { ko: '창업경진대회 지역대회 우승', en: 'Company Of the Year, regional winner' },
        sub: { ko: 'Company Of the Year (COY), 2016, IoT 도난방지 장치', en: '2016 startup competition' },
      },
      {
        name: { ko: '전국 로봇 대회 1위', en: 'National Robotics Award, 1st Prize' },
        sub: { ko: 'FIRST Tech Challenge (FTC)', en: 'FIRST Tech Challenge' },
      },
      {
        name: { ko: 'FIRST Scholarship', en: 'FIRST Scholarship' },
        sub: { ko: 'Qualcomm, FIRST Tech Challenge (2016 — 2018)', en: 'Qualcomm' },
      },
    ],
    military: {
      status: { ko: '병역필', en: 'Service completed' },
      period: { ko: '2021.02 — 2022.07 (18개월)', en: 'Feb 2021 — Jul 2022 (18 months)' },
    },
    activities: [
      {
        name: {
          ko: '고등학교 대상 AI 강의 총 20회 (온라인과 오프라인). 바이브코딩, AX 전환, 개발 등 AI 전반',
          en: 'AI guest lecturer at Korean high schools, 20 sessions',
        },
        period: { ko: '2025 — 2026', en: '2025 — 2026' },
      },
      {
        name: {
          ko: 'Refactor Works 시니어 개발자 커뮤니티. 주 1회, 7개월간 총 28회 기술과 사회 이슈 스터디 및 토론. 2025.02 — 03 운영진으로 밋업 기획과 진행, 참여 개발자 이직 지원',
          en: 'Refactor Works senior developer community: weekly study and discussion, 28 sessions over 7 months. Organizer in Feb and Mar 2025, running meetups and supporting members through job moves',
        },
        period: { ko: '2024.09 — 2025.03', en: 'Sep 2024 — Mar 2025' },
      },
      {
        name: { ko: '고려대학교 SW 봉사단 단원', en: 'Member, Korea University SW Volunteer Corps' },
        period: { ko: '2025.03 — 2025.12', en: 'Mar 2025 — Dec 2025' },
      },
    ],
  },

  experience: [
    {
      id: 'curi',
      company: { ko: 'CURI AI', en: 'CURI AI' },
      summary: {
        ko: 'K-뷰티 브랜드의 미국 시장 진입(GTM)을 소프트웨어로 만드는 초기 스타트업. 브랜드 고객의 리텐션과 전환을 제품으로 구현.',
        en: 'An early-stage startup that turns go-to-market into software for K-Beauty brands entering the US.',
      },
      dateRange: { start: '2026-01', end: null },
      role: { ko: 'Product Owner', en: 'Product Owner' },
      exit: false,
      bullets: {
        ko: [
          '제품 총괄. 문제 정의부터 출시, 수익화까지 책임',
          '문제 정의: 고객 인터뷰로 "리서치는 비싸고 결과가 늦게 나온다"는 문제를 찾고, 이를 비용과 기간이라는 측정 가능한 지표로 정의',
          '결과: AI 기반 소비자 리서치로 기존 방식 대비 비용 90% 이상, 기간 80% 이상 절감. 대기업 고객의 다국어 심층 인터뷰를 한 분기에서 1주로 단축',
          '0→1 출시: 입사 9개월 만에 신규 SaaS를 0에서 프로덕션 출시까지 이끔. 출시 전에 결제, 보안 인증 대응, 단위 원가를 먼저 설계해 처음부터 총마진 90% 이상의 판매 가능한 구조로 만듦',
          '지표 기반 결정: 모든 기능은 가설과 성공 지표를 먼저 정하고 실험으로 검증. 자체 AI 판단 모델은 정확도를 외부 솔루션보다 12%p 높였고, A/B 테스트에서 구매 전환 개선이 확인되지 않은 기능은 출시하지 않음. 이렇게 정한 우선순위로 회사의 흑자 전환에 기여',
          '함께 기획하고 출시한 제품: 해외 소비자용 상담과 추천 서비스, 브랜드용 마케팅 자동화 Channel, 팀 명함 관리 CUNNECT',
          '상담과 추천 서비스: 해외 소비자의 마찰을 "성분이 맞는지 판단할 근거가 없다, 탐색이 길다, 후보가 늘수록 결정을 못 한다" 세 가지로 정의하고, 제품의 목표를 "더 많은 상품"이 아니라 "결정을 끝내주는 것"으로 잡음. 가설 4개를 먼저 적고 그중 틀리면 제품이 무의미해지는 가설을 최고위험으로 지정',
          '근거가 없는 항목은 그럴듯한 문장으로 채우지 않고 "근거 없음"으로 그대로 보여주는 것을 제품 기준선으로 정함',
          "출시 기준을 먼저 세움: \"새 버전이 이전 버전보다 벤치마크가 낮으면 내보내지 않는다\"는 기준을 작업 전에 합의. 제 작업물이 이 기준에 걸리자 출시를 직접 막았고, 대시보드에 '차단' 상태를 신설해 회귀가 로드맵에서 조용히 사라지지 않게 함",
          'CUNNECT: 명함 앱이 문을 닫으면 연락처가 같이 사라진다는 사용자의 불신을 핵심 문제로 보고, 데이터를 사용자 본인 소유의 시트에 쌓는 구조를 택함. 요구 권한도 최소 범위로 좁힘. 스펙 문서 하나에 결정 10건, 의도적으로 만들지 않기로 한 것 10건, 미결 3건을 함께 관리',
          '팀 공유 시 카드에 적힌 연락처와 친구에게만 공유한 연락처를 분리해, 팀에 공개하지 않기로 한 정보가 섞여 나오지 않도록 설계',
          'Channel: 캠페인 주제 하나를 조사, 제작, 발행, 측정 네 단계로 나누고 단계별 건수를 붙여 어디서 막혔는지 목록에서 바로 보이게 함. 캠페인을 만들기 전에 발행 채널 연결부터 확인하는 흐름으로 구성',
          '클라우드 이전(AWS → Azure)을 주도하며 의사결정 16건을 근거와 함께 기록',
        ],
        en: [
          'Own product at an early-stage startup that turns go-to-market into software for K-Beauty brands entering the US, building the retention and conversion of their users into the product. Took it from problem definition through launch and monetization. Customer interviews surfaced the first pain, consumer research that is expensive and slow, which I defined as two measurable targets: cost and turnaround.',
          'With AI-run consumer research, cut research cost by 90%+ and turnaround by 80%+ versus traditional methods. Multilingual in-depth interviews for an enterprise client went from one quarter to one week.',
          'Took a new SaaS from zero to production within nine months of joining. Designed payments, security-certification readiness and unit costs before launch, so it was sellable from day one at 90%+ gross margin.',
          'Set a hypothesis and success metric for every feature before building it. Our in-house AI judgment model beat an external solution by 12 points on accuracy; a feature that showed no purchase-conversion lift in A/B testing did not ship. This metric-led prioritization contributed to the company turning profitable.',
          'Fixed release bars up front and blocked my own release when it missed, with a "blocked" state that kept the regression on the roadmap. Also launched Channel (brand marketing automation) and CUNNECT (team business cards).',
        ],
      },
    },
    {
      id: 'xitst',
      company: { ko: 'Xitst', en: 'Xitst' },
      summary: {
        ko: '얼굴 영상에서 생체신호를 읽어 감정 상태를 추론하는 AI 플랫폼.',
        en: 'An AI platform that reads vital signs and emotional state from a face camera.',
      },
      dateRange: { start: '2025-01', end: '2025-12' },
      role: { ko: 'CTO', en: 'Chief Technology Officer' },
      exit: false,
      bullets: {
        ko: [
          '제품과 개발 총괄. 웹에서 시작한 제품을 데스크톱, 모바일(iOS, Android), Figma 플러그인까지 확장',
          '카메라만으로 심박수, HRV, 산소포화도, 체온, 호흡수 5종을 측정하는 기능을 제품화',
          'AI 어시스턴트(슬라이드 자동 생성, 회의 전사, Slack 봇)와 실시간 협업 화이트보드 출시',
          '연구용 데이터에서 나온 성능이 실제 사용 환경(압축된 카메라 영상)에서는 그대로 나오지 않는다는 점을 짚고, 실환경 조건으로 다시 학습시켜 오차를 줄임. 개선 전후 수치를 함께 공개해 대표 수치가 실사용 성능으로 읽히지 않게 함',
          '모델 실험을 늘리기 전에 학습 기록 허브부터 만들어, 어떤 결과든 어떤 조건에서 나왔는지 되짚을 수 있게 함',
        ],
        en: [
          'Led product and engineering for an AI platform that reads vital signs and emotional state from a face camera. Took it from web to desktop, mobile and a Figma plugin, and shipped an AI work assistant and a collaborative whiteboard.',
          'Spotted that lab benchmarks overstated performance on real, compressed camera video, and retrained for real conditions. Published before and after numbers side by side so the headline figure could not pass as field results.',
        ],
      },
    },
    {
      id: 'lingora',
      company: { ko: 'Lingora AI (마켓디자이너스)', en: 'Lingora AI (Market Designers)' },
      summary: { ko: 'AI 기반 영어 학습 플랫폼.', en: 'An AI English-learning platform.' },
      dateRange: { start: '2024-09', end: '2024-12' },
      role: { ko: 'Software Developer (학교 현장실습)', en: 'Software Developer — University Co-op' },
      exit: false,
      bullets: {
        ko: [
          '튜터 인터뷰와 사용 로그 분석으로 콘텐츠 관리 도구의 병목 3건 식별',
          '콘텐츠 분류 체계를 다시 설계하고 입력 폼 항목을 40% 줄임',
          'A/B 테스트를 거쳐 배포, 학습 효율 20% 향상 및 사용성 평가 85점 달성',
          'AI 피드백 생성을 외부 서비스에서 자체 시스템으로 옮겨, 피드백 품질을 직접 실험하고 조정할 수 있는 경로를 엶. 운영 비용도 함께 줄어듦',
          'AI 피드백을 학습 흐름 안에 녹이는 기능 개발',
        ],
        en: [
          'Interviewed tutors and analyzed usage logs to find three bottlenecks in the content tool. Redesigned the content taxonomy, cut form fields 40%, and shipped behind an A/B test: learning efficiency up 20%, usability evaluation 85.',
          'Moved AI feedback generation in-house so the team could tune feedback quality directly; inference cost fell as a side effect.',
        ],
      },
    },
    {
      id: 'paik',
      company: { ko: 'Paik', en: 'Paik' },
      summary: {
        ko: '국내 거주 외국인을 대상으로 한 부동산 중개 플랫폼. 2021년 지분을 매각했고 팀과 서비스는 인수사로 이관됐습니다.',
        en: 'A real-estate platform for foreign residents in Korea.',
      },
      dateRange: { start: '2019-06', end: '2021-01' },
      role: { ko: '공동창업자, CTO', en: 'Co-founder & CTO' },
      exit: true,
      bullets: {
        ko: [
          '공동창업자 2인 체제에서 제품을 맡아 기획부터 출시까지 수행',
          '외국인 밀집 지역 현장 인터뷰로 수요 검증. 중개 에이전트 측 수요도 함께 확인',
          '에이전트와 고객의 매칭, 실시간 채팅 두 가지로 핵심 흐름을 좁힌 MVP 설계',
          '외국인 전문 중개 에이전트 5명 초기 영입. 이들의 피드백으로 매물 등록 흐름을 반복 개선',
        ],
        en: [
          'Took a real-estate platform for foreign residents in Korea from 0→1. Validated demand through field interviews with residents and agents, cut the MVP to matching plus live chat, recruited the first five agents and iterated listing flows on their feedback. Sold my equity in 2021.',
        ],
      },
    },
    {
      id: 'osof',
      company: { ko: 'OSOF', en: 'OSOF' },
      summary: {
        ko: '청소년 대상 소프트웨어 교육 서비스. 창업 후 약 2년 6개월 운영했고 2018년 사업과 지분을 매각했습니다.',
        en: 'A youth software-education business.',
      },
      dateRange: { start: '2016-05', end: '2018-11' },
      role: { ko: '공동창업자, 대표', en: 'Co-founder & CEO' },
      exit: true,
      bullets: {
        ko: [
          '고객 유입, 커리큘럼, 운영 체계를 처음부터 구축',
          '언플러그드 활동에서 시작해 블록 코딩을 거쳐 텍스트 코딩으로 이어지는 단계별 커리큘럼 설계, 프로젝트 기반 학습 적용',
          '교육 사업과 별개로 자체 제품 라인 운영. IoT 도난방지 장치와 이를 제어하는 앱을 직접 만들어 Google Play에 출시하고 기기와 묶어 판매',
          '2016년 창업경진대회 Company Of the Year에 부스를 열어 시연과 판매를 함께 진행, 지역대회 우승',
          '제품화 전에 특허를 출원하고 등록 후 특허권을 매각',
          '직접 만들어 팔아본 제품을 심화 커리큘럼으로 옮김. 교재를 위해 만든 것이 아니라 파는 물건을 먼저 만들고 그것을 가르친 순서',
          '대학생 자원봉사자 모집 및 정기 교육 운영, 학교 및 기관 제휴 관리',
        ],
        en: [
          'Founded and ran a youth software-education business for 2.5 years, building acquisition, curriculum, operations and school partnerships. Launched an IoT anti-theft product with its own app, won the 2016 regional startup competition with it, and sold the patent after grant. Sold the business in 2018.',
        ],
      },
    },
  ],
}
