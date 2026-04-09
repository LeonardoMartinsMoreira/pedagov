'use client'

import { BackButton } from '@/components/back-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  Clock,
  FileText,
  School,
  User,
  Users,
  Paperclip,
  ChevronRight,
  Edit,
  Trash2,
} from 'lucide-react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  occurrencesColorsEnum,
  occurrencesTypesEnum,
} from '@/constants/occurrences-types-enum'
import { useGetOccurrence } from '@/services/queries/get-occurrence'
import { Loading } from '@/components/loading'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDeleteOccurrence } from '@/services/mutations/delete-occurrence'
import { DeleteDialog } from '@/components/common/DeleteDialog'

export function OccurrenceDetails({ occurrenceId }: { occurrenceId: string }) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { data: occurrence, isLoading, error } = useGetOccurrence(occurrenceId)

  const { mutate: deleteOccurrence, isPending: isDeleting } = useDeleteOccurrence(() => {
    setIsDeleteDialogOpen(false)
    router.push('/occurrences')
  })

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="w-full text-danger">
        Erro ao carregar ocorrência.
      </div>
    )
  }

  if (!occurrence) {
    return (
      <div className="w-full text-muted-foreground">
        Ocorrência não encontrada.
      </div>
    )
  }

  const createdAt = new Date(occurrence.createdAt)
  const formattedDate = format(createdAt, 'dd/MM/yyyy', { locale: ptBR })
  const formattedTime = format(createdAt, 'HH:mm', { locale: ptBR })

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col items-start gap-y-2">
          <BackButton />

          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              {occurrence.title}
            </h1>

            <Badge
              variant={occurrencesColorsEnum[occurrence.type] ?? 'default'}
            >
              {occurrencesTypesEnum[occurrence.type] ?? occurrence.type}
            </Badge>
          </div>

          <p className="text-muted-foreground">
            Registrada em {formattedDate} às {formattedTime} por{' '}
            {occurrence.author}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <Button variant="outline" asChild>
            <Link href={`/occurrences/${occurrenceId}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Link>
          </Button>

          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lado Esquerdo: Informações Principais da Ocorrência */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Informações da Ocorrência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Data</h3>
                    <p>{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Hora</h3>
                    <p>{formattedTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <School className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Professor(a)</h3>
                    <p>{occurrence.teacher}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Pedagoga(o)</h3>
                    <p>{occurrence.author}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Descrição da Ocorrência</h3>
                </div>

                <p className="whitespace-pre-line text-sm">
                  {occurrence.description}
                </p>
              </div>

              {occurrence.attachments.length > 0 && (
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Anexos</h3>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {occurrence.attachments.map((file) => (
                      <a
                        key={file.id}
                        href={file.url}
                        target="_blank"
                        className="text-sm underline text-primary flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" /> {file.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lado Direito: Integrantes e Envolvidos */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User size={18} />
                Alunos Envolvidos
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {occurrence.students.map((student) => (
                  <Link
                    href={`/students/${student.id}`}
                    key={student.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg`} alt={student.name} />
                      <AvatarFallback>
                        {student.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="font-medium text-sm truncate" title={student.name}>
                        {student.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        CPF: {student.cpf.value}
                      </p>
                      {(student.responsibleEmail || student.responsiblePhone) && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          Resp: {student.responsibleEmail || student.responsiblePhone}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}

                {occurrence.students.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Nenhum aluno associado.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {occurrence.attendees.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={18} />
                  Outros Participantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {occurrence.attendees.map((a) => (
                    <div
                      key={a.id}
                      className="p-2 bg-muted/80 text-sm rounded-md font-medium"
                    >
                      {a.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <DeleteDialog
        isVisible={isDeleteDialogOpen}
        closeDialog={() => setIsDeleteDialogOpen(false)}
        isPending={isDeleting}
        handleDelete={() => deleteOccurrence(occurrenceId)}
      >
        <p className="text-sm text-muted-foreground text-center">
          Deseja mesmo excluir esta ocorrência permanentemente? Esta ação não poderá ser desfeita.
        </p>
      </DeleteDialog>
    </div>
  )
}

