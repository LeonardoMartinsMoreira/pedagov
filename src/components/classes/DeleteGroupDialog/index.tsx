import { DeleteDialog } from '@/components/common/DeleteDialog'
import { IGroup } from '@/interfaces/groups/groups'
import { useDeleteGroup } from '@/services/mutations/delete-group'

export function DeleteGroupDialog({
  isVisible,
  closeDialog,
  group,
}: {
  isVisible: boolean
  closeDialog: () => void
  group: IGroup
}) {
  const { mutate, isPending } = useDeleteGroup(closeDialog)

  const handleDeleteGroup = () => {
    mutate(group.id)
  }

  return (
    <DeleteDialog
      isVisible={isVisible}
      closeDialog={closeDialog}
      isPending={isPending}
      handleDelete={handleDeleteGroup}
    >
      <p className="text-center text-muted-foreground">
        Essa ação não pode ser revertida. Você tem certeza que deseja deletar
        a turma{' '}
        <span className="font-bold text-black dark:text-white ">
          {group.name}?
        </span>
      </p>
    </DeleteDialog>
  )
}
