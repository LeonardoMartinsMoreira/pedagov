'use client'

import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'
import { ChangePasswordModal } from '@/components/warning-change-password-dialog'
import { useDialogState } from '@/hooks/useDialogState'
import { useSession } from 'next-auth/react'
import type React from 'react'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: user } = useSession()
  const mustChangePasswordDialog = useDialogState()

  useEffect(() => {
    if (user?.user.isFirstLogin) {
      mustChangePasswordDialog.openDialog()
    }
  }, [mustChangePasswordDialog, user?.user.isFirstLogin])

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <ChangePasswordModal isVisible={mustChangePasswordDialog.isVisible} />
        <div className="container mx-auto p-6 max-w-7xl">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  )
}
