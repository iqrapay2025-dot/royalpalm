import { useEffect, useState } from 'react'
import { SLIDES } from '../lib/data'
import { Button } from './ui'

export default function HeroSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = SLIDES.length
  const [y, setY] = useState(0)
  useEffect(() => {
    const on = () => setY(Math.min(window.scrollY, 800))
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const go = (k: number) => setI((k + n) % n)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((x) => (x + 1) % n), 6500)
    return () => clearInterval(t)
  }, [paused, n, i])

  const arrow = 'flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white sm:h-12 sm:w-12 transition-all duration-200 hover:scale-110 hover:border-gold hover:bg-gold hover:text-wine-950'

  return (
    <section
      className="relative h-[88svh] min-h-[720px] sm:h-[82vh] sm:min-h-[700px] overflow-hidden bg-wine-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {SLIDES.map((s, k) => (
        <div key={s.title} className={`absolute inset-0 transition-opacity duration-1000 ${k === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={k !== i}>
          <div className="h-full w-full" style={{ transform: `translateY(${y * 0.25}px)` }}>
            <img src={s.image} alt="" className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${k === i ? 'scale-110' : 'scale-100'}`} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-wine-950 via-wine-950/75 to-wine-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-950/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center pb-44 pt-8 md:pb-52">
            <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
              <div className={`max-w-2xl transition-all duration-700 ${k === i ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-5 opacity-0'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">{s.eyebrow}</p>
                <h1 className="mt-5 text-[2rem] font-extrabold leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">{s.title}</h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{s.text}</p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Button to={s.cta.to}>{s.cta.label}</Button>
                  <Button to="/admissions" variant="outline">Enrol</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-28 z-10 mx-auto flex max-w-7xl items-center justify-between px-5 md:bottom-32 md:px-8">
        <div className="flex gap-2.5" role="tablist">
          {SLIDES.map((s, k) => (
            <button key={s.title} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}`} onClick={() => go(k)} className={`h-2.5 rounded-full transition-all duration-300 ${k === i ? 'w-10 bg-gold' : 'w-2.5 bg-white/50 hover:bg-white'}`} />
          ))}
        </div>
        <div className="flex gap-3">
          <button className={arrow} aria-label="Previous slide" onClick={() => go(i - 1)}>←</button>
          <button className={arrow} aria-label="Next slide" onClick={() => go(i + 1)}>→</button>
        </div>
      </div>
    </section>
  )
}
