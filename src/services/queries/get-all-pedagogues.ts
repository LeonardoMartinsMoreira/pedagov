import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IPedagogues } from '@/interfaces/pedagogues/pedagogues'

interface IPedagoguesParams {
  page: number
  limit: number
  type?: string
}

const getAllPedagogues = async (params: IPedagoguesParams) => {
  return (
    await api.get('/pedagogues', {
      params: {
        page: 2,
        limit: params.limit,
        type: params.type,
      },
    })
  ).data
}

export const useGetAllPedagogues = (data: IPedagoguesParams) =>
  useQuery<IPedagogues>({
    queryKey: ['pedagogues', data],
    queryFn: () => getAllPedagogues(data),
  })
