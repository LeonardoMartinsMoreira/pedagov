'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Warning } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ChangePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Nova senha deve ter pelo menos 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type IChangePassword = z.infer<typeof ChangePasswordSchema>

export function ChangePasswordModal({ isVisible }: { isVisible: boolean }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: IChangePassword) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('Alterando senha:', data)
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const {
    errors: { newPassword, confirmPassword },
  } = form.formState

  return (
    <Dialog open={isVisible} onOpenChange={() => {}} modal>
      <DialogContent
        canClose={false}
        className="flex flex-col gap-y-4 max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center">
          <Warning
            size={64}
            className="text-red-700 animate-pulse"
            style={{
              animationDuration: '5s',
              animationTimingFunction: 'ease-in-out',
            }}
          />
          <DialogHeader>
            <p className="flex items-center justify-center text-center font-medium gap-2 text-xl">
              É necessário alterar sua senha para prosseguir
            </p>
          </DialogHeader>
          <DialogDescription className="text-center">
            Por motivos de segurança, a alteração de senha deve ser feita.
          </DialogDescription>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
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
              isLoading={isLoading}
              className="w-full"
              disabled={isLoading}
            >
              Alterar Senha{' '}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
