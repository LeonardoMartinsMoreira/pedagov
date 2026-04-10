import { toast } from '@/hooks/use-toast'
import type { IPedagogue } from '@/interfaces/pedagogues/pedagogues'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../api'

const editPedagogue = async (data: IPedagogue) => {
  await api.put(`/pedagogues/${data.id}`, data)
}

export function useEditPedagogue(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['edit-pedagogue'],
    mutationFn: editPedagogue,
    onSuccess: async (_, data) => {
      toast({
        title: 'Pedagogo editado com sucesso.',
        variant: 'success',
      })
      await queryClient.invalidateQueries({ queryKey: ['pedagogues'] })
      await queryClient.invalidateQueries({ queryKey: ['pedagogue', data.id] })
      options?.onSuccess?.()
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
