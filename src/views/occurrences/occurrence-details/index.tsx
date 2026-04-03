'use client'

import { BackButton } from '@/components/back-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
  Calendar,
  Clock,
  FileText,
  School,
  User,
  Users,
  Paperclip,
} from 'lucide-react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  occurrencesColorsEnum,
  occurrencesTypesEnum,
} from '@/constants/occurrences-types-enum'
import { useGetOccurrence } from '@/services/queries/get-occurrence'
import { useSearchParams } from 'next/navigation'
import { Loading } from '@/components/loading'

export function OccurrenceDetails({ occurrenceId }: { occurrenceId: string }) {
  const search = useSearchParams()
  const studentId = search.get('studentId')

  const { data: occurrence, isLoading, error } = useGetOccurrence(occurrenceId)

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 text-red-500">
        Erro ao carregar ocorrência.
      </div>
    )
  }

  if (!occurrence) {
    return (
      <div className="container mx-auto py-6 text-muted-foreground">
        Ocorrência não encontrada.
      </div>
    )
  }

  const student = occurrence.students.find((s) => s.id === studentId)

  if (!student) {
    return (
      <div className="container mx-auto py-6 text-muted-foreground">
        Aluno não encontrado nesta ocorrência.
      </div>
    )
  }

  const createdAt = new Date(occurrence.createdAt)
  const formattedDate = format(createdAt, 'dd/MM/yyyy', { locale: ptBR })
  const formattedTime = format(createdAt, 'HH:mm', { locale: ptBR })

  return (
    <div className="">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User size={18} />
              Dados do Aluno
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={`/placeholder.svg`} alt={student.name} />
                  <AvatarFallback className="text-2xl">
                    {student.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Nome</TableCell>
                    <TableCell>{student.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CPF</TableCell>
                    <TableCell>{student.cpf.value}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">E-mail Resp.</TableCell>
                    <TableCell>{student.responsibleEmail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Telefone Resp.
                    </TableCell>
                    <TableCell>{student.responsiblePhone}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Separator />

              {occurrence.attendees.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">
                    Participantes presentes na ocorrência
                  </h3>
                  <div className="space-y-1 text-sm">
                    {occurrence.attendees.map((a) => (
                      <div key={a.id} className="p-2 bg-muted rounded-md">
                        {a.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
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

                  <div className="space-y-2">
                    {occurrence.attachments.map((file) => (
                      <a
                        key={file.id}
                        href={file.url}
                        target="_blank"
                        className="text-sm underline text-primary"
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
      </div>
    </div>
  )
}
