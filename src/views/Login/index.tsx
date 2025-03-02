'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import SideLoginImage from '../../../public/full-shot-kid-cheating-school.jpg'
import { Chrome, Facebook } from 'lucide-react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
})

type loginType = z.infer<typeof loginSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: loginType) => {
    console.log('Dados enviados:', data)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                <p className="text-balance text-muted-foreground">Entre com sua conta EducaGov</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" {...register('email')} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="********" {...register('password')} />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">Ou continue com</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                  <GitHubLogoIcon />
                  <span className="sr-only">Entrar com GitHub</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <Chrome />
                  <span className="sr-only">Entrar com Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <Facebook />
                  <span className="sr-only">Entrar com Facebook</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Não tem uma conta?{' '}
                <a href="#" className="underline underline-offset-4">
                  Cadastre-se
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={SideLoginImage}
              alt="Imagem"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e{' '}
        <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}
