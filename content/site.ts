import type { L } from './types'

const positioningTitle: L = {
  ko: 'Technical Product Owner',
  en: 'Technical Product Owner',
}

export const site = {
  name: '박병영',
  nameEn: 'Byungyoung Park',
  email: 'panda10373@gmail.com',
  /** JSON-LD Person.jobTitle — intentionally distinct from positioningTitle, see index.html ld+json block */
  jobTitle: 'Product Owner',
  positioningTitle,
  titleSeparator: '—',
  alumniOf: '고려대학교',
  worksFor: 'CURI AI',
  urls: {
    canonical: 'https://byungyoung.github.io',
    github: 'https://github.com/byungyoung',
    /** Public correction record the footer links out to — origin is byungyoung/byungyoung.github.io */
    repoCommits: 'https://github.com/byungyoung/byungyoung.github.io/commits/main',
    linkedin: 'https://www.linkedin.com/in/byungyoung',
    poHome: '/po/',
    /** Clean route (trailingSlash:true). The legacy .html deep link becomes a redirect stub in M6. */
    resume: '/po/resume/',
  },
} as const
