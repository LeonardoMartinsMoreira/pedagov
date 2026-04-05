'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SideLoginImage from '../../../public/full-shot-kid-cheating-school.jpg'
import { getSession, signIn } from 'next-auth/react'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type loginType = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form

  const router = useRouter()

  const onSubmit = async (data: loginType) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (!res?.ok) {
      toast({
        title: 'Erro ao tentar fazer login',
        description: res?.error,
        variant: 'destructive',
      })
      return
    }

    router.refresh()
    const session = await getSession()
    if (session?.user?.mustChangePassword) {
      window.location.href = '/change-password'
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                  <p className="text-balance text-muted-foreground">
                    Entre com sua conta Mais Ocorrências
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="pedagogo@exemplo.com"
                          error={!!form.formState.errors.email}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex items-center">
                        <FormLabel>Senha</FormLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Esqueceu sua senha?
                        </a>
                      </div>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          error={!!form.formState.errors.password}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  isLoading={isSubmitting}
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Entrar
                </Button>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={SideLoginImage}
              alt="Imagem alunos"
              priority={true}
              quality={75}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{' '}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}

