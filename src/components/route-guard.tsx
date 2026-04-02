'use client'

import { checkPrivateRoute } from '@/utils/check-private-route'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect } from 'react'

function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { status, data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const isPrivateRoute = checkPrivateRoute(pathname)
  const isLoading = status === 'loading'

  const mustChangePassword =
    status === 'authenticated' && Boolean(session?.user?.mustChangePassword)
  const onChangePasswordRoute = pathname === '/change-password'

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
      if (session?.user?.mustChangePassword) {
        router.replace('/change-password')
      } else {
        router.replace('/')
      }
    }
  }, [isLoading, pathname, router, session?.user?.mustChangePassword, status])

  /** Obriga troca de senha: só /change-password (middleware + cliente). */
  useEffect(() => {
    if (!isLoading && mustChangePassword && !onChangePasswordRoute) {
      router.replace('/change-password')
    }
  }, [isLoading, mustChangePassword, onChangePasswordRoute, router])

  if (isLoading) {
    return <FullScreenLoader />
  }

  if (mustChangePassword && !onChangePasswordRoute) {
    return <FullScreenLoader />
  }

  return <>{children}</>
}
