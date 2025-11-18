import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

export function useUploadAttachment() {
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData()
      form.append('file', file)

      const { data } = await api.post('/attachments', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return data.url as string
    },
  })
}
