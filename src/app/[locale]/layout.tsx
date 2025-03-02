import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import type React from 'react'
import '../../styles/globals.css'
import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EducaGov',
  description: 'A melhor aplicação para controle e estatísticas de escolas.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="w-full">{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
