import { useState } from 'react'
import { STATS } from '../lib/data'
import { CountUp, Reveal, SectionHeader } from './ui'

export function StatBar({ overlap = false }: { overlap?: boolean }) {
  return (
    <div className={`relative z-20 mx-auto max-w-7xl px-5 md:px-8 ${overlap ? '-mt-20 md:-mt-24' : ''}`}>
      <div className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-wine-900/15 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className={`border-line px-3 py-6 text-center sm:p-7 md:p-9 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} lg:border-r lg:last:border-r-0`}>
            <p className="font-display text-3xl font-extrabold text-wine-900 sm:text-4xl md:text-5xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <div className="mx-auto mt-3 h-0.5 w-8 gold-rule" />
            <p className="mt-3 text-sm leading-snug text-mute">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

const TESTIMONIALS = [
  { quote: 'Parent testimonial placeholder — a real quote will be added once supplied by the school.', name: 'Parent name', role: 'Parent of RICO student' },
  { quote: 'Student testimonial placeholder — a real quote will be added once supplied by the school.', name: 'Student name', role: 'Current student' },
  { quote: 'Alumni testimonial placeholder — a real quote will be added once supplied by the school.', name: 'Alumnus name', role: 'RICO alumnus' },
]

export function Testimonials() {
  const [i, setI] = useState(0)
  const n = TESTIMONIALS.length
  return (
    <div>
      <SectionHeader eyebrow="Testimonials" title="Voices from the RICO family" />
      <Reveal className="mx-auto mt-14 max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-gold/60 bg-white p-6 text-center shadow-lg shadow-wine-900/5 sm:p-10 md:p-14">
          <span className="font-display text-7xl leading-none text-gold">“</span>
          <div className="grid">
            {TESTIMONIALS.map((t, k) => (
              <figure key={t.name} className={`col-start-1 row-start-1 transition-all duration-500 ${k === i ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-6 opacity-0'}`}>
                <blockquote className="font-display text-xl font-medium leading-relaxed text-wine-900 md:text-2xl">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm text-mute"><strong className="text-wine-900">{t.name}</strong> · {t.role}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">Placeholder · real quotes to be supplied by the school</p>
        </div>
        <div className="mt-8 flex items-center justify-center gap-5">
          <button aria-label="Previous testimonial" onClick={() => setI((i + n - 1) % n)} className="flex h-11 w-11 items-center justify-center rounded-full border border-wine-900/30 text-wine-900 transition-all hover:scale-110 hover:bg-wine-900 hover:text-white">←</button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((t, k) => (
              <button key={t.name} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all duration-300 ${k === i ? 'w-8 bg-gold' : 'w-2.5 bg-wine-900/25 hover:bg-wine-900/60'}`} />
            ))}
          </div>
          <button aria-label="Next testimonial" onClick={() => setI((i + 1) % n)} className="flex h-11 w-11 items-center justify-center rounded-full border border-wine-900/30 text-wine-900 transition-all hover:scale-110 hover:bg-wine-900 hover:text-white">→</button>
        </div>
      </Reveal>
    </div>
  )
}

export function EventsCalendar() {
  const rows = [
    { tag: 'Flagship', title: 'RICO Annual Career Day', note: 'Date to be confirmed' },
    { tag: 'Academic', title: 'Term dates and exam schedules', note: 'Academic calendar to be supplied by the school' },
    { tag: 'Student Life', title: 'Role Reversal / Feedback Weeks', note: 'Date to be confirmed' },
  ]
  return (
    <div>
      <SectionHeader eyebrow="Events & Calendar" title="What’s coming up" text="Calendar dates have not yet been supplied. Entries below are placeholders to be replaced." />
      <div className="mx-auto mt-14 max-w-3xl divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
        {rows.map((r, i) => (
          <Reveal key={r.title} delay={i * 80}>
            <div className="flex items-center gap-4 p-5 transition-colors sm:gap-6 sm:p-6 hover:bg-cream md:p-7">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-wine-900 text-gold-light">
                <span className="text-lg font-bold">TBC</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">{r.tag}</p>
                <h3 className="mt-1 text-lg font-bold text-wine-900">{r.title}</h3>
                <p className="text-sm text-mute">{r.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function Marquee() {
  const words = ['Raising Kings and Queens through Excellence', 'Effective Education, Assured Future', 'Cambridge International School', 'Day & Boarding', 'Science · Arts · Entrepreneurship']
  const row = (k: number) => (
    <div key={k} className="flex shrink-0 items-center" aria-hidden={k > 0}>
      {words.map((w) => (
        <span key={w} className="flex items-center whitespace-nowrap font-display text-lg font-semibold text-white/90 md:text-2xl">
          <span className="px-8">{w}</span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="overflow-hidden bg-wine-900 py-5">
      <div className="marquee">{[0, 1].map(row)}</div>
    </div>
  )
}
