"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { occurrencesTypesEnum } from "@/constants/occurrences-types-enum";
import { useGetOccurrencesSummary } from "@/services/queries/get-occurrences-summary";
import {
  ClockCounterClockwise,
  UsersThree,
  Warning,
} from "@phosphor-icons/react";

export function BusinessMetrics() {
  const { data: occurrencesSummaryData } = useGetOccurrencesSummary();

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
              <span className="font-bold text-3xl">
                {occurrencesSummaryData?.incidentStudentsCount}
              </span>
              <span className="px-2 py-1 rounded-sm bg-brand-muted text-brand-muted-foreground">
                <UsersThree
                  weight="fill"
                  size={32}
                  className="text-brand-icon"
                />
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
          {occurrencesSummaryData?.last30DaysOccurrencesCount && (
            <CardContent>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-3xl">
                  {occurrencesSummaryData?.last30DaysOccurrencesCount}
                </span>
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
          )}
        </Card>
        {occurrencesSummaryData?.last30DaysMainOccurrenceType && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-normal text-primary">
                Principais Problemas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-3xl">
                  {
                    occurrencesTypesEnum[
                      occurrencesSummaryData?.last30DaysMainOccurrenceType
                    ]
                  }
                </span>
                <span className="px-2 py-1 rounded-sm bg-danger-muted text-danger-muted-foreground">
                  <Warning
                    weight="fill"
                    size={32}
                    className="text-danger-foreground-on-muted"
                  />
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Ultimos 30 dias
              </span>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
