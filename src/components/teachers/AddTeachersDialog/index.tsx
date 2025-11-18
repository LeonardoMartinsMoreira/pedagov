import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Input } from '@/components/ui/input'
import { useCreatePedagogue } from '@/services/mutations/create-pedagogue'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AddPedagogueSchema = z.object({
  name: z.string().min(4, { message: 'Nome do pedagogo é obrigatório' }),
  email: z
    .string({ message: 'É obrigatório' })
    .email({ message: 'Insira um email válido' }),
  isAdmin: z.boolean(),
})

export type IAddPedagogue = z.infer<typeof AddPedagogueSchema>

export function AddPedagogueDialog({
  isVisible,
  closeDialog,
}: {
  isVisible: boolean
  closeDialog: () => void
}) {
  const onCloseDialog = () => {
    closeDialog()
    form.reset()
  }

  const { mutate, isPending } = useCreatePedagogue(onCloseDialog)

  const form = useForm({
    resolver: zodResolver(AddPedagogueSchema),
    defaultValues: {
      isAdmin: false,
      email: '',
      name: '',
    },
  })

  const {
    errors: { email, name },
  } = form.formState

  const onSubmit = (data: IAddPedagogue) => {
    mutate(data)
  }

  return (
    <Dialog open={isVisible} onOpenChange={onCloseDialog}>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Adicionar novo pedagogo(a)</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      error={Boolean(email)}
                      className="h-10"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Marque esta caixa para conceder permissões de{' '}
                        <strong>Administrador</strong>.
                      </FormLabel>
                      <FormDescription>
                        Este usuário poderá adicionar e remover turmas, alunos e
                        pedagogos
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button isLoading={isPending} type="submit">
              Adicionar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
