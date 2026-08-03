import type { ChangelogEntry, L } from './types'

export const changelogIntro: L = {
  ko: '이 사이트도 제품입니다. 잘못 쓴 것을 고친 기록을 지우지 않고 남깁니다.',
  en: 'This site is a product, too. A record of what it got wrong, and the fixes. Kept, not deleted.',
}

export const changelog: ChangelogEntry[] = [
  {
    date: '2026-07-30',
    commit: '78507f6',
    text: {
      ko: "92%의 출처를 정정했다. 선행 연구가 보고한 정확도인데 자체 측정값처럼 서술돼 있었다. 창작된 방법론 서술을 지우고 '선행 연구 보고 기준 · 설계 목표'로 바꿨다.",
      en: "Corrected the source of the 92% figure. It's the accuracy reported by prior published research, but it read like a number we'd measured ourselves. Removed the fabricated methodology description and replaced it with 'per prior published research · design target.'",
    },
    status: 'approved',
  },
  {
    date: '2026-07-30',
    commit: '78507f6',
    text: {
      ko: "'전통 접촉식 대비 92%'는 방향이 뒤집힌 서술이었다. 접촉식 PPG가 약 98%로 더 높다. 우위 서술을 트레이드오프 서술로 바로잡았다.",
      en: "'92% versus traditional contact methods' had the comparison backwards. Contact PPG is actually more accurate, at roughly 98%. Rewrote the claim of superiority as what it actually is: a trade-off.",
    },
    status: 'approved',
  },
  {
    date: '2026-07-30',
    commit: '78507f6',
    text: {
      ko: "'사용자 만족도 85%'를 '사용성 평가 85점'으로 정정했다. 만족도 조사가 아니라 사용성 평가 결과였다.",
      en: "Corrected '85% user satisfaction' to '85-point usability evaluation score.' It was never a satisfaction survey — it was a usability evaluation.",
    },
    status: 'approved',
  },
  {
    date: '2026-07-30',
    commit: 'dc0c044',
    text: {
      ko: '사이트를 제출한 CV와 일치시켰다. 현직이 통째로 빠져 있었고 이전 직장이 Present로 남아 있었다.',
      en: "Brought the site back in line with the CV I'd actually submitted. The current job was missing entirely, and a previous employer was still marked as Present.",
    },
    status: 'approved',
  },
  {
    date: '2026-07-30',
    commit: '4fe9ee9',
    text: {
      ko: '게임화 요소를 전부 걷어냈다. Lv.8 스킬 바의 수치는 근거가 없었다. 같은 날 정정한 92%·85%와 같은 문제였다.',
      en: 'Stripped out the gamification. The numbers behind the Lv.8 skill bars had no basis — the same problem as the 92% and 85% figures corrected the same day.',
    },
    status: 'approved',
  },
  {
    date: '2026-04-11',
    commit: 'cf2c197',
    text: {
      ko: '케이스 스터디 4편과 이력서 페이지를 처음 공개했다.',
      en: 'Published the first four case studies and the résumé page.',
    },
    status: 'approved',
  },
]
