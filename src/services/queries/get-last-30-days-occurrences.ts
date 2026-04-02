import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

const getLast30DaysOccurrences = async () => {
  return (await api.get('/occurrences/count/last-30-days')).data.result
}

export const useGetLast30DaysOccurrences = () =>
  useQuery<{ count: number }>({
    queryKey: ['last30DaysOccurrences'],
    queryFn: () => getLast30DaysOccurrences(),
  })
