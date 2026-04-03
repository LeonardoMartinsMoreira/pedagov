import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IOccurrencesResponse } from '@/interfaces/occurrences/occurrences'

interface IOccurrencesParams {
  page: number
  limit: number
  studentId?: string
  type?: string
  globalFilter: string
}

const getAllOccurrences = async (params: IOccurrencesParams) => {
  const { globalFilter: searchTerm, page, limit, studentId, type } = params
  const response = await api.get('/occurrences', {
    params: { searchTerm, page, limit, studentId, type },
  })

  return response.data.result
}

export const useGetAllOccurrences = (params: IOccurrencesParams) =>
  useQuery<IOccurrencesResponse>({
    queryKey: ['occurrences', params],
    queryFn: () => getAllOccurrences(params),
    placeholderData: (previousData) => previousData,
  })
