import { EditOccurrenceForm } from '@/views/occurrences/edit-occurrence'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Ocorrência | pedagov',
  description: 'Edite os dados desta ocorrência',
}

export default function EditOccurrencePage() {
  return <EditOccurrenceForm />
}
