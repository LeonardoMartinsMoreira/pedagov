import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'

interface IEditStudentPayload {
  responsibleEmail: string | undefined
  responsiblePhone: string | undefined
  name: string
  status: string
  cpf: string
  groupId: string
}

const editStudent = async (data: IEditStudentPayload) => {
  return await api.post('/accounts/student', {
    status: data.status,
    name: data.name,
    responsibleEmail: data.responsibleEmail,
    responsiblePhone: data.responsiblePhone,
    groupId: data.groupId,
    cpf: data.cpf,
  })
}

export const useEditStudent = (closeDialog: () => void) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['edit-student'],
    mutationFn: editStudent,
    onSuccess: () => {
      toast({
        title: 'Aluno editado com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['edit-student'] })

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
