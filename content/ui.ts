import type { L } from './types'

/**
 * Structural UI chrome labels (section headings, nav labels, formatting suffixes).
 * No factual claims live here — every number, date, and career fact stays in its
 * own content module. Components must never hardcode copy; they read from here.
 */
export interface UiContent {
  meta: { decisionLog: L; lastModified: L }
  header: { logo: string; navLabel: L; langToggle: L; langToggleAria: L }
  footer: { correctionsHeading: L; allRecordsLink: L }
  marginNote: { label: L; draftMarker: L }
  home: { credentialsHeading: L }
  contact: { email: L; linkedin: L; github: L }
  caseStudy: {
    label: L
    backLabel: L
    backHref: string
    sections: { context: L; process: L; rejected: L; result: L; learned: L }
  }
  resume: {
    sections: {
      education: L
      skills: L
      certifications: L
      languages: L
      awards: L
      military: L
      activities: L
      experience: L
    }
  }
  duration: { yearSuffix: L; monthSuffix: L }
}

export const ui: UiContent = {
  meta: {
    decisionLog: { ko: '결정 기록', en: 'Decision log' },
    lastModified: { ko: '최종 수정', en: 'Last updated' },
  },

  header: {
    logo: 'BY.',
    navLabel: { ko: '주요 섹션', en: 'Main sections' },
    langToggle: { ko: 'EN', en: 'KO' },
    langToggleAria: { ko: '언어 전환', en: 'Switch language' },
  },

  footer: {
    correctionsHeading: { ko: '이 사이트의 정정 기록', en: 'Corrections to this site' },
    allRecordsLink: {
      ko: '전체 기록 → GitHub commit history',
      en: 'Full record → GitHub commit history',
    },
  },

  marginNote: {
    label: { ko: '여백 메모', en: 'Margin note' },
    draftMarker: { ko: '검수 대기', en: 'Pending review' },
  },

  home: {
    credentialsHeading: { ko: '기록', en: 'On the record' },
  },

  contact: {
    email: { ko: '이메일', en: 'Email' },
    linkedin: { ko: 'LinkedIn', en: 'LinkedIn' },
    github: { ko: 'GitHub', en: 'GitHub' },
  },

  caseStudy: {
    label: { ko: 'CASE', en: 'CASE' },
    backLabel: { ko: '← 케이스 목록', en: '← All case studies' },
    backHref: '/po/#cases',
    sections: {
      context: { ko: '배경', en: 'Context' },
      process: { ko: '과정', en: 'Process' },
      rejected: { ko: '기각한 선택지', en: 'Options I rejected' },
      result: { ko: '결과', en: 'Result' },
      learned: { ko: '배운 것', en: 'What I learned' },
    },
  },

  resume: {
    sections: {
      education: { ko: '학력', en: 'Education' },
      skills: { ko: '역량', en: 'Skills' },
      certifications: { ko: '자격', en: 'Certifications' },
      languages: { ko: '어학', en: 'Languages' },
      awards: { ko: '수상', en: 'Awards' },
      military: { ko: '병역', en: 'Military service' },
      activities: { ko: '활동', en: 'Activities' },
      experience: { ko: '경력', en: 'Experience' },
    },
  },

  duration: {
    yearSuffix: { ko: '년', en: ' yr' },
    monthSuffix: { ko: '개월', en: ' mo' },
  },
}
