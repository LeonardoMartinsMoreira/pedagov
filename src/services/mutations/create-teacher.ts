import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'

interface ICreateTeacherPayload {
  name: string
}

const createTeacher = async (data: ICreateTeacherPayload) => {
  return await api.post('/accounts/teacher', {
    status: 'ACTIVE',
    name: data.name,
  })
}

export const useCreateTeacher = (closeDialog: () => void) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['create-pedagogue'],
    mutationFn: createTeacher,
    onSuccess: () => {
      toast({
        title: 'Professor(a) criado com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['teachers'] })
      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar criar professor(a).',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
