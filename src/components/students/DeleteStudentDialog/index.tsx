import { DeleteDialog } from '@/components/common/DeleteDialog'
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
    <DeleteDialog
      isVisible={isVisible}
      closeDialog={closeDialog}
      isPending={isPending}
      handleDelete={handleDeleteStudent}
    >
      <p className="text-center text-muted-foreground">
        Essa ação não pode ser revertida. Você tem certeza que deseja deletar
        o aluno(a){' '}
        <span className="font-bold text-black dark:text-white ">
          {student?.student}?
        </span>
      </p>
    </DeleteDialog>
  )
}
