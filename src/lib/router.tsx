import { useEffect, type AnchorHTMLAttributes } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

export function useRoute() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return pathname || '/'
}

export function Link({ to, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <RouterLink to={to} {...rest} />
}
