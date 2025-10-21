import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface ICreateOccurrencePayload {
  studentsIds: string[]
  attendeesIds: string[]
  shouldSendEmail: boolean
  teacherId: string
  type: string
  description: string
  title: string
  attachmentsIds: Array<string>
}

const createOccurrence = async (data: ICreateOccurrencePayload) => {
  return await api.post('/occurrences', {
    title: data.title,
    type: data.type,
    description: data.description,
    studentsIds: data.studentsIds,
    attendeesIds: data.attendeesIds,
    shouldSendEmail: data.shouldSendEmail,
    teacherId: data.teacherId,
    attachmentsIds: [],
  })
}

export const useCreateOccurrence = (router: AppRouterInstance) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['create-occurrence'],
    mutationFn: createOccurrence,
    onSuccess: () => {
      toast({
        title: 'Ocorrência criada com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['occurrences'] })

      router.back()
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar criar ocorrência.',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
