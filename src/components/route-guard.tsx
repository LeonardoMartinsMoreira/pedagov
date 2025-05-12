'use client'

import { checkPrivateRoute } from '@/utils/checkPrivateRoute'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

export function RouteGuard() {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const isPrivateRoute = checkPrivateRoute(pathname)

  const isLoading = status === 'loading'

  useEffect(() => {
    if (
      !isLoading &&
      status === 'unauthenticated' &&
      isPrivateRoute &&
      pathname !== '/login'
    ) {
      router.push('/login')
    }
  }, [isLoading, isPrivateRoute, pathname, router, status])

  useEffect(() => {
    if (!isLoading && status === 'authenticated' && pathname === '/login') {
      router.push('/')
    }
  }, [isLoading, pathname, router, status])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return null
}
