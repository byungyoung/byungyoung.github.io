import type { Metadata } from "next";

import { ChangelogTimeline } from "@/components/doc/changelog-timeline";
import { DocGrid, DocRow } from "@/components/doc/doc-grid";
import { MarginNote } from "@/components/doc/margin-note";
import { MetricWithCaveat } from "@/components/doc/metric-with-caveat";
import { RejectedOption } from "@/components/doc/rejected-option";
import { SectionLabel } from "@/components/doc/section-label";
import { Stamp } from "@/components/doc/stamp";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Design system — 결정 문서",
  description: "QA surface for the Decision Log design system",
};

const TYPE_SAMPLES = [
  { token: "display", className: "text-display", sample: "제품을 스펙한 사람이 만듭니다" },
  { token: "h1", className: "text-h1", sample: "결정 문서 — Decision Log" },
  { token: "h2", className: "text-h2", sample: "기각 사유까지 남긴 케이스" },
  { token: "h3", className: "text-h3", sample: "Technical Product Owner" },
  {
    token: "body",
    className: "text-body",
    sample:
      "본문은 15.5px에 행간 1.9로 흐릅니다. 문서처럼 읽히도록 여백을 넉넉히 둡니다.",
  },
  {
    token: "body-sm",
    className: "text-body-sm",
    sample: "보조 본문은 13.5px에 행간 1.75입니다.",
  },
  { token: "note", className: "text-note", sample: "여백 메모는 13px에 행간 1.7입니다." },
  { token: "caption", className: "text-caption", sample: "캡션은 12.5px입니다." },
  {
    token: "label",
    className: "font-mono text-label uppercase",
    sample: "SECTION LABEL",
  },
  {
    token: "metric",
    className: "font-mono text-metric tabular-nums",
    sample: "92",
  },
] as const;

const CHANGELOG_ENTRIES = [
  {
    id: "v6",
    version: "v6",
    period: "2025 — 현재",
    title: "Refactor Works — Technical Product Owner",
    body: "두 달짜리 경력입니다. 그래서 성과가 아니라 결정만 적습니다.",
  },
  {
    id: "v5",
    version: "v5",
    period: "2019 — 2021",
    title: "OSOF — 공동창업자",
    stamp: "exit" as const,
    body: "하드웨어 확장 대신 매각을 택했습니다.",
  },
] as const;

export default function DesignSystemPage() {
  return (
    <>
      <ScrollProgress />
      <main className="mx-auto max-w-[var(--container-doc)] px-6 py-16 lg:px-10">
        <header className="flex items-start justify-between gap-6 border-b border-border pb-8">
          <div>
            <SectionLabel num="00">Design system</SectionLabel>
            <h1 className="mt-3 text-display">결정 문서</h1>
            <p className="mt-3 max-w-[var(--measure)] text-body text-muted-foreground">
              마일스톤 2 QA 화면입니다. 토큰, 타입 스케일, 시그니처 컴포넌트를 한
              곳에서 확인합니다.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <section className="mt-16">
          <SectionLabel num="01">Type scale</SectionLabel>
          <dl className="mt-6 divide-y divide-hairline">
            {TYPE_SAMPLES.map((item) => (
              <div
                key={item.token}
                className="grid gap-2 py-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="font-mono text-label uppercase text-subtle">
                  {item.token}
                </dt>
                <dd className={item.className}>{item.sample}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <SectionLabel num="02">Stamps</SectionLabel>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Stamp variant="exit" size="sm" />
            <Stamp variant="approved" size="sm" />
            <Stamp variant="rejected" size="sm" />
            <Stamp variant="exit" size="md" seed="exit-md" />
            <Stamp variant="approved" size="md" seed="approved-md" />
            <Stamp variant="rejected" size="md" seed="rejected-md" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Stamp variant="approved" size="sm" lang="en" seed="a" />
            <Stamp variant="approved" size="sm" lang="en" seed="b" />
            <Stamp variant="approved" size="sm" lang="en" seed="c" />
            <Stamp variant="approved" size="sm" lang="en" seed="d" />
          </div>
          <p className="mt-4 text-caption text-muted-foreground">
            같은 seed는 항상 같은 각도를 냅니다. 위 네 개는 seed a—d 로 서로 다른
            각도를 가집니다.
          </p>
        </section>

        <section className="mt-16">
          <SectionLabel num="03">Rejected options</SectionLabel>
          <div className="mt-6 max-w-[var(--measure)]">
            <RejectedOption
              option="접촉식 PPG 센서로 정확도를 끌어올린다"
              reason="정확도 98%를 얻는 대신, 측정 자체를 포기하는 사용자가 늘었습니다."
            />
            <RejectedOption
              lang="en"
              option="Keep a server running around the clock"
              reason="The fixed cost outran the measured demand at this stage."
            />
          </div>
        </section>

        <section className="mt-16">
          <SectionLabel num="04">Metrics</SectionLabel>
          <div className="mt-6 grid gap-10 sm:grid-cols-2">
            <MetricWithCaveat
              value="92"
              unit="%"
              label="비접촉 측정 일치율"
              caveat="사내 파일럿 표본이며 임상 검증이 아닙니다."
              comparison="접촉식 센서 98% 대비 6%p 낮습니다."
            />
            <MetricWithCaveat
              value="4"
              label="공개한 케이스 스터디"
              comparison="전부 기각 선택지를 함께 공개했습니다."
            />
          </div>
        </section>

        <section className="mt-16">
          <SectionLabel num="05">Changelog timeline</SectionLabel>
          <div className="mt-6 max-w-[var(--measure)]">
            <ChangelogTimeline entries={CHANGELOG_ENTRIES} />
          </div>
        </section>

        <section className="mt-16">
          <SectionLabel num="06">Document grid</SectionLabel>
          <DocGrid className="mt-6">
            <DocRow
              main={
                <Reveal>
                  <h2 className="text-h2">본문과 여백 메모</h2>
                  <p className="mt-3 text-body text-muted-foreground">
                    1024px 이상에서 메모는 오른쪽 레일에 놓입니다. 그 아래로는
                    본문 뒤에 인라인으로 접힙니다. DOM 순서는 두 경우 모두
                    같습니다.
                  </p>
                </Reveal>
              }
              note={
                <MarginNote offset={0}>
                  오프셋 0. 본문 첫 줄과 거의 나란히 붙습니다.
                </MarginNote>
              }
            />
            <DocRow
              main={
                <Reveal stagger={1}>
                  <h2 className="text-h2">오프셋 변주</h2>
                  <p className="mt-3 text-body text-muted-foreground">
                    메모마다 2px, 8px, 14px 만큼 시작 높이를 달리해서 레일이 자로
                    잰 듯 정렬되지 않게 합니다.
                  </p>
                </Reveal>
              }
              note={
                <MarginNote offset={1}>
                  오프셋 1. 8px 만큼 아래에서 시작합니다.
                </MarginNote>
              }
            />
            <DocRow
              main={
                <Reveal stagger={2}>
                  <h2 className="text-h2">메모 없는 행</h2>
                  <p className="mt-3 text-body text-muted-foreground">
                    note 를 넘기지 않으면 본문만 남고 레일은 비워 둡니다.
                  </p>
                </Reveal>
              }
            />
            <DocRow
              main={
                <Reveal>
                  <h2 className="text-h2">영문 메모</h2>
                  <p className="mt-3 text-body text-muted-foreground">
                    aria-label 은 prop 으로 바꿉니다.
                  </p>
                </Reveal>
              }
              note={
                <MarginNote offset={2} label="Margin note">
                  Offset 2 starts 14px lower than the block it annotates.
                </MarginNote>
              }
            />
          </DocGrid>
        </section>

        <section className="mt-16 pb-24">
          <SectionLabel num="07">Palette</SectionLabel>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["--bg", "var(--bg)"],
              ["--bg-raised", "var(--bg-raised)"],
              ["--border", "var(--border)"],
              ["--border-hairline", "var(--border-hairline)"],
              ["--border-strong", "var(--border-strong)"],
              ["--text", "var(--text)"],
              ["--text-muted", "var(--text-muted)"],
              ["--text-subtle", "var(--text-subtle)"],
              ["--text-faint", "var(--text-faint)"],
              ["--ink", "var(--ink)"],
              ["--stamp-red", "var(--stamp-red)"],
              ["--stamp-red-wash", "var(--stamp-red-wash)"],
            ].map(([name, value]) => (
              <li key={name} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="size-8 shrink-0 rounded-sm border border-border"
                  style={{ backgroundColor: value }}
                />
                <span className="font-mono text-caption text-muted-foreground">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
