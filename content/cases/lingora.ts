import type { CaseStudy } from './types'

export const lingora: CaseStudy = {
  slug: 'lingora',
  num: '02',
  name: 'Lingora AI',
  title: {
    ko: ['Lingora AI UX 개선으로', '효율 +20%, 사용성 평가 85점'],
    en: ['Lingora AI UX improvements:', '+20% efficiency, 85-point usability score'],
  },
  heroSub: {
    ko: 'AI 영어 학습 플랫폼의 콘텐츠 관리 병목을 찾아 해결한 과정. 데이터가 없으면 개선도 없다.',
    en: 'Finding and fixing the content-management bottleneck in an AI English-learning platform. No data, no improvement.',
  },
  metrics: [
    {
      value: '+20',
      unit: '%',
      label: { ko: '작업 효율 향상', en: 'Task-efficiency gain' },
      caveat: { ko: 'UI/UX 개선 이후', en: 'after the UI/UX improvements' },
    },
    {
      value: '85',
      label: { ko: '사용성 평가 점수', en: 'Usability evaluation score' },
      caveat: { ko: '플랫폼 전반', en: 'platform-wide' },
    },
  ],
  context: {
    ko: [
      'Lingora AI는 AI 기반 개인화 영어 학습을 제공하는 플랫폼으로, 콘텐츠 품질이 핵심 경쟁력이었습니다. 그러나 튜터들이 콘텐츠를 제작하고 업데이트하는 CMS 시스템이 복잡하고 느려, 콘텐츠 갱신 속도가 제품 성장의 발목을 잡고 있었습니다.',
      '개발자로 합류했지만 제품 관점에서 문제를 정의하고, 데이터를 기반으로 개선 우선순위를 잡는 방식으로 접근했습니다.',
    ],
    en: [
      'Lingora AI is a platform delivering AI-driven personalized English learning, where content quality was the core competitive edge. But the CMS tutors used to create and update content was complex and slow, and the pace of content refresh was holding back product growth.',
      "I joined as a developer, but I approached the problem by defining it from a product perspective and setting improvement priorities based on data.",
    ],
  },
  process: {
    ko: [
      {
        title: '병목 분석',
        body: '튜터 인터뷰와 사용 로그 분석으로 콘텐츠 등록 과정에서 반복 클릭이 가장 많이 발생하는 3개 구간 식별.',
      },
      {
        title: 'CMS 재설계',
        body: '데이터 기반 콘텐츠 분류 체계 재설계. 자주 쓰는 액션을 상단으로 올리고, 폼 필드 수를 40% 축소.',
      },
      {
        title: 'React + Spring 통합 최적화',
        body: '프론트엔드 상태 관리 개선으로 페이지 전환 시 불필요한 API 호출 제거, 응답 속도 개선.',
      },
      {
        title: 'A/B 검증',
        body: '개선된 UI를 일부 튜터에게 먼저 적용해 작업 시간 측정 후 전체 배포.',
      },
    ],
    en: [
      {
        title: 'Bottleneck analysis',
        body: 'Identified the three steps in the content-registration flow with the most repeated clicks, through tutor interviews and usage-log analysis.',
      },
      {
        title: 'CMS redesign',
        body: 'Redesigned the content-classification system based on data. Moved frequently used actions to the top and cut the number of form fields by 40%.',
      },
      {
        title: 'React + Spring integration optimization',
        body: 'Improved frontend state management to remove unnecessary API calls on page transitions, improving response time.',
      },
      {
        title: 'A/B validation',
        body: 'Rolled the improved UI out to a subset of tutors first, measured task time, then deployed it to everyone.',
      },
    ],
  },
  results: {
    ko: [
      '콘텐츠 제작 워크플로우 효율 +20% 향상',
      '플랫폼 안정성 향상으로 사용성 평가 85점 달성',
      '콘텐츠 갱신 주기 단축으로 신규 커리큘럼 출시 속도 개선',
    ],
    en: [
      'Lifted content-authoring workflow efficiency by +20%',
      'Reached an 85-point usability evaluation score as platform stability improved',
      'Shortened the content-refresh cycle, speeding up new-curriculum launches',
    ],
  },
  learned: [
    {
      title: { ko: '내부 사용자도 사용자다', en: 'Internal users are still users' },
      body: {
        ko: '튜터(내부 운영자)의 경험이 결국 학습자(외부 사용자) 경험의 품질을 결정한다. 내부 도구도 동일한 UX 기준을 적용해야 한다.',
        en: "A tutor's (internal operator's) experience ultimately determines the quality of the learner's (external user's) experience. Internal tools deserve the same UX bar as external ones.",
      },
    },
    {
      title: { ko: '측정 없이는 개선 없다', en: 'No measurement, no improvement' },
      body: {
        ko: '개선 전 현재 상태를 수치로 기록하지 않으면 나중에 얼마나 좋아졌는지 말할 수 없다. 기준값 설정이 개선의 시작이다.',
        en: "If you don't record the current state as a number before improving it, you can't later say how much better it got. Setting a baseline is where improvement starts.",
      },
    },
    {
      title: { ko: '작은 변화가 큰 임팩트', en: 'Small changes, big impact' },
      body: {
        ko: '기능 추가가 아닌 기존 흐름의 마찰 제거만으로도 의미 있는 지표 개선이 가능하다. 복잡한 솔루션보다 단순한 제거가 먼저다.',
        en: "Removing friction from an existing flow — not adding features — can move the numbers meaningfully. Simple removal comes before a complex solution.",
      },
    },
  ],
  rejectedOptions: [
    {
      option: { ko: '기능을 더하는 해결', en: 'Solving it by adding features' },
      reason: {
        ko: '병목의 원인은 기능 부족이 아니라 흐름의 마찰이었다. 새 기능 대신 반복 클릭이 몰리는 구간을 제거하고 폼 필드를 40% 줄였다. 복잡한 솔루션보다 단순한 제거가 먼저다.',
        en: "The bottleneck's cause wasn't missing features — it was friction in the flow. Instead of new features, we removed the steps where repeated clicks piled up and cut form fields by 40%. Simple removal comes before a complex solution.",
      },
      status: 'draft',
      evidence: 'lingora.html Learned#3 + Process',
    },
    {
      option: { ko: '전체 일괄 배포', en: 'A full rollout to everyone at once' },
      reason: {
        ko: '기준값 없이 배포하면 얼마나 좋아졌는지 말할 수 없다. 일부 튜터에게 먼저 적용해 작업 시간을 측정한 뒤 전체로 넓혔다.',
        en: "Deploying without a baseline means you can't say how much better it got. We rolled it out to a subset of tutors first, measured task time, then widened it to everyone.",
      },
      status: 'draft',
      evidence: 'lingora.html Process#4 + Learned#2',
    },
  ],
  translationStatus: 'draft',
  meta: {
    description: {
      ko: 'Lingora AI CMS 병목을 찾아 폼 필드를 40% 줄이고 작업 효율을 20% 높인 케이스 스터디.',
      en: 'Case study: finding the Lingora AI CMS bottleneck, cutting form fields by 40%, and lifting task efficiency 20%.',
    },
  },
}
