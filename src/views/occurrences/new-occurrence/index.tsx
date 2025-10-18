'use client'

import { BackButton } from '@/components/back-button'
import { Loading } from '@/components/loading'
import { MultiSelect } from '@/components/multi-select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LIMIT } from '@/constants/pagination'
import { useGetAllAttendees } from '@/services/queries/get-all-attendees'
import { useGetAllStudents } from '@/services/queries/get-all-students'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const occurrenceFormSchema = z.object({
  studentsId: z
    .array(z.string(), { message: 'Selecione ao menos um aluno' })
    .min(1, { message: 'Selecione ao menos um aluno' }),
  attendeesIds: z
    .array(z.string(), { message: 'Selecione ao menos uma pessoa presente' })
    .min(1, { message: 'Selecione ao menos um aluno' }),
  type: z
    .string({ required_error: 'Selecione o tipo da ocorrência' })
    .min(1, 'Selecione um tipo de ocorrência'),
  description: z
    .string({ required_error: 'Descreva com detalhes o acontecimento' })
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  title: z
    .string({ required_error: 'Descreva brevemente o acontecimento' })
    .min(1, 'Dê um título para a ocorrência'),
})

type OccurrenceFormValues = z.infer<typeof occurrenceFormSchema>

export function NewOccurrenceForm() {
  const idSelectedStudent = useParams<{ id: string }>().id
  const [page, setPage] = useState(1)

  const { data: attendees, isLoading: isLoadingAttendees } = useGetAllAttendees(
    {
      limit: LIMIT,
      page,
    }
  )

  const form = useForm<OccurrenceFormValues>({
    resolver: zodResolver(occurrenceFormSchema),
    defaultValues: {
      studentsId:
        idSelectedStudent && idSelectedStudent !== 'null'
          ? [idSelectedStudent]
          : [],
      attendeesIds: undefined,
      type: '',
      description: '',
      title: '',
    },
  })

  const onSubmit = async (data: OccurrenceFormValues) => {
    try {
      console.log('Dados da ocorrência:', data)
    } catch (error) {
      console.error('Erro ao salvar ocorrência:', error)
    }
  }

  const { data, isLoading: isLoadingStudents } = useGetAllStudents()

  const isLoading = isLoadingAttendees || isLoadingStudents

  const { description, studentsId, type, title, attendeesIds } =
    form.formState.errors

  if (isLoading || !data) return <Loading />

  return (
    <div className="container max-w-4xl py-8">
      <Card className="border-none">
        <CardHeader className="rounded-t-lg">
          <BackButton />
          <CardTitle className="text-3xl font-bold">Nova Ocorrência</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Título da ocorrência"
                          error={Boolean(title)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentsId"
                  render={({ field }) => (
                    <FormItem className="mt-1.5">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex flex-col gap-y-3">
                          <FormLabel>Aluno(s)</FormLabel>
                          <MultiSelect
                            className="min-h-9"
                            options={data.map(({ student, studentId }) => ({
                              label: student,
                              value: String(studentId),
                            }))}
                            defaultValue={field.value}
                            onValueChange={(val) =>
                              form.setValue(field.name, val, {
                                shouldValidate: true,
                              })
                            }
                            selectAll={false}
                            error={Boolean(studentsId)}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Ocorrência</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger error={Boolean(type)}>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="comportamento">
                            Comportamento
                          </SelectItem>
                          <SelectItem value="atraso">Atraso</SelectItem>
                          <SelectItem value="falta">Falta</SelectItem>
                          <SelectItem value="uniforme">Uniforme</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attendeesIds"
                  render={({ field }) => (
                    <FormItem className="mt-1.5">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex flex-col gap-y-3">
                          <FormLabel>
                            Presente(s) no momento da ocorrência
                          </FormLabel>
                          <MultiSelect
                            className="min-h-9"
                            options={attendees!.map(({ id, name }) => ({
                              label: name,
                              value: id,
                            }))}
                            value={field.value}
                            onValueChange={field.onChange}
                            selectAll={false}
                            error={Boolean(attendeesIds)}
                            onDragEnd={() => setPage((prev) => prev + 1)}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        error={Boolean(description)}
                        placeholder="Descreva a ocorrência em detalhes..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
