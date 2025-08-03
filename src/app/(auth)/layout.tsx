import { ThemeToggle } from '@/components/theme-toggle'

export const metadata = {
  title: 'Mais Ocorrências - Conectar',
  description: 'Conecte-se ao Mais Ocorrências',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute right-0 flex items-end justify-end p-2 bg-">
        <ThemeToggle />
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        {children}
      </div>
    </>
  )
}
