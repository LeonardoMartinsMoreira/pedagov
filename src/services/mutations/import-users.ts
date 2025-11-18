import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

export function useImportUsers() {
  return useMutation({
    mutationFn: async ({
      groupId,
      fileUrl,
    }: {
      groupId: string
      fileUrl: string
    }) => {
      return api.post(`/import-users/${groupId}`, { fileUrl })
    },
  })
}
