import { LIMIT, PAGE } from '@/constants/pagination'
import { useMemo, useState } from 'react'

export const useFilters = () => {
  const [filtersState, setFilters] = useState({
    limit: LIMIT,
    page: PAGE,
  })

  const filters = useMemo(() => filtersState, [filtersState])

  return {
    filters,
    setFilters,
  }
}
