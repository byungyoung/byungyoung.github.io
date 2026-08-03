import type { CaseSlug, CaseStudy } from './types'
import { xitst } from './xitst'
import { lingora } from './lingora'
import { paik } from './paik'
import { osof } from './osof'

export type { CaseSlug, CaseStudy, ProcessStep, LearnedItem } from './types'
export { xitst, lingora, paik, osof }

export const cases: CaseStudy[] = [xitst, lingora, paik, osof]

export const casesBySlug: Record<CaseSlug, CaseStudy> = {
  xitst,
  lingora,
  paik,
  osof,
}
