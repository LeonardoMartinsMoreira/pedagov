import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IStudents } from '@/interfaces/students/students'

const getAllStudents = async () => {
  return (await api.get('/students')).data
}

export const useGetAllStudents = () =>
  useQuery<IStudents>({
    queryKey: ['students'],
    queryFn: () => getAllStudents(),
  })
