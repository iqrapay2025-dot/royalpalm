import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Footer, Header, ScrollTop } from './components/Layout'
import { IntroLoader } from './components/IntroLoader'
import { useRoute } from './lib/router'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import { About, Academics, Admissions, Contact, Facilities, Leadership, StudentLife } from './pages/Inner'

const ROUTES: Record<string, () => React.ReactElement> = {
  '/': Home,
  '/about': About,
  '/academics': Academics,
  '/facilities': Facilities,
  '/student-life': StudentLife,
  '/leadership': Leadership,
  '/admissions': Admissions,
  '/contact': Contact,
  '/gallery': Gallery,
}

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target) return
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [hash, pathname])

  return null
}

export default function App() {
  const route = useRoute()
  const Page = ROUTES[route] ?? Home
  return (
    <>
      <IntroLoader />
      <ScrollToHash />
      <div className="min-h-screen overflow-x-clip">
        <Header route={route} />
        <main key={route} className="page-in">
          <Page />
        </main>
        <Footer />
        <ScrollTop />
      </div>
    </>
  )
}
