import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import type React from 'react'
import '../styles/globals.css'

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
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
