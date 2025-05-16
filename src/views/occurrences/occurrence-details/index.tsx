'use client'

import { BackButton } from '@/components/back-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Calendar, Clock, FileText, School, User, Users } from 'lucide-react'

export default function OccurrenceDetails({
  params,
}: {
  params: { id: string }
}) {
  const occurrence =
    occurrencesData.find((o) => o.id === params.id) || occurrencesData[0]

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
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col items-start gap-y-2">
          <BackButton />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Ocorrência #{params.id}
            </h1>
            <Badge
              variant={
                getBadgeVariant(occurrence.type) as
                  | 'default'
                  | 'destructive'
                  | 'outline'
                  | 'secondary'
                  | null
                  | undefined
              }
            >
              {occurrence.type}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Registrada em {occurrence.date} às 14:30 por Maria Eduarda
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
                  <AvatarImage
                    src={`/placeholder.svg?height=96&width=96`}
                    alt={occurrence.student}
                  />
                  <AvatarFallback className="text-2xl">
                    {occurrence.student
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
                    <TableCell>{occurrence.student}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Turma</TableCell>
                    <TableCell>{occurrence.class}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Escola</TableCell>
                    <TableCell>{occurrence.school}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Ocorrências Anteriores</h3>
                <div className="space-y-2">
                  <div className="text-sm p-4 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="mb-1">
                        Atraso
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        10/03/2023
                      </span>
                    </div>
                    <p className="text-xs">
                      Chegou 15 minutos atrasado na primeira aula.
                    </p>
                  </div>
                  <div className="text-sm p-4 bg-muted rounded-md">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="mb-1">
                        Uniforme
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        05/03/2023
                      </span>
                    </div>
                    <p className="text-xs">Sem uniforme completo.</p>
                  </div>
                </div>
              </div>
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
                    <p>{occurrence.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Hora</h3>
                    <p>14:30</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <School className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Materia - Professor(a)
                    </h3>
                    <p>Matemática - Neiva</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Pedagoga(o) Responsável
                    </h3>
                    <p>Maria Eduarda</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Descrição da Ocorrência</h3>
                </div>
                <p className="whitespace-pre-line text-sm">
                  {occurrence.type === 'Comportamento'
                    ? 'O aluno apresentou comportamento inadequado durante a aula de matemática, conversando excessivamente e atrapalhando os colegas. Foi advertido verbalmente pelo professor e encaminhado à coordenação pedagógica.\n\nEm conversa com a coordenação, o aluno reconheceu o comportamento inadequado e se comprometeu a melhorar sua postura em sala de aula. Esta é a primeira ocorrência deste tipo registrada para este aluno neste semestre.'
                    : occurrence.type === 'Atraso'
                    ? 'O aluno chegou 20 minutos atrasado para a primeira aula sem justificativa dos responsáveis. Esta é a terceira ocorrência de atraso no mês.\n\nConforme o regimento escolar, após três ocorrências de atraso no mesmo mês, os responsáveis devem ser convocados para uma reunião com a coordenação pedagógica.'
                    : occurrence.type === 'Falta'
                    ? 'O aluno não compareceu às aulas sem justificativa prévia. Os responsáveis foram contatados por telefone e informaram que o aluno estava doente, mas não apresentaram atestado médico.\n\nFoi solicitado aos responsáveis que enviem a justificativa por escrito ou apresentem atestado médico na secretaria da escola.'
                    : 'O aluno compareceu à escola sem o uniforme completo. Foi orientado sobre a importância do uso correto do uniforme escolar.\n\nEsta é a segunda ocorrência relacionada ao uniforme neste mês. Na próxima ocorrência, os responsáveis serão convocados para uma reunião.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const occurrencesData = [
  {
    id: '1',
    student: 'Ana Silva',
    type: 'Comportamento',
    date: '12/03/2023',
    school: 'Escola Municipal A',
    class: '1º Ano A',
  },
  {
    id: '2',
    student: 'Pedro Santos',
    type: 'Atraso',
    date: '15/03/2023',
    school: 'Escola Municipal A',
    class: '2º Ano B',
  },
  {
    id: '3',
    student: 'Mariana Oliveira',
    type: 'Falta',
    date: '18/03/2023',
    school: 'Escola Estadual B',
    class: '3º Ano C',
  },
  {
    id: '4',
    student: 'João Costa',
    type: 'Uniforme',
    date: '20/03/2023',
    school: 'Colégio C',
    class: '1º Ano A',
  },
  {
    id: '5',
    student: 'Carla Mendes',
    type: 'Comportamento',
    date: '22/03/2023',
    school: 'Escola Municipal A',
    class: '2º Ano B',
  },
]
