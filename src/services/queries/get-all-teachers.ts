import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { ITeachersResponse } from '@/interfaces/teachers/teacher'

interface ITeachersParams {
  page: number
  limit: number
  type?: string
  status?: string[]
}

const getAllTeachers = async (params: ITeachersParams) => {
  return (
    await api.get('/teachers', {
      params,
    })
  ).data.result
}

export const useGetAllTeachers = (data: ITeachersParams) =>
  useQuery<ITeachersResponse>({
    queryKey: ['teachers', data],
    queryFn: () => getAllTeachers(data),
    placeholderData: (previousData) => previousData,
  })
