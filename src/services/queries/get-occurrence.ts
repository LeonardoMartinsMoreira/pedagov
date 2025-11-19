import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IOccurrence } from '@/interfaces/occurrences/occurrences'

const getOccurrence = async (id: string) => {
  return (await api.get(`/occurrences/${id}`)).data.result
}

export const useGetOccurrence = (id: string) =>
  useQuery<IOccurrence>({
    queryKey: ['occurrence', id],
    queryFn: () => getOccurrence(id),
  })
