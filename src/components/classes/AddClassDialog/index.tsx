import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { shiftsEnum } from '@/constants/shifts-enum'
import { IGroup } from '@/interfaces/groups/groups'
import { useCreateGroup } from '@/services/mutations/create-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const shifts = Object.keys(shiftsEnum)

const AddPedagogueSchema = z.object({
  serie: z
    .string()
    .regex(/^[1-9]{1}$/, { message: 'Digite apenas um número (ex: 1)' }),
  name: z
    .string()
    .min(1, { message: 'Digite o nome ou letra da turma (ex: A)' }),
  teacherId: z
    .string()
    .uuid({ message: 'Selecionar um professor é obrigatório' }),
  shift: z
    .string({ message: 'Selecionar o turno dessa turma é obrigatório' })
    .nonempty({
      message: 'Selecionar o turno dessa turma é obrigatório',
    }),
})

type IAddPedagogue = z.infer<typeof AddPedagogueSchema>

export function AddPedagogueDialog({
  isVisible,
  closeDialog,
}: {
  isVisible: boolean
  closeDialog: () => void
}) {
  const form = useForm<IAddPedagogue>({
    resolver: zodResolver(AddPedagogueSchema),
    defaultValues: {
      serie: '',
      name: '',
      shift: undefined,
      teacherId: 'e2b1d647-172b-47b8-9b75-ff4bbae7c0ef',
    },
  })

  const {
    errors: { shift, teacherId, name },
  } = form.formState

  const onCloseDialog = () => {
    form.reset()
    closeDialog()
  }

  const { mutate, isPending } = useCreateGroup(onCloseDialog)

  const onSubmit = (data: IAddPedagogue) => {
    const formattedName = `${data.serie}º ${data.name.trim().toUpperCase()}`

    const groupData = {
      ...data,
      name: formattedName,
    }

    mutate(groupData as IGroup)
  }

  return (
    <Dialog open={isVisible} onOpenChange={onCloseDialog}>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Adicionar nova turma</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="serie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Série</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Input
                          maxLength={1}
                          className="h-10 w-10 text-center"
                          {...field}
                        />
                      </FormControl>
                      <span className="ml-1 text-3xl text-gray-700">º</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-8 w-full">
                    <FormControl>
                      <Input
                        error={Boolean(name)}
                        className="h-10 w-full text-center"
                        placeholder="Nome da turma (ex: A)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professor</FormLabel>
                  <FormControl>
                    <Input
                      error={Boolean(teacherId)}
                      className="h-10"
                      placeholder="Escolha o professor regente"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shift"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-3">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormLabel>Período</FormLabel>
                        <FormControl>
                          <SelectTrigger error={Boolean(shift)}>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {shifts.map((shift) => {
                            return (
                              <SelectItem key={shift} value={shift}>
                                {shiftsEnum[shift]}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button isLoading={isPending} type="submit">
              Adicionar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
