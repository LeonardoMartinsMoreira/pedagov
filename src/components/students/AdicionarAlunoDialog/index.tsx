import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import UploadImage from '@/components/upload-image'
import { useForm } from 'react-hook-form'

export function AdicionarAlunoDialog({
  isVisible,
  closeDialog,
}: {
  isVisible: boolean
  closeDialog: () => void
}) {
  const { register, setValue } = useForm()

  return (
    <Dialog open={isVisible} onOpenChange={closeDialog}>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Adicionar novo aluno</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-4">
              <div>
                <Label>Nome do aluno</Label>
                <Input placeholder="Nome completo" {...register('name')} />
              </div>

              <div>
                <Label>Turma</Label>
                <Input placeholder="Turma" {...register('turma')} />
              </div>
            </div>

            <Label>Telefone responsável</Label>
            <Input placeholder="Telefone / Whatsapp" {...register('tel')} />
            <div>
              <UploadImage setValue={setValue} />
              <span className="text-xs text-muted-foreground">
                São permitidos JPG, GIF ou PNG. Tamanho máximo 1.5MB
              </span>
            </div>
          </div>

          <Button type="submit">Adicionar aluno</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
