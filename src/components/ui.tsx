import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from '../lib/router'
import type { CardItem } from '../lib/data'

function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          if (once) io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])
  return [ref, seen] as const
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  from = 'up',
}: {
  children: ReactNode
  delay?: number
  className?: string
  from?: 'up' | 'left' | 'right' | 'zoom'
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} data-from={from === 'up' ? undefined : from} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ ['--d' as string]: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const start = performance.now()
    const dur = 1400
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, value])
  return (
    <span ref={ref}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

export function Button({
  to,
  href,
  children,
  variant = 'gold',
  onClick,
  type,
}: {
  to?: string
  href?: string
  children: ReactNode
  variant?: 'gold' | 'navy' | 'outline' | 'outlineDark'
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const styles = {
    gold: 'bg-gold text-wine-950 hover:bg-gold-light',
    navy: 'bg-wine-900 text-white hover:bg-wine-800',
    outline: 'border border-white/60 text-white hover:bg-white hover:text-wine-900',
    outlineDark: 'border border-wine-900 text-wine-900 hover:bg-wine-900 hover:text-white',
  }[variant]
  const cls = `btn-shine inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full px-6 py-3 text-sm sm:px-7 sm:py-3.5 font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${styles}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls} target="_blank" rel="noreferrer">{children}</a>
  return <button type={type ?? 'button'} onClick={onClick} className={cls}>{children}</button>
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = 'center',
  light = false,
}: {
  eyebrow: string
  title: string
  text?: string
  align?: 'center' | 'left'
  light?: boolean
}) {
  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${light ? 'text-gold-light' : 'text-gold-deep'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold leading-tight md:text-5xl ${light ? 'text-white' : 'text-wine-900'}`}>{title}</h2>
      <div className={`mt-5 rule h-1 w-14 rounded-full gold-rule ${align === 'center' ? 'mx-auto origin-center' : 'origin-left'}`} />
      {text && <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? 'text-white/75' : 'text-mute'}`}>{text}</p>}
    </Reveal>
  )
}

export function Section({
  children,
  tone = 'white',
  id,
}: {
  children: ReactNode
  tone?: 'white' | 'cream' | 'navy'
  id?: string
}) {
  const bg = { white: 'bg-white', cream: 'bg-cream', navy: 'bg-wine-900 text-white' }[tone]
  return (
    <section id={id} className={`${bg} py-20 md:py-28`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  )
}

export type CardVariant = 'program' | 'facility' | 'news' | 'staff'

function Tilt({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLElement>(null)
  const move = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`
  }
  const leave = () => ref.current && (ref.current.style.transform = '')
  return (
    <article ref={ref} onMouseMove={move} onMouseLeave={leave} className={className}>
      {children}
    </article>
  )
}

export function Card({ item, variant = 'program', index = 0 }: { item: CardItem; variant?: CardVariant; index?: number }) {
  const lift = 'transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-wine-900/15'

  if (variant === 'facility') {
    return (
      <Reveal delay={index * 70}>
        <Tilt className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-wine-900 transition-[transform,box-shadow] duration-200 ease-out hover:shadow-2xl hover:shadow-wine-900/25">
          {item.images?.length ? (
            <div className="absolute inset-x-0 top-0 grid h-[68%] grid-rows-2 gap-1 overflow-hidden">
              {item.images.map((image) => (
                <img key={image} src={image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ))}
            </div>
          ) : item.image ? (
            <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="mb-3 h-0.5 w-8 gold-rule transition-all duration-300 group-hover:w-16" />
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{item.text}</p>
          </div>
        </Tilt>
      </Reveal>
    )
  }

  if (variant === 'staff') {
    const initials = item.title.replace(/^(Mrs?\.|Dr\.)\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('')
    return (
      <Reveal delay={index * 70}>
        <article className={`group overflow-hidden rounded-3xl border border-line bg-white text-center ${lift}`}>
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-wine-900 to-wine-800">
            {item.image ? (
              <img src={item.image} alt={item.title} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <span className="font-display text-6xl font-bold text-gold-light transition-transform duration-500 group-hover:scale-110">{initials}</span>
            )}
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">{item.eyebrow}</p>
            <h3 className="mt-2 text-xl font-bold text-wine-900">{item.title}</h3>
            <p className="mt-2 text-sm text-mute">{item.text}</p>
            {!item.image && <p className="mt-3 text-xs italic text-mute/70">Photo placeholder</p>}
          </div>
        </article>
      </Reveal>
    )
  }

  const Wrapper = ({ children }: { children: ReactNode }) =>
    item.to ? <Link to={item.to} className="block h-full">{children}</Link> : <>{children}</>

  return (
    <Reveal delay={index * 80} className="h-full">
      <Wrapper>
        <article className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white ${lift}`}>
          {item.image && (
            <div className="aspect-[16/10] overflow-hidden bg-cream-deep">
              <img src={item.image} alt={item.title} loading="lazy" className="reveal-img in h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-7">
            {item.eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">{item.eyebrow}</p>}
            <h3 className="mt-2 text-xl font-bold leading-snug text-wine-900 md:text-2xl">{item.title}</h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-mute">{item.text}</p>
            {item.meta && <p className="mt-4 text-xs font-medium text-mute/80">{item.meta}</p>}
            {item.to && (
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-wine-900 transition-colors group-hover:text-gold-deep">
                {variant === 'news' ? 'Read more' : 'Learn more'}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            )}
          </div>
        </article>
      </Wrapper>
    </Reveal>
  )
}

export function CardGrid({ items, variant, cols = 3 }: { items: CardItem[]; variant: CardVariant; cols?: 2 | 3 | 4 }) {
  const c = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }[cols]
  return (
    <div className={`mt-14 grid grid-cols-1 gap-7 ${c}`}>
      {items.map((it, i) => (
        <Card key={it.title} item={it} variant={variant} index={i} />
      ))}
    </div>
  )
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text?: string; image: string }) {
  return (
    <header className="relative overflow-hidden bg-wine-950 text-white">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-wine-950 via-wine-950/80 to-wine-900/40" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{text}</p>}
        </Reveal>
      </div>
    </header>
  )
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-gold/60 bg-gold/5 p-8 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">Placeholder · content to be supplied by the school</p>
      <div className="mt-3 text-mute">{children}</div>
    </div>
  )
}

export function CtaBanner({ title, text, cta }: { title: string; text?: string; cta?: { label: string; to: string } }) {
  return (
    <section className="gold-rule">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center md:px-8">
        <div>
          <h2 className="text-2xl font-bold text-wine-950 md:text-3xl">{title}</h2>
          {text && <p className="mt-1 text-wine-900/80">{text}</p>}
        </div>
        <Button to={cta?.to ?? '/admissions'} variant="navy">{cta?.label ?? 'Request Info'}</Button>
      </div>
    </section>
  )
}
