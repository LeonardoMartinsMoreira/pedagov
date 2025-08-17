import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'
import { IGroup } from '@/interfaces/groups/groups'

const createGroup = async (data: Omit<IGroup, 'studentsId'>) => {
  return await api.post('/groups', {
    name: data.name,
    teacherId: data.teacherId,
    shift: data.shift,
    studentsIds: [],
  })
}

export const useCreateGroup = (closeDialog: () => void) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['create-group'],
    mutationFn: createGroup,
    onSuccess: () => {
      toast({
        title: 'Turma criada com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['create-group'] })

      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar criar turma.',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
