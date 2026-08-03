export type Lang = 'ko' | 'en'
export type L<T = string> = Record<Lang, T> // localized value
export type ContentStatus = 'draft' | 'approved' // 'draft' items are excluded from the build until owner review

export interface RejectedOption {
  option: L
  reason: L
  status: ContentStatus
  evidence: string
}

export interface MarginNote {
  id: string
  anchor: string
  text: L
  status: ContentStatus
  evidence: string
}

export interface ChangelogEntry {
  date: string
  commit: string
  text: L
  status: ContentStatus
}

export interface Metric {
  value: string
  unit?: string
  label: L
  caveat?: L
  comparison?: L
}
