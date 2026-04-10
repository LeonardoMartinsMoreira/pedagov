import { useMutation } from '@tanstack/react-query'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { toast } from '@/hooks/use-toast'

import { api } from '../api'

interface IChangePassword {
  password: string
  newPassword: string
  email: string
}

const changePassword = async (data: IChangePassword) => {
  return await api.post('/change-password', data)
}

export const useChangePassword = () => {
  const router = useRouter()

  return useMutation({
    mutationKey: ['change-password'],
    mutationFn: changePassword,
    onSuccess: async (_response, variables) => {
      const res = await signIn('credentials', {
        redirect: false,
        email: variables.email,
        password: variables.newPassword,
      })

      if (res?.ok) {
        router.refresh()
        router.replace('/')
        toast({
          title: 'Senha alterada com sucesso.',
          variant: 'success',
        })
        return
      }

      toast({
        title: 'Senha alterada. Entre novamente com a nova senha.',
        description: res?.error,
        variant: 'success',
      })

      signOut({
        redirect: true,
        callbackUrl: '/login',
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
