'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SettingsProvider } from '@/contexts/settings-context'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import type React from 'react'
import '../styles/globals.css'
import { RouteGuard } from '@/components/route-guard'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <TooltipProvider delayDuration={0}>
              <SessionProvider>
                <Toaster />
                <RouteGuard />
                <main className="w-full">{children}</main>
              </SessionProvider>
            </TooltipProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
