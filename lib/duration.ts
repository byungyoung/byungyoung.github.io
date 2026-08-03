import { ui } from '@/content/ui'
import type { Lang } from '@/content/types'

export interface MonthRange {
  start: string
  end: string | null
}

export interface DurationParts {
  value: string
  unit: string
}

const MONTHS_PER_YEAR = 12

const EN_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

interface YearMonth {
  year: number
  month: number
}

function parseYearMonth(value: string): YearMonth {
  const [rawYear, rawMonth] = value.split('-')
  const year = Number(rawYear)
  const month = Number(rawMonth)

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Invalid YYYY-MM value: ${value}`)
  }

  return { year, month }
}

function toMonthIndex({ year, month }: YearMonth): number {
  return year * MONTHS_PER_YEAR + (month - 1)
}

function nowMonthIndex(): number {
  const now = new Date()
  return now.getFullYear() * MONTHS_PER_YEAR + now.getMonth()
}

/**
 * End-exclusive month span. An open range runs to the current month.
 * 2016-05 → 2018-11 is 30 months; 2019-06 → 2021-01 is 19 months.
 */
export function monthsBetween(range: MonthRange): number {
  const start = toMonthIndex(parseYearMonth(range.start))
  const end = range.end ? toMonthIndex(parseYearMonth(range.end)) : nowMonthIndex()
  return Math.max(0, end - start)
}

export function totalMonths(ranges: readonly MonthRange[]): number {
  return ranges.reduce((sum, range) => sum + monthsBetween(range), 0)
}

/** Splits a month count so a metric tile can set the number and its unit apart. */
export function formatDurationParts(months: number, lang: Lang): DurationParts {
  const years = Math.trunc(months / MONTHS_PER_YEAR)
  const rest = months % MONTHS_PER_YEAR
  const yearSuffix = ui.duration.yearSuffix[lang]
  const monthSuffix = ui.duration.monthSuffix[lang]

  if (years === 0) return { value: String(rest), unit: monthSuffix }
  if (rest === 0) return { value: String(years), unit: yearSuffix }

  return { value: String(years), unit: `${yearSuffix} ${rest}${monthSuffix}` }
}

export function formatDuration(months: number, lang: Lang): string {
  const { value, unit } = formatDurationParts(months, lang)
  return `${value}${unit}`
}

/** 2026-01 → "2026.01" (ko) or "Jan 2026" (en). */
export function formatMonth(value: string, lang: Lang): string {
  const { year, month } = parseYearMonth(value)
  if (lang === 'ko') return `${year}.${String(month).padStart(2, '0')}`
  return `${EN_MONTHS[month - 1]} ${year}`
}

export function formatMonthRange(
  range: MonthRange,
  lang: Lang,
  openEndedLabel: string,
): string {
  const start = formatMonth(range.start, lang)
  const end = range.end ? formatMonth(range.end, lang) : openEndedLabel
  return `${start} — ${end}`
}
