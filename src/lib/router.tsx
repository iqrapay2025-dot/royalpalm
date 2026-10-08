import { useEffect, type AnchorHTMLAttributes } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

export function useRoute() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return pathname || '/'
}

export function Link({ to, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <RouterLink to={to} {...rest} />
}
