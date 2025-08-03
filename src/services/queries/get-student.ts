import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IStudent } from '@/interfaces/students/students'

const getStudent = async (id: string) => {
  return (await api.get(`/students/${id}`)).data.result
}

export const useGetStudent = (id: string) =>
  useQuery<IStudent>({
    queryKey: ['student'],
    queryFn: () => getStudent(id),
  })
