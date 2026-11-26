import path from "node:path";
import type { ReactNode } from "react";

import { Document, Font, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";

import { resume } from "@/content/resume";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { formatDuration, formatDurationParts, formatMonthRange, monthsBetween, totalMonths } from "@/lib/duration";

/**
 * The résumé PDF, rendered from content/resume.ts at build time by the
 * /resume/*.pdf route handlers. It carries exactly what the plain résumé page
 * shows, so the PDF can never drift from the reviewed copy.
 *
 * Pretendard's KS X 1001 woff subset covers hangul and Latin; the files are
 * read from node_modules while the export runs and never committed.
 */
const FONT_DIR = path.join(process.cwd(), "node_modules", "pretendard", "dist", "web", "static", "woff-subset");
const FAMILY = "Pretendard";

let fontsRegistered = false;

function registerFonts(): void {
  if (fontsRegistered) return;
  Font.register({
    family: FAMILY,
    fonts: [
      { src: path.join(FONT_DIR, "Pretendard-Regular.subset.woff"), fontWeight: 400 },
      { src: path.join(FONT_DIR, "Pretendard-SemiBold.subset.woff"), fontWeight: 600 },
      { src: path.join(FONT_DIR, "Pretendard-Bold.subset.woff"), fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  fontsRegistered = true;
}

const INK = "#1d1b18";
const MUTED = "#4a4741";
const SUBTLE = "#6b675f";
const RULE = "#d8d5cf";

const styles = StyleSheet.create({
  page: {
    fontFamily: FAMILY,
    fontSize: 9.2,
    lineHeight: 1.5,
    color: INK,
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 44,
  },
  name: { fontSize: 22, fontWeight: 700, lineHeight: 1.25 },
  title: { marginTop: 4, fontSize: 9, lineHeight: 1.4, fontWeight: 600, letterSpacing: 1, color: SUBTLE },
  tagline: { marginTop: 8, color: MUTED },
  contacts: { marginTop: 6, flexDirection: "row", flexWrap: "wrap", color: SUBTLE, fontSize: 8.4 },
  contact: { marginRight: 14 },
  summary: {
    marginTop: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: RULE,
    flexDirection: "row",
  },
  metric: { flex: 1, paddingRight: 12 },
  metricValue: { fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 2 },
  metricLabel: { fontSize: 8.2, color: MUTED },
  metricCaveat: { fontSize: 7.6, color: SUBTLE },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    color: SUBTLE,
    textTransform: "uppercase",
  },
  job: { paddingTop: 7, paddingBottom: 7, borderTopWidth: 1, borderColor: RULE },
  jobHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  company: { fontSize: 11, fontWeight: 700, lineHeight: 1.4 },
  role: { fontSize: 9, color: MUTED },
  period: { fontSize: 8.2, color: SUBTLE },
  bullet: { flexDirection: "row", marginTop: 2.5 },
  bulletMark: { width: 9, color: SUBTLE },
  bulletText: { flex: 1, color: MUTED },
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 2 },
  cell: { width: "50%", paddingRight: 14, marginBottom: 8 },
  cellTitle: { fontSize: 8, fontWeight: 700, letterSpacing: 1, color: SUBTLE, textTransform: "uppercase", marginBottom: 3 },
  line: { color: MUTED },
  lineStrong: { color: INK, fontWeight: 600 },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.6,
    color: SUBTLE,
  },
});

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet} wrap={false}>
      <Text style={styles.bulletMark}>-</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function Cell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.cell} wrap={false}>
      <Text style={styles.cellTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ResumeDocument({ lang }: { lang: Lang }) {
  const { header, metrics, totalExperienceMetric, presentLabel, left, experience } = resume;
  const sections = ui.resume.sections;
  const total = formatDurationParts(totalMonths(experience.map((entry) => entry.dateRange)), lang);
  const name = lang === "ko" ? `${site.name}  ${site.nameEn}` : `${site.nameEn}  ${site.name}`;

  return (
    <Document title={resume.meta.title[lang]} author={site.nameEn} subject={resume.meta.description[lang]} language={lang}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{header.title[lang].toUpperCase()}</Text>
        <Text style={styles.tagline}>{header.tagline[lang]}</Text>
        <View style={styles.contacts}>
          {[header.email, header.linkedin, header.github, site.urls.canonical].map((item) => (
            <Text key={item} style={styles.contact}>
              {item}
            </Text>
          ))}
        </View>

        <View style={styles.summary} wrap={false}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>
              {total.value}
              {total.unit}
            </Text>
            <Text style={styles.metricLabel}>{totalExperienceMetric.label[lang]}</Text>
            {totalExperienceMetric.caveat ? <Text style={styles.metricCaveat}>{totalExperienceMetric.caveat[lang]}</Text> : null}
          </View>
          {metrics.map((metric) => (
            <View key={metric.label.en} style={styles.metric}>
              <Text style={styles.metricValue}>
                {metric.value}
                {metric.unit ?? ""}
              </Text>
              <Text style={styles.metricLabel}>{metric.label[lang]}</Text>
              {metric.caveat ? <Text style={styles.metricCaveat}>{metric.caveat[lang]}</Text> : null}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{sections.experience[lang]}</Text>
        {experience.map((entry) => (
          <View key={entry.id} style={styles.job}>
            <View style={styles.jobHead} wrap={false}>
              <Text>
                <Text style={styles.company}>{entry.company[lang]}</Text>
                <Text style={styles.role}>{`   ${entry.role[lang]}`}</Text>
              </Text>
              <Text style={styles.period}>
                {`${formatMonthRange(entry.dateRange, lang, presentLabel[lang])}  (${formatDuration(monthsBetween(entry.dateRange), lang)})`}
              </Text>
            </View>
            {entry.bullets[lang].map((bullet) => (
              <Bullet key={bullet}>{bullet}</Bullet>
            ))}
          </View>
        ))}

        <View style={styles.grid}>
          <Cell title={sections.education[lang]}>
            <Text style={styles.lineStrong}>{left.education.school[lang]}</Text>
            <Text style={styles.line}>{left.education.degree[lang]}</Text>
            <Text style={styles.line}>{`${left.education.period[lang]}, ${left.education.status[lang]}`}</Text>
          </Cell>
          <Cell title={sections.skills[lang]}>
            {left.skillGroups.map((group) => (
              <Text key={group.title.en} style={styles.line}>
                <Text style={styles.lineStrong}>{`${group.title[lang]}  `}</Text>
                {group.tags.join(", ")}
              </Text>
            ))}
          </Cell>
          <Cell title={sections.certifications[lang]}>
            {left.certifications.map((cert) => (
              <Text key={cert.name.en} style={styles.line}>
                <Text style={styles.lineStrong}>{cert.name[lang]}</Text>
                {`  ${cert.sub[lang]}`}
              </Text>
            ))}
          </Cell>
          <Cell title={sections.awards[lang]}>
            {left.awards.map((award) => (
              <Text key={award.name.en} style={styles.line}>
                <Text style={styles.lineStrong}>{award.name[lang]}</Text>
                {`  ${award.sub[lang]}`}
              </Text>
            ))}
          </Cell>
          <Cell title={sections.languages[lang]}>
            {left.languages.items.map((item) => (
              <Text key={item.en} style={styles.line}>
                {item[lang]}
              </Text>
            ))}
            <Text style={styles.line}>{left.languages.sub[lang]}</Text>
          </Cell>
          <Cell title={`${sections.military[lang]}, ${sections.activities[lang]}`}>
            <Text style={styles.line}>{`${left.military.status[lang]}  ${left.military.period[lang]}`}</Text>
            {left.activities.map((item) => (
              <Text key={item.name.en} style={styles.line}>
                {`${item.name[lang]}  ${formatMonthRange(item.dateRange, lang, presentLabel[lang])}`}
              </Text>
            ))}
          </Cell>
        </View>

        <View style={styles.footer} fixed>
          <Text>{`${site.urls.canonical.replace("https://", "")}${lang === "ko" ? "/ko/resume/" : "/resume/"}`}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}

export async function renderResumePdf(lang: Lang): Promise<Buffer> {
  registerFonts();
  return renderToBuffer(<ResumeDocument lang={lang} />);
}
