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
import { ITeacher } from '@/interfaces/teachers/teacher'
import { useEditTeacher } from '@/services/mutations/edit-teacher'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const EditTeacherSchema = z.object({
  name: z.string().min(4, { message: 'Nome do professor é obrigatório' }),
})

export type IEditTeacher = z.infer<typeof EditTeacherSchema>

export function EditTeacherDialog({
  isVisible,
  closeDialog,
  teacher,
}: {
  isVisible: boolean
  closeDialog: () => void
  teacher: ITeacher
}) {
  const onCloseDialog = () => {
    form.reset()
    closeDialog()
  }

  const { mutate, isPending } = useEditTeacher(onCloseDialog)

  const form = useForm({
    resolver: zodResolver(EditTeacherSchema),
    defaultValues: {
      name: teacher.name,
    },
  })

  const {
    errors: { name },
  } = form.formState

  const onSubmit = (data: IEditTeacher) => {
    mutate({ ...data, teacherId: teacher.id })
  }

  useEffect(() => {
    if (isVisible) {
      form.reset({
        name: teacher.name,
      })
    }
  }, [teacher, isVisible, form])

  return (
    <Dialog open={isVisible} onOpenChange={onCloseDialog}>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Adicionar novo professor(a)</DialogTitle>
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
            <Button isLoading={isPending} type="submit">
              Adicionar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
