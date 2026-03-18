import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'

interface IEditTeacherPayload {
  name: string
}

const editTeacher = async ({
  name,
  teacherId,
}: IEditTeacherPayload & { teacherId: string }) => {
  return await api.put(`/teachers/${teacherId}`, {
    name: name,
  })
}

export const useEditTeacher = (closeDialog: () => void) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['edit-teacher'],
    mutationFn: editTeacher,
    onSuccess: () => {
      toast({
        title: 'Professor editado com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['teachers'] })
      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar editado professor.',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
