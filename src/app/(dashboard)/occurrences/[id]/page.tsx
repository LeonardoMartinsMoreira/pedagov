import { OccurrenceDetails } from '@/views/occurrences/occurrence-details'

export const metadata = {
  title: 'Mais Ocorrências - Detalhes da ocorrência',
}

export default async function OccurrenceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params


  return <OccurrenceDetails occurrenceId={id} />
}
