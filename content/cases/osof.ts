import type { CaseStudy } from './types'

export const osof: CaseStudy = {
  slug: 'osof',
  num: '04',
  name: 'OSOF',
  title: {
    ko: ['청소년 SW 교육 프로그램', '2년 6개월 기획 및 운영'],
    en: ['Youth software-education program:', 'planned and run for two and a half years'],
  },
  heroSub: {
    ko: '코드를 모르는 아이들에게 컴퓨팅 사고력을 심어준 2년 6개월. 커리큘럼부터 운영까지 직접 만들었다.',
    en: 'Two and a half years instilling computational thinking in kids who had never coded. Built the curriculum and the operations myself, end to end.',
  },
  metrics: [
    {
      value: '2.5',
      label: { ko: '프로그램 지속 운영', en: 'Program run continuously' },
      caveat: { ko: '커리큘럼 자체 개발', en: 'in-house curriculum' },
    },
  ],
  context: {
    ko: [
      '광주 지역 초중학생들은 소프트웨어 교육 기회가 서울에 비해 현저히 부족했습니다. 2015 개정 교육과정에서 SW 교육이 의무화되었지만 실질적인 커리큘럼과 교사 역량이 따라가지 못하고 있었습니다.',
      '고등학생 신분으로 청소년 SW 교육 사업 OSOF를 공동 창업해 CEO로서 기획, 운영, 커리큘럼 개발을 주도했습니다. 운영 과정에서 파생 제품으로 IoT 도난방지 장치를 개발했고, 창업경진대회에서 지역 우승했습니다. 이후 사업을 매각하며 Exit했습니다.',
    ],
    en: [
      'Middle- and elementary-school students in Gwangju had markedly fewer software-education opportunities than students in Seoul. The 2015 revised curriculum made SW education mandatory, but the actual curricula and teacher capability hadn\'t caught up.',
      'While still a high school student, I co-founded OSOF, a youth software-education business, and led planning, operations, and curriculum development as CEO. Along the way we developed an IoT anti-theft device as a spin-off product and won regionally at a startup competition. The business was later sold — an exit.',
    ],
  },
  process: {
    ko: [
      {
        title: '커리큘럼 설계',
        body: '컴퓨팅 사고력(CT) 중심으로 언플러그드 활동 → 스크래치 블록 코딩 → 텍스트 코딩 순서로 단계별 커리큘럼 설계.',
      },
      {
        title: '실습 프로젝트 중심',
        body: '강의식 교육 대신 학생이 직접 결과물을 만드는 프로젝트 기반 학습(PBL) 방식 적용. 게임, 애니메이션 등 학생 관심사와 연결.',
      },
      {
        title: 'IoT 확장',
        body: '심화 과정으로 아두이노 기반 도난방지 장치 제작 프로젝트 추가. 하드웨어-소프트웨어 연결 경험 제공.',
      },
      {
        title: '팀 운영',
        body: '팀 빌딩, 정기 교육 일정 운영, 학교/기관과의 파트너십 관리.',
      },
    ],
    en: [
      {
        title: 'Curriculum design',
        body: 'Designed a staged curriculum centered on computational thinking (CT): unplugged activities, then Scratch block coding, then text-based coding.',
      },
      {
        title: 'Hands-on, project-centered',
        body: 'Applied project-based learning (PBL), where students build their own output, instead of lecture-style teaching. Connected projects to student interests like games and animation.',
      },
      {
        title: 'IoT extension',
        body: 'Added an Arduino-based anti-theft-device project as an advanced track, giving students hands-on hardware-software integration experience.',
      },
      {
        title: 'Team operations',
        body: 'Ran team building, the regular class schedule, and partnerships with schools and institutions.',
      },
    ],
  },
  results: {
    ko: [
      '초중학생 대상 SW 교육 프로그램 2년 6개월 지속 운영',
      '자체 개발 커리큘럼으로 컴퓨팅 사고력 + 기초 코딩 교육 제공',
      'IoT 심화 과정 추가로 하드웨어-소프트웨어 연계 경험 제공',
      '성공적 Exit — 이후 지역 교육 기관에 커리큘럼 이관',
    ],
    en: [
      'Ran a software-education program for middle- and elementary-school students continuously for two and a half years',
      'Delivered computational-thinking and foundational coding education with an in-house curriculum',
      'Added an advanced IoT track, giving students hardware-software integration experience',
      'Reached a successful exit — the curriculum was later transferred to a regional education institution',
    ],
  },
  learned: [
    {
      title: { ko: '사용자 수준에서 시작하라', en: 'Start at the level of the user' },
      body: {
        ko: '코딩을 모르는 아이들에게 코드로 시작하면 실패한다. 언플러그드 활동부터 시작해 개념을 먼저 심어야 코드가 의미를 가진다.',
        en: 'Starting with code fails for kids who have never coded. You have to plant the concept first, through unplugged activities, before code means anything.',
      },
    },
    {
      title: { ko: '결과물이 동기를 만든다', en: 'A finished output creates motivation' },
      body: {
        ko: '강의보다 프로젝트. 완성된 게임과 작품을 가져갈 수 있을 때 학생의 참여도와 재방문율이 극적으로 높아졌다.',
        en: "Projects over lectures. When students could walk away with a finished game or piece of work, engagement and return rate rose dramatically.",
      },
    },
    {
      title: { ko: '조직 운영은 제품 운영이다', en: 'Running an organization is running a product' },
      body: {
        ko: '팀을 운영하는 경험이 이후 스타트업 팀 빌딩의 기반이 됐다. 동기부여, 역할 설계, 피드백 루프는 팀의 종류를 가리지 않는다.',
        en: 'The experience of running a team became the foundation for team building at later startups. Motivation, role design, and feedback loops don\'t care what kind of team they\'re applied to.',
      },
    },
  ],
  rejectedOptions: [
    {
      option: { ko: '코드로 시작하는 커리큘럼', en: 'A curriculum that starts with code' },
      reason: {
        ko: '코딩을 모르는 아이들에게 문법부터 가르치면 실패한다. 코드가 의미를 가지려면 개념이 먼저여야 한다. 언플러그드 활동으로 시작해 스크래치를 거쳐 텍스트 코딩으로 올라가는 순서로 뒤집었다.',
        en: "Teaching syntax first to kids who've never coded fails. For code to mean anything, the concept has to come first. We flipped the order: start with unplugged activities, move through Scratch, and only then climb to text-based coding.",
      },
      status: 'draft',
      evidence: 'osof.html Learned#1 + Process#1',
    },
    {
      option: { ko: '강의식 수업', en: 'Lecture-style teaching' },
      reason: {
        ko: '강의보다 프로젝트다. 완성된 게임과 작품을 손에 들려 보냈을 때 참여도와 재방문율이 올라갔다. 커리큘럼 전체를 프로젝트 기반 학습으로 짰다.',
        en: 'Projects beat lectures. Engagement and return rate rose when students left with a finished game or piece of work in hand. We built the entire curriculum around project-based learning.',
      },
      status: 'draft',
      evidence: 'osof.html Process#2 + Learned#2',
    },
  ],
  translationStatus: 'draft',
  meta: {
    description: {
      ko: '청소년 소프트웨어 교육 서비스를 2년 6개월 운영하고 Exit한 케이스 스터디.',
      en: 'Case study: running a youth software-education service for two and a half years, through to exit.',
    },
  },
}
