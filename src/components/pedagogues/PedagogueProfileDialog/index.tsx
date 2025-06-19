import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export function PedagogueProfileDialog({
  isVisible,
  closeDialog,
  idSelectedPedagogue,
}: {
  isVisible: boolean
  closeDialog: () => void
  idSelectedPedagogue: string
}) {
  console.log(idSelectedPedagogue, 'perfil do aluno')

  return (
    <Dialog open={isVisible} onOpenChange={closeDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[425px]">
        <DialogHeader className="flex w-full flex-col items-center">
          <DialogTitle className="text-center">
            Leonardo Martins Moreira
          </DialogTitle>

          <Image
            className="w-32 h-32 bg-black dark:bg-white rounded-full"
            alt=""
            src=""
          />

          <div className="flex w-full items-center justify-center gap-x-3">
            <div className="flex flex-col w-24 justify-center items-center">
              <span className="font-bold">3º TDS</span>
              <span className="text-xs">Turma</span>
            </div>

            <div className="h-8 w-[1px] rounded bg-slate-600 dark:bg-white" />

            <div className="flex flex-col w-24 justify-center items-center">
              <span className="font-bold">3</span>
              <span className="text-xs">Ocorrências</span>
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center w-full justify-center gap-x-2">
          <Button className="w-full">Editar Perfil</Button>
          <Button className="bg-green-500">
            <WhatsappLogo className="text-white" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
