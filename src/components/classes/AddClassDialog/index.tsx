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
import { useGetAllTeachers } from '@/services/queries/get-all-teachers'
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
    .string({ message: 'Selecionar um professor é obrigatório' })
    .uuid(),
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
  const { data, isLoading } = useGetAllTeachers({
    page: 1,
    limit: 100,
  })

  const form = useForm<IAddPedagogue>({
    resolver: zodResolver(AddPedagogueSchema),
    defaultValues: {
      serie: '',
      name: '',
      shift: undefined,
      teacherId: undefined,
    },
  })

  const {
    errors: { shift, name },
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
                    <FormLabel>Turma</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Input
                          maxLength={1}
                          className="h-10 w-10 text-center"
                          {...field}
                        />
                      </FormControl>
                      <span className="ml-1 text-xl text-gray-700">º</span>
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
                        className="h-10 w-full"
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
                  <FormLabel>Turma</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha o responsável pela turma" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading ? (
                          <div>Carregando responsáveis...</div>
                        ) : (
                          data?.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
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
