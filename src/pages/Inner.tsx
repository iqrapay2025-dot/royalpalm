import { useState } from 'react'
import { Button, CardGrid, CtaBanner, PageHero, Placeholder, Reveal, Section, SectionHeader } from '../components/ui'
import { EventsCalendar, StatBar } from '../components/sections'
import { FACILITIES, IMG, INITIATIVES, NEWS, SCHOOL, STAFF, TRACKS } from '../lib/data'

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

const TEST_RECIPIENT = 'royalpalmcollegeilorin@gmail.com'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${TEST_RECIPIENT}`, {
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
