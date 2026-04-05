'use client'

import { defaultAvatars } from '@/constants/avatars'
import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

export interface UserSettings {
  avatar: string
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
  const { data } = useSession()

  const [settings, setSettings] = useState<UserSettings>({
    ...defaultSettings,
    avatar: defaultAvatars[0],
    name: '',
    email: '',
  })

  useEffect(() => {
    if (data?.user) {
      const email = data.user.email ?? 'no-email'
      const name = data.user.name ?? 'no-name'
      const avatar = data.user.avatar ?? defaultAvatars[0]
      setSettings((prev) => ({
        ...prev,
        ...defaultSettings,
        email,
        name,
        avatar,
      }))
    }
  }, [data?.user])

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
