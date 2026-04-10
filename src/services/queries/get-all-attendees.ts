import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IAttendeesResponse } from '@/interfaces/attendees/attendees'

interface IAttendeesParams {
  page: number
  limit: number
  type?: string
  status?: string[]
}

const getAllAttendees = async (params: IAttendeesParams) => {
  return (
    await api.get('/attendees', {
      params,
    })
  ).data.result
}

export const useGetAllAttendees = (data: IAttendeesParams) =>
  useQuery<IAttendeesResponse>({
    queryKey: ['attendees', data],
    queryFn: () => getAllAttendees(data),
    placeholderData: (previousData) => previousData,
  })
