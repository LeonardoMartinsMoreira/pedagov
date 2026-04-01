import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IPedagoguesResponse } from '@/interfaces/pedagogues/pedagogues'

interface IPedagoguesParams {
  page: number
  limit: number
  type?: string
}

const getAllPedagogues = async (params: IPedagoguesParams) => {
  return (
    await api.get('/pedagogues', {
      params: {
        page: params.page,
        limit: params.limit,
        type: params.type,
      },
    })
  ).data.result
}

export const useGetAllPedagogues = (data: IPedagoguesParams) =>
  useQuery<IPedagoguesResponse>({
    queryKey: ['pedagogues', data],
    queryFn: () => getAllPedagogues(data),
    placeholderData: (previousData) => previousData,
  })
