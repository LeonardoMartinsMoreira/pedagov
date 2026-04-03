'use client'

import { DeleteDialog } from '@/components/common/DeleteDialog'
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

  const description = (
    <>
      Essa ação não pode ser revertida. Você tem certeza que deseja deletar
      o professor(a){' '}
      <span className="font-bold text-black dark:text-white ">
        {teacher?.name}?
      </span>
    </>
  )

  return (
    <DeleteDialog
      isVisible={isVisible}
      closeDialog={closeDialog}
      isPending={isPending}
      handleDelete={handleDeleteTeacher}
      description={description}
    />
  )
}
