import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { IAttendee } from '@/interfaces/attendees/attendees'

interface IAttendeesParams {
  page: number
  limit: number
  type?: string
}

const getAllAttendees = async (params: IAttendeesParams) => {
  return (
    await api.get('/attendees', {
      params: {
        page: params.page,
        limit: params.limit,
        type: params.type,
      },
    })
  ).data.result
}

export const useGetAllAttendees = (data: IAttendeesParams) =>
  useQuery<IAttendee[]>({
    queryKey: ['attendees', data],
    queryFn: () => getAllAttendees(data),
  })
