import { useEffect, useState, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { NAV, SCHOOL } from '../lib/data'
import logo from '../assets/logo.jpg'
import { Button } from './ui'

export function Header({ route }: { route: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggleMenu = () => {
    const isOpening = !open
    setOpen(isOpening)

    if (isOpening && window.innerWidth < 1024) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
      })
    }
  }

  useEffect(() => {
    let last = window.scrollY
    const on = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      setHidden(y > last && y > 240)
      last = y
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? y / max : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [route])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const close = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('resize', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('resize', close)
    }
  }, [open])

  return (
    <div className={`sticky top-0 z-50 transition-transform duration-300 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="hidden bg-wine-950 text-xs text-white/75 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2">
          <span>{SCHOOL.address}</span>
          <span className="flex gap-6">
            <a href={`tel:${SCHOOL.phones[0].replace(/\s/g, '')}`} className="transition-colors hover:text-gold-light">{SCHOOL.phones[0]}</a>
            <a href={`mailto:${SCHOOL.email}`} className="transition-colors hover:text-gold-light">{SCHOOL.email}</a>
          </span>
        </div>
      </div>
      <header className={`relative bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-lg shadow-wine-900/10' : 'border-b border-line'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src={logo} alt="Royalpalm International College crest" className="h-14 w-auto" />
            <span className="hidden leading-tight sm:block lg:hidden xl:block">
              <span className="block font-display text-lg font-bold text-wine-900">Royalpalm</span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">International College</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Main">
            {NAV.map((n) => {
              const active = route === n.to
              return (
                <Link key={n.to} to={n.to} className={`nav-link group px-3 py-2 text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5 xl:text-sm ${active ? 'text-wine-900' : 'text-ink hover:text-wine-900'}`}>
                  {n.label}
                  <span className={`absolute inset-x-3 bottom-0.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              )
            })}
          </nav>
          <div className="hidden shrink-0 xl:block"><Button to="/admissions" variant="navy">Apply Now</Button></div>
          <button className="rounded-full p-2 text-wine-900 transition-colors hover:bg-cream-deep lg:hidden" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={open}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-line bg-white px-5 pb-8 pt-2 lg:hidden" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={`block border-b border-line/70 py-3.5 text-base font-semibold transition-colors hover:text-gold-deep ${route === n.to ? 'text-gold-deep' : 'text-wine-900'}`}>
                {n.label}
              </Link>
            ))}
            <div className="pt-5"><Button to="/admissions" variant="navy">Apply Now</Button></div>
          </nav>
        )}
        <div className="absolute inset-x-0 bottom-0 h-[3px] origin-left gold-rule" style={{ transform: `scaleX(${progress})` }} />
      </header>
    </div>
  )
}

const row = 'flex items-start gap-3'
const ico = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-light transition-all duration-200 hover:scale-110'
function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export function Footer() {
  const col = 'text-sm text-white/70 transition-colors hover:text-gold-light'
  return (
    <footer className="bg-wine-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="inline-block rounded-2xl bg-white p-3"><img src={logo} alt="RICO crest" className="h-24 w-auto" /></div>
          <p className="mt-6 max-w-sm font-display text-xl font-semibold leading-snug text-gold-light">“{SCHOOL.motto}”</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{SCHOOL.vision}.</p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-light">Explore</h4>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className={col}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-light">Visit & Contact</h4>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className={row}><span className={ico}><Svg d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></span><span>{SCHOOL.address}</span></li>
            {SCHOOL.phones.map((p) => <li key={p} className={row}><span className={ico}><Svg d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></span><a href={`tel:${p.replace(/\s/g, '')}`} className={col}>{p}</a></li>)}
            <li className={row}><span className={ico}><Svg d="M3 6h18v12H3V6Zm0 0 9 7 9-7" /></span><a href={`mailto:${SCHOOL.email}`} className={`${col} break-all`}>{SCHOOL.email}</a></li>
            <li className="flex gap-3 pt-2">
              <a href={SCHOOL.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className={`${ico} hover:bg-gold hover:text-wine-950`}><Svg d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5H14Z" /></a>
              <a href={SCHOOL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={`${ico} hover:bg-gold hover:text-wine-950`}><Svg d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-2.5h.01" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-xs text-white/50 md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.</span>
          <span>{SCHOOL.tagline}</span>
        </div>
      </div>
    </footer>
  )
}

export function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-wine-950 shadow-xl shadow-wine-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-gold-light ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  )
}

export function Page({ children }: { children: ReactNode }) {
  return <main>{children}</main>
}
