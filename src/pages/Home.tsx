import HeroSlider from '../components/HeroSlider'
import { Button, CardGrid, CtaBanner, Reveal, Section, SectionHeader } from '../components/ui'
import { EventsCalendar, Marquee, StatBar, Testimonials } from '../components/sections'
import { FACILITIES, IMG, NEWS, SCHOOL, TRACKS } from '../lib/data'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <StatBar overlap />
      <div className="mt-20" />
      <CtaBanner title="Give your child the RICO advantage." text="Day and boarding places for ages 11–16." cta={{ label: 'Request Info', to: '/admissions' }} />

      <Marquee />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal from="left">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl bg-cream-deep">
                <img src={IMG.classroom2} alt="Students at Royalpalm International College" className="reveal-img in aspect-[4/3] w-full object-cover" />
              </div>
              <div className="float absolute -bottom-6 -right-2 rounded-2xl bg-wine-900 px-6 py-5 text-white shadow-xl md:-right-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-light">Founded</p>
                <p className="font-display text-2xl font-bold">July 14, 2018</p>
              </div>
            </div>
          </Reveal>
          <Reveal from="right" delay={100}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">Welcome to RICO</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-wine-900 md:text-5xl">{SCHOOL.vision}</h2>
            <div className="rule mt-5 h-1 w-14 origin-left rounded-full gold-rule" />
            <p className="mt-6 text-lg leading-relaxed text-mute">
              Royalpalm International College is an elite co-educational day and boarding college providing world-class education at an affordable price. As a registered Cambridge International School, we blend the Nigerian National Curriculum with the international curriculum.
            </p>
            <p className="mt-4 leading-relaxed text-mute">No graduate has had to retake WAEC, NECO or UTME since our inception.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/about" variant="navy">Our Story</Button>
              <Button to="/admissions" variant="outlineDark">Admissions</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeader eyebrow="Core Tracks" title="Three paths to excellence" text="Science, Arts and Entrepreneurship — each designed to prepare champions for local and international leadership." />
        <CardGrid items={TRACKS} variant="program" />
      </Section>

      <Section tone="navy">
        <SectionHeader light eyebrow="Take a Tour" title="Facilities built for champions" text="From air-conditioned classrooms to our mini-stadium and on-site clinic." />
        <CardGrid items={FACILITIES.slice(0, 3)} variant="facility" />
        <Reveal className="mt-12 text-center"><Button to="/facilities">View All Facilities</Button></Reveal>
      </Section>

      <Section tone="cream"><Testimonials /></Section>

      <Section>
        <SectionHeader eyebrow="Latest News" title="Stories from RICO" />
        <CardGrid items={NEWS.map((n) => ({ ...n, to: '/news' }))} variant="news" />
      </Section>

      <Section tone="cream"><EventsCalendar /></Section>
    </>
  )
}
