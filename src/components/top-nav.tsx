'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSettings } from '@/contexts/settings-context'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ThemeToggle } from './theme-toggle'

import { ChevronRight } from 'lucide-react'

const RoutesLabelEnum: Record<string, string> = {
  students: 'Alunos',
  'new-occurrence': 'Nova ocorrência',
  pedagogues: 'Pedagogos',
  occurrences: 'Ocorrências',
  classes: 'Turmas',
  teachers: 'Professores',
  settings: 'Configurações',
  edit: 'Editar',
}

const isUUID = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str
  )

export function TopNav() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)
  const { settings } = useSettings()

  const handleOnLogoutPress = () => {
    signOut({
      redirect: true,
      callbackUrl: '/login',
    })
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full min-w-0 items-center justify-between px-4 sm:px-5 md:px-6">
        <div className="hidden md:block">
          <nav className="flex items-center space-x-1.5 text-sm">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Inicio
            </Link>
            {pathSegments
              .map((segment, index) => ({ segment, index }))
              .filter(({ segment }) => segment !== 'null')
              .map(({ segment, index }, visibleIndex, array) => {
                const label = isUUID(segment)
                  ? 'Detalhes'
                  : RoutesLabelEnum[segment] || segment
                const isLast = visibleIndex === array.length - 1

                return (
                  <React.Fragment key={segment}>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                    <Link
                      href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                      className={`font-medium transition-colors hover:text-foreground ${
                        isLast
                          ? 'text-foreground font-semibold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {label}
                    </Link>
                  </React.Fragment>
                )
              })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={settings.avatar} alt={settings.name} />
                  <AvatarFallback>
                    {settings.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {settings.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {settings.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">Configurações</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOnLogoutPress}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
