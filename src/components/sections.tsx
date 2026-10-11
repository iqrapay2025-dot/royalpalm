import { useState } from 'react'
import { ALUMNI, STATS } from '../lib/data'
import { Link } from '../lib/router'
import { Button, CountUp, Reveal, SectionHeader } from './ui'

const alumniPhotos = import.meta.glob('../assets/alumni/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

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

export function Testimonials() {
  const [i, setI] = useState(0)
  const n = ALUMNI.length
  return (
    <div>
      <SectionHeader eyebrow="Alumni Stories" title="Outstanding Alumni" text="Become a Success Story. Join our community of students impacting the world." />
      <Reveal className="mx-auto mt-14 max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-lg shadow-wine-900/5 sm:p-10 md:p-14">
          <div className="grid">
            {ALUMNI.map((alumnus, k) => {
              const photo = alumniPhotos[`../assets/alumni/${alumnus.photo}.webp`]
              return (
                <figure key={alumnus.name} aria-hidden={k !== i} className={`col-start-1 row-start-1 transition-all duration-500 ${k === i ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-6 opacity-0'}`}>
                  <div className="grid items-center gap-6 sm:grid-cols-[120px_minmax(0,1fr)]">
                    {photo ? (
                      <img src={photo} alt={alumnus.name} loading="lazy" className="mx-auto h-28 w-28 rounded-full border-4 border-gold object-cover" />
                    ) : (
                      <div role="img" aria-label={alumnus.name} className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-gold bg-wine-900 font-display text-3xl font-bold text-gold-light">PH</div>
                    )}
                    <div>
                      <span aria-hidden="true" className="font-display text-6xl leading-none text-gold">“</span>
                      <blockquote className="font-display text-lg font-medium leading-relaxed text-wine-900 md:text-xl">{alumnus.quote}</blockquote>
                      <figcaption className="mt-5 text-sm text-mute"><strong className="text-wine-900">{alumnus.name}</strong> · {alumnus.role}</figcaption>
                    </div>
                  </div>
                </figure>
              )
            })}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-5">
          <button aria-label="Previous testimonial" onClick={() => setI((i + n - 1) % n)} className="flex h-11 w-11 items-center justify-center rounded-full border border-wine-900/30 text-wine-900 transition-all hover:scale-110 hover:bg-wine-900 hover:text-white">←</button>
          <div className="flex gap-2">
            {ALUMNI.map((alumnus, k) => (
              <button key={alumnus.name} type="button" aria-label={`Show testimonial from ${alumnus.name}`} aria-pressed={k === i} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all duration-300 ${k === i ? 'w-8 bg-gold' : 'w-2.5 bg-wine-900/25 hover:bg-wine-900/60'}`} />
            ))}
          </div>
          <button aria-label="Next testimonial" onClick={() => setI((i + 1) % n)} className="flex h-11 w-11 items-center justify-center rounded-full border border-wine-900/30 text-wine-900 transition-all hover:scale-110 hover:bg-wine-900 hover:text-white">→</button>
        </div>
      </Reveal>
      <div className="mt-12 border-y border-gold/40 bg-white/70 px-5 py-8 text-center">
        <p className="font-display text-2xl font-bold text-wine-900">Trusted by over 1000+ students</p>
        <p className="mt-2 text-mute">Join our community of successful Students</p>
        <Button href="http://bit.ly/RICOAdmissionForm" variant="navy">APPLY NOW!</Button>
      </div>
    </div>
  )
}

export function EventsCalendar() {
  const rows = [
    { tag: 'Assessments', month: 'OCT', day: '12–16', title: '1st CA Tests', note: '2026 · Year 10 weekly programme' },
    { tag: 'Academic', month: 'OCT', day: '21', title: 'Open Day / Mid-Term Reports', note: 'Mid-Term Break: Oct 21–23, 2026' },
    { tag: 'Examinations', month: 'NOV', day: '26', title: '1st Term Examinations', note: 'Nov 26–Dec 11, 2026' },
  ]
  return (
    <div>
      <SectionHeader eyebrow="Events & Calendar" title="What’s coming up" text="Selected dates from the 2026/2027 first-term academic calendar." />
      <div className="mx-auto mt-14 max-w-3xl divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
        {rows.map((r, i) => (
          <Reveal key={r.title} delay={i * 80}>
            <div className="flex items-center gap-4 p-5 transition-colors sm:gap-6 sm:p-6 hover:bg-cream md:p-7">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-wine-900 text-gold-light">
                <span className="text-[10px] font-bold uppercase">{r.month}</span>
                <span className="font-display text-sm font-bold leading-tight">{r.day}</span>
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
      <p className="mt-6 text-center">
        <Link to="/academics#academic-calendar" className="text-sm font-semibold text-wine-900 transition-colors hover:text-gold-deep">View full academic calendar</Link>
      </p>
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
