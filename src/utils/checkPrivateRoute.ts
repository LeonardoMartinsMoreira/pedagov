import { privateRoutes } from '@/components/sidebar'

export function checkPrivateRoute(pathname: string) {
  return privateRoutes.map(({ href }) => {
    if (pathname === '/') return true

    Boolean(pathname.startsWith(href))
  })
}
