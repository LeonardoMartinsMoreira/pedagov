'use client'

import { ChangePasswordModal } from '@/components/warning-change-password-dialog'
import { useDialogState } from '@/hooks/useDialogState'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function ChangePassword() {
  const { data: user } = useSession()
  const mustChangePasswordDialog = useDialogState()

  useEffect(() => {
    if (!user?.user.isFirstLogin) {
      mustChangePasswordDialog.openDialog()
    }
  }, [mustChangePasswordDialog, user?.user.isFirstLogin])

  return <ChangePasswordModal isVisible={mustChangePasswordDialog.isVisible} />
}
