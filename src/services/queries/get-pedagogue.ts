import { useQuery } from '@tanstack/react-query'
import type { IPedagogue } from '@/interfaces/pedagogues/pedagogues'
import { api } from '@/services/api'

async function getPedagogueById(id: string): Promise<IPedagogue | null> {
  const res = await api.get<unknown>(`/pedagogues/${id}`)
  const body = res.data as Record<string, unknown>
  const entity = (body?.result ?? body) as IPedagogue | null
  if (entity && typeof entity === 'object' && 'name' in entity) {
    return entity
  }
  return null
}

export function usePedagogue(id: string | undefined) {
  return useQuery({
    queryKey: ['pedagogue', id],
    queryFn: () => getPedagogueById(id!),
    enabled: Boolean(id),
  })
}
