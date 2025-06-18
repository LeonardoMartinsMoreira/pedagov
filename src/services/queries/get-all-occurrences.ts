import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IOccurrences } from '@/interfaces/occurrences/occurrences-interface'

interface IOccurrencesParams {
  page: number
  limit: number
  studentId?: string
  type?: string
}

const getAllOccurrences = async (params: IOccurrencesParams) => {
  return (
    await api.get('/occurrences-student', {
      params: {
        page: params.page,
        limit: params.limit,
        studentId: params.studentId,
        type: params.type,
      },
    })
  ).data
}

export const useGetAllOccurrences = (data: IOccurrencesParams) =>
  useQuery<IOccurrences>({
    queryKey: ['occurrences-student', data],
    queryFn: () => getAllOccurrences(data),
  })
