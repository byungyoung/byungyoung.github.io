# Homepage Redesign — Design Spec
Date: 2026-04-11

## Overview
기존 개발자 포트폴리오(`/index.html`)를 미니멀 라이트 + 게이미피케이션(퀘스트 타임라인) 스타일로 재설계한다. `/po/` 페이지와 독립적으로 운영되며, 개발자 정체성을 중심으로 한다.

---

## Design Direction

**Theme:** 미니멀 라이트  
**Background:** `#ffffff` / `#f8fafc`  
**Text primary:** `#0f172a`  
**Text muted:** `#64748b` / `#94a3b8`  
**Border:** `#e2e8f0` / `#f1f5f9`  
**Accent (dark):** `#0f172a` (버튼, 강조)  
**Success/live:** `#4ade80`  

**Typography:** Pretendard (jsdelivr CDN) — weights 400/600/700/800/900  
**Layout:** max-width 800px, padding 0 48px, 중앙 정렬  
**Dark mode:** 기존 CSS 변수 시스템 재활용, 라이트 기본  
**i18n:** ko/en 유지 (한국어 기본)

---

## Gamification Elements

**Quest Log** (Experience 섹션 대체):
- 각 경력 항목을 퀘스트로 표현
- 아이콘: ⚡ ACTIVE / ✓ DONE / 🏆 EXIT
- 상태 pill: `ACTIVE` (파랑) / `DONE` (초록) / `EXIT ✓` (노랑)
- 상단에 `5 COMPLETED · 1 ACTIVE` chip 표시

**Level Stats** (Skills 섹션 대체):
- 스킬별 `Lv.N · XX%` 표기
- 레벨 바 (5px height, #0f172a fill)
- 2열 그리드

**Achievements Unlocked** (Skills 하단):
- 업적 카드 4개: Serial Founder(2×Exit), AI Builder(92%), Dual Major, ADsP

---

## Sections (순서대로)

### Nav (fixed, sticky)
- 로고: `BY.`
- 링크: About · Quest Log · Skills · Projects · Contact
- 우측: 다크/라이트 토글 버튼 + EN/KO 언어 토글 버튼
- 배경: `rgba(255,255,255,0.95)` + `backdrop-filter: blur(16px)`
- 하단 border: `1px solid #e2e8f0`
- 스크롤 진행 바: `position:fixed; top:0; height:2px; background:#0f172a`

### Hero
- 상태 배지: 녹색 pulse dot + "OPEN TO OPPORTUNITIES"
- H1 (52px, font-weight 900, letter-spacing -2.5px):
  ```
  개발하고,
  창업하고,
  제품을 만듭니다.  ← #cbd5e1 (muted)
  ```
- 부제: "고려대학교 CS + 경영 복수전공. 개발자로 시작해 두 번 창업하고, 지금은 AI 기반 제품을 만들고 있습니다."
- CTA 1: "Quest Log 보기 ↓" → smooth scroll `#quest`
- CTA 2: "GitHub" → `https://github.com/byungyoung` (새 탭)
- CTA 3: "PO 포트폴리오 →" (텍스트 링크) → `/po/`

### PO Banner (Hero 바로 아래)
- 배경 `#0f172a`, border-radius 14px
- 텍스트: "Product Owner로도 활동 중이에요" + 서브 "rPPG 감정 분석 · UX 개선 · 스타트업 Exit 케이스 스터디"
- 버튼: "PO 페이지 →" → `/po/` (새 탭)

### About
- eyebrow label: "ABOUT"
- 3줄 소개 (i18n 지원):
  - "코드를 짜다가 **두 번 창업**했고, 제품을 만들다 보니 **PO**가 됐습니다."
  - "기술과 비즈니스 사이에서 무언가를 만드는 걸 좋아합니다."
  - "현재는 Xitst에서 **rPPG 기반 AI 감정 분석 플랫폼**을 만들고 있어요."

### Quest Log (id="quest")
eyebrow: "QUEST LOG" / heading: "Quest Log" / chip: "5 COMPLETED · 1 ACTIVE"

| 퀘스트 | 아이콘 | 상태 | 기간 | 태그 |
|--------|--------|------|------|------|
| Xitst — CTO | ⚡ | ACTIVE (파랑) | 2025.03–현재 | Python, AI/ML, React, rPPG |
| Refactor Works — Dev Experience Manager | ✓ | DONE (초록) | 2025.02–2025.03 | DX, Tooling |
| TUTORING — Software Developer | ✓ | DONE (초록) | 2024.09–2024.12 | Next.js, UX, AI |
| Paik — CTO | 🏆 | EXIT ✓ (노랑) | 2019.06–2021.02 | Startup, Fullstack, Exit |
| OSOF — CEO | 🏆 | EXIT ✓ (노랑) | 2016.05–2018.11 | EdTech, CEO, Exit |

### Skills (id="skills")
eyebrow: "SKILLS" / heading: "Level Stats"

스킬 2열 그리드:
| 스킬 | 레벨 | % |
|------|------|---|
| React / Next.js | Lv.8 | 85% |
| Python / AI | Lv.8 | 82% |
| TypeScript | Lv.7 | 75% |
| AWS / DevOps | Lv.6 | 65% |
| Product / OKR | Lv.9 | 92% |
| UI/UX Design | Lv.6 | 68% |

Achievements Unlocked (하단):
- 🏆 Serial Founder — 2× Exit
- 🧠 AI Builder — 92% rPPG 정확도
- 🎓 Dual Major — CS + 경영 · 고려대
- 📊 ADsP — 데이터 분석 준전문가

### Projects (id="projects")
eyebrow: "PROJECTS" / heading: "주요 작업물"

2열 그리드, 4개 카드:
| 카드 | 설명 | 링크 |
|------|------|------|
| 🧬 Xitst rPPG Platform | 얼굴 영상으로 감정 분석하는 비접촉 심리 측정 AI | `/po/cases/xitst.html` |
| 🌐 Lingora AI Tutor | AI 영어 튜터링, UX 개선으로 만족도 85% | `/po/cases/lingora.html` |
| 🏠 Paik 부동산 플랫폼 | 외국인 부동산 중개, 0→1 Exit | `/po/cases/paik.html` |
| 💻 This Portfolio | 순수 HTML/CSS/JS, GitHub Pages | `https://github.com/byungyoung` |

### Contact (id="contact")
eyebrow: "CONTACT" / heading: "연락하기"

링크 3개 (카드 스타일):
- ✉️ `panda10373@gmail.com` → `mailto:panda10373@gmail.com`
- 💼 LinkedIn → `https://www.linkedin.com/in/byungyoung` (새 탭)
- 🐙 GitHub → `https://github.com/byungyoung` (새 탭)

---

## Interactions

- **Smooth scroll** — nav 앵커 링크 전부 `scrollIntoView({behavior:'smooth'})`
- **Active nav highlight** — IntersectionObserver, 현재 섹션 nav 링크 강조
- **Scroll progress bar** — `position:fixed; top:0; height:2px; background:#0f172a`
- **Fade-in animations** — IntersectionObserver, `data-animate` 요소
- **Dark/light toggle** — `data-theme` on `<html>`, localStorage 저장
- **i18n toggle** — `data-i18n` 속성, localStorage 저장, 기존 i18n.js 패턴 재활용
- **외부 링크** — 모두 `target="_blank" rel="noopener"`

---

## File Changes

| 파일 | 변경 내용 |
|------|----------|
| `index.html` | 전체 재작성 (6섹션 → Hero+Banner/About/Quest Log/Skills/Projects/Contact) |
| `assets/css/style.css` | 전체 재작성 (미니멀 라이트 테마, 기존 CSS 변수 구조 유지) |
| `assets/js/main.js` | scroll progress, IntersectionObserver, 다크/라이트 토글 — 기존 패턴 유지 |
| `assets/js/i18n.js` | i18n 키 업데이트 (새 콘텐츠에 맞춰) |

---

## Out of Scope
- `/po/` 페이지 수정 없음
- 서버사이드 렌더링, CMS
- 블로그/글쓰기 섹션
