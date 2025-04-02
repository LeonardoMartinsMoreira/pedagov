import { MultiSelect } from '@/components/multi-select'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const options = [
  {
    schoolName: 'CEDV',
    id: 1,
  },
  {
    schoolName: 'CELV',
    id: 2,
  },
  {
    schoolName: 'CEJA',
    id: 3,
  },
  {
    schoolName: 'CEDC',
    id: 4,
  },
]

const AddPedagogueSchema = z.object({
  name: z.string().min(4, { message: 'Nome do pedagogo é obrigatório' }),
  email: z
    .string({ message: 'É obrigatório' })
    .email({ message: 'Insira um email válido' }),
  school: z
    .array(z.string(), {
      message: 'É obrigatório ao menos 1 escola de atuação',
    })
    .min(1, { message: 'É obrigatório ao menos 1 escola de atuação' }),
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
  const form = useForm({
    resolver: zodResolver(AddPedagogueSchema),
    defaultValues: {
      email: '',
      school: [],
      isAdmin: false,
      name: '',
    },
  })

  const {
    errors: { email, school, name },
  } = form.formState

  const onCloseDialog = () => {
    closeDialog()
    form.reset()
  }

  const onSubmit = (data: IAddPedagogue) => {
    console.log(data)
    onCloseDialog()
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
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-3">
                      <FormLabel className={`${school?.message && '#FF0000'}`}>
                        Escolas de atuação
                      </FormLabel>
                      <MultiSelect
                        options={options.map(({ id, schoolName }) => {
                          return {
                            label: schoolName,
                            value: id.toString(),
                          }
                        })}
                        onValueChange={field.onChange}
                        value={field.value}
                        selectAll={false}
                        error={Boolean(school)}
                      />
                    </div>
                    <FormMessage />
                  </div>
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
                        onCheckedChange={field.onChange}
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

            <Button type="submit">Adicionar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
