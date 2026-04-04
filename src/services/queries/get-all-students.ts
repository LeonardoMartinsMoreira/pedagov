import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IStudentsResponse } from '@/interfaces/students/students'

interface IStudentsParams {
  page: number
  limit: number
  status?: string[]
}

const getAllStudents = async (params: IStudentsParams) => {
  return (
    await api.get('/students', {
      params,
    })
  ).data.result
}

export const useGetAllStudents = (params: IStudentsParams) =>
  useQuery<IStudentsResponse>({
    queryKey: ['students', params],
    queryFn: () => getAllStudents(params),
    placeholderData: (previousData) => previousData,
  })
