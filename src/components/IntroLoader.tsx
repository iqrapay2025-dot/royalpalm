import { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'
import './intro-loader.css'

const STORAGE_KEY = 'rico-intro-loader-shown'
const MINIMUM_DURATION = 650
const EXIT_DURATION = 250
const REDUCED_MOTION_DURATION = 200
const REDUCED_MOTION_EXIT_DURATION = 100

function hasPlayedIntro(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function IntroLoader() {
  const [state, setState] = useState<'loading' | 'exiting' | 'hidden'>('loading')
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (hasPlayedIntro()) {
      setState('hidden')
      return
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateReducedMotion = () => setIsReducedMotion(reducedMotionQuery.matches)
    updateReducedMotion()

    let ready = false
    let isMounted = true
    let exitTimer: number | undefined
    let startTimer: number | undefined

    const finish = () => {
      if (!isMounted || !ready) return

      const duration = isReducedMotion ? REDUCED_MOTION_DURATION : MINIMUM_DURATION
      const exitDelay = isReducedMotion ? REDUCED_MOTION_EXIT_DURATION : EXIT_DURATION

      startTimer = window.setTimeout(() => {
        setState('exiting')
      }, duration)

      exitTimer = window.setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, 'true')
        } catch {
          // Continue when storage access is unavailable.
        }

        setState('hidden')
      }, duration + exitDelay)
    }

    const waitForReady = () => {
      ready = true
      finish()
    }

    const waitForFonts = document.fonts?.ready ? document.fonts.ready : Promise.resolve()
    const waitForLoad = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          window.addEventListener('load', () => resolve(), { once: true })
        })

    Promise.all([waitForFonts, waitForLoad]).then(waitForReady).catch(waitForReady)
    setState('loading')

    return () => {
      isMounted = false
      window.clearTimeout(startTimer)
      window.clearTimeout(exitTimer)
    }
  }, [isReducedMotion])

  if (state === 'hidden') return null

  return (
    <div
      className={`intro-loader ${state === 'exiting' ? 'intro-loader--exiting' : ''}`}
      role="presentation"
      aria-hidden="true"
      data-reduced-motion={isReducedMotion}
    >
      <div className="intro-loader__brand" aria-hidden="true">
        <img src={logo} alt="" className="intro-loader__logo" />
        <div className="intro-loader__text-wrap">
          <span className="intro-loader__text">Royalpalm International College</span>
          <span className="intro-loader__bar" />
        </div>
      </div>
    </div>
  )
}
