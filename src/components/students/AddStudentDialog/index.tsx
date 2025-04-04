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

const AddStdudentSchema = z.object({
  name: z.string({ message: 'Nome do aluno é obrigatório' }),
  class: z.string({ message: 'Selecione uma turma' }),
  responsablePhone: z.string().optional(),
  photo: z.string().optional(),
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
            <div className="flex gap-x-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turma</FormLabel>
                    <FormControl>
                      <Input placeholder="Turma/Serie" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
