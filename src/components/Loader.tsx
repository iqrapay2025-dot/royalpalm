import { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'

const STORAGE_KEY = 'rico-splash-shown'
const INTRO_DURATION = 2800
const EXIT_DURATION = 700
const REDUCED_MOTION_DURATION = 500

function hasPlayedSplash(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function Loader() {
  const [state, setState] = useState<'loading' | 'exiting' | 'hidden'>('loading')
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (hasPlayedSplash()) {
      setState('hidden')
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setIsReducedMotion(mediaQuery.matches)
    updatePreference()

    const duration = isReducedMotion ? REDUCED_MOTION_DURATION : INTRO_DURATION
    const entryTimer = window.setTimeout(() => {
      setState('exiting')
    }, duration)

    const exitTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        // Continue without persistence when storage is unavailable.
      }
      setState('hidden')
    }, duration + (isReducedMotion ? 0 : EXIT_DURATION))

    return () => {
      window.clearTimeout(entryTimer)
      window.clearTimeout(exitTimer)
    }
  }, [isReducedMotion])

  if (state === 'hidden') return null

  return (
    <div className={`splash-screen ${state === 'exiting' ? 'splash-screen--exiting' : ''}`} role="status" aria-live="polite" aria-label="Loading Royalpalm International College">
      <div className="splash-screen__content">
        <img
          src={logo}
          alt="Royalpalm International College crest"
          className="splash-screen__logo"
        />
        <div className="splash-screen__name" aria-label="Royalpalm International College">
          <span className="splash-screen__name-main">Royalpalm International</span>
          <span className="splash-screen__name-accent">College</span>
        </div>
      </div>
    </div>
  )
}
