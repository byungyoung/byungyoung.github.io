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
    linkedin: 'https://www.linkedin.com/in/byungyoung',
    /** Pre-merge PO landing; now a redirect stub to the game at /. */
    poHome: '/po/',
    /** Plain résumé (trailingSlash:true). /po/resume/ and the legacy .html link redirect here. */
    resume: '/resume/',
  },
} as const
