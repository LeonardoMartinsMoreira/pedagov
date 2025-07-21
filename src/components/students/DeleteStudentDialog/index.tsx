import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { IStudent } from '@/interfaces/students/students'
import { useDeleteStudent } from '@/services/mutations/delete-student'

export function DeleteStudentDialog({
  isVisible,
  closeDialog,
  student,
}: {
  isVisible: boolean
  closeDialog: () => void
  student: IStudent
}) {
  const { mutate, isPending } = useDeleteStudent(closeDialog)

  const handleDeleteStudent = () => {
    mutate(student.studentId)
  }

  return (
    <Dialog open={isVisible} onOpenChange={closeDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[425px]">
        <DialogHeader className="flex w-full flex-col items-center">
          <p className="text-xl text-center font-bold">
            Você tem certeza que deseja prosseguir?
          </p>
        </DialogHeader>

        <p className="text-center text-muted-foreground">
          Essa ação não pode ser revertida. Você tem certeza que deseja deletar
          o aluno(a){' '}
          <span className="font-bold text-black dark:text-white ">
            {student?.student}?
          </span>
        </p>

        <div className="flex items-center w-full justify-center gap-x-2">
          <Button className="w-full" variant="secondary">
            Cancelar
          </Button>
          <Button
            isLoading={isPending}
            onClick={handleDeleteStudent}
            className="w-full"
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
