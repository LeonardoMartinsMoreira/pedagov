'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useChangePassword } from '@/services/mutations/change-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { Warning } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ChangePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Nova senha deve ter pelo menos 8 caracteres' }),
    currentPassword: z.string({
      required_error: 'É necessário inserir a senha atual',
    }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type IChangePassword = z.infer<typeof ChangePasswordSchema>

export function ChangePassword() {
  const { mutate, isPending } = useChangePassword()
  const { data } = useSession()

  const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = ({ newPassword, currentPassword }: IChangePassword) => {
    mutate({
      newPassword,
      password: currentPassword,
      email: data?.user.email as string,
    })
  }

  const {
    errors: { currentPassword, newPassword, confirmPassword },
  } = form.formState

  return (
    <div className="relative bg-background rounded-lg shadow-md dark:bg-[#0D111F] max-w-md w-full mx-4 p-6 dark:bg-muted">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col items-center">
          <Warning
            size={64}
            className="text-red-700 animate-pulse"
            style={{
              animationDuration: '5s',
              animationTimingFunction: 'ease-in-out',
            }}
          />
          <div className="text-center mt-4">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">
              É necessário alterar sua senha para prosseguir
            </h2>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Por motivos de segurança, a alteração de senha deve ser feita.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha Atual</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="h-10 pr-10"
                      placeholder="Digite sua senha atual"
                      error={Boolean(currentPassword)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="h-10 pr-10"
                      placeholder="Digite sua nova senha"
                      error={Boolean(newPassword)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="h-10 pr-10"
                      placeholder="Confirme sua nova senha"
                      error={Boolean(confirmPassword)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              isLoading={isPending}
              className="w-full mt-2"
              disabled={isPending}
            >
              Alterar Senha
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
