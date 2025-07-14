import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'
import { IStudent } from '@/interfaces/students/students'

interface ICreateStudentPayload extends IStudent {
  responsibleEmail: string
  responsiblePhone: string
  name: string
}

const createStudent = async (data: ICreateStudentPayload) => {
  return await api.post('/students', {
    status: 'ACTIVE',
    name: data.student,
    responsibleEmail: data.responsibleEmail,
    responsiblePhone: data.responsiblePhone,
    groupId: data.groupId,
  })
}

export const useCreateStudent = (closeDialog: () => void) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['create-student'],
    mutationFn: createStudent,
    onSuccess: () => {
      toast({
        title: 'Aluno criado com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['students'] })

      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar criar aluno(a).',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
