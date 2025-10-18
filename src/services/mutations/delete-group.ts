import { toast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'

async function deleteGroupApi(id: string) {
  await api.delete(`/groups/${id}`)
}

export function useDeleteGroup(closeDialog: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteGroupApi,
    onSuccess: async () => {
      toast({
        title: 'Turma deletada com sucesso.',
        variant: 'success',
      })
      await queryClient.invalidateQueries({ queryKey: ['groups'] })
      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Erro ao deletar turma',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
  })
}
