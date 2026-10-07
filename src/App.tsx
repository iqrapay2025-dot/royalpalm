import { Footer, Header, ScrollTop } from './components/Layout'
import { IntroLoader } from './components/IntroLoader'
import { useRoute } from './lib/router'
import Home from './pages/Home'
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
}

export default function App() {
  const route = useRoute()
  const Page = ROUTES[route] ?? Home
  return (
    <>
      <IntroLoader />
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
