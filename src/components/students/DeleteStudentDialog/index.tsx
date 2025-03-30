import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { students1000 } from '@/faker/students'

export function DeleteStudentDialog({
  isVisible,
  closeDialog,
  idSelectedStudent,
}: {
  isVisible: boolean
  closeDialog: () => void
  idSelectedStudent: number
}) {
  const student = students1000.find(({ id }) => id === idSelectedStudent)

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
            {student?.nome}?
          </span>
        </p>

        <div className="flex items-center w-full justify-center gap-x-2">
          <Button className="w-full" variant="secondary">
            Cancelar
          </Button>
          <Button className="w-full">Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
