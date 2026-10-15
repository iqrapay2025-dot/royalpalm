import { useEffect, useState, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { NAV, SCHOOL } from '../lib/data'
import logo from '../assets/logo.jpg'
import { Button } from './ui'

export function Header({ route }: { route: string }) {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
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
  useEffect(() => { setOpen(false); setMenu(null) }, [route])
  useEffect(() => {
    if (!menu) return
    const onDown = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target?.closest?.('[data-nav-dropdown]')) setMenu(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(null)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])
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
              if (!('children' in n)) {
                const active = route === n.to
                return (
                  <Link key={n.to} to={n.to} className={`nav-link group px-3 py-2 text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5 xl:text-sm ${active ? 'text-wine-900' : 'text-ink hover:text-wine-900'}`}>
                    {n.label}
                    <span className={`absolute inset-x-3 bottom-0.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </Link>
                )
              }
              const active = n.children.some((c) => c.to === route)
              const isOpen = menu === n.label
              return (
                <div key={n.label} data-nav-dropdown className="relative" onMouseEnter={() => setMenu(n.label)} onMouseLeave={() => setMenu(null)}>
                  <button
                    type="button"
                    className={`nav-link group px-3 py-2 text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5 xl:text-sm ${active || isOpen ? 'text-wine-900' : 'text-ink hover:text-wine-900'}`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setMenu(isOpen ? null : n.label)}
                  >
                    {n.label}
                    <svg viewBox="0 0 24 24" className={`ml-1 inline-block h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    <span className={`absolute inset-x-3 bottom-0.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300 ${active || isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 top-full z-50 pt-2">
                      <div className="w-56 rounded-2xl border border-line bg-white p-2 shadow-2xl shadow-wine-900/20">
                        {n.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            onClick={() => setMenu(null)}
                            className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${route === c.to ? 'bg-cream-deep text-wine-900' : 'text-ink hover:bg-cream-deep hover:text-wine-900'}`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
            {NAV.map((n) =>
              'children' in n ? (
                <div key={n.label} className="border-b border-line/70 py-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-deep">{n.label}</p>
                  <ul className="mt-2.5 space-y-3">
                    {n.children.map((c) => (
                      <li key={c.to}>
                        <Link to={c.to} onClick={() => setOpen(false)} className={`block text-base font-semibold transition-colors hover:text-gold-deep ${route === c.to ? 'text-gold-deep' : 'text-wine-900'}`}>
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={`block border-b border-line/70 py-3.5 text-base font-semibold transition-colors hover:text-gold-deep ${route === n.to ? 'text-gold-deep' : 'text-wine-900'}`}>
                  {n.label}
                </Link>
              ),
            )}
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
            {NAV.flatMap((n) => ('children' in n ? n.children : [n])).map((l) => <li key={l.to}><Link to={l.to} className={col}>{l.label}</Link></li>)}
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
              <a href={SCHOOL.x} target="_blank" rel="noreferrer" aria-label="X" className={`${ico} hover:bg-gold hover:text-wine-950`}>
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.804-7.588-6.638 7.588H.47l8.6-9.83L0 1.153h7.594l5.246 6.932zm-1.291 19.49h2.039L6.486 3.24H4.298z" />
                </svg>
              </a>
              <a href={SCHOOL.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={`${ico} hover:bg-gold hover:text-wine-950`}>
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.1-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.143 1.588 5.946L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              <a href={SCHOOL.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className={`${ico} hover:bg-gold hover:text-wine-950`}>
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.04 1.77 4.08 1.14 1.05 2.75 1.53 4.29 1.69v4.02c-1.44-.05-2.87-.35-4.21-.96-.58-.25-1.12-.58-1.66-.91-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.95-1.31 1.94-3.58 3.21-5.92 3.25-1.44.08-2.88-.31-4.06-1.14-1.95-1.35-3.04-3.81-2.72-6.16.22-1.57 1.05-3.03 2.34-3.96 1.47-1.08 3.37-1.55 5.17-1.25.02 1.48-.04 2.96-.04 4.44-1.15-.37-2.5-.27-3.38.6-.64.55-1.02 1.36-1.04 2.2-.07.99.51 1.96 1.38 2.44.73.41 1.64.51 2.45.26.82-.24 1.51-.86 1.84-1.65.18-.42.24-.89.23-1.35-.01-6.4 0-12.79-.01-19.19z" />
                </svg>
              </a>
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
