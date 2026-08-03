import type { ContentStatus, L, Metric, RejectedOption } from '../types'

export type CaseSlug = 'xitst' | 'lingora' | 'paik' | 'osof'

export interface ProcessStep {
  title: string
  body: string
}

export interface LearnedItem {
  title: L
  body: L
}

export interface CaseStudy {
  slug: CaseSlug
  num: string
  name: string
  title: L<string[]>
  heroSub: L
  metrics: Metric[]
  context: L<string[]>
  process: L<ProcessStep[]>
  results: L<string[]>
  learned: LearnedItem[]
  rejectedOptions: RejectedOption[]
  translationStatus: ContentStatus
  meta: { description: L }
}
