import { useMutation } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface IChangePassword {
  password: string
  newPassword: string
  email: string
}

const changePassword = async (data: IChangePassword) => {
  return await api.post('/change-password', data)
}

export const useChangePassword = () => {
  const { data, update } = useSession()
  const { push } = useRouter()

  return useMutation({
    mutationKey: ['changePassword'],
    mutationFn: changePassword,
    onSuccess: () => {
      if (data?.user.isFirstLogin) {
        update({ isFirstLogin: false })
      }

      push('/')

      toast({
        title: 'Senha alterada com sucesso.',
        variant: 'default',
      })
    },
    onError: () => {
      toast({
        title: 'Falha ao tentar alterar sua senha.',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    },
  })
}
