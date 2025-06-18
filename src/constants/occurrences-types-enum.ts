import { IBadgeVariants } from '@/components/ui/badge'

export const occurrencesTypesEnum: Record<string, string> = {
  BEHAVIOR: 'Comportamento',
  DELAY: 'Atraso',
  ABSENCES: 'Falta',
  UNIFORM: 'Uniforme',
}

export const occurrencesColorsEnum: Record<string, IBadgeVariants> = {
  BEHAVIOR: 'destructive',
  ABSENCES: 'secondary',
  UNIFORM: 'outline',
  DELAY: 'default',
}
