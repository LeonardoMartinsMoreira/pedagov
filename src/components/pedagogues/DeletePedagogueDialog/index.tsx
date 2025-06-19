import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { fakePedagogues } from '@/faker/pedadogues'

export function DeletePedagogueDialog({
  isVisible,
  closeDialog,
  idSelectedPedagogue,
}: {
  isVisible: boolean
  closeDialog: () => void
  idSelectedPedagogue: string
}) {
  console.log(idSelectedPedagogue, 'perfil do aluno')

  const pedagogue = fakePedagogues.find(
    ({ id }) => id.toString() === idSelectedPedagogue
  )

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
          o pedagogo(a){' '}
          <span className="font-bold text-black dark:text-white ">
            {pedagogue?.nome}?
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
