'use client'

import { checkPrivateRoute } from '@/utils/checkPrivateRoute'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

export function RouteGuard() {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  console.log(status)

  const isPrivateRoute = checkPrivateRoute(pathname)

  useEffect(() => {
    if (
      status !== 'loading' &&
      status === 'unauthenticated' &&
      isPrivateRoute
    ) {
      router.push('/login')
    }
  }, [isPrivateRoute, router, status])

  useEffect(() => {
    if (
      status !== 'loading' &&
      status === 'authenticated' &&
      pathname === '/login'
    ) {
      router.push('/')
    }
  }, [pathname, router, status])

  return <></>
}
