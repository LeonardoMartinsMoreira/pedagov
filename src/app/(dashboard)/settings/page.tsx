'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/hooks/use-toast'
import { useSettings } from '@/contexts/settings-context'
import { useChangePassword } from '@/services/mutations/change-password'
import { useEditPedagogue } from '@/services/mutations/edit-pedagogue'
import { usePedagogue } from '@/services/queries/get-pedagogue'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const changePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'A nova senha deve ter pelo menos 8 caracteres' }),
    currentPassword: z.string().min(1, { message: 'Informe a senha atual' }),
    confirmPassword: z.string().min(1, { message: 'Confirme a nova senha' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>

export default function SettingsPage() {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { data: pedagogue, isLoading: isLoadingPedagogue } = usePedagogue(userId)
  const { settings, updateSettings } = useSettings()

  const { mutate: saveProfile, isPending: isSavingProfile } = useEditPedagogue()

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword()

  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const handleSaveAccount = () => {
    const name = settings.name?.trim() ?? ''
    if (name.length < 4) {
      toast({
        title: 'Nome inválido',
        description: 'O nome deve ter pelo menos 4 caracteres.',
        variant: 'destructive',
      })
      return
    }
    if (!pedagogue) {
      toast({
        title: 'Não foi possível carregar o perfil',
        description: 'Tente novamente em instantes.',
        variant: 'destructive',
      })
      return
    }

    saveProfile({
      id: pedagogue.id,
      name,
      email: pedagogue.email,
      status: pedagogue.status,
      role: pedagogue.role,
    })
  }

  const onSubmitPassword = ({
    currentPassword,
    newPassword,
  }: ChangePasswordFormValues) => {
    const email = session?.user?.email
    if (!email) {
      toast({
        title: 'Sessão inválida',
        description: 'Faça login novamente.',
        variant: 'destructive',
      })
      return
    }
    changePassword(
      {
        password: currentPassword,
        newPassword,
        email,
      },
      {
        onSuccess: () => {
          passwordForm.reset()
        },
      }
    )
  }

  const {
    formState: { errors: passwordErrors },
  } = passwordForm

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Conta</CardTitle>
              <CardDescription>
                Atualize seu nome. A foto de perfil não pode ser alterada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full-name">Nome</Label>
                <Input
                  id="full-name"
                  value={settings.name ?? ''}
                  onChange={(e) => updateSettings({ name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  readOnly
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  O e-mail vem da sua conta e não pode ser alterado aqui.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                onClick={handleSaveAccount}
                isLoading={isSavingProfile}
                disabled={isSavingProfile || isLoadingPedagogue || !pedagogue}
              >
                Salvar perfil
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Altere sua senha. Você poderá precisar entrar novamente após a
                  troca.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                    className="space-y-4 max-w-md"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha atual</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              autoComplete="current-password"
                              error={Boolean(passwordErrors.currentPassword)}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova senha</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              autoComplete="new-password"
                              error={Boolean(passwordErrors.newPassword)}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar nova senha</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              autoComplete="new-password"
                              error={Boolean(passwordErrors.confirmPassword)}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      isLoading={isChangingPassword}
                      disabled={
                        isChangingPassword || !passwordForm.formState.isValid
                      }
                    >
                      Alterar senha
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
