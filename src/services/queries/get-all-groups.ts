import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IGroupsResponse } from '@/interfaces/groups/groups'

interface IGroupsParams {
  page: number
  limit: number
  globalFilter: string
}

const getAllGroups = async (params: IGroupsParams) => {
  const { globalFilter: searchTerm, page, limit } = params
  const response = await api.get('/groups', {
    params: { searchTerm, page, limit },
  })

  return response.data.result
}

export const useGetAllGroups = (params: IGroupsParams) =>
  useQuery<IGroupsResponse>({
    queryKey: ['groups', params],
    queryFn: () => getAllGroups(params),
    placeholderData: (previousData) => previousData,
  })
