import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'

interface IEditTeacherPayload {
  name: string
}

const editTeacher = async (data: IEditTeacherPayload) => {
  return await api.put('/accounts/teacher', {
    name: data.name,
  })
}

export const useEditTeacher = (closeDialog: () => void) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['edit-student'],
    mutationFn: editTeacher,
    onSuccess: ({ data }) => {
      toast({
        title: 'Aluno editado com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['student', data.id] })

      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar editado aluno(a).',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
