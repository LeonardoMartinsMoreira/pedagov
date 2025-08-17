import { toast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'

async function deleteStudentApi(id: string) {
  await api.delete(`/students/${id}`)
}

export function useDeleteStudent(closeDialog: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: async () => {
      toast({
        title: 'Aluno deletado com sucesso.',
        variant: 'success',
      })

      await queryClient.invalidateQueries({ queryKey: ['delete-student'] })
      closeDialog()
    },
    onError: (err) => {
      toast({
        title: 'Erro ao deletar aluno',
        description: err.message,
        variant: 'destructive',
      })
    },
  })
}
