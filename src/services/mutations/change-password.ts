import { useMutation } from '@tanstack/react-query'
import { api } from '../api'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useFirstLogin } from '@/contexts/login-context'

interface IChangePassword {
  password: string
  newPassword: string
  email: string
}

const changePassword = async (data: IChangePassword) => {
  return await api.post('/change-password', data)
}

export const useChangePassword = () => {
  const { push } = useRouter()
  const { isFirstLogin, setIsFirstLogin } = useFirstLogin()

  return useMutation({
    mutationKey: ['changePassword'],
    mutationFn: changePassword,
    onSuccess: () => {
      push('/')

      if (isFirstLogin) {
        setIsFirstLogin(false)
      }

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
