import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface IEditOccurrencePayload {
  occurrenceId: string
  studentsIds: string[]
  attendeesIds: string[]
  teacherId: string
  type: string
  description: string
  title: string
  attachmentsIds: Array<string>
}

const editOccurrence = async (data: IEditOccurrencePayload) => {
  return await api.put(`/occurrences/${data.occurrenceId}`, {
    title: data.title,
    type: data.type,
    description: data.description,
    studentsIds: data.studentsIds,
    attendeesIds: data.attendeesIds,
    teacherId: data.teacherId,
    attachmentsIds: data.attachmentsIds,
  })
}

export const useEditOccurrence = (router: AppRouterInstance) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['edit-occurrence'],
    mutationFn: editOccurrence,
    onSuccess: (_, variables) => {
      toast({
        title: 'Ocorrência editada com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['occurrences'] })
      query.invalidateQueries({ queryKey: ['occurrence', variables.occurrenceId] })

      router.back()
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar editar ocorrência.',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
