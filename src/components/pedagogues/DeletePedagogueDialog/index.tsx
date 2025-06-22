'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
    <Dialog open={isVisible} onOpenChange={isPending ? undefined : closeDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[425px]">
        <DialogHeader className="flex w-full flex-col items-center">
          <DialogTitle className="text-xl text-center font-bold">
            Você tem certeza que deseja prosseguir?
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-muted-foreground">
          Essa ação não pode ser revertida. Você tem certeza que deseja deletar
          o pedagogo(a){' '}
          <span className="font-bold text-black dark:text-white ">
            {pedagogue?.name}?
          </span>
        </p>

        <div className="flex items-center w-full justify-center gap-x-2">
          <Button disabled={isPending} className="w-full" variant="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleDeletePedagogue}
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
