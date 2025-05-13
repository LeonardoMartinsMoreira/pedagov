'use client'

import { OccurrencesDataTable } from '@/components/occurences/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

interface Occurrence {
  id: string
  student: string
  type: string
  date: string
  class: string
}

export function OccurrencesList() {
  const columns: ColumnDef<Occurrence>[] = [
    {
      accessorKey: 'id',
      header: '№ Ocorrência',
      cell: ({ row }) => (
        <div className="font-medium">#{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'student',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Aluno
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <Link
          href={`/occurrences/${row.getValue('id')}`}
          className="font-medium hover:underline"
        >
          {row.getValue('student')}
        </Link>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
      cell: ({ row }) => {
        const type = row.getValue('type') as string

        const getBadgeVariant = (type: string) => {
          switch (type) {
            case 'Comportamento':
              return 'destructive'
            case 'Atraso':
              return 'warning'
            case 'Falta':
              return 'secondary'
            case 'Uniforme':
              return 'outline'
            default:
              return 'default'
          }
        }

        return (
          <Badge
            variant={
              getBadgeVariant(type) as
                | 'default'
                | 'destructive'
                | 'outline'
                | 'secondary'
                | null
                | undefined
            }
          >
            {type}
          </Badge>
        )
      },
      filterFn: 'equals',
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },

    {
      accessorKey: 'class',
      header: 'Turma',
      filterFn: 'equals',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <Link href={`/occurrences/${row.getValue('id')}`}>
              <Button variant="ghost" size="sm">
                Detalhes
              </Button>
            </Link>
          </div>
        )
      },
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-een items-center">
        <h1 className="text-3xl font-bold">Ocorrências</h1>
      </div>

      <OccurrencesDataTable columns={columns} data={occurrencesData} />
    </div>
  )
}

const occurrencesData = [
  {
    id: '1',
    student: 'Ana Silva',
    type: 'Comportamento',
    date: '12/03/2023',
    class: '1º Ano A',
  },
  {
    id: '2',
    student: 'Pedro Santos',
    type: 'Atraso',
    date: '15/03/2023',
    class: '2º Ano B',
  },
  {
    id: '3',
    student: 'Mariana Oliveira',
    type: 'Falta',
    date: '18/03/2023',
    class: '3º Ano C',
  },
  {
    id: '4',
    student: 'João Costa',
    type: 'Uniforme',
    date: '20/03/2023',
    class: '1º Ano A',
  },
  {
    id: '5',
    student: 'Carla Mendes',
    type: 'Comportamento',
    date: '22/03/2023',
    class: '2º Ano B',
  },
  {
    id: '6',
    student: 'Lucas Ferreira',
    type: 'Atraso',
    date: '25/03/2023',
    class: '1º Ano A',
  },
  {
    id: '7',
    student: 'Juliana Lima',
    type: 'Falta',
    date: '28/03/2023',
    class: '3º Ano C',
  },
  {
    id: '8',
    student: 'Rafael Souza',
    type: 'Uniforme',
    date: '30/03/2023',
    class: '2º Ano B',
  },
]
