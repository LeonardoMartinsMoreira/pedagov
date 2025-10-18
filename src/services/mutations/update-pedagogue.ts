import { toast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { IPedagogue } from '@/interfaces/pedagogues/pedagogues'

interface EditPedagoguePayload {
  data: IPedagogue
}

async function editPedagogueApi(payload: EditPedagoguePayload) {
  await api.put(`/pedagogues/${payload.data.id}`, payload.data)
}

export function useEditPedagogue(closeDialog: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editPedagogueApi,
    onSuccess: async () => {
      toast({
        title: 'Pedagogo editado com sucesso.',
        variant: 'success',
      })
      await queryClient.invalidateQueries({ queryKey: ['pedagogues'] })
      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Erro ao editar pedagogo',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
  })
}
