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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </body>
    </html>
  )
}
