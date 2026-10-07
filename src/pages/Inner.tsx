import { useState } from 'react'
import { Button, CardGrid, CtaBanner, PageHero, Placeholder, Reveal, Section, SectionHeader } from '../components/ui'
import { EventsCalendar, StatBar } from '../components/sections'
import { FACILITIES, IMG, INITIATIVES, NEWS, SCHOOL, STAFF, TRACKS } from '../lib/data'
import calendarPdf from '../assets/1ST TERM 2026-2027 ACADEMIC SESSION CALENDER.pdf'

export function About() {
  const pillars = [
    { t: 'Motto', d: SCHOOL.motto },
    { t: 'Vision', d: SCHOOL.vision },
    { t: 'Mission', d: SCHOOL.mission },
  ]
  return (
    <>
      <PageHero eyebrow="About RICO" title="An elite education at an affordable price." text="Founded on July 14, 2018 as a co-educational day and boarding college." image={IMG.graduation} />
      <Section>
        <div className="grid gap-7 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <div className="h-full rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-wine-900/15">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">{p.t}</p>
                <p className="mt-4 font-display text-xl font-semibold leading-snug text-wine-900">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="cream">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeader align="left" eyebrow="The RICO Performance Record" title="Zero retakes since inception." />
            <p className="mt-6 text-lg leading-relaxed text-mute">No graduate has had to retake WAEC, NECO or UTME since the school’s inception.</p>
            <p className="mt-4 text-lg leading-relaxed text-mute">In the Class of 2026, 100% of 30 registered candidates achieved straight credit passes and above, including a clean sweep in English Language and Mathematics.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-3xl bg-cream-deep"><img src={IMG.grads} alt="RICO students and guests at a school event" className="aspect-[4/3] w-full object-cover" /></div>
          </Reveal>
        </div>
      </Section>
      <div className="-mt-0 bg-white pb-20 pt-0"><div className="pt-0"><StatBar /></div></div>
      <CtaBanner title="Come and see RICO for yourself." />
    </>
  )
}

export function Academics() {
  return (
    <>
      <PageHero eyebrow="Academics" title="Nigerian roots. Cambridge reach." text="A hybrid curriculum for ages 11–16." image={IMG.classroom} />
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeader align="left" eyebrow="Curriculum" title="The best of both worlds" />
            <p className="mt-6 text-lg leading-relaxed text-mute">RICO blends the Nigerian National Curriculum with the International Curriculum. As a registered Cambridge International School, we offer Cambridge Lower Secondary and Upper Secondary pathways for ages 11–16.</p>
          </Reveal>
          <Reveal delay={100}><div className="overflow-hidden rounded-3xl bg-cream-deep"><img src={IMG.lecture} alt="Students in class" className="aspect-[4/3] w-full object-cover" /></div></Reveal>
        </div>
      </Section>
      <Section tone="cream">
        <SectionHeader eyebrow="Core Tracks" title="Science, Arts, Entrepreneurship" />
        <CardGrid items={TRACKS.map((t) => ({ ...t, to: undefined }))} variant="program" />
      </Section>
      <AcademicCalendar />
      <Section><EventsCalendar /></Section>
    </>
  )
}

export function Facilities() {
  return (
    <>
      <PageHero eyebrow="Facilities" title="Take a tour of RICO." text="Everything a student needs to learn, live, play and heal on one campus." image={IMG.sports} />
      <Section tone="navy">
        <CardGrid items={FACILITIES} variant="facility" />
        <p className="mt-10 text-center text-sm text-white/60">ICT Hub and School Clinic images are placeholders — photos to be supplied by the school.</p>
      </Section>
      <CtaBanner title="Book a campus visit." text="See our labs, hostels and arena in person." cta={{ label: 'Contact Us', to: '/contact' }} />
    </>
  )
}

export function StudentLife() {
  return (
    <>
      <PageHero eyebrow="Student Life" title="Leaders are built beyond the classroom." image={IMG.career} />
      <Section tone="cream">
        <SectionHeader eyebrow="Beyond Academics" title="Programmes that shape character" />
        <CardGrid items={INITIATIVES} variant="program" cols={2} />
      </Section>
    </>
  )
}

export function Leadership() {
  return (
    <>
      <PageHero eyebrow="Leadership & Staff" title="The people raising kings and queens." image={IMG.classroom2} />
      <Section>
        <SectionHeader eyebrow="Management" title="Meet our leadership" />
        <CardGrid items={STAFF} variant="staff" />
        <div className="mx-auto mt-14 max-w-3xl">
          <Placeholder>A fuller staff directory and photos for our 100+ professional teachers will be added once supplied by the school.</Placeholder>
        </div>
      </Section>
    </>
  )
}

export function News() {
  const cats = ['All', 'School News', 'Events', 'Exam Timetables']
  const [cat, setCat] = useState('All')
  const items = NEWS.filter((n) => cat === 'All' || n.eyebrow === cat)
  return (
    <>
      <PageHero eyebrow="News & Blog" title="Stories, achievements and schedules." image={IMG.grads} />
      <Section tone="cream">
        <div className="flex flex-wrap justify-center gap-3">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105 ${cat === c ? 'bg-wine-900 text-white' : 'bg-white text-wine-900 hover:bg-gold-light'}`}>{c}</button>
          ))}
        </div>
        <CardGrid key={cat} items={items} variant="news" />
        <div className="mx-auto mt-14 max-w-3xl"><Placeholder>Real articles and exam timetable posts will be published here by the school.</Placeholder></div>
      </Section>
    </>
  )
}

type CalendarWeek = {
  week: number
  dates: string
  theme: string
  facilitator: string
  classHouse: string
  activities: string[]
}

const ACADEMIC_TERMS = ['1st Term', '2nd Term', '3rd Term'] as const
const ACADEMIC_KEY_DATES = [
  { date: 'Sept 20, 2026', label: 'Boarding Students Resume' },
  { date: 'Sept 21, 2026', label: 'Day Students Resume' },
  { date: 'Oct 21–23, 2026', label: 'Mid-Term Break' },
  { date: 'Oct 21, 2026', label: 'Open Day / Mid-Term Reports' },
  { date: 'Nov 28, 2026', label: 'Visiting Day' },
  { date: 'Nov 26 – Dec 11, 2026', label: '1st Term Examination' },
  { date: 'Dec 15, 2026', label: 'Christmas Carol' },
  { date: 'Dec 18, 2026', label: 'Vacation Begins' },
]

const ACADEMIC_WEEKLY_ACTIVITIES = [
  'Monday Morning Assembly + Teacher Presentation + Word of the Day',
  'Wednesday Morning Assembly + Class/House Presentation + Sports',
  'Friday Morning Assembly + Casting of News + Jumu\'ah/Fellowship of Christian Students',
  'Entrepreneurship Programme',
  'Mentoring & Leadership Programme',
]

const ACADEMIC_WEEKS: CalendarWeek[] = [
  { week: 1, dates: '21–25 Sept 2026', theme: 'Start Early', facilitator: 'Mrs. Olayinka', classHouse: 'JSS 1', activities: ['Start of term orientation and settling-in routines', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 2, dates: '28 Sept – 2 Oct 2026', theme: 'Making Every Minute Count', facilitator: 'Mr Abraham', classHouse: 'JSS 2', activities: ['Time-management focus and personal planning', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 3, dates: '5–9 Oct 2026', theme: 'The Future Belongs to the Prepared', facilitator: 'Mr Abubakar R.O', classHouse: 'JSS 3', activities: ['Preparation habits and academic planning', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 4, dates: '12–16 Oct 2026', theme: 'Who Are You Becoming', facilitator: 'Mr. Onipede Samson', classHouse: 'SS 1', activities: ['1st CA Tests throughout the week', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 5, dates: '19–23 Oct 2026', theme: 'Push Your Limits', facilitator: 'Mr Ajiboye Abubakar', classHouse: 'SS 2', activities: ['Olympia Maths Challenge', 'Open Day', 'Mid-Term Break', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 6, dates: '26–30 Oct 2026', theme: 'Rules Are Made to Protect You', facilitator: 'Mr. Wasiu Afolabi', classHouse: 'SS 3', activities: ['School rules and safe conduct review', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 7, dates: '2–6 Nov 2026', theme: 'Become a Solution, Not a Problem', facilitator: 'Mrs. Henry Gift', classHouse: 'Red House', activities: ['House-based problem-solving and service activities', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 8, dates: '9–13 Nov 2026', theme: 'Avoid Shortcut', facilitator: 'Mrs. Eunice Samuel', classHouse: 'Blue House', activities: ['Academic integrity and responsible decision-making', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 9, dates: '16–20 Nov 2026', theme: 'Hate Speech and Its Implication', facilitator: 'Mr. Abraham', classHouse: 'Yellow House', activities: ['2nd CA Tests', 'Respect, communication and digital citizenship', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 10, dates: '23–27 Nov 2026', theme: 'Danger of Examination Malpractice', facilitator: 'Mr. Ifefikayo Ogunlusi', classHouse: 'Green House', activities: ['Exam conduct and ethical preparation', 'Visiting Day: Nov 28, 2026', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 11, dates: '30 Nov – 4 Dec 2026', theme: 'Start Early', facilitator: 'Mr. John Oderinde', classHouse: '—', activities: ['1st Term Examination begins Nov 26, 2026', 'Early preparation and revision routines', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 12, dates: '7–11 Dec 2026', theme: 'Never Give Up', facilitator: 'Mrs. Olayinka', classHouse: '—', activities: ['1st Term Examination continues', 'Revision, resilience and support', ...ACADEMIC_WEEKLY_ACTIVITIES] },
  { week: 13, dates: '14–18 Dec 2026', theme: 'Marking & Collation of Results', facilitator: 'Mr Abraham', classHouse: '—', activities: ['Marking and collation of results', 'Christmas Carol: Dec 15, 2026', 'Vacation begins: Dec 18, 2026', ...ACADEMIC_WEEKLY_ACTIVITIES] },
]

const FACILITATOR_GUIDELINES = [
  'Prepare and present a short Monday message that reinforces the week\'s theme and the Word of the Day.',
  'On Wednesday, guide a class or house presentation that connects the theme to practical student responsibility.',
  'Adhere to the weekly timing schedule for assemblies, presentations, sports and all programmed activities.',
  'Prepare materials and brief students in advance so the activities are focused and purposeful.',
  'Arrange a Students\' Court sitting whenever a conduct or discipline matter requires formal student participation.',
]

function AcademicCalendar() {
  const [term, setTerm] = useState<(typeof ACADEMIC_TERMS)[number]>('1st Term')
  const [expanded, setExpanded] = useState(1)

  return (
    <Section id="academic-calendar" tone="cream">
      <SectionHeader eyebrow="Academic Calendar" title="1st Term 2026/2027" text="The key dates and weekly themes guiding the term." />

      <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-wine-900/5">
        <div className="flex items-center justify-between gap-4 border-b border-line bg-wine-950 px-5 py-4 text-white md:px-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-light">Academic Year</p>
            <h3 className="mt-1 font-display text-xl font-semibold">2026/2027</h3>
          </div>
          <div className="flex gap-2 rounded-full bg-white/10 p-1">
            {ACADEMIC_TERMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTerm(item)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${term === item ? 'bg-gold text-wine-950' : 'text-white/65 hover:text-white'}`}
                aria-pressed={term === item}
                disabled={item !== '1st Term'}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="border-b border-line bg-gold/10 p-4 md:p-5">
          <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ACADEMIC_KEY_DATES.map((item) => (
              <article key={item.label} className="min-w-[210px] rounded-2xl border border-gold/30 bg-white p-4 shadow-sm">
                <p className="font-display text-lg font-bold text-wine-900 md:text-xl">{item.date}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">{item.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="p-5 md:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">Weekly Themes</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-wine-900 md:text-3xl">Term overview</h3>
            </div>
            <p className="text-sm text-mute">13 focused learning weeks</p>
          </div>

          <div className="mt-6 space-y-3">
            {ACADEMIC_WEEKS.map((week) => {
              const open = expanded === week.week
              return (
                <div key={week.week} className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-lg hover:shadow-wine-900/10">
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 p-4 text-left md:p-5"
                    onClick={() => setExpanded(open ? 0 : week.week)}
                    aria-expanded={open}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine-900 font-display text-lg font-bold text-gold-light">{week.week}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">{week.dates}</span>
                      <span className="mt-1 block font-display text-lg font-bold text-wine-900 md:text-xl">{week.theme}</span>
                    </span>
                    <span className="text-xl font-semibold text-wine-900">{open ? '−' : '+'}</span>
                  </button>
                  {open && (
                    <div className="border-t border-line bg-cream/60 p-4 md:p-6">
                      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">Weekly activities</h4>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {week.activities.map((activity) => (
                              <li key={activity} className="flex gap-2 text-sm leading-relaxed text-ink">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl border border-line bg-white p-5">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">Assigned</p>
                          <div className="mt-4 border-b border-line pb-4">
                            <p className="text-xs uppercase tracking-[0.14em] text-mute">Theme Facilitator</p>
                            <p className="mt-1 font-display text-xl font-bold text-wine-900">{week.facilitator}</p>
                          </div>
                          <div className="mt-4">
                            <p className="text-xs uppercase tracking-[0.14em] text-mute">Class / House</p>
                            <p className="mt-1 font-display text-xl font-bold text-wine-900">{week.classHouse}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-mute">This is a school-wide weekly programme designed to support character development, academic preparation and student leadership.</p>
            <a href={calendarPdf} download className="inline-flex items-center justify-center rounded-full border border-wine-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-wine-900 transition-colors hover:bg-wine-900 hover:text-white">
              Download Full Calendar (PDF)
            </a>
          </div>
        </div>
      </div>

      <details className="mt-6 rounded-2xl border border-line bg-white px-5 py-4 text-sm text-mute shadow-sm">
        <summary className="cursor-pointer list-none font-semibold text-wine-900">Facilitator Guidelines</summary>
        <ul className="mt-4 space-y-3 border-t border-line pt-4">
          {FACILITATOR_GUIDELINES.map((note) => (
            <li key={note} className="flex gap-3">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </details>
    </Section>
  )
}

export function Admissions() {
  return (
    <>
      <PageHero eyebrow="Admissions" title="Join the RICO family." text="Day and boarding places for a co-educational student body." image={IMG.classroom2} />
      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeader align="left" eyebrow="Enrolment" title="How to apply" />
            <div className="mt-8"><Placeholder>The enrolment process has not yet been supplied. Please contact the school for current requirements.</Placeholder></div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeader align="left" eyebrow="Options" title="Day or boarding" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { t: 'Day', d: 'Co-educational day college with air-conditioned classrooms, labs and sports.' },
                { t: 'Boarding', d: 'Ensuite, highly secured hostels with a strict no-bullying zone policy.' },
              ].map((o) => (
                <div key={o.t} className="rounded-3xl border border-line bg-cream p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-wine-900/10">
                  <h3 className="text-2xl font-bold text-wine-900">{o.t}</h3>
                  <p className="mt-3 text-mute">{o.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-mute">Fees and availability: to be confirmed by the school.</p>
          </Reveal>
        </div>
      </Section>
      <CtaBanner title="Ready to start the conversation?" cta={{ label: 'Contact Admissions', to: '/contact' }} />
    </>
  )
}

const RECIPIENT = 'royalpalmcollegeilorin@gmail.com'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: f.get('name'), email: f.get('email'), message: f.get('message'), _subject: `RICO website enquiry from ${f.get('name')}`, _replyto: f.get('email') }),
      })
      if (!res.ok) throw new Error('failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }
  const field = 'w-full border-0 border-b border-slate/50 bg-transparent px-0 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-mute focus:border-gold'
  const link = 'block break-words transition-colors hover:text-gold-deep'
  return (
    <>
      <section className="grid bg-white lg:min-h-[44rem] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="relative h-72 overflow-hidden bg-wine-950 sm:h-96 lg:h-auto">
          <img src={IMG.classroom} alt="Students in a RICO classroom" className="reveal-img in absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-950/50 via-transparent to-transparent" />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 md:px-14 lg:px-16 xl:px-24">
          <Reveal>
            <h1 className="font-display text-5xl font-medium leading-none text-wine-900 md:text-7xl">Contact</h1>
            <div className="rule mt-6 h-1 w-14 origin-left rounded-full gold-rule" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mute">Visit the campus or get in touch with the school.</p>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
            <Reveal delay={100}>
              <h2 className="font-display text-lg font-semibold text-wine-900">Visit &amp; Call</h2>
              <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink">
                <p>{SCHOOL.address}</p>
                <div>
                  {SCHOOL.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className={link}>{p}</a>)}
                  <a href={`mailto:${SCHOOL.email}`} className={link}>{SCHOOL.email}</a>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 pt-2 text-xs font-bold uppercase tracking-[0.18em] text-wine-900">
                  <a href={SCHOOL.facebook} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold-deep">Facebook</a>
                  <a href={SCHOOL.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold-deep">Instagram</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="font-display text-lg font-semibold text-wine-900">Send a message</h2>
              <form onSubmit={submit} className="mt-4">
                <input required name="name" placeholder="Full Name" aria-label="Full Name" className={field} />
                <input required type="email" name="email" placeholder="Email" aria-label="Email" className={`${field} mt-2`} />
                <textarea required name="message" rows={3} placeholder="Message" aria-label="Message" className={`${field} mt-2 resize-none`} />
                <button type="submit" disabled={status === 'sending'} className="group mt-8 disabled:opacity-60 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-wine-950">
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </span>
                  {status === 'sending' ? 'Sending…' : 'Submit'}
                </button>
                {status === 'sent' && <p className="mt-4 text-sm font-medium text-gold-deep">Thank you. Your message has been sent.</p>}
                {status === 'error' && <p className="mt-4 text-sm text-wine-800">Sorry, the message could not be sent. Please try again or email us directly.</p>}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      <Section>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line">
            <iframe title="RICO location map" className="h-96 w-full" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent('Kulende Estate, Sango, Ilorin, Kwara State, Nigeria')}&output=embed`} />
          </div>
        </Reveal>
      </Section>
    </>
  )
}
