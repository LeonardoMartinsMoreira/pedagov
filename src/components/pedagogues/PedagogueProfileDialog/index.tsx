import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { User, Mail, Hash, Shield, Activity, ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IPedagogue } from '@/interfaces/pedagogues/pedagogues'
import { useEditPedagogue } from '@/services/mutations/update-pedagogue'

const EditPedagogueSchema = z.object({
  name: z.string().min(4, { message: 'Nome do pedagogo é obrigatório' }),
  isAdmin: z.boolean(),
  status: z.string(),
  id: z.string(),
})

export type IEditPedagogue = z.infer<typeof EditPedagogueSchema>

const pedagogueStatus: Record<
  string,
  {
    title: string
    color: string
  }
> = {
  ACTIVE: {
    title: 'Ativo',
    color: 'bg-green-100 text-green-800 border-green-200',
  },
  INACTIVE: {
    title: 'Inativo',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
  },
}

export function PedagogueProfileDialog({
  isVisible,
  closeDialog,
  pedagogue,
}: {
  isVisible: boolean
  closeDialog: () => void
  pedagogue: IPedagogue
}) {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<IEditPedagogue>({
    resolver: zodResolver(EditPedagogueSchema),
    defaultValues: {
      ...pedagogue,
      // Converte role string para isAdmin boolean
      isAdmin: pedagogue.role === 'ADMIN',
    },
  })

  const {
    errors: { name },
  } = form.formState

  const { mutate, isPending } = useEditPedagogue(closeDialog)

  const handleSave = (data: IEditPedagogue) => {
    // Converte isAdmin boolean de volta para role string
    const pedagogueData = {
      ...data,
      role: data.isAdmin ? 'ADMIN' : 'COMMON',
    }

    mutate({
      data: pedagogueData,
    })
  }

  const handleCancel = () => {
    form.reset({
      ...pedagogue,
      isAdmin: pedagogue.role === 'ADMIN',
    })
    setIsEditing(false)
  }

  const handleCloseDialog = () => {
    setIsEditing(false)
    form.reset({
      ...pedagogue,
      isAdmin: pedagogue.role === 'ADMIN',
    })
    closeDialog()
  }

  return (
    <Dialog open={isVisible} onOpenChange={handleCloseDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {!isEditing ? (
          <>
            <DialogHeader className="flex w-full flex-col items-center space-y-4">
              <div className="flex gap-2 items-center w-full">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-center">
                    {pedagogue.name}
                  </DialogTitle>
                  <Badge className={pedagogueStatus[pedagogue.status].color}>
                    {pedagogueStatus[pedagogue.status].title}
                  </Badge>
                </div>
              </div>

              <div className="w-full space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span>{pedagogue.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{'pedagogue@example.com'}</span>
                </div>
              </div>
            </DialogHeader>

            <div className="flex items-center w-full justify-center gap-x-2">
              <Button className="w-full" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="p-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <DialogTitle>Editar Pedagogo</DialogTitle>
              </div>
            </DialogHeader>

            <Form {...form}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <Hash className="w-4 h-4" />
                    <span>ID do Pedagogo</span>
                  </div>
                  <Input
                    value={pedagogue.id}
                    disabled
                    className="bg-muted h-10"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                  <Input
                    value={'pedagogue@example.com'}
                    disabled
                    className="bg-muted h-10"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Nome Completo</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          error={Boolean(name)}
                          className="h-10"
                          placeholder="Nome completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isAdmin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 mb-3">
                        <Shield className="w-4 h-4" />
                        <span>Função</span>
                      </FormLabel>
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Marque esta caixa para conceder permissões de{' '}
                            <strong>Administrador</strong>.
                          </FormLabel>
                          <FormDescription>
                            Este usuário poderá adicionar e remover turmas,
                            alunos e pedagogos
                          </FormDescription>
                        </div>
                      </FormItem>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Activity className="w-4 h-4" />
                        <span>Status</span>
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Ativo</SelectItem>
                          <SelectItem value="INACTIVE">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={form.handleSubmit(handleSave)}
                    isLoading={isPending}
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
