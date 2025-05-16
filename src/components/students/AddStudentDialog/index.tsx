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
import { UploadImage } from '@/components/upload-image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import InputMask from 'react-input-mask'
import { InputProps } from 'react-day-picker'
import { fakeClasses } from '@/faker/classes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AddStdudentSchema = z.object({
  name: z.string({ message: 'Nome do aluno é obrigatório' }),
  class: z.string({ message: 'Selecione uma turma' }),
  responsablePhone: z.string().optional(),
  photo: z.string().optional(),
  cpf: z
    .string({ message: 'CPF é obrigatório' })
    .min(11, { message: 'CPF deve ter 11 dígitos' })
    .transform((value) => value.replace(/\D/g, ''))
    .refine((value) => cpfValidator.isValid(value), {
      message: 'CPF inválido',
    }),
})

export type IAddStudent = z.infer<typeof AddStdudentSchema>

export function AddStudentDialog({
  isVisible,
  closeDialog,
}: {
  isVisible: boolean
  closeDialog: () => void
}) {
  const form = useForm({
    resolver: zodResolver(AddStdudentSchema),
  })

  const onCloseDialog = () => {
    closeDialog()
    form.reset()
  }

  const onSubmit = (data: IAddStudent) => {
    console.log(data)
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
                            {fakeClasses.map(({ class: group, id }) => (
                              <SelectItem
                                className="h-8"
                                key={id}
                                value={id.toString()}
                              >
                                {group}
                              </SelectItem>
                            ))}
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
              name="responsablePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Telefone do responsável{' '}
                    <span className="text-xs text-muted-foreground">
                      (Opcional)
                    </span>
                  </FormLabel>
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
              name="photo"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Foto do aluno{' '}
                    <span className="text-xs text-muted-foreground">
                      (Opcional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <UploadImage
                      trigger={form.trigger}
                      setValue={form.setValue}
                    />
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
