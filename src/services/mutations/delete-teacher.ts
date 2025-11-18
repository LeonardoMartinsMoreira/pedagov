import { toast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'

async function deleteTeacherApi(id: string) {
  await api.delete(`/teachers/${id}`)
}

export function useDeleteTeacher(closeDialog: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTeacherApi,
    onSuccess: async () => {
      toast({
        title: 'Professor deletado com sucesso.',
        variant: 'success',
      })
      await queryClient.invalidateQueries({ queryKey: ['teachers'] })
      closeDialog()
    },
    onError: () => {
      toast({
        title: 'Erro ao deletar o professor',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
  })
}
