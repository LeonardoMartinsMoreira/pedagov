'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ClockCounterClockwise,
  UsersThree,
  Warning,
} from '@phosphor-icons/react'
import { useGetLast30DaysOccurrences } from '@/services/queries/get-last-30-days-occurrences'

export function BusinessMetrics() {
  const { data: last30DaysOccurrences } = useGetLast30DaysOccurrences()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Resumo</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-primary">
              Alunos Cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-3xl">1.234</span>
              <span className="px-2 py-1 rounded-sm bg-brand-muted text-brand-muted-foreground">
                <UsersThree weight="fill" size={32} className="text-brand-icon" />
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-primary">
              Incidentes Registrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-3xl">{last30DaysOccurrences?.count}</span>
              <span className="px-1.5 py-1.5 rounded-lg bg-highlight-muted text-highlight-muted-foreground">
                <ClockCounterClockwise
                  weight="fill"
                  size={32}
                  className="text-highlight-icon"
                />
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Ultimos 30 dias
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-primary">
              Principais Problemas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-3xl">Bullying</span>
              <span className="px-2 py-1 rounded-sm bg-danger-muted text-danger-muted-foreground">
                <Warning weight="fill" size={32} className="text-danger-foreground-on-muted" />
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Ultimos 30 dias
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
