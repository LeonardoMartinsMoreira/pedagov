import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { IStudent } from '@/interfaces/students/students'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export function StudentProfileDialog({
  isVisible,
  closeDialog,
  student,
}: {
  isVisible: boolean
  closeDialog: () => void
  student: IStudent
}) {
  return (
    <Dialog open={isVisible} onOpenChange={closeDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[425px]">
        <DialogHeader className="flex w-full flex-col items-center">
          <DialogTitle className="text-center">{student.student}</DialogTitle>

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
