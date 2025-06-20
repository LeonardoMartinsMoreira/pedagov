import { IBadgeVariants } from '@/components/ui/badge'

export const occurrencesTypesEnum: Record<string, string> = {
  DISCIPLINE: 'Comportamento',
  TARDINESS: 'Atraso',
  ABSENCES: 'Falta',
  UNIFORM: 'Uniforme',
}

export const occurrencesColorsEnum: Record<string, IBadgeVariants> = {
  DISCIPLINE: 'destructive',
  ABSENCES: 'secondary',
  UNIFORM: 'outline',
  TARDINESS: 'default',
}
