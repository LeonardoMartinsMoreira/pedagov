import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useUploadAttachment } from '@/services/mutations/upload-attachment'
import { useImportUsers } from '@/services/mutations/import-users'
import { toast } from '@/hooks/use-toast'

export function ImportStudentsDialog({
  isVisible,
  closeDialog,
  groupId,
}: {
  isVisible: boolean
  closeDialog: () => void
  groupId: string
}) {
  const [csvFile, setCsvFile] = useState<File | null>(null)

  const uploadMutation = useUploadAttachment()
  const importMutation = useImportUsers()

  const onClose = () => {
    setCsvFile(null)
    closeDialog()
  }

  const handleImportCsv = async () => {
    if (!csvFile) return

    try {
      const fileUrl = await uploadMutation.mutateAsync(csvFile)

      await importMutation.mutateAsync({
        groupId,
        fileUrl,
      })

      toast({
        title: 'Alunos inserido a turma com sucesso.',
        variant: 'success',
      })
      onClose()
    } catch {
      toast({
        title: 'Falha ao tentar inserir alunos.',
        description: 'Caso o erro persistir, contate nosso suporte.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Importar alunos por CSV</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files?.[0] ?? null)}
          />

          <Button
            onClick={handleImportCsv}
            isLoading={uploadMutation.isPending || importMutation.isPending}
            disabled={!csvFile}
          >
            Importar CSV
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
