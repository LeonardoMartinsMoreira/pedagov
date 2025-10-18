import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'

interface ICreateStudentPayload {
  responsibleEmail: string | undefined
  responsiblePhone: string | undefined
  name: string
  status: string
  cpf: string
  groupId: string
}

const createStudent = async (data: ICreateStudentPayload) => {
  return await api.post('/accounts/student', {
    status: data.status,
    name: data.name,
    responsibleEmail: data.responsibleEmail,
    responsiblePhone: data.responsiblePhone,
    groupId: data.groupId,
    cpf: data.cpf,
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
