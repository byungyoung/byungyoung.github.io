import type { L } from './types'

export interface Shot {
  file: string
  width: number
  height: number
  alt: L
}

const DESKTOP = { width: 1500, height: 913 } as const

export const shotsByPlace: Record<string, Shot[]> = {
  curi: [
    {
      file: 'curi-channel-01-topics',
      ...DESKTOP,
      alt: {
        ko: 'Channel 제품 화면: 주제별로 조사, 제작, 발행, 측정 단계의 건수를 보여주는 주제 목록',
        en: 'Channel product screen: a list of topics with counts for research, creation, publishing and measurement',
      },
    },
    {
      file: 'curi-cufind-01-concerns',
      ...DESKTOP,
      alt: {
        ko: 'Curi Find 제품 화면: 피부 고민 여덟 가지를 고르는 시작 화면',
        en: 'Curi Find product screen: a start page for choosing among eight skin concerns',
      },
    },
    {
      file: 'curi-cufind-02-atlas',
      ...DESKTOP,
      alt: {
        ko: 'Curi Find 제품 화면: 성분 사전 목록, 성분마다 근거 수준 표시',
        en: 'Curi Find product screen: the ingredient atlas, each ingredient tagged with an evidence level',
      },
    },
    {
      file: 'curi-cufind-03-ingredient',
      ...DESKTOP,
      alt: {
        ko: 'Curi Find 제품 화면: 나이아신아마이드 성분 상세, 근거 수준과 효능, 주의점',
        en: 'Curi Find product screen: the niacinamide detail page with evidence level, benefits and cautions',
      },
    },
    {
      file: 'curi-cunnect-01-landing',
      ...DESKTOP,
      alt: {
        ko: 'CUNNECT 제품 화면: 내 명함첩은 내 스프레드시트에 쌓인다는 안내와 Google 시작 버튼',
        en: 'CUNNECT product screen: the landing page saying business cards go into your own spreadsheet, with a Google sign-in button',
      },
    },
  ],
  xitst: [
    {
      file: 'xitst-mirror-01',
      width: 2880,
      height: 1560,
      alt: {
        ko: 'Xitst Mirror 화면: 카메라 미리보기와 심박수, HRV 측정 패널',
        en: 'Xitst Mirror screen: a camera preview beside heart rate and HRV panels',
      },
    },
  ],
}
