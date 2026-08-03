import type { CaseStudy } from './types'

export const paik: CaseStudy = {
  slug: 'paik',
  num: '03',
  name: 'Paik',
  title: {
    ko: ['외국인 부동산 플랫폼', '0 → 1, 그리고 Exit'],
    en: ['A real-estate platform for foreign residents:', '0 to 1, then exit'],
  },
  heroSub: {
    ko: '아무도 만들지 않은 시장을 직접 만들었다. 언어 장벽이 만든 기회를 포착해 플랫폼을 0에서 구축하고 Exit까지.',
    en: 'I built a market no one else had. Caught the opportunity the language barrier created, built the platform from 0, and took it through to exit.',
  },
  metrics: [
    {
      value: 'Exit',
      label: { ko: '0 → 1 빌드 후', en: 'Built 0 to 1,' },
      caveat: { ko: '성공적 엑싯 달성', en: 'then a successful exit' },
    },
  ],
  context: {
    ko: [
      '한국에 거주하는 외국인들은 언어 장벽과 복잡한 계약 문화로 인해 부동산 거래에서 심각한 불이익을 받고 있었습니다. 기존 부동산 플랫폼은 모두 한국인 중심으로 설계되어 있었고, 외국인을 전문으로 하는 에이전트와 연결하는 채널이 전무했습니다.',
      'CTO이자 공동창업자로서 제품 기획부터 기술 구현, 에이전트 온보딩까지 전 과정에 관여했습니다.',
    ],
    en: [
      'Foreign residents in Korea were at a serious disadvantage in real-estate transactions because of the language barrier and unfamiliar contract customs. Every existing real-estate platform was designed around Korean speakers, and there was no channel at all connecting them to agents who specialized in foreign clients.',
      'As CTO and co-founder, I was involved across the entire process — product planning, technical implementation, and agent onboarding.',
    ],
  },
  process: {
    ko: [
      {
        title: '수요 검증',
        body: '서울 내 외국인 밀집 지역(이태원, 마포, 용산) 거주 외국인 인터뷰로 pain point 검증. 에이전트 수요도 동시에 확인.',
      },
      {
        title: 'MVP 설계',
        body: '핵심 플로우를 에이전트-고객 매칭 + 실시간 채팅으로 단순화. 부동산 거래 전 과정을 담으려 하지 않고, 첫 연결의 마찰만 제거.',
      },
      {
        title: '풀스택 구현',
        body: '반응형 웹 프론트엔드, 실시간 채팅(WebSocket), 사용자 인증, 매물 등록 시스템을 직접 설계 및 개발.',
      },
      {
        title: '에이전트 온보딩',
        body: '초기 5명의 외국인 전문 에이전트를 직접 리크루팅, 피드백 기반으로 매물 등록 플로우 반복 개선.',
      },
    ],
    en: [
      {
        title: 'Demand validation',
        body: 'Validated the pain point through interviews with foreign residents in Seoul neighborhoods with dense foreign populations (Itaewon, Mapo, Yongsan). Confirmed agent-side demand at the same time.',
      },
      {
        title: 'MVP design',
        body: "Simplified the core flow to agent-client matching plus real-time chat. Didn't try to cover the entire real-estate transaction — just removed the friction in that first connection.",
      },
      {
        title: 'Full-stack build',
        body: 'Designed and built the responsive web frontend, real-time chat (WebSocket), user authentication, and listing-registration system myself.',
      },
      {
        title: 'Agent onboarding',
        body: 'Personally recruited the first five agents specializing in foreign clients, and iterated on the listing-registration flow based on their feedback.',
      },
    ],
  },
  results: {
    ko: [
      '외국인-에이전트 연결 플랫폼 0 → 1 구축 및 운영',
      '실시간 채팅과 알림 시스템을 포함한 풀스택 플랫폼 1년 7개월 운영',
      '성공적 Exit 달성',
    ],
    en: [
      'Built and ran a foreign-resident-to-agent matching platform from 0 to 1',
      'Ran the full-stack platform, including real-time chat and notifications, for one year and seven months',
      'Reached a successful exit',
    ],
  },
  learned: [
    {
      title: { ko: 'MVP는 정말 최소여야 한다', en: 'An MVP has to be genuinely minimal' },
      body: {
        ko: '처음에 너무 많은 기능을 계획했다가 핵심 흐름 하나에만 집중했을 때 오히려 초기 트랙션이 생겼다. 첫 번째 가치는 단순해야 전달된다.',
        en: 'We originally planned far too many features; traction actually showed up once we focused on a single core flow. The first value you deliver has to be simple to land at all.',
      },
    },
    {
      title: { ko: '공급자도 제품의 일부다', en: 'The supply side is part of the product too' },
      body: {
        ko: '에이전트(공급자) 온보딩 경험이 플랫폼 품질을 결정했다. 양면 플랫폼에서 공급자 경험에 투자하는 것이 수요 확보만큼 중요하다.',
        en: "The agents' (supply side) onboarding experience determined platform quality. On a two-sided platform, investing in the supply-side experience matters as much as acquiring demand.",
      },
    },
    {
      title: { ko: '기술 역량이 속도를 만든다', en: 'Technical ability creates speed' },
      body: {
        ko: 'CTO가 직접 개발하면 의사결정-구현 사이클이 짧아진다. 단, 이는 초기에만 유효하고 팀이 커지면 위임이 필수다.',
        en: 'A CTO who builds directly shortens the decision-to-implementation cycle. But that only holds early on — once the team grows, delegating becomes essential.',
      },
    },
  ],
  rejectedOptions: [
    {
      option: {
        ko: '부동산 거래 전 과정을 담는 플랫폼',
        en: 'A platform covering the entire real-estate transaction',
      },
      reason: {
        ko: '처음 계획이 이것이었다. 거래 전 과정을 담으려던 범위를 버리고, 에이전트와 고객의 첫 연결에서 생기는 마찰 하나만 제거했다. 범위를 줄이자 오히려 초기 트랙션이 생겼다.',
        en: "This was the original plan. We dropped the scope of covering the entire transaction and removed exactly one friction point: the first connection between agent and client. Cutting the scope is what produced early traction.",
      },
      status: 'draft',
      evidence: 'paik.html Process#2 + Learned#1',
    },
    {
      option: { ko: 'CTO가 끝까지 직접 개발', en: 'The CTO building everything directly, indefinitely' },
      reason: {
        ko: '초기에는 의사결정-구현 사이클을 줄이는 무기였다. 팀이 커진 뒤에도 유지하면 병목이 된다. 위임으로 전환했다.',
        en: "Early on, this was a weapon for shortening the decision-to-implementation cycle. Keeping it up after the team grew would have made it a bottleneck, so we shifted to delegation.",
      },
      status: 'draft',
      evidence: 'paik.html Learned#3 (실제 전환 여부 확인 필요)',
    },
  ],
  translationStatus: 'draft',
  meta: {
    description: {
      ko: '외국인 대상 부동산 중개 플랫폼을 0에서 1까지 만들고 Exit한 케이스 스터디.',
      en: 'Case study: building a real-estate brokerage platform for foreign residents from 0 to 1, through to exit.',
    },
  },
}
