import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ClockCounterClockwise,
  UsersThree,
  Warning,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

export function BusinessMetrics() {
  const t = useTranslations('BusinessMetrics')

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t('resumeTitle')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-primary">
              {t('studentsRegistered')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-3xl">1,234</span>
              <span
                className={`px-2 py-1 rounded-sm bg-blue-100 text-blue-800 dark:bg-blue-200`}
              >
                <UsersThree
                  weight="fill"
                  size={32}
                  className="text-blue-700 dark:text-blue-900"
                />
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-primary">
              {t('incidentsRecorded')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-3xl">103</span>
              <span
                className={`px-1.5 py-1.5 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-200`}
              >
                <ClockCounterClockwise
                  weight="fill"
                  size={32}
                  className="text-purple-700 dark:text-purple-700"
                />
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {t('last30Days')}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-primary">
              {t('mainProblems')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-3xl">Bullying</span>
              <span
                className={`px-2 py-1 rounded-sm bg-red-100 text-red-800 dark:bg-red-200`}
              >
                <Warning
                  weight="fill"
                  size={32}
                  className="text-red-700 dark:text-red-700"
                />
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {t('last30Days')}
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
