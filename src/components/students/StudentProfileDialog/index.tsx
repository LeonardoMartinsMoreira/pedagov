import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function StudentProfileDialog({
  isVisible,
  closeDialog,
  idSelectedStudent,
}: {
  isVisible: boolean
  closeDialog: () => void
  idSelectedStudent: number
}) {
  console.log(idSelectedStudent, 'perfil do aluno')

  return (
    <Dialog open={isVisible} onOpenChange={closeDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
        </DialogHeader>
        <Label>Selecione o(s) Aluno(s)</Label>
        <Label>Motivo</Label>
        <Textarea
          aria-describedby={undefined}
          className="resize-none h-32"
        ></Textarea>
        <Button>Adicionar ocorrência</Button>
      </DialogContent>
    </Dialog>
  )
}
