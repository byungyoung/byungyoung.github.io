# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `index.html` from dark-tech developer portfolio to a minimal-light gamified portfolio with Quest Log experience timeline and Level Stats skills section.

**Architecture:** Full rewrite of `index.html`, `assets/css/style.css`, `assets/js/main.js`, and `assets/js/i18n.js`. Light theme becomes the default (`data-theme="light"` on `<html>`); dark mode via `[data-theme="dark"]`. CSS custom properties system preserved. Quest Log replaces Experience section (no company-switching panel). Skills section replaced by Level Stats with achievement badges.

**Tech Stack:** Pure HTML/CSS/JS (no build tools). Pretendard via `cdn.jsdelivr.net/gh/orioncactus/pretendard`. GitHub Pages. `data-theme`, `data-i18n`, `data-animate` attribute patterns retained from existing code.

---

### Task 1: CSS Design System

**Files:**
- Modify: `assets/css/style.css` (full rewrite)

- [ ] **Step 1: Verify current line count**

```bash
wc -l assets/css/style.css
```
Expected: `671 assets/css/style.css`

- [ ] **Step 2: Write new style.css**

Replace the entire contents of `assets/css/style.css`:

```css
/* ─── RESET & BASE ──────────────────────────────── */
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  line-height: 1.55;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}

/* ─── DESIGN TOKENS ─────────────────────────────── */
:root {
  --bg:            #ffffff;
  --bg-alt:        #f8fafc;
  --surface:       #f1f5f9;
  --border:        #e2e8f0;
  --border-subtle: #f1f5f9;
  --text:          #0f172a;
  --text-muted:    #64748b;
  --text-subtle:   #94a3b8;
  --text-inv:      #ffffff;
  --accent:        #0f172a;
  --radius:        10px;
  --radius-sm:     6px;
  --max-width:     800px;
  --pad-x:         48px;
  --transition:    0.2s ease;
}
[data-theme="dark"] {
  --bg:            #0e1116;
  --bg-alt:        #161b22;
  --surface:       #1d232c;
  --border:        #30363d;
  --border-subtle: #1d232c;
  --text:          #dbe2ec;
  --text-muted:    #92a0b5;
  --text-subtle:   #4a5568;
  --text-inv:      #0e1116;
  --accent:        #dbe2ec;
}

/* ─── SCROLL PROGRESS ───────────────────────────── */
.scroll-progress {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 2px;
  z-index: 300; background: transparent; pointer-events: none;
}
.scroll-progress-bar {
  width: 0%; height: 100%;
  background: var(--accent);
  transition: width 0.1s linear;
}

/* ─── NAV ───────────────────────────────────────── */
.site-header {
  position: sticky; top: 0; z-index: 200;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  height: 60px;
}
[data-theme="dark"] .site-header { background: rgba(14,17,22,0.92); }
.site-header .container {
  height: 100%; display: flex;
  align-items: center; justify-content: space-between;
}
.logo a {
  font-size: 18px; font-weight: 900; letter-spacing: -1px;
  color: var(--text); text-decoration: none;
}
.primary-nav { display: flex; }
.nav-list {
  display: flex; list-style: none;
  align-items: center; gap: 28px;
}
.nav-list a {
  font-size: 13px; color: var(--text-muted);
  text-decoration: none; transition: color var(--transition);
}
.nav-list a:hover,
.nav-list a.active { color: var(--text); font-weight: 600; }
.ctrl-btn {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-sm); padding: 4px 10px;
  font-size: 11px; color: var(--text-muted);
  cursor: pointer; font-family: inherit;
  transition: background var(--transition);
}
.ctrl-btn:hover { background: var(--border); }
.nav-controls { display: flex; gap: 8px; align-items: center; }

/* ─── LAYOUT ─────────────────────────────────────── */
.container {
  width: 100%; max-width: var(--max-width);
  margin: 0 auto; padding: 0 var(--pad-x);
}

/* ─── HERO ───────────────────────────────────────── */
.hero { padding: 96px 0 72px; }
.status-badge {
  display: inline-flex; align-items: center; gap: 7px;
  background: #f0fdf4; border: 1px solid #bbf7d0;
  border-radius: 20px; padding: 5px 14px;
  font-size: 11px; color: #16a34a;
  font-weight: 600; letter-spacing: 0.5px; margin-bottom: 28px;
}
[data-theme="dark"] .status-badge {
  background: rgba(74,222,128,0.1); border-color: rgba(74,222,128,0.25);
}
.status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #4ade80; animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
.hero-h1 {
  font-size: 52px; font-weight: 900; line-height: 1.05;
  letter-spacing: -2.5px; margin-bottom: 20px; color: var(--text);
}
.hero-h1 .muted { color: var(--text-subtle); font-weight: 700; }
.hero-sub {
  font-size: 16px; color: var(--text-muted);
  line-height: 1.75; margin-bottom: 36px; max-width: 520px;
}
.hero-ctas { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.cta-main {
  background: var(--accent); color: var(--text-inv);
  border: none; border-radius: 8px; padding: 11px 22px;
  font-size: 13px; font-weight: 700; cursor: pointer;
  font-family: inherit; text-decoration: none; display: inline-block;
  transition: opacity var(--transition);
}
.cta-main:hover { opacity: 0.85; }
.cta-ghost {
  background: transparent; border: 1.5px solid var(--border);
  border-radius: 8px; padding: 10px 22px;
  font-size: 13px; color: var(--text-muted); cursor: pointer;
  font-family: inherit; text-decoration: none; display: inline-block;
  transition: border-color var(--transition), color var(--transition);
}
.cta-ghost:hover { border-color: var(--text-muted); color: var(--text); }
.cta-text {
  font-size: 13px; color: var(--text-subtle); text-decoration: none;
  border-bottom: 1px dashed var(--border); padding-bottom: 1px;
  transition: color var(--transition);
}
.cta-text:hover { color: var(--text); }

/* ─── PO BANNER ──────────────────────────────────── */
.po-banner {
  background: #0f172a; border-radius: 14px;
  padding: 22px 28px; display: flex;
  align-items: center; justify-content: space-between; gap: 16px;
}
[data-theme="dark"] .po-banner { background: #1d232c; border: 1px solid var(--border); }
.po-banner-title { color: #f1f5f9; font-size: 15px; font-weight: 700; margin-bottom: 4px; }
.po-banner-sub   { color: #64748b; font-size: 12px; }
.po-banner-btn {
  background: #ffffff; color: #0f172a; border: none;
  border-radius: 7px; padding: 9px 16px;
  font-size: 12px; font-weight: 800; cursor: pointer;
  white-space: nowrap; font-family: inherit;
  text-decoration: none; display: inline-block;
  transition: opacity var(--transition);
}
.po-banner-btn:hover { opacity: 0.85; }

/* ─── SECTION CHROME ─────────────────────────────── */
.section { padding: 80px 0; border-top: 1px solid var(--border-subtle); }
.sec-eyebrow {
  font-size: 10px; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; color: var(--text-subtle); margin-bottom: 8px;
}
.sec-heading {
  font-size: 28px; font-weight: 800; letter-spacing: -0.8px;
  color: var(--text); margin-bottom: 36px;
}

/* ─── ABOUT ──────────────────────────────────────── */
.about-body { font-size: 16px; color: var(--text-muted); line-height: 1.85; }
.about-body b { color: var(--text); font-weight: 700; }

/* ─── QUEST LOG ──────────────────────────────────── */
.ql-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 36px; }
.ql-heading { font-size: 28px; font-weight: 800; letter-spacing: -0.8px; color: var(--text); }
.ql-chip {
  background: #eff6ff; border: 1px solid #bfdbfe;
  border-radius: 6px; padding: 3px 10px;
  font-size: 11px; color: #3b82f6; font-weight: 700;
}
[data-theme="dark"] .ql-chip {
  background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.25);
}
.quest {
  display: flex; gap: 20px;
  padding: 24px 0; border-bottom: 1px solid var(--border-subtle);
}
.quest:last-child { border-bottom: none; }
.q-icon {
  width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; margin-top: 1px;
}
.q-icon.active { background: #eff6ff; border: 1.5px solid #93c5fd; }
.q-icon.done   { background: #f0fdf4; border: 1.5px solid #86efac; }
.q-icon.exit   { background: #fefce8; border: 1.5px solid #fde68a; }
[data-theme="dark"] .q-icon.active { background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.3); }
[data-theme="dark"] .q-icon.done   { background: rgba(74,222,128,0.1); border-color: rgba(74,222,128,0.3); }
[data-theme="dark"] .q-icon.exit   { background: rgba(251,191,36,0.1);  border-color: rgba(251,191,36,0.3); }
.q-right { flex: 1; min-width: 0; }
.q-row1 { display: flex; align-items: center; gap: 10px; margin-bottom: 3px; flex-wrap: wrap; }
.q-title  { font-size: 15px; font-weight: 700; color: var(--text); }
.q-pill   { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px; flex-shrink: 0; }
.pill-active { background: #dbeafe; color: #1d4ed8; }
.pill-done   { background: #dcfce7; color: #15803d; }
.pill-exit   { background: #fef9c3; color: #a16207; }
[data-theme="dark"] .pill-active { background: rgba(59,130,246,0.15); color: #93c5fd; }
[data-theme="dark"] .pill-done   { background: rgba(74,222,128,0.15); color: #86efac; }
[data-theme="dark"] .pill-exit   { background: rgba(251,191,36,0.15);  color: #fde68a; }
.q-period { font-size: 12px; color: var(--text-subtle); margin-bottom: 6px; }
.q-desc   { font-size: 13px; color: var(--text-muted); line-height: 1.65; margin-bottom: 10px; }
.q-tags   { display: flex; gap: 6px; flex-wrap: wrap; }
.tag {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 5px; padding: 2px 8px;
  font-size: 11px; color: var(--text-muted);
}

/* ─── LEVEL STATS ────────────────────────────────── */
.skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 40px; margin-bottom: 40px; }
.sk-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 7px; }
.sk-name { font-size: 13px; font-weight: 600; color: var(--text); }
.sk-lv   { font-size: 12px; color: var(--text-subtle); font-family: 'Courier New', monospace; }
.sk-track { background: var(--surface); border-radius: 99px; height: 5px; overflow: hidden; }
.sk-fill  {
  height: 100%; border-radius: 99px; background: var(--accent);
  transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
}
.sk-fill[data-width] { width: 0; }
.ach-label {
  font-size: 10px; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; color: var(--text-subtle); margin-bottom: 16px;
}
.ach-row { display: flex; gap: 12px; flex-wrap: wrap; }
.ach {
  display: flex; align-items: center; gap: 10px;
  background: var(--bg-alt); border: 1px solid var(--border);
  border-radius: 10px; padding: 10px 16px;
}
.ach-icon { font-size: 20px; }
.ach-name { font-size: 13px; font-weight: 700; color: var(--text); }
.ach-desc { font-size: 11px; color: var(--text-subtle); margin-top: 1px; }

/* ─── PROJECTS ───────────────────────────────────── */
.projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.project-card {
  border: 1.5px solid var(--border); border-radius: 14px;
  padding: 24px; background: var(--bg);
  transition: border-color var(--transition);
}
.project-card:hover { border-color: var(--text-muted); }
.proj-emoji { font-size: 28px; margin-bottom: 14px; display: block; }
.proj-name  { font-size: 15px; font-weight: 700; margin-bottom: 6px; color: var(--text); }
.proj-desc  { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 14px; }
.proj-link  { font-size: 12px; font-weight: 700; color: var(--text); text-decoration: none; }
.proj-link::after { content: ' →'; }
.proj-link:hover  { opacity: 0.7; }

/* ─── CONTACT ────────────────────────────────────── */
.contact-row { display: flex; gap: 12px; flex-wrap: wrap; }
.contact-a {
  display: flex; align-items: center; gap: 9px;
  border: 1.5px solid var(--border); border-radius: 10px;
  padding: 12px 18px; text-decoration: none;
  color: var(--text); font-size: 13px; font-weight: 600;
  background: var(--bg);
  transition: background var(--transition), border-color var(--transition);
}
.contact-a:hover { background: var(--bg-alt); border-color: var(--text-muted); }

/* ─── FOOTER ─────────────────────────────────────── */
.site-footer {
  border-top: 1px solid var(--border-subtle);
  padding: 32px 0; color: var(--text-subtle); font-size: 12px;
}

/* ─── FADE-IN ────────────────────────────────────── */
[data-animate] {
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
[data-animate].in { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  [data-animate] { opacity: 1; transform: none; transition: none; }
}

/* ─── MOBILE ─────────────────────────────────────── */
@media (max-width: 768px) {
  :root { --pad-x: 24px; }
  .hero-h1  { font-size: 36px; letter-spacing: -1.5px; }
  .hero-sub { font-size: 15px; }
  .skills-grid   { grid-template-columns: 1fr; gap: 16px; }
  .projects-grid { grid-template-columns: 1fr; }
  .po-banner { flex-direction: column; align-items: flex-start; }
  .contact-row   { flex-direction: column; }
  .contact-a { justify-content: center; }
  .nav-list { gap: 16px; }
  .nav-list li:nth-child(n+4):not(:last-child):not(:last-child) { display: none; }
}
```

- [ ] **Step 3: Verify written**

```bash
wc -l assets/css/style.css
```
Expected: ~280 lines

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css
git commit -m ":art: style: rewrite CSS — minimal-light gamified design system"
```

---

### Task 2: i18n.js — New Dictionary

**Files:**
- Modify: `assets/js/i18n.js` (full rewrite)

- [ ] **Step 1: Write new i18n.js**

Replace entire contents of `assets/js/i18n.js`:

```js
window.I18N = {
  ko: {
    "nav.about":    "About",
    "nav.quest":    "Quest Log",
    "nav.skills":   "Skills",
    "nav.projects": "Projects",
    "nav.contact":  "Contact",
    "hero.badge":    "OPEN TO OPPORTUNITIES",
    "hero.h1":       "개발하고,<br>창업하고,<br><span class=\"muted\">제품을 만듭니다.</span>",
    "hero.subtitle": "고려대학교 CS + 경영 복수전공. 개발자로 시작해 두 번 창업하고,<br>지금은 AI 기반 제품을 만들고 있습니다.",
    "hero.ctaQuest": "Quest Log 보기 ↓",
    "hero.ctaGithub":"GitHub",
    "hero.ctaPo":    "PO 포트폴리오 →",
    "po.title": "Product Owner로도 활동 중이에요",
    "po.sub":   "rPPG 감정 분석 · UX 개선 · 스타트업 Exit 케이스 스터디",
    "po.btn":   "PO 페이지 →",
    "about.heading": "About",
    "about.body":    "코드를 짜다가 <b>두 번 창업</b>했고, 제품을 만들다 보니 <b>PO</b>가 됐습니다.<br>기술과 비즈니스 사이에서 무언가를 만드는 걸 좋아합니다.<br>현재는 Xitst에서 <b>rPPG 기반 AI 감정 분석 플랫폼</b>을 만들고 있어요.",
    "ql.heading":  "Quest Log",
    "ql.chip":     "5 COMPLETED · 1 ACTIVE",
    "ql.q1.title":  "Xitst — CTO",
    "ql.q1.period": "2025.03 – 현재 · AI 원격 심리 분석 플랫폼",
    "ql.q1.desc":   "rPPG 기술로 얼굴 영상에서 감정 상태를 비접촉 분석. 92% 정확도 달성.",
    "ql.q1.status": "ACTIVE",
    "ql.q2.title":  "Refactor Works — Dev Experience Manager",
    "ql.q2.period": "2025.02 – 2025.03",
    "ql.q2.desc":   "개발자 경험 개선 및 내부 도구 관리.",
    "ql.q2.status": "DONE",
    "ql.q3.title":  "TUTORING — Software Developer",
    "ql.q3.period": "2024.09 – 2024.12 · Lingora AI",
    "ql.q3.desc":   "AI 영어 튜터링 UX 개선. 학습 효율 +20%, 사용자 만족도 85% 달성.",
    "ql.q3.status": "DONE",
    "ql.q4.title":  "Paik — CTO",
    "ql.q4.period": "2019.06 – 2021.02 · 외국인 부동산 플랫폼",
    "ql.q4.desc":   "0에서 시작해 외국인 대상 부동산 중개 플랫폼 구축 후 성공적 Exit.",
    "ql.q4.status": "EXIT ✓",
    "ql.q5.title":  "OSOF — CEO",
    "ql.q5.period": "2016.05 – 2018.11 · 청소년 SW 교육",
    "ql.q5.desc":   "청소년 소프트웨어 교육 서비스 2.5년 운영 후 Exit.",
    "ql.q5.status": "EXIT ✓",
    "skills.heading":   "Level Stats",
    "skills.ach.label": "Achievements Unlocked",
    "skills.ach1.name": "Serial Founder", "skills.ach1.desc": "2× Exit",
    "skills.ach2.name": "AI Builder",     "skills.ach2.desc": "92% rPPG 정확도",
    "skills.ach3.name": "Dual Major",     "skills.ach3.desc": "CS + 경영 · 고려대",
    "skills.ach4.name": "ADsP",           "skills.ach4.desc": "데이터 분석 준전문가",
    "projects.heading":  "주요 작업물",
    "projects.p1.name":  "Xitst rPPG Platform",
    "projects.p1.desc":  "얼굴 영상으로 감정 분석하는 비접촉 심리 측정 AI 플랫폼.",
    "projects.p1.link":  "케이스 스터디",
    "projects.p2.name":  "Lingora AI Tutor",
    "projects.p2.desc":  "AI 기반 영어 튜터링. UX 개선으로 학습 만족도 85% 달성.",
    "projects.p2.link":  "케이스 스터디",
    "projects.p3.name":  "Paik 부동산 플랫폼",
    "projects.p3.desc":  "외국인 대상 부동산 중개 플랫폼. 0→1 빌드 후 Exit.",
    "projects.p3.link":  "케이스 스터디",
    "projects.p4.name":  "이 포트폴리오",
    "projects.p4.desc":  "순수 HTML/CSS/JS. 빌드 툴 없이 GitHub Pages 배포.",
    "projects.p4.link":  "GitHub",
    "contact.heading":   "연락하기",
  },
  en: {
    "nav.about":    "About",
    "nav.quest":    "Quest Log",
    "nav.skills":   "Skills",
    "nav.projects": "Projects",
    "nav.contact":  "Contact",
    "hero.badge":    "OPEN TO OPPORTUNITIES",
    "hero.h1":       "Building,<br>launching,<br><span class=\"muted\">creating products.</span>",
    "hero.subtitle": "CS + Business at Korea University. Started as a dev, founded two companies,<br>now building AI products.",
    "hero.ctaQuest": "View Quest Log ↓",
    "hero.ctaGithub":"GitHub",
    "hero.ctaPo":    "PO Portfolio →",
    "po.title": "Also active as a Product Owner",
    "po.sub":   "rPPG emotion analysis · UX improvements · startup exit case studies",
    "po.btn":   "PO Page →",
    "about.heading": "About",
    "about.body":    "Started coding, <b>founded two companies</b>, and became a <b>PO</b> along the way.<br>I love building at the intersection of technology and business.<br>Currently building an <b>rPPG-based AI emotion analysis platform</b> at Xitst.",
    "ql.heading":  "Quest Log",
    "ql.chip":     "5 COMPLETED · 1 ACTIVE",
    "ql.q1.title":  "Xitst — CTO",
    "ql.q1.period": "Mar 2025 – Present · AI Remote Psychological Analysis",
    "ql.q1.desc":   "Non-contact emotion analysis from facial video via rPPG. Achieved 92% accuracy.",
    "ql.q1.status": "ACTIVE",
    "ql.q2.title":  "Refactor Works — Dev Experience Manager",
    "ql.q2.period": "Feb 2025 – Mar 2025",
    "ql.q2.desc":   "Developer experience improvements and internal tooling.",
    "ql.q2.status": "DONE",
    "ql.q3.title":  "TUTORING — Software Developer",
    "ql.q3.period": "Sep 2024 – Dec 2024 · Lingora AI",
    "ql.q3.desc":   "Improved AI English tutoring UX. +20% learning efficiency, 85% user satisfaction.",
    "ql.q3.status": "DONE",
    "ql.q4.title":  "Paik — CTO",
    "ql.q4.period": "Jun 2019 – Feb 2021 · Expat Real Estate Platform",
    "ql.q4.desc":   "Built expat-focused real estate brokerage platform from zero and exited.",
    "ql.q4.status": "EXIT ✓",
    "ql.q5.title":  "OSOF — CEO",
    "ql.q5.period": "May 2016 – Nov 2018 · Youth SW Education",
    "ql.q5.desc":   "Operated a youth software education service for 2.5 years, then exited.",
    "ql.q5.status": "EXIT ✓",
    "skills.heading":   "Level Stats",
    "skills.ach.label": "Achievements Unlocked",
    "skills.ach1.name": "Serial Founder", "skills.ach1.desc": "2× Exit",
    "skills.ach2.name": "AI Builder",     "skills.ach2.desc": "92% rPPG accuracy",
    "skills.ach3.name": "Dual Major",     "skills.ach3.desc": "CS + Business · KU",
    "skills.ach4.name": "ADsP",           "skills.ach4.desc": "Data Analysis Professional",
    "projects.heading":  "Selected Work",
    "projects.p1.name":  "Xitst rPPG Platform",
    "projects.p1.desc":  "Non-contact AI platform for emotion analysis via facial video.",
    "projects.p1.link":  "Case Study",
    "projects.p2.name":  "Lingora AI Tutor",
    "projects.p2.desc":  "AI-based English tutoring. 85% satisfaction via UX improvements.",
    "projects.p2.link":  "Case Study",
    "projects.p3.name":  "Paik Real Estate",
    "projects.p3.desc":  "Expat-focused property brokerage. 0→1 build and exit.",
    "projects.p3.link":  "Case Study",
    "projects.p4.name":  "This Portfolio",
    "projects.p4.desc":  "Pure HTML/CSS/JS. Deployed on GitHub Pages with no build tools.",
    "projects.p4.link":  "GitHub",
    "contact.heading":   "Get in Touch",
  },
};
window.I18N.kr = window.I18N.ko;
window.dispatchEvent(new Event("I18N_READY"));
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/i18n.js
git commit -m ":globe_with_meridians: i18n: rewrite dictionary for redesigned homepage"
```

---

### Task 3: index.html — New Markup

**Files:**
- Modify: `index.html` (full rewrite)

Uses CSS classes from Task 1, i18n keys from Task 2. Section IDs: `hero`, `about`, `quest`, `skills`, `projects`, `contact`.

- [ ] **Step 1: Write new index.html**

Replace entire contents of `index.html`:

```html
<!DOCTYPE html>
<html lang="ko" data-theme="light" class="no-js">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <title>박병영 | Developer & Product Owner</title>
  <meta name="description" content="개발자이자 Product Owner. 두 번의 창업 Exit, AI 감정 분석 플랫폼 CTO." />
  <meta name="author" content="박병영 Byungyoung Park" />
  <link rel="canonical" href="https://byungyoung.github.io" />
  <meta name="robots" content="index,follow" />
  <meta name="color-scheme" content="light dark" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="박병영 | Developer & Product Owner" />
  <meta property="og:description" content="개발자이자 Product Owner. 두 번의 창업 Exit, AI 감정 분석 플랫폼 CTO." />
  <meta property="og:url" content="https://byungyoung.github.io" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "박병영",
    "url": "https://byungyoung.github.io",
    "jobTitle": "CTO & Product Owner",
    "email": "mailto:panda10373@gmail.com",
    "worksFor": { "@type": "Organization", "name": "Xitst" },
    "sameAs": [
      "https://github.com/byungyoung",
      "https://www.linkedin.com/in/byungyoung"
    ]
  }
  </script>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
  <script>document.documentElement.classList.remove("no-js");</script>
</head>
<body>

  <div class="scroll-progress" aria-hidden="true">
    <div class="scroll-progress-bar"></div>
  </div>

  <header class="site-header" id="top">
    <div class="container">
      <div class="logo"><a href="#top">BY.</a></div>
      <nav class="primary-nav" aria-label="Primary">
        <ul class="nav-list">
          <li><a data-i18n="nav.about"    href="#about">About</a></li>
          <li><a data-i18n="nav.quest"    href="#quest">Quest Log</a></li>
          <li><a data-i18n="nav.skills"   href="#skills">Skills</a></li>
          <li><a data-i18n="nav.projects" href="#projects">Projects</a></li>
          <li><a data-i18n="nav.contact"  href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div class="nav-controls">
        <button id="themeToggle" class="ctrl-btn" aria-label="Toggle dark mode">🌙 다크</button>
        <button id="langToggle"  class="ctrl-btn" aria-label="Toggle language">KO/EN</button>
      </div>
    </div>
  </header>

  <main id="main">
    <div class="container">

      <section class="hero" id="hero" data-animate>
        <div class="status-badge">
          <div class="status-dot"></div>
          <span data-i18n="hero.badge">OPEN TO OPPORTUNITIES</span>
        </div>
        <h1 class="hero-h1" data-i18n="hero.h1">
          개발하고,<br>창업하고,<br><span class="muted">제품을 만듭니다.</span>
        </h1>
        <p class="hero-sub" data-i18n="hero.subtitle">
          고려대학교 CS + 경영 복수전공. 개발자로 시작해 두 번 창업하고,<br>지금은 AI 기반 제품을 만들고 있습니다.
        </p>
        <div class="hero-ctas">
          <a href="#quest" class="cta-main" data-i18n="hero.ctaQuest">Quest Log 보기 ↓</a>
          <a href="https://github.com/byungyoung" target="_blank" rel="noopener" class="cta-ghost" data-i18n="hero.ctaGithub">GitHub</a>
          <a href="/po/" class="cta-text" data-i18n="hero.ctaPo">PO 포트폴리오 →</a>
        </div>
      </section>

      <div class="po-banner" data-animate>
        <div>
          <div class="po-banner-title" data-i18n="po.title">Product Owner로도 활동 중이에요</div>
          <div class="po-banner-sub"   data-i18n="po.sub">rPPG 감정 분석 · UX 개선 · 스타트업 Exit 케이스 스터디</div>
        </div>
        <a href="/po/" target="_blank" rel="noopener" class="po-banner-btn" data-i18n="po.btn">PO 페이지 →</a>
      </div>

      <section class="section" id="about">
        <div class="sec-eyebrow" data-i18n="about.heading">About</div>
        <p class="about-body" data-animate data-i18n="about.body">
          코드를 짜다가 <b>두 번 창업</b>했고, 제품을 만들다 보니 <b>PO</b>가 됐습니다.<br>
          기술과 비즈니스 사이에서 무언가를 만드는 걸 좋아합니다.<br>
          현재는 Xitst에서 <b>rPPG 기반 AI 감정 분석 플랫폼</b>을 만들고 있어요.
        </p>
      </section>

      <section class="section" id="quest">
        <div class="ql-meta">
          <div class="ql-heading" data-i18n="ql.heading">Quest Log</div>
          <div class="ql-chip"    data-i18n="ql.chip">5 COMPLETED · 1 ACTIVE</div>
        </div>
        <div class="quest" data-animate>
          <div class="q-icon active">⚡</div>
          <div class="q-right">
            <div class="q-row1">
              <span class="q-title" data-i18n="ql.q1.title">Xitst — CTO</span>
              <span class="q-pill pill-active" data-i18n="ql.q1.status">ACTIVE</span>
            </div>
            <div class="q-period" data-i18n="ql.q1.period">2025.03 – 현재 · AI 원격 심리 분석 플랫폼</div>
            <div class="q-desc"   data-i18n="ql.q1.desc">rPPG 기술로 얼굴 영상에서 감정 상태를 비접촉 분석. 92% 정확도 달성.</div>
            <div class="q-tags"><span class="tag">Python</span><span class="tag">AI/ML</span><span class="tag">React</span><span class="tag">rPPG</span></div>
          </div>
        </div>
        <div class="quest" data-animate>
          <div class="q-icon done">✓</div>
          <div class="q-right">
            <div class="q-row1">
              <span class="q-title" data-i18n="ql.q2.title">Refactor Works — Dev Experience Manager</span>
              <span class="q-pill pill-done" data-i18n="ql.q2.status">DONE</span>
            </div>
            <div class="q-period" data-i18n="ql.q2.period">2025.02 – 2025.03</div>
            <div class="q-desc"   data-i18n="ql.q2.desc">개발자 경험 개선 및 내부 도구 관리.</div>
            <div class="q-tags"><span class="tag">DX</span><span class="tag">Tooling</span></div>
          </div>
        </div>
        <div class="quest" data-animate>
          <div class="q-icon done">✓</div>
          <div class="q-right">
            <div class="q-row1">
              <span class="q-title" data-i18n="ql.q3.title">TUTORING — Software Developer</span>
              <span class="q-pill pill-done" data-i18n="ql.q3.status">DONE</span>
            </div>
            <div class="q-period" data-i18n="ql.q3.period">2024.09 – 2024.12 · Lingora AI</div>
            <div class="q-desc"   data-i18n="ql.q3.desc">AI 영어 튜터링 UX 개선. 학습 효율 +20%, 사용자 만족도 85% 달성.</div>
            <div class="q-tags"><span class="tag">Next.js</span><span class="tag">UX</span><span class="tag">AI</span></div>
          </div>
        </div>
        <div class="quest" data-animate>
          <div class="q-icon exit">🏆</div>
          <div class="q-right">
            <div class="q-row1">
              <span class="q-title" data-i18n="ql.q4.title">Paik — CTO</span>
              <span class="q-pill pill-exit" data-i18n="ql.q4.status">EXIT ✓</span>
            </div>
            <div class="q-period" data-i18n="ql.q4.period">2019.06 – 2021.02 · 외국인 부동산 플랫폼</div>
            <div class="q-desc"   data-i18n="ql.q4.desc">0에서 시작해 외국인 대상 부동산 중개 플랫폼 구축 후 성공적 Exit.</div>
            <div class="q-tags"><span class="tag">Startup</span><span class="tag">Fullstack</span><span class="tag">Exit</span></div>
          </div>
        </div>
        <div class="quest" data-animate>
          <div class="q-icon exit">🏆</div>
          <div class="q-right">
            <div class="q-row1">
              <span class="q-title" data-i18n="ql.q5.title">OSOF — CEO</span>
              <span class="q-pill pill-exit" data-i18n="ql.q5.status">EXIT ✓</span>
            </div>
            <div class="q-period" data-i18n="ql.q5.period">2016.05 – 2018.11 · 청소년 SW 교육</div>
            <div class="q-desc"   data-i18n="ql.q5.desc">청소년 소프트웨어 교육 서비스 2.5년 운영 후 Exit.</div>
            <div class="q-tags"><span class="tag">EdTech</span><span class="tag">CEO</span><span class="tag">Exit</span></div>
          </div>
        </div>
      </section>

      <section class="section" id="skills">
        <div class="sec-eyebrow">Skills</div>
        <div class="sec-heading" data-i18n="skills.heading">Level Stats</div>
        <div class="skills-grid" data-animate>
          <div class="sk">
            <div class="sk-row"><span class="sk-name">React / Next.js</span><span class="sk-lv">Lv.8 · 85%</span></div>
            <div class="sk-track"><div class="sk-fill" data-width="85"></div></div>
          </div>
          <div class="sk">
            <div class="sk-row"><span class="sk-name">Python / AI</span><span class="sk-lv">Lv.8 · 82%</span></div>
            <div class="sk-track"><div class="sk-fill" data-width="82"></div></div>
          </div>
          <div class="sk">
            <div class="sk-row"><span class="sk-name">TypeScript</span><span class="sk-lv">Lv.7 · 75%</span></div>
            <div class="sk-track"><div class="sk-fill" data-width="75"></div></div>
          </div>
          <div class="sk">
            <div class="sk-row"><span class="sk-name">AWS / DevOps</span><span class="sk-lv">Lv.6 · 65%</span></div>
            <div class="sk-track"><div class="sk-fill" data-width="65"></div></div>
          </div>
          <div class="sk">
            <div class="sk-row"><span class="sk-name">Product / OKR</span><span class="sk-lv">Lv.9 · 92%</span></div>
            <div class="sk-track"><div class="sk-fill" data-width="92"></div></div>
          </div>
          <div class="sk">
            <div class="sk-row"><span class="sk-name">UI/UX Design</span><span class="sk-lv">Lv.6 · 68%</span></div>
            <div class="sk-track"><div class="sk-fill" data-width="68"></div></div>
          </div>
        </div>
        <div data-animate>
          <div class="ach-label" data-i18n="skills.ach.label">Achievements Unlocked</div>
          <div class="ach-row">
            <div class="ach"><span class="ach-icon">🏆</span><div><div class="ach-name" data-i18n="skills.ach1.name">Serial Founder</div><div class="ach-desc" data-i18n="skills.ach1.desc">2× Exit</div></div></div>
            <div class="ach"><span class="ach-icon">🧠</span><div><div class="ach-name" data-i18n="skills.ach2.name">AI Builder</div><div class="ach-desc" data-i18n="skills.ach2.desc">92% rPPG 정확도</div></div></div>
            <div class="ach"><span class="ach-icon">🎓</span><div><div class="ach-name" data-i18n="skills.ach3.name">Dual Major</div><div class="ach-desc" data-i18n="skills.ach3.desc">CS + 경영 · 고려대</div></div></div>
            <div class="ach"><span class="ach-icon">📊</span><div><div class="ach-name" data-i18n="skills.ach4.name">ADsP</div><div class="ach-desc" data-i18n="skills.ach4.desc">데이터 분석 준전문가</div></div></div>
          </div>
        </div>
      </section>

      <section class="section" id="projects">
        <div class="sec-eyebrow">Projects</div>
        <div class="sec-heading" data-i18n="projects.heading">주요 작업물</div>
        <div class="projects-grid" data-animate>
          <article class="project-card">
            <span class="proj-emoji">🧬</span>
            <div class="proj-name" data-i18n="projects.p1.name">Xitst rPPG Platform</div>
            <div class="proj-desc" data-i18n="projects.p1.desc">얼굴 영상으로 감정 분석하는 비접촉 심리 측정 AI 플랫폼.</div>
            <a class="proj-link" href="/po/cases/xitst.html" data-i18n="projects.p1.link">케이스 스터디</a>
          </article>
          <article class="project-card">
            <span class="proj-emoji">🌐</span>
            <div class="proj-name" data-i18n="projects.p2.name">Lingora AI Tutor</div>
            <div class="proj-desc" data-i18n="projects.p2.desc">AI 기반 영어 튜터링. UX 개선으로 학습 만족도 85% 달성.</div>
            <a class="proj-link" href="/po/cases/lingora.html" data-i18n="projects.p2.link">케이스 스터디</a>
          </article>
          <article class="project-card">
            <span class="proj-emoji">🏠</span>
            <div class="proj-name" data-i18n="projects.p3.name">Paik 부동산 플랫폼</div>
            <div class="proj-desc" data-i18n="projects.p3.desc">외국인 대상 부동산 중개 플랫폼. 0→1 빌드 후 Exit.</div>
            <a class="proj-link" href="/po/cases/paik.html" data-i18n="projects.p3.link">케이스 스터디</a>
          </article>
          <article class="project-card">
            <span class="proj-emoji">💻</span>
            <div class="proj-name" data-i18n="projects.p4.name">이 포트폴리오</div>
            <div class="proj-desc" data-i18n="projects.p4.desc">순수 HTML/CSS/JS. 빌드 툴 없이 GitHub Pages 배포.</div>
            <a class="proj-link" href="https://github.com/byungyoung" target="_blank" rel="noopener" data-i18n="projects.p4.link">GitHub</a>
          </article>
        </div>
      </section>

      <section class="section" id="contact">
        <div class="sec-eyebrow">Contact</div>
        <div class="sec-heading" data-i18n="contact.heading">연락하기</div>
        <div class="contact-row" data-animate>
          <a class="contact-a" href="mailto:panda10373@gmail.com">✉️ panda10373@gmail.com</a>
          <a class="contact-a" href="https://www.linkedin.com/in/byungyoung" target="_blank" rel="noopener">💼 LinkedIn</a>
          <a class="contact-a" href="https://github.com/byungyoung" target="_blank" rel="noopener">🐙 GitHub</a>
        </div>
      </section>

    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>© <span id="year"></span> 박병영. All rights reserved.</p>
    </div>
  </footer>

  <script src="assets/js/i18n.js" defer></script>
  <script src="assets/js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser, verify renders correctly (light mode, no console errors)**

```bash
open index.html
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m ":sparkles: feat: rewrite index.html — gamified minimal-light homepage"
```

---

### Task 4: main.js — Simplified JS

**Files:**
- Modify: `assets/js/main.js` (full rewrite)

Removes company-switching logic. Adds skill bar animation. Updates section IDs to include `quest`.

- [ ] **Step 1: Write new main.js**

Replace entire contents of `assets/js/main.js`:

```js
(function () {
  // ── THEME ──────────────────────────────────────────────────
  const root        = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const stored      = localStorage.getItem("theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else {
    root.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");
  }
  function setTheme(n) {
    root.setAttribute("data-theme", n);
    localStorage.setItem("theme", n);
    if (themeToggle) themeToggle.textContent = n === "dark" ? "☀️ 라이트" : "🌙 다크";
  }
  if (themeToggle) {
    const cur = root.getAttribute("data-theme");
    themeToggle.textContent = cur === "dark" ? "☀️ 라이트" : "🌙 다크";
    themeToggle.addEventListener("click", () =>
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark")
    );
  }

  // ── YEAR ───────────────────────────────────────────────────
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ── SMOOTH SCROLL ──────────────────────────────────────────
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    const t = document.getElementById(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    }
  });

  // ── SCROLL PROGRESS BAR ────────────────────────────────────
  const progressBar = document.querySelector(".scroll-progress-bar");
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop  = window.scrollY || document.documentElement.scrollTop;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // ── FADE-IN + SKILL BAR ANIMATION ─────────────────────────
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          animObserver.unobserve(e.target);
          e.target.querySelectorAll(".sk-fill[data-width]").forEach((bar) => {
            bar.style.width = bar.getAttribute("data-width") + "%";
          });
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll("[data-animate]").forEach((el) => animObserver.observe(el));

  // ── ACTIVE NAV HIGHLIGHT ───────────────────────────────────
  const sectionIds = ["hero", "about", "quest", "skills", "projects", "contact"];
  const sectionMap = sectionIds
    .map((id) => ({ id, el: document.getElementById(id) }))
    .filter((o) => !!o.el);
  const navLinks = Array.from(document.querySelectorAll('.nav-list a[href^="#"]'));
  const linkById = Object.fromEntries(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
  let activeId   = null;
  const secObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (activeId === id) return;
          if (linkById[activeId]) linkById[activeId].classList.remove("active");
          if (linkById[id])       linkById[id].classList.add("active");
          activeId = id;
          if (id && id !== "hero") {
            history.replaceState(null, "", "#" + id);
          } else if (id === "hero") {
            history.replaceState(null, "", location.pathname + location.search);
          }
        }
      });
    },
    { threshold: 0.4 }
  );
  sectionMap.forEach((s) => secObserver.observe(s.el));

  // ── I18N ───────────────────────────────────────────────────
  function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
  }
  const rawLang   = localStorage.getItem("lang");
  const storedLang = (rawLang === "kr" ? "ko" : rawLang)
                     || (navigator.language.startsWith("ko") ? "ko" : "en");
  const langToggle = document.getElementById("langToggle");
  function loadLang(lang) {
    if (!window.I18N) return;
    applyTranslations(window.I18N[lang] || window.I18N.ko);
    localStorage.setItem("lang", lang);
    if (langToggle) langToggle.textContent = lang === "ko" ? "KO/EN" : "EN/KO";
  }
  if (langToggle) {
    langToggle.textContent = storedLang === "ko" ? "KO/EN" : "EN/KO";
    langToggle.addEventListener("click", () => {
      const cur = localStorage.getItem("lang") || storedLang;
      loadLang(cur === "ko" ? "en" : "ko");
    });
  }
  if (window.I18N) {
    loadLang(storedLang);
  } else {
    window.addEventListener("I18N_READY", () => loadLang(storedLang));
  }
})();
```

- [ ] **Step 2: Open in browser, verify interactions**

```bash
open index.html
```

Verify:
- Scroll progress bar fills as you scroll
- Quest Log nav link highlights when that section is in view
- 🌙/☀️ toggle switches dark/light mode
- KO/EN toggle translates content
- Skill bars animate from 0% to target width when Skills section scrolls into view

- [ ] **Step 3: Commit**

```bash
git add assets/js/main.js
git commit -m ":zap: feat: simplify main.js — remove company switching, add skill bar animation"
```

---

### Task 5: Visual QA Pass

**Files:**
- Modify: `index.html`, `assets/css/style.css` — fixes only if needed

- [ ] **Step 1: Full visual check (light mode)**

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Checklist:
- [ ] Nav: sticky, 5 links, theme + lang toggles visible
- [ ] Hero: status badge pulses, h1 large, 3 CTAs
- [ ] PO Banner: dark rounded card with button
- [ ] About: 3-line paragraph with bold highlights
- [ ] Quest Log: ⚡ACTIVE, ✓DONE×2, 🏆EXIT×2 — all with correct pill colors
- [ ] Level Stats: 6 skill bars (start 0, animate to % on scroll)
- [ ] Achievements: 4 cards
- [ ] Projects: 2-column grid, 4 cards, links work
- [ ] Contact: 3 link cards
- [ ] Footer year = current year
- [ ] Scroll progress bar works

- [ ] **Step 2: Dark mode check**

Click 🌙 dark toggle. Verify: dark background, all text legible, quest icons adapt, achievements use dark surface.

- [ ] **Step 3: Language toggle check**

Click EN toggle. Verify hero h1, about body, quest log titles/descriptions translate.

- [ ] **Step 4: Mobile check (resize to 375px)**

Verify: hero h1 shrinks, skills/projects go 1-column, PO Banner stacks vertically.

- [ ] **Step 5: Fix issues and commit**

```bash
git add index.html assets/css/style.css assets/js/main.js
git commit -m ":white_check_mark: qa: homepage redesign visual QA pass"
```
