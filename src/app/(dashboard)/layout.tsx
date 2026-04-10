'use client'

import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'
import type React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <div className="w-full min-w-0 px-4 py-6 sm:px-5 sm:py-8 md:px-6">
          <main className="w-full min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
