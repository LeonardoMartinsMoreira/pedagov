import { ThemeToggle } from '@/components/theme-toggle'

export const metadata = {
  title: 'PedaGov - Conectar',
  description: 'Conecte-se ao PedaGov',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute right-0 flex items-end justify-end p-2 bg-">
        <ThemeToggle />
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
      </div>
    </>
  )
}
