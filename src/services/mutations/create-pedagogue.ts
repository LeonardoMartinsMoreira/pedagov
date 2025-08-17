import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'

interface ICreatePedagoguePayload {
  email: string
  name: string
  isAdmin: boolean
}

const createPedagogue = async (data: ICreatePedagoguePayload) => {
  return await api.post('/accounts/pedagogue', {
    role: data.isAdmin ? 'ADMIN' : 'COMMON',
    status: 'ACTIVE',
    name: data.name,
    email: data.email,
  })
}

export const useCreatePedagogue = (closeDialog: () => void) => {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['create-pedagogue'],
    mutationFn: createPedagogue,
    onSuccess: () => {
      toast({
        title: 'Pedagogo(a) criado com sucesso.',
        variant: 'success',
      })

      query.invalidateQueries({ queryKey: ['create-pedagogue'] })

      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar criar pedagogo(a).',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
