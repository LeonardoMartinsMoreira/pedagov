import { MultiSelect } from '@/components/multi-select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { students1000 } from '@/faker/students'
import { useState } from 'react'

export function OcorrenciaDialog({
  isVisible,
  closeDialog,
  idSelectedStudent,
}: {
  isVisible: boolean
  closeDialog: () => void
  idSelectedStudent: number
}) {
  const defaultSelectedStudent = students1000.find(
    ({ id }) => id === idSelectedStudent
  )?.id

  const [selectedStudent, setSelectedStudent] = useState<string[]>([
    defaultSelectedStudent?.toString() as string,
  ])

  return (
    <Dialog open={isVisible} onOpenChange={closeDialog}>
      <DialogContent className="flex flex-col gap-y-3 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar nova ocorrência</DialogTitle>
        </DialogHeader>
        <Label>Selecione o(s) Aluno(s)</Label>
        <MultiSelect
          options={students1000.map(({ id, nome }) => ({
            label: nome,
            value: String(id),
          }))}
          onValueChange={setSelectedStudent}
          defaultValue={selectedStudent}
          placeholder="Selecione o(s) Aluno(s)"
          variant="inverted"
        />
        <Label>Motivo</Label>
        <Textarea aria-describedby={undefined} className="resize-none h-32" />
        <Button>Adicionar ocorrência</Button>
      </DialogContent>
    </Dialog>
  )
}
