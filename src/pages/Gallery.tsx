import { useCallback, useEffect, useState } from 'react'
import { CtaBanner, PageHero, Reveal, Section } from '../components/ui'
import { IMG } from '../lib/data'

const photos = Object.entries(
  import.meta.glob('../assets/gallery/*.webp', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)), [])
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % photos.length)), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, prev, next])

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Life at Royalpalm."
        text="Classrooms, competitions, trips and triumphs — everyday moments from our campus community."
        image={IMG.grads}
      />
      <Section>
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {photos.map((src, i) => (
            <Reveal key={src} delay={(i % 8) * 50}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-cream-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={`Open photo ${i + 1} of ${photos.length}`}
              >
                <img
                  src={src}
                  alt={`Life at Royalpalm International College — photo ${i + 1}`}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-wine-950/0 transition-colors duration-300 group-hover:bg-wine-950/20" />
              </button>
            </Reveal>
          ))}
        </div>
        {photos.length === 0 && (
          <p className="text-center text-mute">Photos are being organised — check back soon.</p>
        )}
      </Section>
      <CtaBanner title="Come and see RICO for yourself." />

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-wine-950/92 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer — photo ${open + 1} of ${photos.length}`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[open]}
              alt={`Life at Royalpalm International College — photo ${open + 1}`}
              className="max-h-[82vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-sm font-semibold text-white/80">
              {open + 1} / {photos.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
