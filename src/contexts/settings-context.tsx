'use client'

import { usePedagogue } from '@/services/queries/get-pedagogue'
import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

export interface UserSettings {
  name: string | undefined
  email: string
  theme: 'light' | 'dark' | 'system'
  layout: 'default' | 'compact' | 'expanded'
  fontSize: number
  privacy: {
    analyticsSharing: boolean
    personalizedAds: boolean
    visibility: 'public' | 'private'
    dataRetention: '6-months' | '1-year' | '2-years' | 'indefinite'
  }
}

const defaultSettings = {
  fontSize: 16,
  theme: 'light',
  layout: 'default',
  privacy: {
    analyticsSharing: true,
    personalizedAds: false,
    visibility: 'public',
    dataRetention: '1-year',
  },
} as const

interface SettingsContextType {
  settings: UserSettings
  updateSettings: (newSettings: Partial<UserSettings>) => void
  updatePrivacySettings: (settings: Partial<UserSettings['privacy']>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { data: pedagogue } = usePedagogue(userId)

  const [settings, setSettings] = useState<UserSettings>({
    ...defaultSettings,
    name: '',
    email: '',
  })

  useEffect(() => {
    if (!session?.user) {
      setSettings({
        ...defaultSettings,
        name: '',
        email: '',
      })
      return
    }

    const u = session.user
    setSettings((prev) => ({
      ...prev,
      email: pedagogue?.email ?? u.email ?? '',
      name: pedagogue?.name ?? u.name ?? '',
    }))
  }, [session?.user, pedagogue])

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const updatePrivacySettings = (
    privacySettings: Partial<UserSettings['privacy']>
  ) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, ...privacySettings },
    }))
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updatePrivacySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
