'use client'

import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: user } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (user?.user.isFirstLogin) {
      push('/change-password')
    }
  }, [push, user?.user.isFirstLogin])

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <div className="container mx-auto p-6 max-w-7xl">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  )
}
