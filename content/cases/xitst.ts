import type { CaseStudy } from './types'

export const xitst: CaseStudy = {
  slug: 'xitst',
  num: '01',
  name: 'Xitst',
  title: {
    ko: ['카메라만으로', '심리 상태를 읽는 파이프라인'],
    en: ['With a camera alone,', 'a pipeline that reads psychological state'],
  },
  heroSub: {
    ko: '접촉식 장비 없이 생체 신호를 추출한다. rPPG 선행 연구가 보고한 정확도를 설계 기준으로 삼아 검증한 과정.',
    en: 'Extracting biosignals with no contact equipment. The process of validating against the accuracy prior rPPG research had reported, taken as the design target.',
  },
  metrics: [
    {
      value: '92',
      unit: '%',
      label: { ko: 'rPPG 선행 연구 보고 정확도', en: 'rPPG accuracy per prior published research' },
      caveat: { ko: '설계 목표 기준', en: 'design target' },
      comparison: { ko: '접촉식 PPG는 약 98%', en: 'contact PPG is roughly 98%' },
    },
  ],
  context: {
    ko: [
      '전통적인 심리 상태 측정은 전극과 센서 등 접촉식 장비가 필요해 병원 방문이 필수였습니다. Xitst는 비대면으로 심리 상태를 분석하고 맞춤형 치유를 제공하는 플랫폼을 목표로 했고, 핵심 기술 문제는 "카메라만으로 신뢰할 수 있는 생체 신호를 추출할 수 있는가"였습니다.',
      'CTO로서 제품 로드맵 설계와 함께 rPPG(Remote Photoplethysmography) 기술의 실현 가능성을 검증하고 프로덕션에 적용하는 것이 제 역할이었습니다.',
    ],
    en: [
      'Traditional psychological-state measurement required contact equipment — electrodes, sensors — which meant a hospital visit was unavoidable. Xitst set out to analyze psychological state remotely and deliver personalized therapy, and the core technical question was: can a camera alone extract a biosignal reliable enough to trust?',
      'As CTO, my role was to design the product roadmap while validating the feasibility of rPPG (Remote Photoplethysmography) technology and taking it into production.',
    ],
  },
  process: {
    ko: [
      {
        title: '신호 처리 파이프라인 설계',
        body: '얼굴 영상에서 미세한 혈류 변화를 감지하는 rPPG 알고리즘 구현. 조명과 움직임에 따른 노이즈를 필터링하는 신호 처리 파이프라인을 단계별로 구축.',
      },
      {
        title: 'TCI 심리 모델 통합',
        body: '원시 생체 신호를 TCI(기질 및 성격 검사) 모델과 결합해 감정 상태로 변환하는 데이터 통합 시스템 개발.',
      },
      {
        title: '클라우드 아키텍처',
        body: '실시간 처리를 위해 AWS Lambda + API Gateway 서버리스 구조 채택. Next.js SSR로 프론트엔드 응답 속도 최적화.',
      },
      {
        title: '목표 기준 설정',
        body: 'rPPG 선행 연구가 보고한 정확도(약 92%, 접촉식 PPG는 약 98%)를 설계 기준으로 삼고, 조명과 움직임 조건별로 신호 품질을 점검하며 파이프라인을 조정.',
      },
    ],
    en: [
      {
        title: 'Signal-processing pipeline design',
        body: 'Implemented an rPPG algorithm that detects subtle blood-flow changes from facial video. Built a signal-processing pipeline in stages to filter noise from lighting and movement.',
      },
      {
        title: 'TCI psychological-model integration',
        body: 'Built a data-integration system that combines the raw biosignal with the TCI (Temperament and Character Inventory) model to convert it into an emotional state.',
      },
      {
        title: 'Cloud architecture',
        body: 'Adopted an AWS Lambda + API Gateway serverless structure for real-time processing. Optimized frontend response time with Next.js SSR.',
      },
      {
        title: 'Setting the design target',
        body: 'Set the design target at the accuracy prior rPPG research had reported (roughly 92%; contact PPG is roughly 98%), and tuned the pipeline while checking signal quality across lighting and movement conditions.',
      },
    ],
  },
  results: {
    ko: [
      'rPPG 선행 연구 보고 정확도(약 92%)를 목표로 한 신호 처리 파이프라인 구현 — 접촉식 PPG(약 98%) 대비 정확도를 내주고 비접촉이라는 접근성을 얻는 트레이드오프',
      '실시간 생체 데이터 + 심리 프로필 통합 치료용 채팅 서비스 출시',
      '확장 가능한 서버리스 인프라로 동시 사용자 처리 비용 절감',
    ],
    en: [
      'Built a signal-processing pipeline targeting the accuracy prior rPPG research reported (roughly 92%) — a trade-off that gives up accuracy against contact PPG (roughly 98%) in exchange for non-contact accessibility',
      'Shipped a therapeutic chat service integrating real-time biosignal data with a psychological profile',
      'Cut concurrent-user processing cost with scalable serverless infrastructure',
    ],
  },
  learned: [
    {
      title: { ko: '기술 로드맵의 현실화', en: 'Making a technical roadmap real' },
      body: {
        ko: '연구 수준의 알고리즘을 프로덕션에 적용할 때 정확도와 실시간성 사이의 트레이드오프를 명확히 정의해야 한다.',
        en: 'Taking a research-grade algorithm into production requires clearly defining the trade-off between accuracy and real-time performance.',
      },
    },
    {
      title: { ko: '의료 도메인의 검증 기준', en: 'Validation bar in a medical domain' },
      body: {
        ko: '임상 적용을 목표로 할 때는 사용자 테스트 기준이 일반 앱과 다르다. 피험자 프로토콜과 IRB 관련 프로세스를 미리 설계해야 한다.',
        en: 'When clinical application is the goal, user-testing standards differ from a typical app. Subject protocols and IRB-related processes need to be designed in advance.',
      },
    },
    {
      title: { ko: '데이터 파이프라인 우선', en: 'Data pipeline before model' },
      body: {
        ko: 'AI 기반 제품에서 모델보다 데이터 수집과 정제 파이프라인이 먼저다. 초기에 데이터 품질 기준을 높게 잡을수록 이후 반복 속도가 빨라진다.',
        en: 'In an AI-driven product, the data collection and cleaning pipeline comes before the model. Setting a high data-quality bar early speeds up every iteration after.',
      },
    },
  ],
  rejectedOptions: [
    {
      option: { ko: '접촉식 PPG 센서 측정', en: 'Contact PPG sensor measurement' },
      reason: {
        ko: '정확도는 약 98%로 rPPG보다 높다. 하지만 전극과 센서가 필요한 순간 "병원에 가지 않아도 되는 심리 측정"이라는 제품의 전제가 무너진다. 정확도를 내주고 카메라만으로 측정하는 접근성을 얻는 쪽을 택했다.',
        en: "It's roughly 98% accurate — higher than rPPG. But the moment electrodes and sensors are required, the product's premise — psychological measurement without a hospital visit — falls apart. We chose to give up accuracy in exchange for the accessibility of measuring with a camera alone.",
      },
      status: 'draft',
      evidence: 'xitst.html Result 트레이드오프 서술 + 커밋 78507f6',
    },
    {
      option: { ko: '상시 가동 서버', en: 'An always-on server' },
      reason: {
        ko: '초기 단계에서 트래픽은 일정하지 않은데 상시 서버는 비용이 고정된다. AWS Lambda + API Gateway 서버리스로 동시 사용자 비용을 사용량에 비례시켰다.',
        en: "At an early stage, traffic isn't steady, but an always-on server has fixed cost. We used AWS Lambda + API Gateway serverless so concurrent-user cost scales with actual usage.",
      },
      status: 'draft',
      evidence: 'xitst.html Process/Result 서버리스 서술 (검토 여부 확인 필요)',
    },
  ],
  translationStatus: 'draft',
  meta: {
    description: {
      ko: '카메라만으로 심리 상태를 읽는 rPPG 파이프라인 케이스 스터디. 선행 연구 보고 정확도를 설계 기준으로 삼아 검증한 과정.',
      en: 'Case study: a camera-only rPPG pipeline for reading psychological state, built against the accuracy reported by prior published research.',
    },
  },
}
