# PO Personal Brand Page — Design Spec
Date: 2026-04-11

## Overview
현재 개발자 포트폴리오(`/index.html`) 외에, PO/PM 포지션 채용 + 퍼스널브랜딩을 위한 별도 페이지 세트를 `/po/` 경로에 추가한다.

## Deliverables

### 1. `/po/index.html` — PO Portfolio Page
### 2. `/po/resume.html` — Printable Resume

두 파일 모두 독립 실행 가능 (CSS/JS inline or `/po/assets/`).

---

## Design Direction

**Theme:** Bold Gradient — 강렬한 첫인상, 그라디언트 퍼플/블루, 다크 배경  
**Color palette:**
- Background: `#0a0014`
- Gradient: `linear-gradient(135deg, #667eea, #764ba2)`
- Accent purple: `#a78bfa`
- Text primary: `#e2d9f3`
- Text muted: `rgba(226,217,243,0.6)`
- Success/live: `#4ade80`

**Typography:** Pretendard (Google Fonts CDN) — weights 400/600/700/800  
**i18n:** ko/en 지원 (추후 — 초기 버전은 한국어 우선)

---

## Page 1: `/po/index.html`

### Sections (in order)

#### Nav (fixed)
- Logo: `BY.` (gradient text)
- Links: Impact · Experience · Case Studies · Contact
- CTA button: "이력서 보기" → `/po/resume.html` (새 탭)

#### Hero
- Badge: 녹색 pulse dot + "OPEN TO OPPORTUNITIES"
- Title: "기술을 이해하는 **Product Owner.**" (Product Owner에 gradient)
- Subtitle: 개발자 → 창업 → PO 여정 한 줄 요약
- CTA 1: "Case Studies 보기" → smooth scroll to `#cases`
- CTA 2: "LinkedIn →" → `https://www.linkedin.com/in/byungyoung` (새 탭)
- Scroll indicator (하단)

#### Metrics (full-width strip)
세 수치를 크게 배치:
| 수치 | 라벨 |
|------|------|
| 92% | rPPG 감정 탐지 정확도 · Xitst 2025 |
| 85% | 사용자 만족도 · Lingora AI 2024 |
| 2x  | 스타트업 창업 및 Exit |

#### Experience
Timeline 스타일, 3개 항목:
1. **엑시스트 (Xitst)** — CTO · 2025.03–현재 · AI 원격 심리 분석 플랫폼
2. **TUTORING** — Software Developer · 2024.09–2024.12 · Lingora AI
3. **Paik** — CTO · 2019.06–2021.02 · 외국인 부동산 플랫폼 (Exit)

#### Case Studies
2열 그리드, 4개 카드. 각 카드: 문제 → 해결 → 결과(숫자)
1. rPPG 감정 분석 92% 정확도
2. Lingora AI UX 개선 → +20% 효율, 85% 만족도
3. 외국인 부동산 플랫폼 0→1 Exit
4. 청소년 SW 교육 2.5년 운영

#### Contact
중앙 정렬, 3개 링크:
- `panda10373@gmail.com` → `mailto:panda10373@gmail.com`
- LinkedIn → `https://www.linkedin.com/in/byungyoung` (새 탭)
- GitHub → `https://github.com/byungyoung` (새 탭)

### Interactions
- **Smooth scroll** — nav 앵커 링크 모두 `scrollIntoView({behavior:'smooth'})`
- **Active nav highlight** — IntersectionObserver로 현재 섹션 nav 링크 강조
- **Scroll progress bar** — 상단 고정 바
- **Fade-in animations** — IntersectionObserver, `data-animate` 요소
- **외부 링크** — 모두 `target="_blank" rel="noopener"`

---

## Page 2: `/po/resume.html`

**목적:** 인포그래픽 스타일 HTML 이력서 + "PDF 다운로드" 버튼 (html2pdf.js CDN).

### Layout
- 볼드 그라디언트 테마 유지 (PO 페이지와 동일 색상)
- 시각적 요소: 스킬 바, 타임라인, 수치 강조 카드
- A4 비율 (794px 고정 width)
- html2pdf.js로 클라이언트사이드 PDF 변환 — 서버 불필요

### Content (LinkedIn 기반)
**Header:** 박병영 · Product Owner & CTO · panda10373@gmail.com · LinkedIn · GitHub

**Summary:** 개발자 → 창업(2회 Exit) → PO 전환. CS + 경영 복수전공. AI/감정 기술 전문.

**Experience:**
1. Xitst — CTO (2025.03–현재) — rPPG 플랫폼, 감정 탐지 92%
2. TUTORING — Software Developer (2024.09–2024.12) — Lingora AI, 만족도 85%
3. Refactor Works — Developer Experience Manager (2025.02–2025.03)
4. Paik — CTO (2019.06–2021.02) — Exit
5. OSOF — CEO (2016.05–2018.11) — Exit

**Education:**
- 고려대학교 경영학 (2023.08–2025.08)
- 고려대학교 컴퓨터공학 (2019.03–2025.08)

**Skills:** Product: OKR / Roadmap / User Research / Sprint · Tech: React / Next.js / AWS / Python

**Certifications:** ADsP · 2023 G-Local 창업 밸리

---

## Page 3: `/po/cases/*.html` — Case Detail Pages

4개 케이스별 상세 페이지. 각 페이지 구조:
- **Hero** — 케이스 타이틀 + 한 줄 임팩트
- **Context** — 문제 배경 / 내가 맡은 역할
- **Process** — 어떻게 접근했나 (단계별)
- **Result** — 수치 결과 + 배운 것
- **← 목록으로** 버튼 → `/po/index.html#cases`

| 파일 | 케이스 |
|------|--------|
| `cases/xitst.html` | rPPG 감정 탐지 92% 정확도 |
| `cases/lingora.html` | Lingora AI UX 개선 +20% |
| `cases/paik.html` | 외국인 부동산 플랫폼 0→1 Exit |
| `cases/osof.html` | 청소년 SW 교육 2.5년 운영 |

---

## File Structure
```
byungyoung.github.io/
├── index.html              (기존 개발자 포트폴리오 — 변경 없음)
└── po/
    ├── index.html          (PO 포트폴리오 메인)
    ├── resume.html         (인포그래픽 이력서 + PDF 다운로드)
    └── cases/
        ├── xitst.html
        ├── lingora.html
        ├── paik.html
        └── osof.html
```

---

## CTA Wiring (모든 버튼/링크 동작)

| 요소 | 동작 |
|------|------|
| Nav "이력서 보기" | `/po/resume.html` 새 탭 |
| Hero "Case Studies 보기" | smooth scroll → `#cases` |
| Hero "LinkedIn →" | `https://www.linkedin.com/in/byungyoung` 새 탭 |
| Case 카드 "자세히 보기" | `/po/cases/{slug}.html` |
| Resume "PDF 다운로드" | html2pdf.js 클라이언트 변환 |
| Contact 이메일 | `mailto:panda10373@gmail.com` |
| Contact LinkedIn | `https://www.linkedin.com/in/byungyoung` 새 탭 |
| Contact GitHub | `https://github.com/byungyoung` 새 탭 |
| Case 상세 "← 목록으로" | `/po/index.html#cases` |

## Out of Scope
- 기존 `index.html` 수정 없음
- i18n (ko/en) — 추후
- 다크/라이트 토글 — 추후
- CMS 또는 동적 콘텐츠
