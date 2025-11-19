import { toast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'

async function deleteOccurrenceApi(id: string) {
  console.log(id)

  await api.delete(`/occurrences/${id}`)
}

export function useDeleteOccurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteOccurrenceApi,
    onSuccess: async () => {
      toast({
        title: 'Ocorrência deletada com sucesso.',
        variant: 'success',
      })
      await queryClient.invalidateQueries({ queryKey: ['occurrences'] })
    },
    onError: () => {
      toast({
        title: 'Erro ao deletar ocorrência',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
  })
}
