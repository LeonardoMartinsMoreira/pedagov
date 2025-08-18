import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IStudent } from '@/interfaces/students/students'

const getAllStudents = async () => {
  return (await api.get('/students')).data.result
}

export const useGetAllStudents = () =>
  useQuery<IStudent[]>({
    queryKey: ['students'],
    queryFn: () => getAllStudents(),
  })
