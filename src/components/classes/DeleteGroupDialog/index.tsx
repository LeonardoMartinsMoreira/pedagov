import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
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
  const { mutate } = useDeleteGroup(closeDialog)

  const handleDeleteGroup = () => {
    mutate(group.id)
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
          a turma{' '}
          <span className="font-bold text-black dark:text-white ">
            {group.name}?
          </span>
        </p>

        <div className="flex items-center w-full justify-center gap-x-2">
          <Button onClick={closeDialog} className="w-full" variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteGroup} className="w-full">
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
