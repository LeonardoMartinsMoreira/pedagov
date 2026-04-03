import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteDialogProps {
  isVisible: boolean
  closeDialog: () => void
  isPending?: boolean
  handleDelete: () => void
  description?: ReactNode
}

export function DeleteDialog({
  isVisible,
  closeDialog,
  isPending,
  handleDelete,
  description,
}: DeleteDialogProps) {
  return (
    <Dialog open={isVisible} onOpenChange={isPending ? undefined : closeDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[425px]">
        <DialogHeader className="flex w-full flex-col items-center">
          <DialogTitle className="text-xl text-center font-bold">
            Você tem certeza que deseja prosseguir?
          </DialogTitle>
        </DialogHeader>

        {description && (
          <div className="text-center text-muted-foreground">
            {description}
          </div>
        )}

        <div className="flex items-center w-full justify-center gap-x-2">
          <Button disabled={isPending} onClick={closeDialog} className="w-full" variant="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
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
