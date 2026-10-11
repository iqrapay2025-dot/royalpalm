import { useMemo, useState } from 'react'
import { Section, SectionHeader } from './ui'
import {
  GRADE_KEY,
  WAEC_RESULTS,
  bucketOf,
  gradeRank,
  isCredit,
  type GradeBucket,
  type WaecCandidate,
  type WaecYear,
} from '../lib/waecResults'

const ENGLISH = 'English Language'
const MATHS = 'General Mathematics'

const chip: Record<GradeBucket, string> = {
  A: 'bg-gold text-wine-950',
  B: 'bg-wine-900 text-gold-light',
  C: 'bg-cream-deep text-wine-900',
  below: 'bg-line text-ink',
}

function summarise(data: WaecYear) {
  const papers = data.candidates.flatMap((c) => c.results)
  const pct = (n: number) => (papers.length ? Math.round((n / papers.length) * 100) : 0)
  const hasCredit = (c: WaecCandidate, subject: string) =>
    c.results.some((x) => x.subject === subject && isCredit(x.grade))

  const subjects = new Map<string, Record<GradeBucket, number>>()
  for (const p of papers) {
    const row = subjects.get(p.subject) ?? { A: 0, B: 0, C: 0, below: 0 }
    row[bucketOf(p.grade)] += 1
    subjects.set(p.subject, row)
  }
  const bySubject = [...subjects.entries()]
    .map(([subject, row]) => ({ subject, ...row, entries: row.A + row.B + row.C + row.below }))
    .sort((a, b) => b.entries - a.entries || a.subject.localeCompare(b.subject))

  return {
    candidates: data.candidates.length,
    papers: papers.length,
    a1Pct: pct(papers.filter((p) => p.grade === 'A1').length),
    creditPct: pct(papers.filter((p) => isCredit(p.grade)).length),
    englishAndMaths: data.candidates.filter((c) => hasCredit(c, ENGLISH) && hasCredit(c, MATHS)).length,
    bySubject,
  }
}

export function WaecResults() {
  const [year, setYear] = useState(WAEC_RESULTS[0].year)
  const data = WAEC_RESULTS.find((y) => y.year === year) ?? WAEC_RESULTS[0]
  const s = useMemo(() => summarise(data), [data])

  const figures = [
    { value: String(s.candidates), label: 'candidates' },
    { value: `${s.creditPct}%`, label: 'of papers at credit (C6) or better' },
    { value: `${s.a1Pct}%`, label: 'of papers graded A1' },
    { value: `${s.englishAndMaths} of ${s.candidates}`, label: 'with credits in English and Mathematics' },
  ]

  return (
    <Section id="results">
      <SectionHeader
        eyebrow="Results"
        title={`${data.exam} ${data.year}`}
        text={data.note ?? `Results for ${data.centre}.`}
      />

      {WAEC_RESULTS.length > 1 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {WAEC_RESULTS.map((y) => (
            <button
              key={y.year}
              type="button"
              onClick={() => setYear(y.year)}
              aria-pressed={year === y.year}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                year === y.year ? 'bg-wine-900 text-white' : 'bg-cream text-wine-900 hover:bg-gold-light'
              }`}
            >
              {y.year}
            </button>
          ))}
        </div>
      )}

      <dl className="mt-12 grid gap-x-8 gap-y-8 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
        {figures.map((f) => (
          <div key={f.label} className="flex flex-col-reverse">
            <dt className="mt-1 text-sm leading-snug text-mute">{f.label}</dt>
            <dd className="font-display text-4xl font-bold text-wine-900">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12">
        <h3 className="font-display text-2xl font-bold text-wine-900">How each subject went</h3>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-mute" aria-label="Bar colours">
          <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-gold" />A1</li>
          <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-wine-900" />B2–B3</li>
          <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-wine-900/30" />C4–C6</li>
        </ul>

        <ul className="mt-6 divide-y divide-line">
          {s.bySubject.map((row) => {
            const summary = `${row.A} A1, ${row.B} B2–B3, ${row.C} C4–C6${row.below ? `, ${row.below} below credit` : ''}`
            return (
              <li key={row.subject} className="grid items-center gap-x-6 gap-y-2 py-4 sm:grid-cols-[14rem_1fr_auto]">
                <p className="font-semibold text-ink">
                  {row.subject}
                  <span className="ml-2 text-xs font-normal text-mute">{row.entries} {row.entries === 1 ? 'entry' : 'entries'}</span>
                </p>
                <div className="flex h-3 overflow-hidden rounded-full bg-line" role="img" aria-label={`${row.subject}: ${summary}`}>
                  {row.A > 0 && <div className="bg-gold" style={{ width: `${(row.A / row.entries) * 100}%` }} />}
                  {row.B > 0 && <div className="bg-wine-900" style={{ width: `${(row.B / row.entries) * 100}%` }} />}
                  {row.C > 0 && <div className="bg-wine-900/30" style={{ width: `${(row.C / row.entries) * 100}%` }} />}
                  {row.below > 0 && <div className="bg-mute" style={{ width: `${(row.below / row.entries) * 100}%` }} />}
                </div>
                <p className="text-sm text-mute sm:text-right">{summary}</p>
              </li>
            )
          })}
        </ul>
      </div>

      <details className="mt-10 rounded-2xl border border-line bg-white px-5 py-4 shadow-sm">
        <summary className="cursor-pointer font-semibold text-wine-900">Individual results (names withheld)</summary>
        <div className="mt-5 grid gap-6 border-t border-line pt-5 md:grid-cols-2 lg:grid-cols-3">
          {data.candidates.map((c) => (
            <div key={c.id}>
              <h4 className="font-display text-lg font-bold text-wine-900">Candidate {c.id}</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[...c.results]
                  .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade))
                  .map((x) => (
                    <li key={x.subject} className={`rounded-full px-3 py-1 text-xs font-semibold ${chip[bucketOf(x.grade)]}`}>
                      {x.subject} {x.grade}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </details>

      <div className="mt-8 space-y-2 text-sm leading-relaxed text-mute">
        <p>Grades: {GRADE_KEY.map(([g, m]) => `${g} ${m}`).join(', ')}.</p>
        <p>Source: {data.source}. Student names are withheld to protect their privacy.</p>
      </div>
    </Section>
  )
}