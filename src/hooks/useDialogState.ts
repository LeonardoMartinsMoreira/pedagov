import { useCallback, useState } from 'react'

export const useDialogState = () => {
  const [isVisible, setIsVisible] = useState(false)

  const openDialog = useCallback(() => setIsVisible(true), [setIsVisible])
  const closeDialog = useCallback(() => setIsVisible(false), [setIsVisible])

  return {
    openDialog,
    closeDialog,
    isVisible,
  }
}
