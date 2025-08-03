import { BusinessMetrics } from '@/components/business-metrics'

export const metadata = {
  title: 'Mais Ocorrências - Início',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <BusinessMetrics />
    </div>
  )
}
