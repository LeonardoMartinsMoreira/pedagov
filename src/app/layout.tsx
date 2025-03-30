import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import type React from 'react'
import '../styles/globals.css'
import { SettingsProvider } from '@/contexts/settings-context'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PedaGov',
  description: 'A melhor aplicação para controle e estatísticas de escolas.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <TooltipProvider delayDuration={0}>
              <main className="w-full">{children}</main>
            </TooltipProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
