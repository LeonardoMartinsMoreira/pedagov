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
  name: z.string().min(4, { message: 'Inserir o nome da turma é obrigatório' }),
  teacherId: z
    .string()
    .uuid({ message: 'Selecionar um professor é obrigatório' }),
  shift: z.string().nonempty({
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
  const form = useForm({
    resolver: zodResolver(AddPedagogueSchema),
    defaultValues: {
      name: '',
      shift: undefined,
      teacherId: 'b718a62b-c8bd-4110-8309-b082741c08a4',
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
    mutate(data as IGroup)
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turma</FormLabel>
                  <FormControl>
                    <Input
                      error={Boolean(name)}
                      className="h-10"
                      placeholder="Dê um nome a esta turma"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
