import { students1000 } from '@/app/[locale]/(dashboard)/students/page'
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

import { useState } from 'react'

export function OcorrenciaDialog({
  isVisible,
  closeDialog,
}: {
  isVisible: boolean
  closeDialog: () => void
}) {
  const [selectedStudent, setSelectedStudent] = useState<string[]>([])

  return (
    <Dialog open={isVisible} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar nova ocorrência</DialogTitle>
        </DialogHeader>

        <Label>Selecione o(s) Aluno(s)</Label>
        <MultiSelect
          options={students1000
            .sort((a, b) => {
              const nameA = a.nome.toUpperCase()
              const nameB = b.nome.toUpperCase()
              if (nameA < nameB) {
                return -1
              }
              if (nameA > nameB) {
                return 1
              }

              return 0
            })
            .map(({ id, nome }) => ({
              label: nome,
              value: String(id),
            }))}
          onValueChange={setSelectedStudent}
          defaultValue={selectedStudent}
          placeholder="Selecione o(s) Aluno(s)"
          variant="inverted"
        />

        <Label>Motivo</Label>
        <Textarea></Textarea>

        <Button>Adicionar ocorrência</Button>
      </DialogContent>
    </Dialog>
  )
}
