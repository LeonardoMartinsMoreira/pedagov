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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import InputMask from 'react-input-mask'
import { InputProps } from 'react-day-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAllGroups } from '@/services/queries/get-all-groups'
import { useCreateStudent } from '@/services/mutations/create-student'

const AddStudentSchema = z.object({
  name: z.string({ message: 'Nome do aluno é obrigatório' }),
  class: z.string({ message: 'Selecione uma turma' }),
  responsiblePhone: z.string({ message: 'Insira o telefone do responsável' }),
  responsibleEmail: z.string({ message: 'Insira o email do responsável' }),
  photo: z.string().optional(),
  cpf: z
    .string({ message: 'CPF é obrigatório' })
    .min(11, { message: 'CPF deve ter 11 dígitos' })
    .transform((value) => value.replace(/\D/g, ''))
    .refine((value) => cpfValidator.isValid(value), {
      message: 'CPF inválido',
    }),
})

export type IAddStudent = z.infer<typeof AddStudentSchema>

export function AddStudentDialog({
  isVisible,
  closeDialog,
}: {
  isVisible: boolean
  closeDialog: () => void
}) {
  const { data, isLoading } = useGetAllGroups({
    page: 1,
    limit: 100,
    globalFilter: '',
  })

  const { mutate } = useCreateStudent(closeDialog)

  const form = useForm({
    resolver: zodResolver(AddStudentSchema),
  })

  const onCloseDialog = () => {
    closeDialog()
    form.reset()
  }

  const onSubmit = (data: IAddStudent) => {
    mutate({
      status: 'ACTIVE',
      cpf: data.cpf,
      groupId: data.class,
      name: data.name,
      responsiblePhone: data.responsiblePhone ?? '',
      responsibleEmail: data.responsibleEmail ?? '',
    })
    onCloseDialog()
  }

  return (
    <Dialog open={isVisible} onOpenChange={onCloseDialog}>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Adicionar novo aluno</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="flex w-full gap-x-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Nome completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="class"
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
                            <SelectValue placeholder="Selecione uma turma" />
                          </SelectTrigger>
                          <SelectContent>
                            {isLoading ? (
                              <div>Carregando turmas...</div>
                            ) : (
                              data?.result.map((group) => (
                                <SelectItem key={group.id} value={group.id}>
                                  {group.name}
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
              </div>
            </div>

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <InputMask
                      mask="999.999.999-99"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {(inputProps: InputProps) => (
                        <Input {...inputProps} placeholder="CPF" />
                      )}
                    </InputMask>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsiblePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone do responsável</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue=""
                      placeholder="Whatsapp/Telefone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibleEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email do responsável</FormLabel>
                  <FormControl>
                    <Input defaultValue="" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Adicionar aluno(a)</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
