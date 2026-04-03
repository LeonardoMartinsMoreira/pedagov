'use client'

import { DeleteDialog } from '@/components/common/DeleteDialog'
import { IPedagogue } from '@/interfaces/pedagogues/pedagogues'
import { useDeletePedagogue } from '@/services/mutations/delete-pedagogue'

export function DeletePedagogueDialog({
  isVisible,
  closeDialog,
  pedagogue,
}: {
  isVisible: boolean
  closeDialog: () => void
  pedagogue: IPedagogue
}) {
  const { mutate, isPending } = useDeletePedagogue(closeDialog)

  const handleDeletePedagogue = () => mutate(pedagogue.id)

  return (
    <DeleteDialog
      isVisible={isVisible}
      closeDialog={closeDialog}
      isPending={isPending}
      handleDelete={handleDeletePedagogue}
    >
      <p className="text-center text-muted-foreground">
        Essa ação não pode ser revertida. Você tem certeza que deseja deletar
        o pedagogo(a){' '}
        <span className="font-bold text-black dark:text-white ">
          {pedagogue?.name}?
        </span>
      </p>
    </DeleteDialog>
  )
}
