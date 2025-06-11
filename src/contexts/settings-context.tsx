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
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    accountActivity: boolean
    newFeatures: boolean
    marketing: boolean
    frequency: 'real-time' | 'daily' | 'weekly'
    quietHoursStart: string
    quietHoursEnd: string
  }
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
  notifications: {
    email: true,
    push: true,
    sms: false,
    accountActivity: true,
    newFeatures: true,
    marketing: false,
    frequency: 'real-time',
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
  },
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
  updateNotificationSettings: (
    settings: Partial<UserSettings['notifications']>
  ) => void
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
      setSettings((prev) => ({
        ...prev,
        email: data.user.email ?? 'no-email',
        name: data.user.name ?? 'no-name',
        avatar: data.user.avatar ?? defaultAvatars[0],
        ...defaultSettings,
      }))
    }
  }, [data?.user])

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const updateNotificationSettings = (
    notificationSettings: Partial<UserSettings['notifications']>
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...notificationSettings },
    }))
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
        updateNotificationSettings,
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
