import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { ITeachers } from '@/interfaces/teachers/teacher'

interface ITeachersParams {
  page: number
  limit: number
  type?: string
}

const getAllTeachers = async (params: ITeachersParams) => {
  return (
    await api.get('/teachers', {
      params: {
        page: params.page,
        limit: params.limit,
        type: params.type,
      },
    })
  ).data.result
}

export const useGetAllTeachers = (data: ITeachersParams) =>
  useQuery<ITeachers>({
    queryKey: ['teachers', data],
    queryFn: () => getAllTeachers(data),
  })
