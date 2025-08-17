import { toast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'

async function deletePedagogueApi(id: string) {
  await api.delete(`/pedagogues/${id}`)
}

export function useDeletePedagogue(closeDialog: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePedagogueApi,
    onSuccess: async () => {
      toast({
        title: 'Pedagogo deletado com sucesso.',
        variant: 'success',
      })
      await queryClient.invalidateQueries({ queryKey: ['delete-pedagogue'] })
      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Erro ao deletar pedagogo',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
  })
}
