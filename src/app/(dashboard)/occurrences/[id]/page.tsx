import OccurrenceDetails from '@/views/occurrences/occurrence-details'

export const metadata = {
  title: 'Mais Ocorrências - Detalhes da ocorrência',
}

export default function OccurrenceDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return <OccurrenceDetails params={params} />
}
