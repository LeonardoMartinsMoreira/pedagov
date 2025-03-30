import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'
import type React from 'react'

export const metadata = {
  title: 'PedaGov',
  description: 'A melhor aplicação para controle e estatísticas de escolas.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <div className="container mx-auto p-6 max-w-7xl">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  )
}
