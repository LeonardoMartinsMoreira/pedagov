'use client'
import { ThemeToggle } from './theme-toggle'
import { Notifications } from './notifications'
import { usePathname } from 'next/navigation'
import { useSettings } from '@/contexts/settings-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const RoutesLabelEnum: Record<string, string> = {
  students: 'Alunos',
  'new-occurrence': 'Nova ocorrência',
  pedagogues: 'Pedagogos',
  occurrences: 'Ocorrências',
  classes: 'Turmas',
}

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
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="hidden md:block">
          <nav className="flex items-center space-x-2">
            <Link href="/" className="text-sm font-medium">
              Início
            </Link>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <span className="text-muted-foreground">/</span>
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                  className="text-sm font-medium"
                >
                  {RoutesLabelEnum[segment]}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Notifications />
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
                <Link href="/settings">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOnLogoutPress}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
