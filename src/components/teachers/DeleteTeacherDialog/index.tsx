'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ITeacher } from '@/interfaces/teachers/teacher'
import { useDeleteTeacher } from '@/services/mutations/delete-teacher'

export function DeleteTeacherDialog({
  isVisible,
  closeDialog,
  teacher,
}: {
  isVisible: boolean
  closeDialog: () => void
  teacher: ITeacher
}) {
  const { mutate, isPending } = useDeleteTeacher(closeDialog)

  const handleDeleteTeacher = () => mutate(teacher.id)

  return (
    <Dialog open={isVisible} onOpenChange={isPending ? undefined : closeDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[425px]">
        <DialogHeader className="flex w-full flex-col items-center">
          <DialogTitle className="text-xl text-center font-bold">
            Você tem certeza que deseja prosseguir?
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-muted-foreground">
          Essa ação não pode ser revertida. Você tem certeza que deseja deletar
          o professor(a){' '}
          <span className="font-bold text-black dark:text-white ">
            {teacher?.name}?
          </span>
        </p>

        <div className="flex items-center w-full justify-center gap-x-2">
          <Button disabled={isPending} className="w-full" variant="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteTeacher}
            isLoading={isPending}
            className="w-full"
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
