import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IGroup } from '@/interfaces/groups/groups'

interface IGroupsParams {
  page: number
  limit: number
  globalFilter: string
}

interface IGroupsResponse {
  result: IGroup[]
  totalPages: number
  totalItems: number
}

const getAllGroups = async (params: IGroupsParams) => {
  const { globalFilter: searchTerm, page, limit } = params
  const response = await api.get<IGroupsResponse>('/groups', {
    params: { searchTerm, page, limit },
  })

  return response.data
}

export const useGetAllGroups = (params: IGroupsParams) =>
  useQuery<IGroupsResponse>({
    queryKey: ['groups', params],
    queryFn: () => getAllGroups(params),
  })
