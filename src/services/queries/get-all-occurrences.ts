import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IOccurrence } from '@/interfaces/occurrences/occurrences'

interface IOccurrencesParams {
  page: number
  limit: number
  studentId?: string
  type?: string
  globalFilter: string
}

interface IOccurrencesResponse {
  result: IOccurrence[]
  totalPages: number
  totalItems: number
}

const getAllOccurrences = async (params: IOccurrencesParams) => {
  const { globalFilter: searchTerm, page, limit, studentId, type } = params
  const response = await api.get<IOccurrencesResponse>('/occurrences-student', {
    params: { searchTerm, page, limit, studentId, type },
  })

  return response.data
}

export const useGetAllOccurrences = (params: IOccurrencesParams) =>
  useQuery<IOccurrencesResponse>({
    queryKey: ['occurrences', params],
    queryFn: () => getAllOccurrences(params),
  })
